import { combineReducers } from 'redux'
import { createBrowserHistory } from 'history'
import { connectRouter } from 'connected-react-router'
import { authReducer } from './auth/authReducer'
import { postsReducer } from './posts/postsReducer'
import { authorsReducer } from './authors/authorsReducer'
import { tagsReducer } from './tags/tagsReducer'

export const history = createBrowserHistory()

export const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  authors: authorsReducer,
  tags: tagsReducer,
  router: connectRouter(history),
})
