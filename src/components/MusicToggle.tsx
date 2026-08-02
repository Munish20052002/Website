"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    // Create audio element — drop your mp3 at /audio/song.mp3
    const audio = new Audio("/audio/song.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Browser may block autoplay — that's fine
      });
    }
    setIsPlaying(!isPlaying);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full
        bg-wine/80 backdrop-blur-md border border-crimson/30
        flex items-center justify-center
        hover:bg-wine transition-all duration-300
        shadow-lg shadow-wine/20 cursor-pointer"
      aria-label={isPlaying ? "Mute background music" : "Play background music"}
      title={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-rose-light" />
      ) : (
        <VolumeX className="w-5 h-5 text-rose-light/60" />
      )}
    </button>
  );
}
