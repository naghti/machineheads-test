import { FC, useEffect, useState } from 'react'
import { Typography, Space, Button, notification } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import TagsList from '../components/TagsList'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import AppFormDrawer from '../components/AppFormDrawer'
import { TagsActions } from '../redux/tags/tagsActions'
import TagsForm from '../components/TagsForm'
import { Tag } from '../models/ITag'
import { FormError, ResponseError } from '../models/IError'
import ErrorBoundary from '../components/ErrorBoundary'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

const { Title } = Typography
interface TagsPageProps {}

const TagsPage: FC<TagsPageProps> = ({}) => {
  const dispatch = useAppDispatch()

  const {
    tags: tagsList,
    responseErrors,
    successMessage,
    isMultiDeteting,
    deletingTagId,
  } = useAppSelector((state) => state.tags)

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

  function openEditor(tagId: number) {
    dispatch(TagsActions.getTagDetails(tagId))
    setOpen(true)
  }

  function delItem(tagId: number) {
    dispatch(TagsActions.deleteTag(tagId))
  }

  function changeMultipleDelList(checked: boolean, tagId: number) {
    console.log(checked)
    if (checked) setMultiplyDelList([...multiplyDelList, tagId])
    else {
      setMultiplyDelList(multiplyDelList.filter((item) => item !== tagId))
    }
  }

  function deleteMarkedItems() {
    console.log(multiplyDelList)
    dispatch(TagsActions.multipleDeleteTags(multiplyDelList))
  }

  function openEmptyEditor() {
    setOpen(true)
    setIsNew(true)
  }

  function closeEditor() {
    dispatch(TagsActions.setResponseError({} as ResponseError))
    dispatch(TagsActions.setSuccessMessage(''))
    dispatch(TagsActions.setFormErrors([] as FormError[]))
    dispatch(TagsActions.setCurrentTagDetails({} as Tag))
    setIsNew(false)
    setOpen(false)
  }

  return (
    <ErrorBoundary>
      {contextHolder}

      <Title>Теги</Title>

      <Space direction="vertical" size="large" className='w-full'>
        <Space size={'large'}>
          <Button size="large" type="primary" onClick={openEmptyEditor}>
            <PlusOutlined />
            Добавить новый тег
          </Button>
          <Button
            size="large"
            type="primary"
            onClick={deleteMarkedItems}
            loading={isMultiDeteting}
          >
            <DeleteOutlined />
            Удалить выбранные теги
          </Button>
        </Space>

        <TagsList
          tagsList={tagsList}
          openEditor={openEditor}
          delItem={delItem}
          changeMultipleDelList={changeMultipleDelList}
          deletingTagId={deletingTagId}
        />
      </Space>

      <AppFormDrawer
        title={isNew ? 'Добавление нового тега' : 'Редактирование тега'}
        isEditorOpen={open}
        close={closeEditor}
      >
        <TagsForm isNew={isNew} />
      </AppFormDrawer>
    </ErrorBoundary>
  )
}
export default TagsPage
