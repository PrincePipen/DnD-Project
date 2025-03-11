import { useEffect, useRef } from 'react';

const useAudio = (src: string, loop: boolean = false) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = loop;

    return () => {
      audioRef.current?.pause();
      audioRef.current?.remove();
    };
  }, [src, loop]);

  const play = () => {
    audioRef.current?.play();
  };

  const pause = () => {
    audioRef.current?.pause();
  };

  const stop = () => {
    audioRef.current?.pause();
    audioRef.current.currentTime = 0;
  };

  return { play, pause, stop };
};

export default useAudio;