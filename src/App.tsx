import { Redirect, Route, Switch } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import "./index.css"
import { useAppSelector } from './hooks/redux'
import { Skeleton } from 'antd'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'

const PostsPage = lazy(() => import('./pages/PostPage'))
const AuthorsPage = lazy(() => import('./pages/AuthorsPage'))
const TagsPage = lazy(() => import('./pages/TagsPage'))

function App() {
  const { isAuth } = useAppSelector((state) => state.auth)

  if (!isAuth) {
    return (
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    )
  }
  return (
    <Navbar>
      <Switch>
        <Route exact path="/posts">
          <Suspense fallback={<Skeleton />}>
            <PostsPage />
          </Suspense>
        </Route>
        <Route exact path="/authors">
          <Suspense fallback={<Skeleton />}>
            <AuthorsPage />
          </Suspense>
        </Route>
        <Route exact path="/tags">
          <Suspense fallback={<Skeleton />}>
            <TagsPage />
          </Suspense>
        </Route>
        <Route path="*">
          <Redirect to="/posts" />
        </Route> 
      </Switch>
    </Navbar>
  )
}

export default App