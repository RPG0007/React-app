import './ModalCard.css';
import ModalCardContent from './ModalCardContent/ModalCardContent';
import { IModalCard } from '../../types/interfaces';
import { useContext } from 'react';
import { Context } from '../../context/context';

export default function ModalCard({
  modalActive,
  isModalLoading,
  deleteCardStringQuery,
}: IModalCard) {
  const { setModalActive } = useContext(Context);

  function handlerClickModal() {
    setModalActive(false);
    deleteCardStringQuery();
  }

  function handlerClickModalCard(event: React.MouseEvent) {
    event.stopPropagation();
  }

  return (
    <div
      className={`modal ${modalActive && 'modal-active'}`}
      onClick={handlerClickModal}
    >
      <div
        className={`modal-card ${modalActive && 'modal-card-active'}`}
        onClick={handlerClickModalCard}
      >
        <div
          className="modal-close-button"
          onClick={handlerClickModal}
          data-testid="modal-close"
        >
          ❌
        </div>
        <ModalCardContent isModalLoading={isModalLoading} />
      </div>
    </div>
  );
}
