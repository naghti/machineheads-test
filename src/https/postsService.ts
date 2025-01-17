import axios, { AxiosError } from 'axios'
import { EditPost, NewPost, PostDetails } from '../models/IPost'
import api from './config'

export class postsService {
  static async getPosts() {
    try {
      return await api.get('/manage/posts')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError
      }
      throw error
    }
  }

  static async getPostDetail(postId: number) {
    try {
      return await api.get<PostDetails>('/manage/posts/detail', {
        params: { id: postId },
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError
      }
      throw error
    }
  }

  static async addPost(newPost: NewPost) {
    try {
      return await api.post('/manage/posts/add', newPost, {
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

  static async editPost(currentPost: EditPost) {
    const { id, authorId, code, tagIds, text, title, previewPicture } =
      currentPost
    try {
      return await api.post(
        '/manage/posts/edit',
        { authorId, code, tagIds, text, title, previewPicture },
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

  static async removePost(postId: number) {
    try {
      return await api.delete('/manage/posts/remove', {
        params: { id: postId },
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError
      }
      throw error
    }
  }
}
