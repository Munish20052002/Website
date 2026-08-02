"use client";

import { useState, useEffect } from "react";

interface CounterValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function useLiveCounter(startDateStr: string): CounterValues {
  const [counter, setCounter] = useState<CounterValues>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const startDate = new Date(startDateStr).getTime();

    function updateCounter() {
      const now = Date.now();
      const diff = now - startDate;

      if (diff < 0) {
        setCounter({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setCounter({ days, hours, minutes, seconds });
    }

    updateCounter();
    const interval = setInterval(updateCounter, 1000);

    return () => clearInterval(interval);
  }, [startDateStr]);

  return counter;
}
