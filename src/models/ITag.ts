export interface Tag {
  id: number
  name: string
  code: string
  sort: number
  updatedAt: Date
  createdAt: Date
}

export type EditTag = Pick<Tag, 'name' | 'code' | 'sort' | 'id'>
export type NewTag = Omit<EditTag, 'id'>
