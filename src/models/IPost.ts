import { UploadFile } from 'antd'
import { Author } from './IAuthor'
import { Avatar } from './IAvatar'
import { Tag } from './ITag'

interface PostBasic {
  id: number
  title: string
  code: string
  previewPicture: PreviewPicture
  updatedAt: Date
  createdAt: Date
}

export interface Post extends PostBasic {
  authorName: string
  tagNames: string[]
}

export interface PostDetails extends PostBasic {
  text: string
  author: PostAuthor
  tags: PostTag[]
}

export interface PreviewPicture extends Avatar {}
type PostAuthor = { fullName: string } & Pick<Author, 'id' | 'avatar'>
export type PostTag = Pick<Tag, 'id' | 'name' | 'code'>

export type EditPost = {
  authorId: number
  tagIds: number[]
  previewPicture: File | undefined
} & Pick<PostDetails, 'code' | 'title' | 'text' | 'id'>

export type NewPost = Omit<EditPost, 'id'>
export type NewPostFromForm = {
  tagIds: string[]
  authorId: string
  previewPicture: UploadFile[] | undefined
} & Omit<NewPost, 'tagIds' | 'authorId' | 'previewPicture'>
