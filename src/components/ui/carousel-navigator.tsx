"use client";

import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type FC, type ReactNode } from "react";

type ThemeConfig = {
  bg: string;
  button: string;
  dot: string;
  progress: string;
};

interface CarouselNavigatorProps {
  totalSlides?: number;
  autoDelay?: number;
  themes?: ThemeConfig[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const DEFAULT_TOTAL_SLIDES = 4;
const DEFAULT_AUTO_DELAY = 5000;

const FALLBACK_THEME: ThemeConfig = {
  bg: "bg-zinc-100",
  button: "bg-zinc-900",
  dot: "bg-zinc-300",
  progress: "bg-zinc-300",
};

const DEFAULT_THEMES: ThemeConfig[] = [
  FALLBACK_THEME,
  {
    bg: "bg-blue-100",
    button: "bg-blue-600",
    dot: "bg-blue-300",
    progress: "bg-blue-300",
  },
  {
    bg: "bg-green-100",
    button: "bg-green-600",
    dot: "bg-green-400",
    progress: "bg-green-400",
  },
  {
    bg: "bg-yellow-100",
    button: "bg-yellow-400",
    dot: "bg-yellow-300",
    progress: "bg-yellow-300",
  },
];

/** `bg-[#F4F4F9]` -> `#F4F4F9`, so the track colour can animate. Named classes stay static. */
function arbitraryColor(bgClass: string): string | undefined {
  return bgClass.match(/^bg-\[(.+)\]$/)?.[1];
}

export const CarouselNavigator: FC<CarouselNavigatorProps> = ({
  totalSlides = DEFAULT_TOTAL_SLIDES,
  autoDelay = DEFAULT_AUTO_DELAY,
  themes = DEFAULT_THEMES,
  currentIndex,
  onIndexChange,
}) => {
  const theme = themes[currentIndex] ?? themes[0] ?? FALLBACK_THEME;
  const trackColor = arbitraryColor(theme.bg);

  const goPrev = () => onIndexChange((currentIndex - 1 + totalSlides) % totalSlides);
  const goNext = () => onIndexChange((currentIndex + 1) % totalSlides);

  return (
    <motion.div
      animate={trackColor ? { backgroundColor: trackColor } : {}}
      className={`flex items-center justify-center gap-1 rounded-full px-4 py-3 transition-colors duration-300 ${trackColor ? "" : theme.bg}`}
    >
      <ArrowButton
        label="Previous slide"
        onClick={goPrev}
        themeColor={theme.button}
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={24} strokeWidth={3} />
      </ArrowButton>

      <div className="flex items-center gap-2 px-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <Indicator
            key={i}
            index={i}
            isActive={i === currentIndex}
            theme={theme}
            autoDelay={autoDelay}
            onClick={() => onIndexChange(i)}
          />
        ))}
      </div>

      <ArrowButton label="Next slide" onClick={goNext} themeColor={theme.button}>
        <ChevronRight size={24} strokeWidth={3} />
      </ArrowButton>
    </motion.div>
  );
};

const ArrowButton = ({
  children,
  label,
  onClick,
  themeColor,
  disabled = false,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  themeColor: string;
  disabled?: boolean;
}) => {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      disabled={disabled}
      className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white shadow-sm transition-colors duration-300 disabled:cursor-not-allowed ${disabled ? "bg-gray-300 opacity-50" : themeColor}`}
    >
      {children}
    </motion.button>
  );
};

const Indicator = ({
  index,
  isActive,
  theme,
  autoDelay,
  onClick,
}: {
  index: number;
  isActive: boolean;
  theme: ThemeConfig;
  autoDelay: number;
  onClick: () => void;
}) => {
  return (
    <motion.button
      type="button"
      aria-label={`Go to slide ${index + 1}`}
      aria-current={isActive ? "true" : undefined}
      onClick={onClick}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ borderRadius: 24 }}
      className={`relative h-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isActive ? `w-12 ${theme.progress}` : `w-3 ${theme.dot}`} transition-colors duration-300`}
    >
      {isActive && (
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: autoDelay / 1000, ease: "linear" }}
          className="absolute inset-0 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        />
      )}
    </motion.button>
  );
};
