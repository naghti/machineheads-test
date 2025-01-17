import { Button, Col, Form, Input, InputNumber, Row } from 'antd'
import { FC } from 'react'
import { NewTag } from '../models/ITag'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { TagsActions } from '../redux/tags/tagsActions'

interface TagsFormProps {
  // data: TagType
  isNew: boolean
}

const TagsForm: FC<TagsFormProps> = ({ isNew }) => {
  const { currentTag: tg, isSaving } = useAppSelector((state) => state.tags)
  const formErrors = useAppSelector((state) => state.tags.formErrors)

  const dispatch = useAppDispatch()

  const onFinish = (values: NewTag) => {
    values.sort ? values.sort : (values.sort = 0)
    isNew
      ? dispatch(TagsActions.addTag(values))
      : dispatch(TagsActions.editTag({ ...values, id: tg.id }))
    //console.log('Success:', values, new Date().toISOString())
  }

  return (
    <Form
      disabled={isSaving}
      layout="vertical"
      onFinish={onFinish}
      fields={[
        { name: ['name'], value: tg.name },
        { name: ['code'], value: tg.code },
        { name: ['sort'], value: tg.sort },
      ]}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            validateStatus={
              formErrors.find((item) => item.field === 'name')
                ? 'error'
                : 'success'
            }
            help={
              formErrors.find((item) => item.field === 'name') &&
              'Необходимо заполнить «Название».'
            }
            name="name"
            label="Заголовок Тега"
            rules={[
              {
                required: true,
                message: 'Введите заголовок Тега',
              },
            ]}
          >
            <Input size="large" placeholder="Введите заголовок " />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            validateStatus={
              formErrors.find((item) => item.field === 'code')
                ? 'error'
                : 'success'
            }
            help={
              formErrors.find((item) => item.field === 'code') &&
              'Необходимо заполнить «Символьный код».'
            }
            name="code"
            label="Код"
            rules={[
              { required: true, message: 'Введите  code тега', type: 'string' },
            ]}
          >
            <Input size="large" placeholder="Введите  code тега" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            validateStatus={
              formErrors.find((item) => item.field === 'sort')
                ? 'error'
                : 'success'
            }
            help={
              formErrors.find((item) => item.field === 'sort') &&
              'Необходимо заполнить «порядковый номер» корректно.'
            }
            name="sort"
            label="порядковый номер"
            rules={[
              {
                required: false,
                message: 'Введите номер',
                ///len: 10,
              },
            ]}
          >
            <InputNumber
              size="large"
              className='w-full'
              placeholder="Введите заголовок "
            />
          </Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={isSaving}
          >
            submit
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
export default TagsForm
