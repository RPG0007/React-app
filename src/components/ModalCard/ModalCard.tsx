import styles from './ModalCard.module.css';
import ModalCardContent from './ModalCardContent/ModalCardContent';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  changeCardDescription,
  changeIsModalActive,
} from '../../store/mainPageSlice';
import { ICardDescription } from '@/types/interfaces';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ModalCard(props: { detailsData: ICardDescription }) {
  const isModalActive = useAppSelector((state) => state.mainPage.isModalActive);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { page, name } = router.query;

  const href = name
    ? {
        pathname: '/',
        query: {
          page: page || '1',
          name: name || '',
        },
      }
    : {
        pathname: '/',
        query: {
          page: page || '1',
        },
      };
  dispatch(changeIsModalActive(true));
  if (props) {
    dispatch(changeCardDescription(props.detailsData));
  }

  function handlerClickModal() {
    dispatch(changeIsModalActive(false));
    router.push(href);
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
        <Link href={href}>
          <div
            className={styles.modalCloseButton}
            onClick={handlerClickModal}
            data-testid="modal-close"
          >
            ❌
          </div>
        </Link>
        <ModalCardContent />
      </div>
    </div>
  );
}
