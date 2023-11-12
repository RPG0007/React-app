import './ModalCard.css';
import ModalCardContent from './ModalCardContent/ModalCardContent';
import { IModalCardProps } from '../../types/interfaces';
import { useContext } from 'react';
import { Context } from '../../context/context';

export default function ModalCard({
  modalActive,
  isModalLoading,
  deleteCardStringQuery,
}: IModalCardProps) {
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
      className={modalActive ? 'modal modal-active' : 'modal'}
      onClick={handlerClickModal}
    >
      <div
        className={modalActive ? 'modal-card modal-card-active' : 'modal-card'}
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
