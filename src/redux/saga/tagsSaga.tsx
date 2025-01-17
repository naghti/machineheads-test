import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { RootState, actionWithPayload } from '../store'
import axios, { AxiosResponse } from 'axios'
import { TagsService } from '../../https/TagsService'
import { EditTag, NewTag, Tag } from '../../models/ITag'
import { TagsActions } from '../tags/tagsActions'
import { LOCATION_CHANGE } from 'connected-react-router'
import { tagsConstants } from '../tags/tagsConstants'
import { FormError, ResponseError } from '../../models/IError'

function* getAllTags() {
  try {
    const tagsListResponse: AxiosResponse<Tag[]> = yield call(
      TagsService.getAllTags
    )
    yield put(TagsActions.setTags(tagsListResponse.data))
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        TagsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
}

function* getTags() {
  const pathname: string = yield select(
    (state: RootState) => state.router.location.pathname
  )
  const tags: Tag[] = yield select((state: RootState) => state.tags.tags)

  if (pathname === '/tags' && tags.length === 0) {
    yield getAllTags()
  }
}

function* getTagDetails({ payload }: actionWithPayload<number>) {
  yield put(TagsActions.setCurrentTagDetails({} as Tag))
  try {
    const tagDetailResponse: AxiosResponse<Tag> = yield call(
      TagsService.getCurrentTagDetail,
      payload
    )
    yield put(TagsActions.setCurrentTagDetails(tagDetailResponse.data))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404)
        yield put(
          TagsActions.setResponseError(error.response.data as ResponseError)
        )
    } else if (error instanceof Error) {
      yield put(
        TagsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
}

function* AddNewTag(action: actionWithPayload<NewTag>) {
  try {
    yield put(TagsActions.setIsSavingTag(true))

    yield call(TagsService.saveNewTag, action.payload)

    yield put(TagsActions.setSuccessMessage('Элемент добавлен.'))

    yield getAllTags()

    yield put(TagsActions.setIsSavingTag(false))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400)
        yield put(
          TagsActions.setResponseError(error.response.data as ResponseError)
        )
      if (error.response?.status === 422)
        yield put(TagsActions.setFormErrors(error.response.data as FormError[]))
    } else if (error instanceof Error) {
      yield put(
        TagsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
  yield put(TagsActions.setIsSavingTag(false))
}

function* updateTag(action: actionWithPayload<EditTag>) {
  try {
    yield put(TagsActions.setIsSavingTag(true))

    yield call(TagsService.editTag, action.payload)

    yield put(TagsActions.setSuccessMessage('Элемент обновлён.'))

    yield getAllTags()

    yield put(TagsActions.setIsSavingTag(false))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 || error.response?.status === 404)
        yield put(
          TagsActions.setResponseError(error.response.data as ResponseError)
        )
      if (error.response?.status === 422)
        yield put(TagsActions.setFormErrors(error.response.data as FormError[]))
    } else if (error instanceof Error) {
      yield put(
        TagsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  } finally {
    yield put(TagsActions.setIsSavingTag(false))
  }
}

function* delTag(action: actionWithPayload<number>) {
  try {
    yield put(TagsActions.setIsDeletingTag(action.payload))

    yield call(TagsService.removeTag, action.payload)

    yield put(TagsActions.setSuccessMessage('Элемент удалён.'))

    yield getAllTags()

    yield put(TagsActions.setIsDeletingTag(0))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 || error.response?.status === 404)
        yield put(
          TagsActions.setResponseError(error.response.data as ResponseError)
        )
    } else if (error instanceof Error) {
      yield put(
        TagsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  } finally {
    yield put(TagsActions.setIsDeletingTag(0))
  }
}

function* delMarkedTags(action: actionWithPayload<number[]>) {
  try {
    yield put(TagsActions.setIsMultiDeletingTag(true))

    yield call(TagsService.multipleRemoveTags, action.payload)

    yield put(TagsActions.setSuccessMessage('Элементы удалёны.'))

    yield getAllTags()

    yield put(TagsActions.setIsMultiDeletingTag(false))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 || error.response?.status === 404)
        yield put(
          TagsActions.setResponseError(error.response.data as ResponseError)
        )
    } else if (error instanceof Error) {
      yield put(
        TagsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  } finally {
    yield put(TagsActions.setIsMultiDeletingTag(false))
  }
}

export function* tagsWather() {
  yield takeLatest(LOCATION_CHANGE, getTags)
  yield takeEvery(tagsConstants.GET_TAG_DETAILS, getTagDetails)
  yield takeEvery(tagsConstants.ADD_TAG, AddNewTag)
  yield takeEvery(tagsConstants.EDIT_TAG, updateTag)
  yield takeEvery(tagsConstants.DEL_TAG, delTag)
  yield takeEvery(tagsConstants.MULTIPLE_TAGS_DEL, delMarkedTags)
  yield takeEvery(tagsConstants.GET_TAGS, getAllTags)
}
