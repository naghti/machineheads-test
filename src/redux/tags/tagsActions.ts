import { FormError, ResponseError } from '../../models/IError'
import { EditTag, NewTag, Tag } from '../../models/ITag'
import { InferActionsType } from '../store'
import { tagsConstants } from './tagsConstants'

export type AppTagsAction = InferActionsType<typeof TagsActions>

export const TagsActions = {
  setTags: (tags: Tag[]) =>
    ({
      type: tagsConstants.SET_TAGS,
      payload: tags,
    } as const),
  getTags: () =>
    ({
      type: tagsConstants.GET_TAGS,
    } as const),

  getTagDetails: (tagId: number) =>
    ({
      type: tagsConstants.GET_TAG_DETAILS,
      payload: tagId,
    } as const),

  setCurrentTagDetails: (currentTag: Tag) =>
    ({
      type: tagsConstants.SET_CURRENT_TAG,
      payload: currentTag,
    } as const),

  addTag: (newTag: NewTag) =>
    ({
      type: tagsConstants.ADD_TAG,
      payload: newTag,
    } as const),

  editTag: (editTag: EditTag) =>
    ({
      type: tagsConstants.EDIT_TAG,
      payload: editTag,
    } as const),

  deleteTag: (tagId: number) =>
    ({
      type: tagsConstants.DEL_TAG,
      payload: tagId,
    } as const),

  multipleDeleteTags: (tagIds: number[]) =>
    ({
      type: tagsConstants.MULTIPLE_TAGS_DEL,
      payload: tagIds,
    } as const),

  setSuccessMessage: (message: string) =>
    ({
      type: tagsConstants.SET_SUCCESS_MESSAGE,
      payload: message,
    } as const),

  setResponseError: (responseError: ResponseError) =>
    ({
      type: tagsConstants.SET_RESPONSE_ERROR,
      payload: responseError,
    } as const),

  setFormErrors: (formErrors: FormError[]) =>
    ({
      type: tagsConstants.SET_FORM_ERROR,
      payload: formErrors,
    } as const),

  setIsDeletingTag: (tagId: number) =>
    ({
      type: tagsConstants.SET_IS_DELETING_TAG,
      payload: tagId,
    } as const),

  setIsMultiDeletingTag: (flag: boolean) =>
    ({
      type: tagsConstants.SET_IS_MULTI_DELETING_TAG,
      payload: flag,
    } as const),

  setIsSavingTag: (flag: boolean) =>
    ({
      type: tagsConstants.SET_IS_SAVING_TAG,
      payload: flag,
    } as const),
}
