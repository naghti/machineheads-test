import { FormError, ResponseError } from '../../models/IError'
import { Post, PostDetails } from '../../models/IPost'
import { AppPostActions } from './postsActions'
import { PostsConstants } from './postsConstants'


const initialState = {
  posts: [] as Post[],
  currentPost: {} as PostDetails,
  responseErrors: {} as ResponseError,
  formErrors: [] as FormError[],
  isDataFetching: false,
  successMessage: '',
  deletingPostId: 0,
  isSaving: false,
}

type PostsState = typeof initialState

export const postsReducer = (
  state = initialState,
  action: AppPostActions
): PostsState => {
  switch (action.type) {
    case PostsConstants.SET_POSTS:
      return { ...state, posts: action.payload }

    case PostsConstants.SET_CURRENT_POST:
      return { ...state, currentPost: action.payload }

    case PostsConstants.SET_SUCCESS_MESSAGE:
      return { ...state, successMessage: action.payload }

    case PostsConstants.SET_RESPONSE_ERROR:
      return { ...state, responseErrors: action.payload }

    case PostsConstants.SET_FORM_ERROR:
      return { ...state, formErrors: action.payload }

    case PostsConstants.SET_IS_DELETING_POST:
      return { ...state, deletingPostId: action.payload }

    case PostsConstants.SET_IS_SAVING_POST:
      return { ...state, isSaving: action.payload }
    default:
      return state
  }
}
