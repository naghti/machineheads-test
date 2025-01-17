import axios, { AxiosError, AxiosResponse } from 'axios'
import { Author, AuthorDetails, EditAuthor, NewAuthor } from '../models/IAuthor'
import api from './config'

export class AuthorsService {
  static async getAllAuthors(): Promise<AxiosResponse<Author[]> | Error> {
    try {
      return await api.get<Author[]>('/manage/authors')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError
      }
      throw error
    }
  }

  static async getAuthorsDetail(authorId: number) {
    try {
      return await api.get<AuthorDetails>('/manage/authors/detail', {
        params: { id: authorId },
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError
      }
      throw error
    }
  }

  static async addAuthor(newAuthor: NewAuthor) {
    try {
      return await api.post('/manage/authors/add', newAuthor, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError
      }
      throw error
    }
  }

  static async editAuthor(currentAuthor: EditAuthor) {
    const {
      avatar,
      description,
      shortDescription,
      name,
      lastName,
      secondName,
      id,
    } = currentAuthor
    try {
      return await api.post(
        '/manage/authors/edit',
        { avatar, description, shortDescription, name, lastName, secondName },
        {
          params: { id },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError
      }
      throw error
    }
  }

  static async removeAuthor(authorId: number) {
    try {
      return await api.delete('/manage/authors/remove', {
        params: { id: authorId },
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError
      }
      throw error
    }
  }

  static async multipleremoveAuthors(ids: number[]) {
    try {
      return await api.delete('/manage/authors/multiple-remove', {
        params: { id: ids },
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError
      }
      throw error
    }
  }
}
