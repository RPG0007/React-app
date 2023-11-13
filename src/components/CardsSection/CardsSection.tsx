import { Context } from '../../context/context';
import { useContext, useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import Card from './Card/Card';
import NoResultsCards from './NoResultsCards/NoResultsCards';
import { ICardsSectionProps } from '../../types/interfaces';
import { useSearchParams } from 'react-router-dom';
import * as constants from '../../constants/constants';
export default function CardsSection({
  isLoading,
  currentPage,
}: ICardsSectionProps) {
  const {
    cards,
    searchString,
    setIsModalLoading,
    setCardDescription,
    setModalActive,
  } = useContext(Context);
  const [searchParams, setSearchParams] = useSearchParams();
  const SearchCard: string | null = searchParams.get('card');
  const initSearchCard: string = SearchCard ? SearchCard : '';

  const getCardModalDescription = async (cardId: string) => {
    setIsModalLoading(true);
    setSearchParams({
      name: searchString,
      page: `${currentPage}`,
      card: `${cardId}`,
    });
    try {
      const response = await fetch(`${constants.BASE_URL}${cardId}`);
      const data = await response.json();
      setIsModalLoading(false);
      setCardDescription(data);
    } catch (error) {
      console.log(error);
      setIsModalLoading(false);
      setCardDescription(null);
    }
  };

  useEffect(() => {
    if (initSearchCard) {
      setModalActive(true);
      getCardModalDescription(initSearchCard);
    }
  }, []);

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
              getCardModalDescription={getCardModalDescription}
            />
          ))
        ) : (
          <NoResultsCards></NoResultsCards>
        ))}
    </div>
  );
}
