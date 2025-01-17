import { applyMiddleware, createStore } from 'redux'
import { rootReducer } from './rootReducer'
import createSagaMiddleware from 'redux-saga'
import { rootWatcher } from './saga/rootWatcher'

const sagaMiddleware = createSagaMiddleware()

function configureStore(preloadedState: any) {
  const middlewareEnhancer = applyMiddleware(sagaMiddleware)

  const store = createStore(rootReducer, preloadedState, middlewareEnhancer)

  return store
}

export const store = configureStore({})

sagaMiddleware.run(rootWatcher)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type actionWithPayload<T> = {
  type: string
  payload: T
}

export type InferActionsType<
  T extends { [key: string]: (...args: any) => any }
> = ReturnType<T[keyof T]>
