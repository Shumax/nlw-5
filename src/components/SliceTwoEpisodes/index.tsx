import { Episode } from '../../types';
import Image from 'next/image';
import styles from './styles.module.scss';
import  Link  from 'next/link';
import { useContext } from "react";
import { Context } from '../../contextApi/Context';

type EpisodeProps = {
  episodes: Episode[],
  toPlayer: Episode[],
}

export default function SliceTwoEpisodes({ episodes, toPlayer }: EpisodeProps) {
  const { playList } = useContext(Context);
  return (
    <section className={styles.container}>
      <h2>Todos os episódios</h2>
      <ul>
        {episodes.map((episode,index) => {
          
          return (
            <li key={episode.id}>
              <div className={styles.card}>
                <Image src={episode.thumbnail} width={192} height={192} objectFit="cover" />
                <div className={styles.card_content}>
                  <Link href={`/ep/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <p>{episode.published_at} - {episode.durationAsString}</p>
                </div>
                <button type="button" className={styles.play} onClick={() => playList(toPlayer, index)}>
                  <img src="/play-green.svg" />
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}