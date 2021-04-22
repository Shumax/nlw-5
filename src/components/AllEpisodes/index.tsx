import { Episode } from '../../types';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function AllEpisodes(props: { episodes: Episode[] }) {

  return (
    <section className={styles.container}>
      <h2>Ultimos lançamentos</h2>
      <table cellSpacing={0}>
        <thead className={styles.header}>
          <th></th>
          <th>PodCast</th>
          <th>Integrantes</th>
          <th>Data</th>
          <th>Duração</th>
          <th></th>
        </thead>
        <tbody>
          {props.episodes.map(episode => {
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
                  <button type="button" className={styles.play}>
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