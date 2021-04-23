import { Episode } from '../../types';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from "react";
import { Context } from '../../contextApi/Context';

type EpisodeProps = {
  episodes: Episode[],
  toPlayer: Episode[],
}

export default function AllEpisodes({ episodes, toPlayer }: EpisodeProps) {
  const { playList } = useContext(Context);
  return (
    <section className={styles.container}>
      <h2>Ultimos lançamentos</h2>
      <table cellSpacing={0}>
        <thead className={styles.header}>
          <tr>
            <th></th>
            <th>PodCast</th>
            <th>Integrantes</th>
            <th>Data</th>
            <th>Duração</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {episodes.map((episode, index) => {
            const count = index + 2;
            return (
              <tr key={episode.id}>
                <td style={{ width: 100 }}>
                  <Image src={episode.thumbnail} width={120} height={120} objectFit="cover" />
                </td>
                <td style={{ width: 500 }}>
                  <Link href={`/ep/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                </td>
                <td><p>{episode.members}</p></td>
                <td><span>{episode.published_at}</span></td>
                <td><span>{episode.durationAsString}</span></td>
                <td>
                  <button type="button" className={styles.play} onClick={() => playList(toPlayer, count)}>
                    <img src="/play-green.svg" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  )
}