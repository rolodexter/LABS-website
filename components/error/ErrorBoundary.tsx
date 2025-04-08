import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  copiedToClipboard: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    copiedToClipboard: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private copyErrorToClipboard = () => {
    const { error, errorInfo } = this.state;
    const errorDetails = {
      message: error?.message || 'Unknown error',
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
    };

    navigator.clipboard
      .writeText(JSON.stringify(errorDetails, null, 2))
      .then(() => {
        this.setState({ copiedToClipboard: true });
        setTimeout(() => this.setState({ copiedToClipboard: false }), 3000);
      })
      .catch(err => console.error('Failed to copy error details:', err));
  };

  private reportIssue = () => {
    // Show a toast or notification instead of an alert
    const reportButton = document.getElementById('report-issue-button');
    if (reportButton) {
      const originalText = reportButton.innerHTML;
      reportButton.innerHTML = 'Coming Soon';
      reportButton.classList.add('opacity-50');
      setTimeout(() => {
        reportButton.innerHTML = originalText;
        reportButton.classList.remove('opacity-50');
      }, 2000);
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <div className="max-w-lg w-full border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              {/* Error header */}
              <div className="border-b border-gray-200 bg-gray-50 p-4 sm:p-6">
                <div className="flex items-center justify-center mb-4">
                  <svg
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-center mb-2">
                  Something went wrong
                </h1>
                <p className="text-sm sm:text-base text-gray-600 text-center mb-1">
                  {this.state.error?.message || 'An unexpected error occurred'}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 text-center italic">
                  Even the smartest agents crash sometimes.
                </p>
              </div>

              {/* Error details (collapsible on mobile) */}
              <details className="group bg-gray-50 border-b border-gray-200">
                <summary className="p-3 text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between">
                  <span>Technical Details</span>
                  <svg
                    className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="p-3 bg-gray-100 border-t border-gray-200 overflow-auto max-h-40 text-xs font-mono">
                  <pre className="whitespace-pre-wrap break-words">
                    {this.state.error?.stack || 'No stack trace available'}
                  </pre>
                </div>
              </details>

              {/* Action buttons */}
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/"
                  className="px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors duration-200 text-center text-sm sm:text-base"
                >
                  Back to Homepage
                </Link>

                <button
                  onClick={this.copyErrorToClipboard}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-center flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  {this.state.copiedToClipboard ? 'Copied!' : 'Copy error details'}
                </button>

                <button
                  id="report-issue-button"
                  onClick={this.reportIssue}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-center flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Report issue
                </button>
              </div>

              {/* Refresh button */}
              <div className="p-4 pt-0 sm:p-6 sm:pt-0 text-center">
                <button
                  onClick={() => window.location.reload()}
                  className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
                >
                  Refresh page
                </button>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
