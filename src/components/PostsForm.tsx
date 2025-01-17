import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Upload,
  Image,
  UploadFile,
  Select,
  Space,
  Layout,
} from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { NewPost, NewPostFromForm, PostTag } from '../models/IPost'
import { postsActions } from '../redux/posts/postsActions'
import { TagsActions } from '../redux/tags/tagsActions'
import { AuthorsActions } from '../redux/authors/authorsActions'

const { Dragger } = Upload
const { Option } = Select

interface AuthorsFormProps {
  isNew: boolean
}

function PostsForm ({ isNew }: AuthorsFormProps) {
  const dispatch = useAppDispatch()

  const {
    currentPost: post,
    formErrors,
    isSaving,
  } = useAppSelector((state) => state.posts)
  const allTags = useAppSelector((state) => state.tags.tags)
  const allAuthors = useAppSelector((state) => state.authors.authors)

  useEffect(() => {
    if (allTags.length === 0) {
      dispatch(TagsActions.getTags())
    }
    if (allAuthors.length === 0) {
      dispatch(AuthorsActions.getAuthors())
    }
  }, [dispatch])

  const onFinish = (values: NewPostFromForm) => {
    isNew
      ? dispatch(postsActions.addPost(values))
      : dispatch(
          postsActions.editPost({
            ...values,
            id: post.id,
          })
        )
  }

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  return (
    <Form
      disabled={isSaving}
      layout="vertical"
      onFinish={onFinish}
      fields={[
        { name: ['title'], value: post.title },
        { name: ['code'], value: post.code },
        { name: ['text'], value: post.text },
        { name: ['authorId'], value: post.author?.fullName },
        { name: ['tagIds'], value: post.tags?.map((item) => item.name) },
      ]}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="previewPicture"
            label="Изображение"
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
          {post.previewPicture && (
            <Image
              width={200}
              height={200}
              src="error"
              fallback={post.previewPicture?.url}
              about="Первоначальное фото"
            />
          )}
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            validateStatus={
              formErrors.find((item) => item.field === 'title')
                ? 'error'
                : 'success'
            }
            help={formErrors.find((item) => item.field === 'title')?.message}
            name="title"
            label="Заголовок поста"
            rules={[
              {
                required: true,
                message: 'Введите Заголовок поста',
              },
            ]}
          >
            <Input size="large" placeholder="Введите Заголовок поста " />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            validateStatus={
              formErrors.find((item) => item.field === 'code')
                ? 'error'
                : 'success'
            }
            help={formErrors.find((item) => item.field === 'code')?.message}
            name="code"
            label="Код поста"
            rules={[
              {
                required: true,
                message: 'Введите  код поста',
                type: 'string',
              },
            ]}
          >
            <Input size="large" placeholder="Введите  код поста" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="text"
            label="Текст поста"
            rules={[
              {
                required: true,
                message: 'Заполните текст поста',
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Заполните текст поста" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            validateStatus={
              formErrors.find((item) => item.field === 'authorId')
                ? 'error'
                : 'success'
            }
            help={formErrors.find((item) => item.field === 'authorId')?.message}
            name="authorId"
            label="Автор поста"
            rules={[{ required: true, message: 'Please choose the approver' }]}
          >
            <Select
              allowClear
              // onDropdownVisibleChange={getAllAuthors}
              placeholder="Выберите автора поста"
            >
              {allAuthors.map((item, index) => (
                <Option
                  key={index}
                  value={`${item.lastName} ${item.name} ${item.secondName}`}
                >
                  {item.lastName} {item.name} {item.secondName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            validateStatus={
              formErrors.find((item) => item.field === 'tagIds')
                ? 'error'
                : 'success'
            }
            help={formErrors.find((item) => item.field === 'tagIds')?.message}
            name="tagIds"
            label="Теги поста"
            rules={[
              {
                required: true,
                message: 'Заполните текст поста',
              },
            ]}
          >
            <Select
              mode="tags"
              placeholder="Tags Mode"
              options={allTags.map((item) => ({
                value: item.name,
                lable: item.id,
              }))}
            />
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
export default PostsForm
