import { Author } from '../models/IAuthor'
import { Tag } from '../models/ITag'

export function getTagIdsByName(tagsValues: string[], allTags: Tag[]) {
  return tagsValues.map(
    (item) => allTags.find((fItem) => item === fItem.name)?.id || 0
  )
}
export function getAuthorIdByName(authorName: string, allAuthors: Author[]) {
  return (
    allAuthors.find(
      (item) =>
        `${item.lastName} ${item.name} ${item.secondName}` === authorName
    )?.id || 0
  )
}
