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

export type { WaveformScrubProps };

const STRIPES =
  "linear-gradient(-45deg, currentColor 25%, transparent 25%, transparent 50%, currentColor 50%, currentColor 75%, transparent 75%, transparent)";

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
      <div className="flex min-h-full flex-col items-center justify-center bg-transparent font-sans antialiased">
        <div className="w-full max-w-110 rounded-[24px] bg-neutral-100 px-2 pt-4 pb-3 shadow-sm transition-colors duration-300 dark:bg-neutral-900">
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
                  className="z-20 shrink-0 cursor-pointer text-neutral-500 dark:text-neutral-100"
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
              <span className="truncate text-[17px] font-normal tracking-tight text-neutral-500 transition-colors sm:text-[19px] dark:text-neutral-100">
                {fileName}
              </span>
            </div>
            <span className="shrink-0 text-[18px] font-semibold text-neutral-500 tabular-nums transition-colors sm:text-[20px] dark:text-neutral-100">
              {p.displayTime}s
            </span>
          </div>

          <div className="relative flex h-17 items-center justify-center rounded-3xl border-[1.6px] border-[#fefefe]/70 bg-[#fefefe] shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)] dark:border-[#0A0A0A]/70 dark:bg-neutral-800">
            <motion.div
              style={{
                width: p.activeProgress,
                backgroundImage: STRIPES,
                backgroundSize: "4px 4px",
              }}
              animate={{ backgroundPositionX: ["0px", "4px"] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
              className="pointer-events-none absolute inset-y-0 left-0 rounded-l-3xl text-black opacity-[0.04] transition-opacity dark:text-white dark:opacity-[0.1]"
            />

            <div ref={p.waveformRef} className="relative mx-2 h-7 w-full">
              <div className="absolute inset-0 flex w-full items-center justify-between">
                {waveformHeights.map((h, i) => (
                  <div
                    key={i}
                    className="w-1 shrink-0 rounded-full bg-neutral-200 transition-colors sm:w-0.75 dark:bg-neutral-400"
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
                      className="w-1 shrink-0 rounded-full bg-neutral-800 transition-colors sm:w-0.75 dark:bg-neutral-100"
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
                className="absolute -top-7 z-10 flex h-18 cursor-grab flex-col items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 active:cursor-grabbing"
              >
                <div
                  className="h-4.5 w-5.5 bg-[#1C1C1E] shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-colors dark:bg-white"
                  style={{ clipPath: HANDLE_CLIP }}
                />
                <div className="w-1 flex-1 rounded-b-full bg-[#1C1C1E] shadow-md transition-colors dark:bg-white" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
