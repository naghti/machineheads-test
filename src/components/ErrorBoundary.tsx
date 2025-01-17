import { Button, Result } from 'antd'
import { Component } from 'react'

interface ErrorBoundaryProps {
  message?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
}
interface ErrorBoundaryStates {
  error?: Error | null
  errorInfo?: {
    componentStack?: string
  } | null
}

class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryStates
> {
  constructor(props: any) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error: Error | null, errorInfo: object): void {
    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <Result
          status="warning"
          title="Что-то пошло не так"
          subTitle="Попробуйте обновить страницу или перейти на другую страницу"
        >
          <div>
            <details className='whitespace-pre-wrap'>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div>
        </Result>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
