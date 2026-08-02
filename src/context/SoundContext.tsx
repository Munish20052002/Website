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
  startTime?: number; // Optional offset (e.g., jump right to hook)
}

const TRACKS: Record<AudioTrackType, TrackConfig> = {
  intro: {
    title: "Perfect",
    subtitle: "For My Ullu 🦉💖",
    filePath: "/audio/romantic-theme.mp3",
    startTime: 0,
  },
  quiz: {
    title: "Perfect",
    subtitle: "For My Ullu 🦉💖",
    filePath: "/audio/romantic-theme.mp3",
    startTime: 0,
  },
  letter: {
    title: "Perfect",
    subtitle: "For My Ullu 🦉💖",
    filePath: "/audio/romantic-theme.mp3",
    startTime: 0,
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
  const activeTrackRef = useRef<AudioTrackType>("intro");

  // Play a specific track via real HTML5 Audio
  const playTrackAudio = useCallback(
    (trackKey: AudioTrackType) => {
      const config = TRACKS[trackKey];
      activeTrackRef.current = trackKey;

      // Stop previous audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }

      if (!isPlaying || isMuted) return;

      const audio = new Audio(config.filePath);
      audio.loop = true;
      audio.volume = isMuted ? 0 : 0.65;
      audioRef.current = audio;

      // When ready, set offset if specified and play
      audio.oncanplay = () => {
        if (config.startTime && config.startTime > 0 && audio.currentTime < config.startTime) {
          audio.currentTime = config.startTime;
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Autoplay policy prevented playback until first user gesture
          console.log("Audio waiting for user gesture:", err.message);
        });
      }
    },
    [isPlaying, isMuted]
  );

  // Trigger track change
  const setTrack = useCallback(
    (track: AudioTrackType) => {
      setCurrentTrack(track);
      if (userInteracted && isPlaying && !isMuted) {
        playTrackAudio(track);
      }
    },
    [userInteracted, isPlaying, isMuted, playTrackAudio]
  );

  // Start audio on first user tap/click
  const startAudio = useCallback(() => {
    if (!userInteracted) {
      setUserInteracted(true);
    }
    if (audioRef.current && isPlaying && !isMuted) {
      audioRef.current.play().catch(() => {});
    } else {
      playTrackAudio(currentTrack);
    }
  }, [userInteracted, isPlaying, isMuted, currentTrack, playTrackAudio]);

  // Global listener for first touch/click
  useEffect(() => {
    const handleFirstGesture = () => {
      setUserInteracted(true);
      if (audioRef.current && audioRef.current.paused && isPlaying && !isMuted) {
        audioRef.current.play().catch(() => {});
      }
    };

    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
    };
  }, [isPlaying, isMuted]);

  // Update track when currentTrack or interaction changes
  useEffect(() => {
    if (userInteracted) {
      playTrackAudio(currentTrack);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentTrack, userInteracted, playTrackAudio]);

  // Handle mute/unmute
  const toggleMute = () => {
    startAudio();
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.65;
        audioRef.current.play().catch(() => {});
      } else {
        playTrackAudio(currentTrack);
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
      } else {
        playTrackAudio(currentTrack);
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
