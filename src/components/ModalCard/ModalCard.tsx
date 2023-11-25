import styles from './ModalCard.module.css';
import ModalCardContent from './ModalCardContent/ModalCardContent';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeIsModalActive } from '../../store/mainPageSlice';

export default function ModalCard() {
  const isModalActive = useAppSelector((state) => state.mainPage.isModalActive);

  const dispatch = useAppDispatch();

  function handlerClickModal() {
    dispatch(changeIsModalActive(false));
  }

  function handlerClickModalCard(event: React.MouseEvent) {
    event.stopPropagation();
  }

  return (
    <div
      className={`${styles.modal} ${isModalActive && styles.modalActive}`}
      onClick={handlerClickModal}
    >
      <div
        className={`${styles.modalCard} ${
          isModalActive && styles.modalCardActive
        }`}
        onClick={handlerClickModalCard}
      >
        <div
          className={styles.modalCloseButton}
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
