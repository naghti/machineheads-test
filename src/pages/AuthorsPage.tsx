import React, { FC, useEffect, useState } from 'react'
import { Button, Space, Typography, notification } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import AuthorsList from '../components/AuthorList'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import AppFormDrawer from '../components/AppFormDrawer'
import AuthorsForm from '../components/AuthorsForm'
import { FormError, ResponseError } from '../models/IError'
import { AuthorsActions } from '../redux/authors/authorsActions'
import { AuthorDetails } from '../models/IAuthor'
import ErrorBoundary from '../components/ErrorBoundary'

const { Title } = Typography

interface AuthorsPageProps {}

const AuthorsPage: FC<AuthorsPageProps> = ({}) => {
  const dispatch = useAppDispatch()

  const {
    authors: authorsList,
    responseErrors,
    successMessage,
    isMultiDeteting,
    deletingAuthorId,
  } = useAppSelector((state) => state.authors)

  const [open, setOpen] = useState(false)
  const [isNew, setIsNew] = useState(false)

  const [multiplyDelList, setMultiplyDelList] = useState<number[]>([])

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

  function openEditor(authorId: number) {
    dispatch(AuthorsActions.getAuthorDetails(authorId))
    setOpen(true)
  }

  function delItem(authorId: number) {
    dispatch(AuthorsActions.deleteAuthor(authorId))
  }

  function changeMultipleDelList(checked: boolean, tagId: number) {
    if (checked) setMultiplyDelList([...multiplyDelList, tagId])
    else {
      setMultiplyDelList(multiplyDelList.filter((item) => item !== tagId))
    }
  }

  function deleteMarkedItems() {
    dispatch(AuthorsActions.multipleDeleteAuthors(multiplyDelList))
  }

  function openEmptyEditor() {
    setOpen(true)
    setIsNew(true)
  }

  function closeEditor() {
    dispatch(AuthorsActions.setResponseError({} as ResponseError))
    dispatch(AuthorsActions.setSuccessMessage(''))
    dispatch(AuthorsActions.setFormErrors([] as FormError[]))
    dispatch(AuthorsActions.setCurrentAuthorDetails({} as AuthorDetails))
    setIsNew(false)
    setOpen(false)
  }

  return (
    <ErrorBoundary>
      {contextHolder}
      <Title>Авторы Постов</Title>

      <Space direction="vertical" size="large" className='w-full'>
        <Space size={'large'}>
          <Button size="large" type="primary" onClick={openEmptyEditor}>
            <PlusOutlined />
            Добавить нового автора
          </Button>
          <Button
            size="large"
            type="primary"
            onClick={deleteMarkedItems}
            loading={isMultiDeteting}
          >
            <DeleteOutlined />
            Удалить выбранных авторов
          </Button>
        </Space>

        <AuthorsList
          authorsList={authorsList}
          openEditor={openEditor}
          delItem={delItem}
          changeMultipleDelList={changeMultipleDelList}
          deletingAuthorId={deletingAuthorId}
        />
      </Space>

      <AppFormDrawer
        title={
          isNew
            ? 'Добавление нового автора'
            : 'Редактирование информации об авторе'
        }
        isEditorOpen={open}
        close={closeEditor}
      >
        <AuthorsForm isNew={isNew} />
      </AppFormDrawer>
    </ErrorBoundary>
  )
}
export default AuthorsPage
