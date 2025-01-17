import { LOCATION_CHANGE } from 'connected-react-router'
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { RootState, actionWithPayload } from '../store'
import axios, { AxiosResponse } from 'axios'
import { AuthorsService } from '../../https/AuthorsService'
import {
  Author,
  AuthorDetails,
  EditAuthor,
  NewAuthor,
  NewAuthorFromForm,
} from '../../models/IAuthor'
import { AuthorsActions } from '../authors/authorsActions'
import { FormError, ResponseError } from '../../models/IError'
import { AuthorsConstants } from '../authors/authorsConstants'

function* getAllAuthors() {
  try {
    const authors: AxiosResponse<Author[]> = yield call(
      AuthorsService.getAllAuthors
    )
    yield put(AuthorsActions.setAuthors(authors.data))
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        AuthorsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
}

function* getAuthors() {
  const pathname: string = yield select(
    (state: RootState) => state.router.location.pathname
  )
  const authors: Author[] = yield select(
    (state: RootState) => state.authors.authors
  )

  if (pathname === '/authors' && authors.length === 0) {
    yield getAllAuthors()
  }
}

function* getAuthorDetails({ payload }: actionWithPayload<number>) {
  yield put(AuthorsActions.setCurrentAuthorDetails({} as AuthorDetails))
  try {
    const authorDetailResponse: AxiosResponse<AuthorDetails> = yield call(
      AuthorsService.getAuthorsDetail,
      payload
    )
    yield put(AuthorsActions.setCurrentAuthorDetails(authorDetailResponse.data))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404)
        yield put(
          AuthorsActions.setResponseError(error.response.data as ResponseError)
        )
    } else if (error instanceof Error) {
      yield put(
        AuthorsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
}

function* addNewAuthor({ payload }: actionWithPayload<NewAuthorFromForm>) {
  const data: NewAuthor = {
    ...payload,
    avatar: payload.avatar && payload.avatar[0].originFileObj,
  }
  try {
    yield put(AuthorsActions.setIsSavingAuthor(true))

    yield call(AuthorsService.addAuthor, data)

    yield put(AuthorsActions.setSuccessMessage('Элемент добавлен.'))

    yield getAllAuthors()

    yield put(AuthorsActions.setIsSavingAuthor(false))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400)
        yield put(
          AuthorsActions.setResponseError(error.response.data as ResponseError)
        )
      if (error.response?.status === 422)
        yield put(
          AuthorsActions.setFormErrors(error.response.data as FormError[])
        )
    } else if (error instanceof Error) {
      yield put(
        AuthorsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  } finally {
    yield put(AuthorsActions.setIsSavingAuthor(false))
  }
}

function* updateAuthor({
  payload,
}: actionWithPayload<NewAuthorFromForm & { id: number }>) {
  const data: EditAuthor = {
    ...payload,
    avatar: payload.avatar && payload.avatar[0].originFileObj,
  }
  try {
    yield put(AuthorsActions.setIsSavingAuthor(true))

    yield call(AuthorsService.editAuthor, data)

    yield put(AuthorsActions.setSuccessMessage('Элемент обновлён.'))

    yield getAllAuthors()

    yield put(AuthorsActions.setIsSavingAuthor(false))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 || error.response?.status === 404)
        yield put(
          AuthorsActions.setResponseError(error.response.data as ResponseError)
        )
      if (error.response?.status === 422)
        yield put(
          AuthorsActions.setFormErrors(error.response.data as FormError[])
        )
    } else if (error instanceof Error) {
      yield put(
        AuthorsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  } finally {
    yield put(AuthorsActions.setIsSavingAuthor(false))
  }
}

function* delAuthor(action: actionWithPayload<number>) {
  try {
    yield put(AuthorsActions.setIsDeletingAuthor(action.payload))

    yield call(AuthorsService.removeAuthor, action.payload)

    yield put(AuthorsActions.setSuccessMessage('Элемент удалён.'))

    yield getAllAuthors()

    yield put(AuthorsActions.setIsDeletingAuthor(0))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 || error.response?.status === 404)
        yield put(
          AuthorsActions.setResponseError(error.response.data as ResponseError)
        )
    } else if (error instanceof Error) {
      yield put(
        AuthorsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  } finally {
    yield put(AuthorsActions.setIsDeletingAuthor(0))
  }
}

function* delMarkedAuthors(action: actionWithPayload<number[]>) {
  try {
    yield put(AuthorsActions.setIsMultiDeletingAuthor(true))

    yield call(AuthorsService.multipleremoveAuthors, action.payload)

    yield put(AuthorsActions.setSuccessMessage('Элементы удалёны.'))

    yield getAllAuthors()

    yield put(AuthorsActions.setIsMultiDeletingAuthor(false))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 || error.response?.status === 404)
        yield put(
          AuthorsActions.setResponseError(error.response.data as ResponseError)
        )
    } else if (error instanceof Error) {
      yield put(
        AuthorsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  } finally {
    yield put(AuthorsActions.setIsMultiDeletingAuthor(false))
  }
}

export function* authorsWather() {
  yield takeLatest(LOCATION_CHANGE, getAuthors)
  yield takeEvery(AuthorsConstants.GET_AUTHOR_DETAILS, getAuthorDetails)
  yield takeEvery(AuthorsConstants.ADD_AUTHOR, addNewAuthor)
  yield takeEvery(AuthorsConstants.EDIT_AUTHOR, updateAuthor)
  yield takeEvery(AuthorsConstants.DEL_AUTHOR, delAuthor)
  yield takeEvery(AuthorsConstants.MULTIPLE_DEL_AUTHORS, delMarkedAuthors)
  yield takeEvery(AuthorsConstants.GET_AUTHORS, getAllAuthors)
}
