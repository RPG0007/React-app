import { useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import Card from './Card/Card';
import NoResultsCards from './NoResultsCards/NoResultsCards';
import { useSearchParams } from 'react-router-dom';
import { BASE_URL } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  changeCardDescription,
  changeIsModalActive,
  changeIsModalLoading,
} from '../../store/mainPageSlice';
export default function CardsSection() {
  const [searchParams] = useSearchParams();

  const queryStringCard: string | null = searchParams.get('card');
  const initSearchCard: string = queryStringCard ? queryStringCard : '';

  const dispatch = useAppDispatch();

  const isCardsLoading = useAppSelector(
    (state) => state.mainPage.isCardsLoading
  );

  const cards = useAppSelector((state) => state.mainPage.cards);

  const getCardModalDescription = async (cardId: string) => {
    dispatch(changeIsModalActive(true));
    dispatch(changeIsModalLoading(true));

    try {
      const response = await fetch(`${BASE_URL}${cardId}`);
      const data = await response.json();

      dispatch(changeIsModalLoading(false));
      dispatch(changeCardDescription(data));
    } catch (error) {
      console.log(error);
      dispatch(changeIsModalLoading(false));
      dispatch(changeCardDescription(null));
    }
  };
  useEffect(() => {
    const initialGetCardDescription = () => {
      if (initSearchCard) {
        getCardModalDescription(initSearchCard);
      } else {
        dispatch(changeIsModalActive(false));
      }
    };
    initialGetCardDescription();
  }, [initSearchCard]);

  return (
    <div className="cards-wrapper">
      {isCardsLoading && <Spinner />}
      {!isCardsLoading &&
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
              getCardModalDescription={getCardModalDescription}
            />
          ))
        ) : (
          <NoResultsCards></NoResultsCards>
        ))}
    </div>
  );
}
