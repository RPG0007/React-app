import { Component, ErrorInfo } from 'react';

interface IProps {
  children?: React.ReactNode;
}

interface IState {
  hasError: boolean;
  error: null | Error;
  errorInfo: null | ErrorInfo;
}

export default class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
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
