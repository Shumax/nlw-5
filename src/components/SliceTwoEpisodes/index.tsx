import { Episode } from '../../types';
import Image from 'next/image';
import styles from './styles.module.scss';
import  Link  from 'next/link';


export default function SliceTwoEpisodes(props: { episodes: Episode[]; }) {
  return (
    <section className={styles.container}>
      <h2>Todos os episódios</h2>
      <ul>
        {props.episodes.map(episode => {
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
                <button type="button" className={styles.play}>
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