"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

export type AudioTrackType = "intro" | "quiz" | "letter";

interface TrackConfig {
  title: string;
  subtitle: string;
  filePath: string;
}

const TRACKS: Record<AudioTrackType, TrackConfig> = {
  intro: {
    title: "Perfect",
    subtitle: "For My Ullu 🦉💖",
    filePath: "/audio/romantic-theme.mp3",
  },
  quiz: {
    title: "Perfect",
    subtitle: "For My Ullu 🦉💖",
    filePath: "/audio/romantic-theme.mp3",
  },
  letter: {
    title: "Perfect",
    subtitle: "For My Ullu 🦉💖",
    filePath: "/audio/romantic-theme.mp3",
  },
};

interface SoundContextType {
  currentTrack: AudioTrackType;
  isPlaying: boolean;
  isMuted: boolean;
  trackTitle: string;
  setTrack: (track: AudioTrackType) => void;
  togglePlay: () => void;
  toggleMute: () => void;
  startAudio: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<AudioTrackType>("intro");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(isPlaying);
  const isMutedRef = useRef(isMuted);
  const userInteractedRef = useRef(userInteracted);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    isMutedRef.current = isMuted;
    userInteractedRef.current = userInteracted;
  }, [isPlaying, isMuted, userInteracted]);

  // Initialize or resume audio continuously
  const startAudio = useCallback(() => {
    setUserInteracted(true);
    userInteractedRef.current = true;

    if (!audioRef.current) {
      const audio = new Audio(TRACKS.intro.filePath);
      audio.loop = true;
      audio.volume = isMutedRef.current ? 0 : 0.65;
      audioRef.current = audio;
    }

    if (audioRef.current && isPlayingRef.current && !isMutedRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, []);

  // Set track without restarting the audio stream
  const setTrack = useCallback((track: AudioTrackType) => {
    setCurrentTrack(track);
    // If audio is already initialized and playing, keep playing continuously
    if (audioRef.current && isPlayingRef.current && !isMutedRef.current) {
      if (audioRef.current.paused && userInteractedRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, []);

  // Stop / pause audio when the user leaves the website (tab switch, window blur, page close)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched tab or minimized window -> Pause audio
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
        }
      } else {
        // User returned to tab -> Resume audio if unlocked and not paused
        if (
          audioRef.current &&
          audioRef.current.paused &&
          isPlayingRef.current &&
          !isMutedRef.current &&
          userInteractedRef.current
        ) {
          audioRef.current.play().catch(() => {});
        }
      }
    };

    const handlePageLeave = () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageLeave);
    window.addEventListener("beforeunload", handlePageLeave);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageLeave);
      window.removeEventListener("beforeunload", handlePageLeave);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // Handle mute/unmute
  const toggleMute = () => {
    startAudio();
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.65;
        if (isPlaying && audioRef.current.paused) {
          audioRef.current.play().catch(() => {});
        }
      }
    } else {
      setIsMuted(true);
      if (audioRef.current) {
        audioRef.current.muted = true;
      }
    }
  };

  // Handle play/pause
  const togglePlay = () => {
    startAudio();
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const trackConfig = TRACKS[currentTrack];
  const trackTitle = `${trackConfig.title} — ${trackConfig.subtitle}`;

  return (
    <SoundContext.Provider
      value={{
        currentTrack,
        isPlaying,
        isMuted,
        trackTitle,
        setTrack,
        togglePlay,
        toggleMute,
        startAudio,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
}
