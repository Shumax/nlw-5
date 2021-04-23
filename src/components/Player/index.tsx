import { useContext, useEffect, useRef, useState } from "react";
import { Context } from '../../contextApi/Context';
import Image from 'next/image';
import Slider from 'rc-slider';

import styles from './styles.module.scss';
import 'rc-slider/assets/index.css';
import { convertDuration } from "../../utils/convertDuration";

export default function Player() {
  const { 
    episodeList, 
    currentEpisode, 
    isPlaying, 
    changePlay, 
    changeOnKayboard, 
    playNext,
    playPrev,
    isShuffle,
    handleShuffle,
  } = useContext(Context);
  const audioRef = useRef<HTMLAudioElement>(null);
  const searcheredEp = episodeList[currentEpisode];
  const [isLooping, setIsLooping] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if(!audioRef.current) {
      return;
    }
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  function changeRepeat() {
    setIsLooping(!isLooping);
  }
  
  //captura e muda o timer do audio
  function setupMetadata() {
    audioRef.current.currentTime = 0;
    audioRef.current.addEventListener('timeupdate',() => {
      setProgress(Math.floor(audioRef.current.currentTime));
    })
  }

  function handleLine(amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function handleEnded() {
    playNext();
  }

  return (
    <div className={styles.container}>
      <header>
        <img src="/playing.svg" />
        <strong>Tocando Agora</strong>
      </header>

      {
        searcheredEp ? (
          <div className={styles.playing}>
            <Image src={searcheredEp.thumbnail} width={592} height={592} objectFit="cover" />
            <strong>{searcheredEp.title}</strong>
            <span>{searcheredEp.members}</span>
          </div>
        ) : (
          <div className={styles.empty}>
            <strong>Selecione um podcast para ouvir</strong>
          </div>
        )
      }

      <footer className={!searcheredEp ? styles.none : ''}>
        <div className={styles.progress}>
        <span>{convertDuration(progress)}</span>
          <div className={styles.lineEmpty}>
            {searcheredEp ? (
              <Slider 
                max={searcheredEp.duration}
                value={progress}
                onChange={handleLine}
                trackStyle={{ backgroundColor: '#04d361'}}
                railStyle={{ backgroundColor: '#9f75ff'}}
                handleStyle={{ backgroundColor: '#04d361', borderWidth: 4}}
              />
            ) : (
              <div className={styles.line}></div>
            )}
          </div>
          <span>{convertDuration(searcheredEp?.duration ?? 0)}</span>
        </div>

        {searcheredEp && 
          <audio 
            src={searcheredEp.url} 
            autoPlay 
            ref={audioRef} 
            onPlay={() => changeOnKayboard(true)} 
            onPause={() => changeOnKayboard(false)}
            loop={isLooping}
            onLoadedMetadata={setupMetadata}
            onEnded={handleEnded}
          />
        }

        <div className={styles.buttons}>
          <button type="button" className={isShuffle? styles.isActive: ''} disabled={!searcheredEp}  onClick={() => handleShuffle()}>
            <img src="/shuffle.svg" />
          </button>
          <button type="button" disabled={!searcheredEp} onClick={() => playPrev()}>
            <img src="/play-previous.svg" />
          </button>
          <button type="button" className={styles.play} disabled={!searcheredEp} onClick={() => changePlay()}>
            {isPlaying ? <img src="/pause.svg" /> : <img src="/play.svg" />}
          </button>
          <button type="button" disabled={!searcheredEp} onClick={() => playNext()}>
            <img src="/play-next.svg" />
          </button>
          <button type="button" className={isLooping? styles.isActive: ''} disabled={!searcheredEp} onClick={() => changeRepeat()}>
            <img src="/repeat.svg" />
          </button>
        </div>
      </footer>
    </div>
  )
}