import Spinner from '../Spinner/Spinner';
import Card from './Card/Card';
import NoResultsCards from './NoResultsCards/NoResultsCards';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  
  changeIsCardsLoading,
  
} from '../../store/mainPageSlice';
 
import { Cards } from '@/types/interfaces';

export default function CardsSection(props: { cardsdata: Cards }) {
  const data = props.cardsdata;
   

   
   

  const dispatch = useAppDispatch();
  if (data) dispatch(changeIsCardsLoading(false));
  const isCardsLoading = useAppSelector(
    (state) => state.mainPage.isCardsLoading
  );

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
            />
          ))
        ) : (
          <NoResultsCards></NoResultsCards>
        ))}
    </div>
  );
}
