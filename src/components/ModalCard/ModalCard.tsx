import './ModalCard.css';
import { Outlet } from 'react-router-dom';

interface IModalCardProps {
  modalActive: boolean;
  setModalActive(newState: boolean): void;
  deleteCardStringQuery(): void;
  children: React.ReactNode;
}

export default function ModalCard({
  modalActive,
  setModalActive,
  deleteCardStringQuery,
}: IModalCardProps) {
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
        <Outlet />
      </div>
    </div>
  );
}
