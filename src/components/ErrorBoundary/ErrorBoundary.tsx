import { Component, ErrorInfo } from 'react';
import {
  IErrorBoundaryProps,
  IErrorBoundaryState,
} from '../../types/interfaces';

export default class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2 className="title">
          An unexpected error has occurred, please reload the page.
        </h2>
      );
    }

    return this.props.children;
  }
}
