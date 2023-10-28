import styles from './ErrorButton.module.css';
import { Component } from 'react';

export default class ErrorButton extends Component {
  state = { hasError: false };

  constructor(props: Record<string, never>) {
    super(props);
    this.handlerClick = this.handlerClick.bind(this);
  }

  handlerClick() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      throw new Error('Custom error');
    }

    return (
      <button onClick={this.handlerClick} className={styles['error-button']}>
        Error button
      </button>
    );
  }
}
