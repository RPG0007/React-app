import styles from './Card.module.css';
import { ICard } from '../../../types/interfaces';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLazyGetCardDesctiptionQuery } from '@/store/api';
import { useAppDispatch } from '@/store/hooks';
import {
  changeIsModalActive,
  changeIsModalLoading,
  changeCardDescription,
} from '@/store/mainPageSlice';

export default function Card({
  img,
  name,
  species,
  gender,
  status,
  id,
}: ICard) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const queryStringSearch: string | null = searchParams.get('name');
  const initSearchString: string = queryStringSearch ? queryStringSearch : '';

  const queryStringPage: string | null = searchParams.get('page');
  const initSearchPage: number =
    queryStringPage && +queryStringPage > 0 ? +queryStringPage : 1;

  const [triggerFn] = useLazyGetCardDesctiptionQuery();

  const getCardModalDescription = async (cardId: string) => {
    dispatch(changeIsModalActive(true));
    dispatch(changeIsModalLoading(true));

    try {
      const response = await triggerFn(cardId);

      dispatch(changeIsModalLoading(false));
      dispatch(changeCardDescription(response.data));
    } catch (error) {
      console.log(error);
      dispatch(changeIsModalLoading(false));
      dispatch(changeCardDescription(undefined));
    }
  };
  function handlerClick() {
    getCardModalDescription(id);
    router.push(`${pathname}?page=${initSearchPage}&name=${initSearchString}`);
  }

  return (
    <div className={styles.card} onClick={handlerClick} data-testid="card">
      <img src={img} className={styles.cardImg} alt="image character"></img>
      <h2>{name}</h2>
      <h4>{`species: ${species}`}</h4>
      <h4>{`gender: ${gender}`}</h4>
      <h4>{`status: ${status}`}</h4>
    </div>
  );
}
