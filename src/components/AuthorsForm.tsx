import { Button, Col, Form, Input, Row, Upload, Image, Checkbox } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { NewAuthorFromForm } from '../models/IAuthor'
import { AuthorsActions } from '../redux/authors/authorsActions'

const { Dragger } = Upload

interface AuthorsFormProps {
  isNew: boolean
}

const AuthorsForm: FC<AuthorsFormProps> = ({ isNew }) => {
  const dispatch = useAppDispatch()

  const {
    currentAuthor: author,
    formErrors,
    isSaving,
  } = useAppSelector((state) => state.authors)

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  const onFinish = (values: NewAuthorFromForm) => {
    isNew
      ? dispatch(
          AuthorsActions.addAuthor({
            ...values,
            removeAvatar: +Boolean(values.removeAvatar),
          })
        )
      : dispatch(
          AuthorsActions.editAuthor({
            ...values,
            removeAvatar: +Boolean(values.removeAvatar),
            id: author.id,
          })
        )
  }

  return (
    <Form
      disabled={isSaving}
      layout="vertical"
      onFinish={onFinish}
      fields={[
        { name: ['name'], value: author.name },
        { name: ['secondName'], value: author.secondName },
        { name: ['lastName'], value: author.lastName },
        { name: ['shortDescription'], value: author.shortDescription },
        { name: ['description'], value: author.description },
      ]}
    >
      <Row gutter={16}>
        <Col span={16}>
          <Form.Item
            name="avatar"
            label="Аватар автора"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            validateStatus={
              formErrors.find((item) => item.field === 'previewPicture')
                ? 'error'
                : 'success'
            }
            help={
              formErrors.find((item) => item.field === 'previewPicture')
                ?.message
            }
            rules={[
              {
                required: isNew ? true : false,
                message: 'загрузите изображение',
              },
            ]}
          >
            <Dragger
              name="dragger"
              accept="image/*"
              multiple={false}
              // onChange={({ file }) => setTempFile(file)}
              // onDrop={({ dataTransfer }) => setTempFile(dataTransfer.files[0])}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Кликните или перетащите файл в эту зону для загрузки
              </p>
            </Dragger>
          </Form.Item>
        </Col>

        <Col span={8}>
          {author.avatar && (
            <Image
              width={200}
              height={200}
              src="error"
              fallback={author.avatar.url}
            />
          )}
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            validateStatus={
              formErrors.find((item) => item.field === 'name')
                ? 'error'
                : 'success'
            }
            help={
              //formErrors.find((item) => item.field === 'name') &&
              formErrors.find((item) => item.field === 'name')?.message
            }
            name="name"
            label="Имя"
            rules={[
              {
                required: true,
                message: 'Введите имя автора',
              },
            ]}
          >
            <Input size="large" placeholder="Введите имя автора " />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            validateStatus={
              formErrors.find((item) => item.field === 'secondName')
                ? 'error'
                : 'success'
            }
            help={
              formErrors.find((item) => item.field === 'secondName')?.message
            }
            name="secondName"
            label="Отчество"
            rules={[
              {
                required: true,
                message: 'Введите  отчество автора',
                type: 'string',
              },
            ]}
          >
            <Input size="large" placeholder="Введите  отчество автора" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            validateStatus={
              formErrors.find((item) => item.field === 'lastName')
                ? 'error'
                : 'success'
            }
            help={formErrors.find((item) => item.field === 'lastName')?.message}
            name="lastName"
            label="Фамилия"
            rules={[
              {
                required: true,
                message: 'Введите  фамилию автора',
                type: 'string',
              },
            ]}
          >
            <Input size="large" placeholder="Введите  фамилию автора" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="shortDescription"
            label="Краткое описание"
            rules={[
              {
                required: true,
                message: 'Заполните поле краткое описание',
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Заполните описание" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="description"
            label="Описание"
            rules={[
              {
                required: true,
                message: 'Заполните поле описание',
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Заполните описание" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="removeAvatar" valuePropName="checked">
            <Checkbox>Показывать аватар</Checkbox>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={isSaving}
          >
            Сохранить
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
export default AuthorsForm
