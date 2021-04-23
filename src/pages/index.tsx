//necessario para tipar a função
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import parseISO from 'date-fns/parseISO';
import { GetStaticProps } from 'next';
import { URL } from '../services';
import { convertDuration } from '../utils/convertDuration';

import SliceTwoEpisodes from '../components/SliceTwoEpisodes';
import AllEpisodes from '../components/AllEpisodes';
import styles from './styles.module.scss';

import { Episode } from '../types';

type HomeProps = {
  sliceTwoEpisodes: Episode[],
  allEpisodes: Episode[],
  episodesToPlayer: Episode[],
}

export default function Home({ sliceTwoEpisodes, allEpisodes, episodesToPlayer }: HomeProps) {

  return (
    <main className={styles.main}>
      <SliceTwoEpisodes episodes={sliceTwoEpisodes} toPlayer={episodesToPlayer} />
      <AllEpisodes episodes={allEpisodes} toPlayer={episodesToPlayer}/>
    </main>
  )
}

//SSR
// export async function getServerSideProps() {
//   const res = await fetch('http://localhost:3333/episodes');
//   const data = await res.json();

//   return {
//     props: {
//       episodes: data,
//     }
//   }
// } 

//SSG

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${URL}/episodes?_limit=12&_sort=published_at&_order=desc`);
  const data = await res.json();

  //formata os dados antes de retornar
  const formatEpisodes = data.map(epi => {
    return { 
      id: epi.id,
      title: epi.title,
      thumbnail: epi.thumbnail,
      members: epi.members,
      published_at: format(parseISO(epi.published_at), 'd MMM yy', { locale: ptBR }),
      durationAsString: convertDuration(epi.file.duration),
      duration: Number(epi.file.duration),
      url: epi.file.url,
    }
  });

  const sliceTwoEpisodes = formatEpisodes.slice(0 , 2);
  const allEpisodes = formatEpisodes.slice(2, formatEpisodes.length);
  const episodesToPlayer = formatEpisodes;

  return {
    props: {
      sliceTwoEpisodes,
      allEpisodes,
      episodesToPlayer,
    },
    revalidate: 60 * 60 * 8,
  }
}