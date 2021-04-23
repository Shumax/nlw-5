import '../styles/global.scss';

import Header from '../components/Header';
import Player from '../components/Player';

import { ContextProvider } from '../contextApi';

import styles from '../styles/app.module.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </ContextProvider>
  )
}

export default MyApp
