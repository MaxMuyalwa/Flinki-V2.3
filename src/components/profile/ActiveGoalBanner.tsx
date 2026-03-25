import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ChevronRight } from 'lucide-react';
import { PEXELS_IMAGES } from '../../constants/images';
import { motion, AnimatePresence } from 'motion/react';

const CHALLENGES = [
  {
    id: 'dubai-marathon-2026',
    title: 'Dubai Marathon 2026',
    location: 'Dubai, UAE',
    image: PEXELS_IMAGES[9],
  },
  {
    id: 'tokyo-marathon-2026',
    title: 'Tokyo Marathon 2026',
    location: 'Tokyo, Japan',
    image: PEXELS_IMAGES[8],
  },
  {
    id: 'london-marathon-2026',
    title: 'London Marathon 2026',
    location: 'London, UK',
    image: PEXELS_IMAGES[7],
  },
  {
    id: 'berlin-marathon-2026',
    title: 'Berlin Marathon 2026',
    location: 'Berlin, Germany',
    image: PEXELS_IMAGES[6],
  }
];

export default function ActiveGoalBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CHALLENGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentChallenge = CHALLENGES[currentIndex];

  return (
    <div className="relative h-[220px] overflow-hidden bg-flinki-navy">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentChallenge.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image Overlay */}
          <div className="absolute inset-0">
            <img
              src={currentChallenge.image}
              alt=""
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="relative flex h-full flex-col justify-end p-4 sm:p-6">
            <div className="flex items-end justify-between">
              <div className="space-y-1 sm:space-y-2">
                <span className="inline-block rounded-full bg-black/50 px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md border border-white/10">
                  {currentChallenge.location}
                </span>
                <Link to={`/explore`} className="block group">
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-flinki-orange transition-colors flex items-center gap-2">
                    {currentChallenge.title}
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                  </h3>
                </Link>
              </div>
              
              <Link
                to="/explore"
                className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-flinki-orange px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-white hover:text-flinki-orange active:scale-95"
              >
                <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Join Challenge</span>
                <span className="sm:hidden">Join</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {CHALLENGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentIndex ? 'w-6 bg-flinki-orange' : 'w-1.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
