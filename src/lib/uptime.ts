import { useEffect, useState } from "react";

// Bot start anchor timestamp: ~22h 49m 49s before snapshot on Sep 19, 2026
export const BOT_START_TIMESTAMP = 1789719630000;
export const OFFICIAL_DOCS_URL = "https://wiki.adore.rest";

export function formatUptime(uptimeMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(uptimeMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  return `${hours}h ${minutes}m ${seconds}s`;
}

export function formatLocalTimestamp(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const day = date.getDate();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${formattedHours}:${formattedMinutes} ${ampm} ${day}-${month} ${year}`;
}

export function useLiveStatus() {
  const [uptime, setUptime] = useState("22h 49m 49s");
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    function tick() {
      const now = Date.now();
      setUptime(formatUptime(now - BOT_START_TIMESTAMP));
      setLocalTime(formatLocalTimestamp(new Date()));
    }
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return { uptime, localTime };
}
