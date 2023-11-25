import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import ErrorButton from '@/components/ErrorBoundary/ErrorButton/ErrorButton';
import Search from '@/components/Search/Search';
import CardsSection from '@/components/CardsSection/CardsSection';
import { Cards } from '@/types/interfaces';
import Pagination from '@/components/Pagination/Pagination';
import ModalCard from '@/components/ModalCard/ModalCard';
import { useSearchParams } from 'next/navigation';
import { GetServerSidePropsContext } from 'next';
import { changeAllPage } from '@/store/mainPageSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const inter = Inter({ subsets: ['latin'] });

export default function Home(data) {
  const cardsdata: Cards = data.characters.results;
  const dispatch = useAppDispatch();

  dispatch(changeAllPage(data.characters.info.pages));
  const searchParams = useSearchParams();

  const numPerpage = useAppSelector((state) => state.mainPage.numPerpage);
  const queryStringPage: string | null = searchParams.get('page');
  const initSearchPage: number =
    queryStringPage && +queryStringPage > 0 ? +queryStringPage : 1;

  return (
    <>
      <Head>
        <title>Rick and Morty</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav_icon.svg" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <Search disabled={false} />
          <ErrorButton />
        </div>
        <CardsSection cardsdata={cardsdata.slice(0, numPerpage)} />
        <Pagination currentPage={initSearchPage}></Pagination>
        <ModalCard></ModalCard>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { page, name } = context.query;
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?${page ? `page=${page}` : ''}${
      name ? `&name=${name}` : ''
    }`
  );
  const data = await response.json();
  return {
    props: {
      characters: data,
    },
  };
}
