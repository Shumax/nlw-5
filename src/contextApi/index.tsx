import { useState, ReactNode } from "react";
import { Episode } from '../types';
import { Context } from '../contextApi/Context';

type ProviderProps = {
  children: ReactNode;
}

export function ContextProvider({ children }: ProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisode(0);
    setIsPlaying(true)
  }

  function playList(listEps: Episode[], index: number) {
    setEpisodeList(listEps);
    setCurrentEpisode(index);
    setIsPlaying(true);
  }

  function handleShuffle() {
    setIsShuffle(!isShuffle);
  }

  function playNext() {
    const nextEp = currentEpisode + 1;

    if (isShuffle) {
      const randomEp = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisode(randomEp);
    } else if (nextEp < episodeList.length) {
      setCurrentEpisode(nextEp);
    }
  }

  function playPrev() {
    if (currentEpisode > 0) {
      setCurrentEpisode(currentEpisode - 1);
    }
  }

  function changePlay() {
    setIsPlaying(!isPlaying);
  }

  function changeOnKayboard(key: boolean) {
    setIsPlaying(key);
  }

  return (
    <Context.Provider
      value={{
        episodeList,
        currentEpisode,
        isPlaying,
        changePlay,
        changeOnKayboard,
        play,
        playList,
        playNext,
        playPrev,
        isShuffle,
        handleShuffle,
      }}>
      {children}
    </Context.Provider>
  );
}