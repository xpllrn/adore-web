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
      <div className="flex min-h-full flex-col items-center justify-center font-sans antialiased">
        <div className="bg-muted w-full max-w-110 rounded-lg px-2 pt-4 pb-3 shadow-sm transition-colors duration-300">
          <div className="mb-4 flex items-center justify-between gap-3 px-2 pr-4">
            <div className="flex items-center gap-2 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.button
                  type="button"
                  key={p.isFinished ? "reset" : p.isPlaying ? "pause" : "play"}
                  aria-label={p.isFinished ? "Replay" : p.isPlaying ? "Pause" : "Play"}
                  initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                  onClick={p.togglePlay}
                  className="text-muted-foreground hover:text-foreground z-20 shrink-0 cursor-pointer transition-colors"
                >
                  {p.isFinished ? (
                    <TbRotateClockwise2 size={22} />
                  ) : p.isPlaying ? (
                    <TbPlayerPauseFilled size={22} />
                  ) : (
                    <TbPlayerPlayFilled size={22} />
                  )}
                </motion.button>
              </AnimatePresence>
              <span className="text-muted-foreground truncate text-[17px] font-normal tracking-tight transition-colors sm:text-[19px]">
                {fileName}
              </span>
            </div>
            <span className="text-muted-foreground shrink-0 text-[18px] font-semibold tabular-nums transition-colors sm:text-[20px]">
              {p.displayTime}s
            </span>
          </div>

          <div
            className="border-border bg-background relative flex h-17 items-center justify-center rounded-lg border"
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
              className="pointer-events-none absolute inset-y-0 left-0 rounded-l-lg opacity-[0.05]"
            />

            <div ref={p.waveformRef} className="relative mx-2 h-7 w-full">
              <div className="absolute inset-0 flex w-full items-center justify-between">
                {waveformHeights.map((h, i) => (
                  <div
                    key={i}
                    className="bg-muted-foreground/50 w-1 shrink-0 rounded-lg transition-colors sm:w-0.75"
                    style={{ height: h * 1.6 }}
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
                      style={{ height: h * 1.6 }}
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
                aria-valuetext={`${Math.round(p.currentTime)} of ${Math.round(p.duration)} seconds`}
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
