import { Component } from 'react';
import spinner from '../assets/spinner.svg';
export default class Spinner extends Component {
  render() {
    return <img src={spinner} alt="Spinner loading"></img>;
  }
}
