import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Typography, Alert } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { authActions } from '../redux/auth/authActions'
import { LoginData } from '../models/IUserProfile'

const { Title } = Typography

function LoginForm() {
  const { isFetchingData, formErrors, responseErrors } = useAppSelector(
    (state) => state.auth
  )
  const dispatch = useAppDispatch()

  const submit = (values: LoginData) => {
    const keys = Object.keys(values) as (keyof LoginData)[]
    const valuesTrim = keys.reduce((acc, key) => {
      return {...acc, [key]: values[key].trim()}
    }, {})

    dispatch(authActions.getAuthData(valuesTrim as LoginData))
  }

  return (
    <Form name="basic" onFinish={submit} autoComplete="off">
      {responseErrors.message && (
        <FormItem>
          <Alert message={responseErrors.message} type="error" closable />
        </FormItem>
      )}

      <Form.Item
        validateStatus={
          formErrors.find((item) => item.field === 'email')
            ? 'error'
            : 'success'
        }
        help={formErrors.find((item) => item.field === 'email')?.message}
        name="email"
        rules={[
          {
            type: 'email',
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Ваш email"
        />
      </Form.Item>

      <Form.Item
        validateStatus={
          formErrors.find((item) => item.field === 'password')
            ? 'error'
            : 'success'
        }
        help={formErrors.find((item) => item.field === 'password')?.message}
        name="password"
        rules={[{ required: true, message: 'Введите Ваш пароль!' }]}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Пароль"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isFetchingData}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm