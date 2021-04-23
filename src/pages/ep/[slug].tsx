import { GetStaticProps, GetStaticPaths } from "next";
import Link from 'next/link';
import Image from 'next/image';
// import { useRouter } from "next/router";
import { Context } from "../../contextApi/Context";
import { useContext} from 'react';

import { format, parseISO } from "date-fns";
import { ptBR } from 'date-fns/locale';

import { convertDuration } from "../../utils/convertDuration";
import { URL } from '../../services';
import { Episode } from "../../types";

import styles from './styles.module.scss';

type EpisodeType = {
  episode: Episode,
}

export default function Ep({ episode }: EpisodeType) {
  // const router = useRouter();
  // {episode.query.slug}
  const { play } = useContext(Context);

  return (
    <section className={styles.container}>
      <div className={styles.banner}>
        <Link href='/'>
          <button type="button">
            <img src="/arrow-left.svg" />
          </button>
        </Link>
        <Image src={episode.thumbnail} width={700} height={160} objectFit="cover" />
        <button type="button" onClick={() => play( episode )}>
          <img src="/play.svg" />
        </button>
      </div>
      <header>
        <h2>{episode.title}</h2>
        <ul>
          <li>{episode.members} </li>
          <li> - </li>
          <li> {episode.published_at} </li>
          <li> - </li>
          <li> {episode.durationAsString}</li>
        </ul>
      </header>
      <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }}></div>
    </section>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;

  const res = await fetch(`${URL}/episodes/${slug}`);
  const data = await res.json();

  //formata os dados antes de retornar
  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    published_at: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
    durationAsString: convertDuration(data.file.duration),
    duration: Number(data.file.duration),
    url: data.file.url,
    description: data.description,
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24,
  }
}