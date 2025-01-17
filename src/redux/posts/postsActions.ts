import { InferActionsType } from '../store'
import {
  EditPost,
  NewPost,
  NewPostFromForm,
  Post,
  PostDetails,
} from '../../models/IPost'
import { PostsConstants } from './postsConstants'
import { FormError, ResponseError } from '../../models/IError'

export type AppPostActions = InferActionsType<typeof postsActions>

export const postsActions = {
  setPosts: (posts: Post[]) =>
    ({
      type: PostsConstants.SET_POSTS,
      payload: posts,
    } as const),

  setIsPostsFetching: (flag: boolean) =>
    ({
      type: PostsConstants.SET_IS_POSTS_FETCHING,
      payload: flag,
    } as const),

  setCurrentPostDetail: (currentPost: PostDetails) =>
    ({
      type: PostsConstants.SET_CURRENT_POST,
      payload: currentPost,
    } as const),

  getPostDetail: (postId: number) =>
    ({
      type: PostsConstants.GET_POST_DETAILS,
      payload: postId,
    } as const),

  addPost: (newPost: NewPostFromForm) =>
    ({
      type: PostsConstants.ADD_POST,
      payload: newPost,
    } as const),

  editPost: (editPost: NewPostFromForm & { id: number }) =>
    ({
      type: PostsConstants.EDIT_POST,
      payload: editPost,
    } as const),

  deletePost: (postId: number) =>
    ({
      type: PostsConstants.DEL_POST,
      payload: postId,
    } as const),

  setSuccessMessage: (message: string) =>
    ({
      type: PostsConstants.SET_SUCCESS_MESSAGE,
      payload: message,
    } as const),

  setResponseError: (responseError: ResponseError) =>
    ({
      type: PostsConstants.SET_RESPONSE_ERROR,
      payload: responseError,
    } as const),

  setFormErrors: (formErrors: FormError[]) =>
    ({
      type: PostsConstants.SET_FORM_ERROR,
      payload: formErrors,
    } as const),

  setIsDeletingPost: (postId: number) =>
    ({
      type: PostsConstants.SET_IS_DELETING_POST,
      payload: postId,
    } as const),

  setIsSavingPost: (flag: boolean) =>
    ({
      type: PostsConstants.SET_IS_SAVING_POST,
      payload: flag,
    } as const),
}
