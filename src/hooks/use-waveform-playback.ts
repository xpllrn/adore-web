import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValue, useMotionValueEvent, useTransform } from "motion/react";

export interface WaveformPlaybackOptions {
  /** Audio source. When omitted, playback is simulated with a timer. */
  src?: string | undefined;
  /** Fallback duration (seconds) used before metadata loads or when there is no `src`. */
  duration?: number | undefined;
  /** Controlled playing state. Leave undefined for uncontrolled behaviour. */
  playing?: boolean | undefined;
  onPlayingChange?: ((playing: boolean) => void) | undefined;
  onEnded?: (() => void) | undefined;
}

export interface WaveformScrubProps {
  /** Fallback duration in seconds (used without `src` or until audio metadata loads). */
  duration?: number;
  fileName?: string;
  waveformHeights?: number[];
  /** Audio file to play. Without it, playback is simulated. */
  src?: string;
  /** Controlled playing state. */
  playing?: boolean;
  onPlayingChange?: (playing: boolean) => void;
  onEnded?: () => void;
  className?: string;
}

export const DEFAULT_WAVEFORM = [
  4, 7, 9, 6, 11, 14, 12, 8, 5, 10, 15, 13, 11, 9, 6, 10, 12, 9, 7, 5, 8, 12, 10, 7, 6, 9, 13, 11,
  8, 6, 5, 11, 8, 6, 5, 11, 8, 6, 5, 8, 5, 10, 15, 13, 11, 9,
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Shared playback engine for the WaveformScrub components.
 * Keeps an <audio> element, the scrub handle position (motion value) and the
 * displayed time in sync, and supports dragging to seek.
 */
export function useWaveformPlayback({
  src,
  duration: fallbackDuration = 30,
  playing,
  onPlayingChange,
  onEnded,
}: WaveformPlaybackOptions) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const [containerWidth, setContainerWidth] = useState(0);
  const [mediaDuration, setMediaDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [internalPlaying, setInternalPlaying] = useState(false);

  const isControlled = playing !== undefined;
  const isPlaying = isControlled ? playing : internalPlaying;
  const duration = src ? (mediaDuration ?? fallbackDuration) : fallbackDuration;

  // Refs mirror state so animation-frame callbacks always read fresh values.
  const timeRef = useRef(0);
  const widthRef = useRef(0);
  const durationRef = useRef(duration);
  const draggingRef = useRef(false);
  const callbacksRef = useRef({ onPlayingChange, onEnded, isControlled });
  callbacksRef.current = { onPlayingChange, onEnded, isControlled };

  const setPlaying = useCallback((next: boolean) => {
    if (!callbacksRef.current.isControlled) setInternalPlaying(next);
    callbacksRef.current.onPlayingChange?.(next);
  }, []);

  const syncPosition = useCallback(
    (time: number) => {
      timeRef.current = time;
      setCurrentTime(time);
      const d = durationRef.current;
      x.set(d > 0 ? (time / d) * widthRef.current : 0);
    },
    [x],
  );

  const seek = useCallback(
    (time: number) => {
      const next = clamp(time, 0, durationRef.current);
      syncPosition(next);
      const audio = audioRef.current;
      if (src && audio) audio.currentTime = next;
    },
    [src, syncPosition],
  );

  // Track waveform width so the handle maps to time correctly on resize.
  useEffect(() => {
    const el = waveformRef.current;
    if (!el) return;
    const update = () => {
      widthRef.current = el.offsetWidth;
      setContainerWidth(el.offsetWidth);
      syncPosition(timeRef.current);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [syncPosition]);

  useEffect(() => {
    durationRef.current = duration;
    syncPosition(Math.min(timeRef.current, duration));
  }, [duration, syncPosition]);

  // New track: reset position and wait for fresh metadata.
  useEffect(() => {
    setMediaDuration(null);
    syncPosition(0);
  }, [src, syncPosition]);

  // Audio element events.
  useEffect(() => {
    const audio = audioRef.current;
    if (!src || !audio) return;
    const handleMetadata = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setMediaDuration(audio.duration);
      }
    };
    const handleEnded = () => {
      syncPosition(durationRef.current);
      setPlaying(false);
      callbacksRef.current.onEnded?.();
    };
    handleMetadata();
    audio.addEventListener("loadedmetadata", handleMetadata);
    audio.addEventListener("durationchange", handleMetadata);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("loadedmetadata", handleMetadata);
      audio.removeEventListener("durationchange", handleMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [src, setPlaying, syncPosition]);

  // Playback loop: drives real audio when `src` is set, otherwise simulates time.
  useEffect(() => {
    if (!isPlaying) return;
    const audio = src ? audioRef.current : null;
    let cancelled = false;
    let frameId = 0;
    let last = performance.now();

    if (audio) {
      audio.play().catch((error: unknown) => {
        // AbortError just means a newer play/pause superseded this one.
        if (cancelled || (error instanceof DOMException && error.name === "AbortError")) return;
        setPlaying(false);
      });
    }

    const tick = (now: number) => {
      if (!draggingRef.current) {
        if (audio) {
          syncPosition(audio.currentTime);
        } else {
          const next = Math.min(timeRef.current + (now - last) / 1000, durationRef.current);
          syncPosition(next);
          if (next >= durationRef.current) {
            setPlaying(false);
            callbacksRef.current.onEnded?.();
            return;
          }
        }
      }
      last = now;
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      audio?.pause();
    };
  }, [isPlaying, src, setPlaying, syncPosition]);

  // While dragging, the handle position drives the displayed time.
  useMotionValueEvent(x, "change", (latest) => {
    if (!draggingRef.current || widthRef.current <= 0) return;
    const time = clamp(latest / widthRef.current, 0, 1) * durationRef.current;
    timeRef.current = time;
    setCurrentTime(time);
  });

  const onDragStart = useCallback(() => {
    draggingRef.current = true;
    if (src) audioRef.current?.pause();
  }, [src]);

  const onDragEnd = useCallback(() => {
    draggingRef.current = false;
    seek(timeRef.current);
    if (src && isPlaying && timeRef.current < durationRef.current) {
      audioRef.current?.play().catch(() => setPlaying(false));
    }
  }, [src, isPlaying, seek, setPlaying]);

  const isFinished = duration > 0 && currentTime >= duration - 0.05;

  const togglePlay = useCallback(() => {
    if (isFinished) {
      seek(0);
      setPlaying(true);
    } else {
      setPlaying(!isPlaying);
    }
  }, [isFinished, isPlaying, seek, setPlaying]);

  const activeProgress = useTransform(x, [0, containerWidth || 1], ["0%", "100%"]);

  return {
    audioRef,
    waveformRef,
    x,
    containerWidth,
    activeProgress,
    currentTime,
    duration,
    displayTime: Math.max(0, Math.round(duration - currentTime)),
    isPlaying,
    isFinished,
    togglePlay,
    seek,
    onDragStart,
    onDragEnd,
  };
}
