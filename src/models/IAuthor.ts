import { UploadFile } from 'antd'
import { Avatar } from './IAvatar'

export interface Author {
  id: number
  name: string
  lastName: string
  secondName: string
  avatar: Avatar
  updatedAt: Date
  createdAt: Date
}

export interface AuthorDetails extends Author {
  shortDescription: string
  description: string
}

export type EditAuthor = {
  avatar: File | undefined
  removeAvatar: number
} & Omit<AuthorDetails, 'updatedAt' | 'createdAt' | 'avatar'>

export type NewAuthor = Omit<EditAuthor, 'id'>

export type NewAuthorFromForm = {
  avatar: UploadFile[] | undefined
} & Omit<NewAuthor, 'avatar'>
