import { createContext } from "react";
import { Episode } from "../types";

type ContextData = {
  episodeList: Episode[],
  currentEpisode: number,
  isPlaying: boolean,
  isShuffle: boolean,
  play: (episodes: Episode) => void;
  playList: (listEps: Episode[], index: number) => void;
  changePlay: () => void;
  changeOnKayboard: (key: boolean) => void;
  playNext: () => void;
  playPrev: () => void;
  handleShuffle: () => void;
}

export const Context = createContext({} as ContextData);