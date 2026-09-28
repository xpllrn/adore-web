import { CarouselNavigator } from "./carousel-navigator";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const customThemes = [
  {
    bg: "bg-[#F4F4F9]",
    button: "bg-[#262629]",
    dot: "bg-[#D5D4E0]",
    progress: "bg-[#D5D4E0]",
  },
  {
    bg: "bg-[#E7F1FD]",
    button: "bg-[#016FFE]",
    dot: "bg-[#89BCF9]",
    progress: "bg-[#89BCF9]",
  },
  {
    bg: "bg-[#E0FAE7]",
    button: "bg-[#2EBE50]",
    dot: "bg-[#38E363]",
    progress: "bg-[#38E363]",
  },
  {
    bg: "bg-[#FCF5DB]",
    button: "bg-[#FEC400]",
    dot: "bg-[#FAD34C]",
    progress: "bg-[#FAD34C]",
  },
];

const IMAGES = [
  "https://images.unsplash.com/photo-1506744626753-eda8151a74a4?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1200&auto=format&fit=crop",
];

export default function CarouselNavigatorDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = IMAGES.length;
  const autoDelay = 4000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, autoDelay);
    return () => clearInterval(timer);
  }, [currentIndex, autoDelay, totalSlides]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full max-w-4xl mx-auto p-4">
      <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-zinc-100 shadow-lg">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentIndex}
            src={IMAGES[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      <CarouselNavigator
        totalSlides={totalSlides}
        autoDelay={autoDelay}
        themes={customThemes}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />
    </div>
  );
}
