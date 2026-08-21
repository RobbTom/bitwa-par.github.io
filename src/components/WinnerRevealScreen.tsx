import React, { useState } from 'react';
import { Candidate } from '../types';
import { Briefcase, EyeOff, ArrowRight, RotateCcw, Trophy, PartyPopper, Heart, Flame } from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';

interface WinnerRevealScreenProps {
  winner: Candidate;
  onPlayAgain: () => void;
  onOpenGallery: () => void;
}

export const WinnerRevealScreen: React.FC<WinnerRevealScreenProps> = ({
  winner,
  onPlayAgain,
  onOpenGallery,
}) => {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const triggerConfetti = () => {
    // Multi-burst party confetti in Tinder red #ff2056, gold, white, and coral
    const colors = ['#ff2056', '#ff476e', '#ff6b8b', '#ffd700', '#ffffff', '#20d994'];

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors,
    });

    setTimeout(() => {
      confetti({
        particleCount: 70,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 70,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors,
      });
    }, 250);
  };

  const handleReveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    sounds.playReveal();
    triggerConfetti();
  };

  return (
    <div
      id="winner-reveal-container"
      className="flex-grow flex flex-col items-center justify-center px-4 md:px-8 py-6 w-full max-w-5xl mx-auto min-h-[calc(100vh-160px)] relative"
    >
      {/* Ambient background glowing gradient blobs */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-96 h-96 bg-[#ff2056]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#ff476e]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with celebration accents */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 w-full max-w-xl z-10"
      >
        <div className="inline-flex p-3 rounded-full bg-[#ff2056]/15 border border-[#ff2056]/30 text-[#ff2056] mb-2 animate-bounce">
          <Flame className="w-8 h-8 text-[#ff2056] fill-[#ff2056]" />
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight font-sans">
          The Last Swipe: Zwycięzca!
        </h1>
        <p className="text-sm md:text-base text-zinc-300 mt-2 max-w-md mx-auto font-medium">
          Oto Twój ostateczny wybór! Czas zdemaskować profil i odkryć prawdziwą twarz.
        </p>
      </motion.div>

      {/* Side-by-side Dual Cards (Left: Fake persona, Right: Real reveal) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full max-w-4xl mx-auto z-10">
        {/* Left Card: Fake Profile (The "Man") */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          id="winner-fake-card"
          className="relative w-full aspect-[3/4] md:aspect-[4/5] rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl shadow-black/80 group bg-[#1f2128] border border-white/10"
        >
          {/* Fake Photo */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${winner.fakePhotoUrl}')` }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141518] via-[#141518]/60 to-transparent pointer-events-none" />

          {/* Card Details */}
          <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex flex-col justify-end h-full text-white pointer-events-none">
            <h2 className="font-sans text-2xl md:text-4xl font-extrabold text-white mb-1 drop-shadow-md leading-tight">
              {winner.fakeName}
              {winner.fakeAge ? `, ${winner.fakeAge}` : ''}
            </h2>
            {winner.fakeJob && (
              <p className="text-xs md:text-sm text-[#ff476e] flex items-center gap-1.5 font-bold">
                <Briefcase className="w-3.5 h-3.5 text-[#ff2056] shrink-0" />
                {winner.fakeJob}
              </p>
            )}
            {winner.fakeBio && (
              <p className="text-xs md:text-[13px] text-zinc-200 mt-2.5 italic font-normal line-clamp-5 md:line-clamp-6 leading-relaxed bg-black/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 shadow-xl">
                "{winner.fakeBio}"
              </p>
            )}
          </div>
        </motion.div>

        {/* Right Card: True Identity (Interactive Reveal) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          id="winner-real-card"
          onClick={() => {
            if (!isRevealed) handleReveal();
          }}
          className={`relative w-full aspect-[3/4] md:aspect-[4/5] rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl shadow-black/80 border bg-[#1f2128] transition-all ${
            !isRevealed ? 'cursor-pointer border-white/10 hover:border-[#ff2056]/50' : 'border-[#ff2056]'
          }`}
        >
          {/* Real Photo */}
          <div
            id="winner-real-photo"
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out ${
              isRevealed ? 'scale-100 filter-none' : 'scale-110 blur-xs'
            }`}
            style={{ backgroundImage: `url('${winner.realPhotoUrl}')` }}
          />

          {/* Real Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-[#16171b] via-[#16171b]/40 to-transparent transition-opacity duration-700 ${
              isRevealed ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Real Info Content (Revealed State) */}
          <div
            id="winner-real-info"
            className={`absolute bottom-0 left-0 p-6 md:p-8 w-full flex flex-col justify-end h-full z-20 text-white transition-all duration-700 ${
              isRevealed
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
          >
            <div className="inline-flex items-center gap-1.5 bg-[#ff2056] text-white px-3.5 py-1 rounded-full text-xs font-bold mb-3 w-fit shadow-lg shadow-[#ff2056]/40 animate-pulse">
              <PartyPopper className="w-3.5 h-3.5" />
              Prawdziwa tożsamość
            </div>
            <h2 className="font-sans text-2xl md:text-4xl font-extrabold text-white mb-1 drop-shadow-md leading-tight">
              {winner.realName}
              {winner.realAge ? `, ${winner.realAge}` : ''}
            </h2>
            {winner.realRole && (
              <p className="text-sm md:text-base font-bold text-[#ff476e]">
                {winner.realRole}
              </p>
            )}
            {winner.realQuote && (
              <p className="text-xs md:text-sm text-zinc-200 mt-2 italic font-normal">
                "{winner.realQuote}"
              </p>
            )}
          </div>

          {/* Masked / Blur Overlay (Initial State before click) */}
          <div
            id="winner-blur-overlay"
            className={`absolute inset-0 backdrop-blur-xl bg-[#1f2128]/85 flex flex-col items-center justify-center p-6 md:p-8 text-center transition-all duration-500 z-30 ${
              isRevealed
                ? 'opacity-0 pointer-events-none'
                : 'opacity-100 pointer-events-auto'
            }`}
          >
            <div className="bg-[#16171b] w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow-inner text-[#ff2056] border border-white/10">
              <EyeOff className="w-10 h-10 opacity-90" />
            </div>
            <h3 className="font-sans text-xl md:text-2xl font-black text-white mb-1.5">
              Kto to tak naprawdę jest?
            </h3>
            <p className="text-xs md:text-sm text-zinc-300 mb-6 max-w-xs font-medium">
              Kliknij przycisk poniżej, aby zdemaskować profil i poznać prawdziwą twarz!
            </p>
            <button
              id="btn-reveal-face"
              onClick={(e) => {
                e.stopPropagation();
                handleReveal();
              }}
              className="bg-[#ff2056] hover:bg-[#ff3869] text-white px-6 py-3.5 rounded-full text-sm font-extrabold shadow-lg shadow-[#ff2056]/30 hover:shadow-[#ff2056]/50 transition-all duration-300 active:scale-95 flex items-center gap-2 group w-full max-w-[260px] justify-center cursor-pointer"
            >
              <span>Odkryj prawdziwą twarz</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons following reveal */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center z-10"
      >
        <button
          id="btn-play-again"
          onClick={() => {
            sounds.playHeart();
            onPlayAgain();
          }}
          className="w-full sm:w-auto bg-[#ff2056] hover:bg-[#ff3869] text-white font-extrabold px-7 py-3.5 rounded-full transition-all shadow-lg shadow-[#ff2056]/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Zagraj ponownie</span>
        </button>

        <button
          id="btn-goto-gallery"
          onClick={() => {
            sounds.playWhoosh();
            onOpenGallery();
          }}
          className="w-full sm:w-auto bg-[#1f2128] hover:bg-[#282b35] text-white border border-white/10 backdrop-blur-md font-bold px-7 py-3.5 rounded-full transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-sm"
        >
          <Trophy className="w-4 h-4 text-[#ff2056]" />
          <span>Wszystkie profile</span>
        </button>
      </motion.div>

      {/* Celebration Note */}
      {isRevealed && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-[#ff476e] font-bold mt-4 flex items-center gap-1.5 animate-pulse z-10"
        >
          <Heart className="w-3.5 h-3.5 fill-[#ff2056] text-[#ff2056]" />
          Gratulacje! Najlepsza partia wieczoru została zdemaskowana!
        </motion.p>
      )}
    </div>
  );
};

