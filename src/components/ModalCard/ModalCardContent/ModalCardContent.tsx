import './ModalCardContent.css';
import Spinner from '../../Spinner/Spinner';
import { Context } from '../../../context/context';
import { useContext } from 'react';
import { IModalCardContetnt } from '../../../types/interfaces';

export default function ModalCardContent({
  isModalLoading,
}: IModalCardContetnt) {
  const { cardDescription } = useContext(Context);

  return (
    <>
      {isModalLoading && <Spinner />}
      {!isModalLoading && (
        <>
          {cardDescription ? (
            <>
              <img src={cardDescription.image} alt="image character"></img>
              <h4 data-testid="modal-card-content">{`name: ${cardDescription.name}`}</h4>
              <h4>{`status: ${cardDescription.status}`}</h4>
              <h4>{`species: ${cardDescription.species}`}</h4>
              <h4>{`gender: ${cardDescription.gender}`}</h4>
              <h4>{`location: ${cardDescription.location.name}`}</h4>
            </>
          ) : (
            <h4>character not found</h4>
          )}
        </>
      )}
    </>
  );
}
