import { useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import Card from './Card/Card';
import NoResultsCards from './NoResultsCards/NoResultsCards';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  changeCardDescription,
  changeCurrentCards,
  changeIsCardsLoading,
  changeIsModalActive,
  changeIsModalLoading,
} from '../../store/mainPageSlice';
import { useLazyGetCardDesctiptionQuery } from '../../store/api';
import { Cards } from '@/types/interfaces';

export default function CardsSection(props: { cardsdata: Cards }) {
  const data = props.cardsdata;

  const searchParams = useSearchParams();

  const queryStringCard: string | null = searchParams.get('card');
  const initSearchCard: string = queryStringCard ? queryStringCard : '';

  const dispatch = useAppDispatch();
  if (data) dispatch(changeIsCardsLoading(false));
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
    changeCurrentCards(props.cardsdata);
  }, [props.cardsdata, cards]);

  useEffect(() => {
    if (initSearchCard) {
      getCardModalDescription(initSearchCard);
    } else {
      dispatch(changeIsModalActive(false));
    }
  }, [initSearchCard]);

  return (
    <div className="cardsWrapper">
      {isCardsLoading && <Spinner />}
      {!isCardsLoading &&
        (data.length ? (
          data.map((card) => (
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
