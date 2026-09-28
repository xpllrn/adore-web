"use client";

import type React from "react";
import { motion, AnimatePresence } from "motion/react";
import { TbPlayerPauseFilled, TbPlayerPlayFilled, TbRotateClockwise2 } from "react-icons/tb";
import {
  DEFAULT_WAVEFORM,
  useWaveformPlayback,
  type WaveformScrubProps,
} from "@/hooks/use-waveform-playback";
import { cn } from "@/lib/utils";

// Theme-token variant: uses the shadcn CSS variables (background, muted, foreground, border)
// so it follows the site's palette in both light and dark mode.

const STRIPES =
  "linear-gradient(-45deg, var(--foreground) 25%, transparent 25%, transparent 50%, var(--foreground) 50%, var(--foreground) 75%, transparent 75%, transparent)";

const HANDLE_CLIP =
  "polygon(15% 0%, 85% 0%, 100% 20%, 100% 60%, 60% 100%, 40% 100%, 0% 60%, 0% 20%)";

/** 127 -> "2:07" */
function formatClock(totalSeconds: number) {
  const seconds = Math.max(0, Math.round(totalSeconds));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export const WaveformScrub: React.FC<WaveformScrubProps> = ({
  duration = 30,
  fileName = "Mom.mp3",
  waveformHeights = DEFAULT_WAVEFORM,
  src,
  playing,
  onPlayingChange,
  onEnded,
  className,
}) => {
  const p = useWaveformPlayback({ src, duration, playing, onPlayingChange, onEnded });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") p.seek(p.currentTime + 5);
    else if (event.key === "ArrowLeft") p.seek(p.currentTime - 5);
    else if (event.key === "Home") p.seek(0);
    else if (event.key === "End") p.seek(p.duration);
    else return;
    event.preventDefault();
  };

  return (
    <div className={cn("w-full px-4 py-10", className)}>
      {src ? <audio ref={p.audioRef} src={src} preload="metadata" /> : null}
      <div className="flex min-h-full min-w-0 flex-col items-center justify-center font-sans antialiased">
        <div className="w-full min-w-0 rounded-md border border-border bg-elevated px-2 pt-3 pb-2.5 transition-colors duration-300">
          <div className="mb-3 flex min-w-0 items-center justify-between gap-3 px-2">
            <div className="flex min-w-0 items-center gap-2 overflow-hidden">
              {/* One stable button (so keyboard focus survives play/pause); only the icon swaps. */}
              <button
                type="button"
                aria-label={p.isFinished ? "Replay" : p.isPlaying ? "Pause" : "Play"}
                onClick={p.togglePlay}
                className="z-20 grid size-7 shrink-0 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={p.isFinished ? "reset" : p.isPlaying ? "pause" : "play"}
                    initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                    className="grid place-items-center"
                  >
                    {p.isFinished ? (
                      <TbRotateClockwise2 size={20} aria-hidden="true" />
                    ) : p.isPlaying ? (
                      <TbPlayerPauseFilled size={20} aria-hidden="true" />
                    ) : (
                      <TbPlayerPlayFilled size={20} aria-hidden="true" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
              <span className="min-w-0 truncate text-sm font-medium text-foreground transition-colors">
                {fileName}
              </span>
            </div>
            <span
              className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground transition-colors"
              aria-label={`${formatClock(p.displayTime)} remaining`}
            >
              -{formatClock(p.displayTime)}
            </span>
          </div>

          <div
            className="border-border bg-background relative flex h-17 items-center justify-center rounded-sm border"
            style={{
              boxShadow: "inset 0 1px 4px color-mix(in oklab, var(--foreground) 5%, transparent)",
            }}
          >
            <motion.div
              style={{
                width: p.activeProgress,
                backgroundImage: STRIPES,
                backgroundSize: "4px 4px",
              }}
              animate={{ backgroundPositionX: ["0px", "4px"] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
              className="pointer-events-none absolute inset-y-0 left-0 rounded-l-sm opacity-[0.05]"
            />

            <div ref={p.waveformRef} className="relative mx-2 h-7 w-full">
              <div className="absolute inset-0 flex w-full items-center justify-between">
                {waveformHeights.map((h, i) => (
                  <div
                    key={i}
                    className="bg-muted-foreground/50 w-1 shrink-0 rounded-lg transition-colors sm:w-0.75"
                    style={{ height: `${h * 0.1}rem` }}
                  />
                ))}
              </div>

              <motion.div
                style={{ width: p.activeProgress }}
                className="pointer-events-none absolute inset-y-0 left-0 z-10 overflow-hidden"
              >
                <div
                  className="flex h-full items-center justify-between"
                  style={{ width: p.containerWidth }}
                >
                  {waveformHeights.map((h, i) => (
                    <div
                      key={i}
                      className="bg-foreground w-1 shrink-0 rounded-lg transition-colors sm:w-0.75"
                      style={{ height: `${h * 0.1}rem` }}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: p.containerWidth }}
                dragElastic={0}
                dragMomentum={false}
                onDragStart={p.onDragStart}
                onDragEnd={p.onDragEnd}
                role="slider"
                tabIndex={0}
                aria-label={`Seek ${fileName}`}
                aria-valuemin={0}
                aria-valuemax={Math.round(p.duration)}
                aria-valuenow={Math.round(p.currentTime)}
                aria-valuetext={`${formatClock(p.currentTime)} of ${formatClock(p.duration)}`}
                onKeyDown={handleKeyDown}
                style={{ x: p.x, left: -10 }}
                className="focus-visible:ring-ring absolute -top-7 z-10 flex h-18 cursor-grab flex-col items-center rounded-sm outline-none focus-visible:ring-2 active:cursor-grabbing"
              >
                <div
                  className="bg-foreground h-4.5 w-5.5 transition-colors"
                  style={{
                    clipPath: HANDLE_CLIP,
                    boxShadow: "0 4px 20px color-mix(in oklab, var(--foreground) 30%, transparent)",
                  }}
                />
                <div className="bg-foreground w-1 flex-1 rounded-b-lg shadow-md transition-colors" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
