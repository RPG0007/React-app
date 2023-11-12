import './CardSection.css';
import { Context } from '../../context';
import { useContext } from 'react';
import Spinner from '../../components/Spinner';
import Card from '../../components/Card/Card';

interface ICardsSectionProps {
  isLoading: boolean;
  changeStateModalActive(newState: boolean): void;
  getCardDescription(cardId: string): void;
}

export default function CardsSection({
  isLoading,
  changeStateModalActive,
  getCardDescription,
}: ICardsSectionProps) {
  const { cards } = useContext(Context);

  return (
    <div className="cards-wrapper">
      {isLoading && <Spinner />}
      {!isLoading &&
        (cards.length ? (
          cards.map((card) => (
            <Card
              img={card.image}
              name={card.name}
              species={card.species}
              gender={card.gender}
              status={card.status}
              key={card.id}
              id={card.id}
              setModalActive={changeStateModalActive}
              getCardDescription={getCardDescription}
            ></Card>
          ))
        ) : (
          <h3 className="title">Unfortunately, no suitable result was found</h3>
        ))}
    </div>
  );
}
