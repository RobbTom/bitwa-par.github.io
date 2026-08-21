import React from 'react';
import { GameSettings } from '../types';
import { Flame, Sparkles, Heart, Users, Trophy } from 'lucide-react';
import { sounds } from '../utils/audio';
import { motion } from 'motion/react';

interface HomeScreenProps {
  settings: GameSettings;
  candidateCount: number;
  onStartGame: () => void;
  onOpenGallery: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  settings,
  candidateCount,
  onStartGame,
  onOpenGallery,
}) => {
  return (
    <div
      id="home-screen-container"
      className="flex-grow flex items-center justify-center p-4 md:p-8 relative min-h-[calc(100vh-160px)]"
    >
      {/* Ambient background glowing gradient blobs in Tinder red & dark tones */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-96 h-96 bg-[#ff2056]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#ff3b68]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Tinder Dark Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        id="home-glass-card"
        className="w-full max-w-lg mx-auto rounded-[36px] md:rounded-[44px] p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden bg-[#1f2128]/85 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/80 transition-all duration-300"
      >
        {/* Decorative Floating Tinder Flames */}
        <div className="absolute -top-8 -right-8 text-[#ff2056]/10 pointer-events-none select-none">
          <Flame className="w-36 h-36 fill-current" />
        </div>
        <div className="absolute -bottom-8 -left-8 text-[#ff2056]/10 pointer-events-none select-none">
          <Heart className="w-28 h-28 fill-current" />
        </div>

        {/* Tinder Pill Tag */}
        <div className="relative z-10 mb-5 inline-flex items-center gap-2 bg-[#ff2056]/15 px-4 py-1.5 rounded-full border border-[#ff2056]/30 text-white text-xs font-bold shadow-sm">
          <Flame className="w-4 h-4 text-[#ff2056] fill-[#ff2056]" />
          <span className="uppercase tracking-widest text-[11px]">Bachelorette Matchmaker</span>
        </div>

        {/* Brand / Title */}
        <div className="space-y-1.5 z-10">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight font-sans">
            The Last Swipe
          </h1>
          <p className="text-sm md:text-base text-[#ff2056] font-bold tracking-wide">
            Wieczór Panieński {settings.brideName || 'Iwonki'}
          </p>
        </div>

        {/* Intro Subtitle */}
        <p className="text-sm md:text-base text-zinc-300 max-w-sm mx-auto z-10 pt-4 leading-relaxed font-normal">
          Wybieraj faworytów w bitwie par, odrzucaj niechciane profile ze swipem i zdemaskuj dziewczyny w wielkim finale!
        </p>

        {/* Candidates Count Badge */}
        <div className="z-10 mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16171b]/80 border border-white/10 backdrop-blur-md text-xs font-bold text-white shadow-inner">
          <Users className="w-3.5 h-3.5 text-[#ff2056]" />
          <span>{candidateCount} kandydatek do swipowania</span>
        </div>

        {/* Call to Action Buttons */}
        <div className="pt-8 w-full z-10 space-y-3">
          <button
            id="btn-start-game-cta"
            onClick={() => {
              sounds.playHeart();
              onStartGame();
            }}
            className="w-full bg-[#ff2056] hover:bg-[#ff3869] text-white text-base font-extrabold py-4 px-8 rounded-full shadow-lg shadow-[#ff2056]/30 hover:shadow-[#ff2056]/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <Flame className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
            <span className="tracking-wide">Rozpocznij The Last Swipe</span>
          </button>

          <button
            id="btn-open-gallery-sub"
            onClick={() => {
              sounds.playWhoosh();
              onOpenGallery();
            }}
            className="w-full bg-[#16171b]/60 hover:bg-[#16171b] text-white text-sm font-bold py-3 px-6 rounded-full border border-white/10 backdrop-blur-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4 text-[#ff2056]" />
            <span>Przeglądaj wszystkie profile</span>
          </button>
        </div>

        {/* Footer info */}
        <p className="text-[11px] text-zinc-400 z-10 mt-6 tracking-wider font-semibold uppercase flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-[#ff2056]" />
          Gotowi na noc pełną śmiechu i niespodzianek? 🍸
        </p>
      </motion.div>
    </div>
  );
};

