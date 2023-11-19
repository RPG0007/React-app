import { useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import Card from './Card/Card';
import NoResultsCards from './NoResultsCards/NoResultsCards';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  changeCardDescription,
  changeIsModalActive,
  changeIsModalLoading,
} from '../../store/mainPageSlice';
import { useLazyGetCardDesctiptionQuery } from '../../store/api';
export default function CardsSection() {
  const [searchParams] = useSearchParams();

  const queryStringCard: string | null = searchParams.get('card');
  const initSearchCard: string = queryStringCard ? queryStringCard : '';

  const dispatch = useAppDispatch();

  const isCardsLoading = useAppSelector(
    (state) => state.mainPage.isCardsLoading
  );

  const cards = useAppSelector((state) => state.mainPage.cards);

  const [triggerFn] = useLazyGetCardDesctiptionQuery();

  const getCardModalDescription = async (cardId: string) => {
    dispatch(changeIsModalActive(true));
    dispatch(changeIsModalLoading(true));

    try {
      const response = await triggerFn(cardId);

      dispatch(changeIsModalLoading(false));
      dispatch(changeCardDescription(response.data));
    } catch (error) {
      console.log(error);
      dispatch(changeIsModalLoading(false));
      dispatch(changeCardDescription(undefined));
    }
  };

  useEffect(() => {
    if (initSearchCard) {
      getCardModalDescription(initSearchCard);
    } else {
      dispatch(changeIsModalActive(false));
    }
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
