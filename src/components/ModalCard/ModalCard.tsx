import './ModalCard.css';
import ModalCardContent from './ModalCardContent/ModalCardContent';
import { IModalCard } from '../../types/interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeIsModalActive } from '../../store/mainPageSlice';

export default function ModalCard({ deleteCardStringQuery }: IModalCard) {
  const isModalActive = useAppSelector((state) => state.mainPage.isModalActive);

  const dispatch = useAppDispatch();

  function handlerClickModal() {
    deleteCardStringQuery();
    dispatch(changeIsModalActive(false));
  }

  function handlerClickModalCard(event: React.MouseEvent) {
    event.stopPropagation();
  }

  return (
    <div
      className={`modal ${isModalActive && 'modal-active'}`}
      onClick={handlerClickModal}
    >
      <div
        className={`modal-card ${isModalActive && 'modal-card-active'}`}
        onClick={handlerClickModalCard}
      >
        <div
          className="modal-close-button"
          onClick={handlerClickModal}
          data-testid="modal-close"
        >
          ❌
        </div>
        <ModalCardContent />
      </div>
    </div>
  );
}
