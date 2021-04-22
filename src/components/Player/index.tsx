import styles from './styles.module.scss';

export default function Player() {
  return (
    <div className={styles.container}>
      <header>
        <img src="/playing.svg"/>
        <strong>Tocando Agora</strong>
      </header>
      <div className={styles.empty}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className={styles.none}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.lineEmpty}>
            <div className={styles.line}></div>
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <img src="/shuffle.svg" />
          </button>
          <button type="button">
            <img src="/play-previous.svg" />
          </button>
          <button type="button" className={styles.play}>
            <img src="/play.svg" />
          </button>
          <button type="button">
            <img src="/play-next.svg" />
          </button>
          <button type="button">
            <img src="/repeat.svg" />
          </button>
        </div>
      </footer>
    </div>
  )
}