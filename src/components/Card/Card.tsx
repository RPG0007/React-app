import styles from './Card.module.css';
import { Component } from 'react';

interface ICardProps {
  img: string;
  name: string;
  species: string;
  gender: string;
  status: string;
}

export default class Card extends Component<ICardProps> {
  constructor(props: ICardProps) {
    super(props);
  }
  render() {
    return (
      <div className={styles.card}>
        <img src={this.props.img} alt="image character"></img>
        <h2>{this.props.name}</h2>
        <h4>{`species: ${this.props.species}`}</h4>
        <h4>{`gender: ${this.props.gender}`}</h4>
        <h4>{`status: ${this.props.status}`}</h4>
      </div>
    );
  }
}
