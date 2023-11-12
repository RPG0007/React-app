import './ModalCardContent.css';
import Spinner from '../../Spinner';
import { Context } from '../../../context';
import { useContext } from 'react';

interface IModalCardContetntProps {
  isModalLoading: boolean;
}
export default function ModalCardContent({
  isModalLoading,
}: IModalCardContetntProps) {
  const { cardDescription } = useContext(Context);

  return (
    <>
      {isModalLoading && <Spinner />}
      {!isModalLoading && (
        <>
          {cardDescription.id ? (
            <>
              <img src={cardDescription.image} alt="image character"></img>
              <h4>{`name: ${cardDescription.name}`}</h4>
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
