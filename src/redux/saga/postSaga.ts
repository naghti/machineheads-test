import { LOCATION_CHANGE, RouterLocation } from 'connected-react-router'
import { select, takeLatest, call, put, takeEvery } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import {
  EditPost,
  NewPost,
  NewPostFromForm,
  Post,
  PostDetails,
} from '../../models/IPost'
import { FormError, ResponseError } from '../../models/IError'
import { RootState, actionWithPayload } from '../store'
import { PostsConstants } from '../../redux/posts/postsConstants'
import { postsActions } from '../../redux/posts/postsActions'
import { postsService } from '../../https/postsService'
import { getAuthorIdByName, getTagIdsByName } from '../../utils/postUtils'
import { Author } from '../../models/IAuthor'
import { Tag } from '../../models/ITag'

function* getAllPosts() {
  try {
    const postList: AxiosResponse<Post[]> = yield call(postsService.getPosts)
    yield put(postsActions.setPosts(postList.data))
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        postsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
}


function* getPosts() {
  const pathname: string = yield select(
    (state: RootState) => state.router.location.pathname
  )
  const posts: Post[] = yield select((state: RootState) => state.posts.posts)

  if (pathname === '/posts' && posts.length === 0) {
    yield getAllPosts()
  }
}

function* getPostDetail({ payload }: actionWithPayload<number>) {
  try {
    const postDetails: AxiosResponse<PostDetails> = yield call(
      postsService.getPostDetail,
      payload
    )
    yield put(postsActions.setCurrentPostDetail(postDetails.data))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400)
        yield put(
          postsActions.setResponseError(error.response.data as ResponseError)
        )
      if (error.response?.status === 422)
        yield put(
          postsActions.setFormErrors(error.response.data as FormError[])
        )
    } else if (error instanceof Error) {
      yield put(
        postsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  }
}

function* addNewPost({ payload }: actionWithPayload<NewPostFromForm>) {
  const allAuthors: Author[] = yield select(
    (state: RootState) => state.authors.authors
  )

  const allTags: Tag[] = yield select((state: RootState) => state.tags.tags)

  const data: NewPost = {
    ...payload,
    authorId: getAuthorIdByName(payload.authorId, allAuthors),
    tagIds: getTagIdsByName(payload.tagIds, allTags),
    previewPicture:
      payload.previewPicture && payload.previewPicture[0].originFileObj,
  }
  try {
    yield put(postsActions.setIsSavingPost(true))

    yield postsActions.setFormErrors({} as FormError[])

    yield call(postsService.addPost, data)

    yield put(postsActions.setSuccessMessage('Элемент добавлен.'))

    yield getAllPosts()

    yield put(postsActions.setIsSavingPost(false))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400)
        yield put(
          postsActions.setResponseError(error.response.data as ResponseError)
        )
      if (error.response?.status === 422)
        yield put(
          postsActions.setFormErrors(error.response.data as FormError[])
        )
    } else if (error instanceof Error) {
      yield put(
        postsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  } finally {
    yield put(postsActions.setIsSavingPost(false))
  }
}

function* updatePost({
  payload,
}: actionWithPayload<NewPostFromForm & { id: number }>) {
  const allAuthors: Author[] = yield select(
    (state: RootState) => state.authors.authors
  )
  const allTags: Tag[] = yield select((state: RootState) => state.tags.tags)

  const data: EditPost = {
    ...payload,
    authorId: getAuthorIdByName(payload.authorId, allAuthors),
    tagIds: getTagIdsByName(payload.tagIds, allTags),
    previewPicture:
      payload.previewPicture && payload.previewPicture[0].originFileObj,
  }

  try {
    yield put(postsActions.setIsSavingPost(true))

    yield postsActions.setFormErrors({} as FormError[])

    yield call(postsService.editPost, data)

    yield put(postsActions.setSuccessMessage('Элемент обновлён.'))

    yield getAllPosts()

    yield put(postsActions.setIsSavingPost(false))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 || error.response?.status === 404)
        yield put(
          postsActions.setResponseError(error.response.data as ResponseError)
        )
      if (error.response?.status === 422)
        yield put(
          postsActions.setFormErrors(error.response.data as FormError[])
        )
    } else if (error instanceof Error) {
      yield put(
        postsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  } finally {
    yield put(postsActions.setIsSavingPost(false))
  }
}

function* delPost({ payload }: actionWithPayload<number>) {
  try {
    yield put(postsActions.setIsDeletingPost(payload))

    yield call(postsService.removePost, payload)

    yield put(postsActions.setSuccessMessage('Элемент удалён.'))

    yield getAllPosts()

    yield put(postsActions.setIsDeletingPost(0))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 || error.response?.status === 404)
        yield put(
          postsActions.setResponseError(error.response.data as ResponseError)
        )
    } else if (error instanceof Error) {
      yield put(
        postsActions.setResponseError({
          name: error.name,
          code: 0,
          message: 'Неизвестная ошибка',
          type: error.message,
        } as ResponseError)
      )
    }
  } finally {
    yield put(postsActions.setIsDeletingPost(0))
  }
}

export function* postWather() {
  yield takeLatest(LOCATION_CHANGE, getPosts)
  yield takeEvery(PostsConstants.GET_POST_DETAILS, getPostDetail)
  yield takeEvery(PostsConstants.ADD_POST, addNewPost)
  yield takeEvery(PostsConstants.EDIT_POST, updatePost)
  yield takeEvery(PostsConstants.DEL_POST, delPost)
}
