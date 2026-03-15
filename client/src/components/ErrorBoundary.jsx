import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled render error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-base text-primary flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
            <p className="text-secondary mb-8">
              An unexpected error occurred. Please refresh the page.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="px-4 py-2 rounded-md bg-btn text-primary text-primary hover:bg-btn-hover"
            >
              Refresh page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
