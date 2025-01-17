import { Button, Space, Typography, notification } from 'antd'
import PostsList from '../components/PostsList'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { PostDetails } from '../models/IPost'
import { PlusOutlined } from '@ant-design/icons'
import AppFormDrawer from '../components/AppFormDrawer'
import { useEffect, useState } from 'react'
import { postsActions } from '../redux/posts/postsActions'
import ErrorBoundary from '../components/ErrorBoundary'
import { FormError, ResponseError } from '../models/IError'
import PostsForm from '../components/PostsForm'

const { Title } = Typography

export default function HomePage() {
  const dispatch = useAppDispatch()
  const { posts, responseErrors, successMessage, deletingPostId } =
    useAppSelector((state) => state.posts)

  const [open, setOpen] = useState(false)
  const [isNew, setIsNew] = useState(false)

  const [api, contextHolder] = notification.useNotification()

  useEffect(() => {
    successMessage &&
      api.success({
        message: successMessage,
      })
  }, [successMessage])

  useEffect(() => {
    responseErrors.name &&
      api.error({
        message: responseErrors.name,
        description: responseErrors.message,
      })
  }, [responseErrors])

  function openEditor(postId: number) {
    dispatch(postsActions.getPostDetail(postId))
    setOpen(true)
  }

  function delItem(postId: number) {
    dispatch(postsActions.deletePost(postId))
  }

  function openEmptyEditor() {
    setOpen(true)
    setIsNew(true)
  }

  function closeEditor() {
    dispatch(postsActions.setResponseError({} as ResponseError))
    dispatch(postsActions.setSuccessMessage(''))
    dispatch(postsActions.setFormErrors([] as FormError[]))
    dispatch(postsActions.setCurrentPostDetail({} as PostDetails))
    setIsNew(false)
    setOpen(false)
  }

  return (
    <ErrorBoundary>
      {contextHolder}

      <Title>Посты</Title>

      <Space direction="vertical" size="large" className='w-full'>
        <Button size="large" type="primary" onClick={openEmptyEditor}>
          <PlusOutlined />
          Добавить новый пост
        </Button>

        <PostsList
          posts={posts}
          openEditor={openEditor}
          delItem={delItem}
          deletingPostId={deletingPostId}
        />
      </Space>

      <AppFormDrawer
        title={isNew ? 'Добавление нового Поста' : 'Редактирование поста'}
        isEditorOpen={open}
        close={closeEditor}
      >
        <PostsForm isNew={isNew} />
      </AppFormDrawer>
    </ErrorBoundary>
  )
}
