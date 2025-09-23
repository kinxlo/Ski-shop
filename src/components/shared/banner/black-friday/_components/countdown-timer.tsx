"use client";

import { useEffect, useState } from "react";

type CountdownTimerProperties = {
  id: string; // unique id for each countdown instance
  duration: string; // example: "5d 0h 0m 0s"
};
// Helper to parse duration like "5d 0h 0m 0s"
const parseDuration = (durationString: string): number => {
  const regex = /(\d+)\s*d.*?(\d+)\s*h.*?(\d+)\s*m.*?(\d+)\s*s/i;
  const match = durationString.match(regex);
  if (!match) return 0;
  const [, d, h, m, s] = match.map(Number);
  return (((d * 24 + h) * 60 + m) * 60 + s) * 1000;
};

const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
};

export const CountdownTimer = ({ id, duration }: CountdownTimerProperties) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const key = `countdown-${id}`;
    let endTime: number;

    const storedEndTime = localStorage.getItem(key);
    if (storedEndTime) {
      endTime = Number.parseInt(storedEndTime, 10);
    } else {
      endTime = Date.now() + parseDuration(duration);
      localStorage.setItem(key, endTime.toString());
    }

    const interval = setInterval(() => {
      const delta = endTime - Date.now();
      if (delta <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
        localStorage.removeItem(key);
      } else {
        setTimeLeft(delta);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [id, duration]);

  const { days, hours, minutes, seconds } = formatTime(timeLeft);

  const timeUnits = [
    { label: "Days", value: days },
    { label: "Hrs", value: hours },
    { label: "Mins", value: minutes },
    { label: "Secs", value: seconds },
  ];

  return (
    <div className="flex items-center gap-4">
      {timeUnits.map((unit, index) => (
        <div
          key={index}
          className="border-primary flex h-14 w-14 flex-col items-center justify-center rounded-full border-4 bg-white text-black lg:h-20 lg:w-20 lg:border-6"
        >
          <span className="text-sm font-bold lg:text-lg">{String(unit.value).padStart(2, "0")}</span>
          <span className="text-xs font-medium">{unit.label}</span>
        </div>
      ))}
    </div>
  );
};
