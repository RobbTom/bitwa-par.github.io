import React, { useState, useEffect } from 'react';
import { Candidate } from '../types';
import { Flame, Briefcase, Info, X } from 'lucide-react';
import { sounds } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';

interface BattleScreenProps {
  currentPair: [Candidate, Candidate];
  round: number;
  totalRounds: number;
  onSelectWinner: (selected: Candidate, defeated: Candidate) => void;
}

/**
 * The card photo. Swaps instantly — deliberately no fade.
 *
 * A crossfade here is not just unnecessary, it is wrong: once a round is
 * decided the card belongs to the *next* candidate, so any fade means the
 * previous person stays visible on their opponent's card for the duration of
 * the transition. The swipe animation already carries the visual change.
 *
 * There is no `key` on the <img> on purpose. Keying by src would make React
 * destroy the element and mount a fresh one, which can paint an empty frame;
 * mutating `src` on the same node keeps the current pixels up until the new
 * bitmap is ready. Since every photo is preloaded *and decoded* at startup
 * (see utils/preloadImages), "ready" is effectively the very next frame.
 */
const CardPhoto: React.FC<{ src: string; alt: string; className: string }> = ({
  src,
  alt,
  className,
}) => (
  <img
    src={src}
    alt={alt}
    className={className}
    loading="eager"
    decoding="sync"
    draggable={false}
  />
);

export const BattleScreen: React.FC<BattleScreenProps> = ({
  currentPair,
  round,
  totalRounds,
  onSelectWinner,
}) => {
  const [candidateA, candidateB] = currentPair;
  // Selected winner ID
  const [selectedWinnerId, setSelectedWinnerId] = useState<string | null>(null);
  // Defeated loser ID
  const [rejectedId, setRejectedId] = useState<string | null>(null);
  // Direction for rejected card swipe: 'left' | 'right'
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right'>('left');
  // Expanded bio modal / overlay candidate
  const [expandedCandidate, setExpandedCandidate] = useState<Candidate | null>(null);
  // While true the cards snap to their neutral pose instead of animating there.
  const [snapBack, setSnapBack] = useState(false);

  const progressPercentage = Math.min(100, Math.round((round / totalRounds) * 100));

  const handlePick = (winner: Candidate, loser: Candidate, isCardA: boolean) => {
    if (selectedWinnerId || rejectedId) return; // Prevent spam clicks during animation

    setSelectedWinnerId(winner.id);
    setRejectedId(loser.id);
    setSwipeDirection(isCardA ? 'right' : 'left');

    sounds.playWhoosh();
    sounds.playHeart();

    // After animation completes, propagate choice to parent
    setTimeout(() => {
      // The rejected card is currently thrown off-screen (shifted, rotated,
      // transparent). Clearing that state would otherwise make Framer *animate*
      // it back — the next challenger would visibly fly in from the side and
      // fade up from zero. Snapping instead puts the fresh pair straight into
      // place, then normal animation is restored for the next round.
      setSnapBack(true);
      onSelectWinner(winner, loser);
      setSelectedWinnerId(null);
      setRejectedId(null);
    }, 550);
  };

  // Re-enable animation once the snapped-back frame has been painted.
  useEffect(() => {
    if (!snapBack) return;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setSnapBack(false)),
    );
    return () => cancelAnimationFrame(raf);
  }, [snapBack]);

  const cardTransition = snapBack
    ? { duration: 0 }
    : { duration: 0.45, ease: 'easeInOut' as const };

  return (
    <div
      id="battle-screen-container"
      className="flex-grow flex flex-col items-center justify-between px-3 md:px-6 py-4 w-full max-w-5xl mx-auto min-h-[calc(100vh-140px)] relative"
    >
      {/* Top Round & Progress Bar */}
      <div className="w-full max-w-xl mb-4 flex flex-col items-center gap-1.5">
        <div className="flex items-center justify-between w-full text-xs md:text-sm font-extrabold text-zinc-300">
          <span className="flex items-center gap-1.5 text-white">
            <Flame className="w-4 h-4 text-[#ff2056] fill-[#ff2056]" />
            Runda {round} z {totalRounds}
          </span>
          <span className="text-[#ff2056] bg-[#ff2056]/15 px-2.5 py-0.5 rounded-full border border-[#ff2056]/30">
            {progressPercentage}%
          </span>
        </div>

        {/* Progress Track */}
        <div className="w-full h-2 rounded-full bg-[#1f2128] border border-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.4 }}
            className="h-full bg-gradient-to-r from-[#ff2056] to-[#ff476e] rounded-full"
          />
        </div>
        <p className="text-xs text-zinc-400 text-center font-medium mt-0.5">
          Kliknij na faceta lub serce ♥, aby wybrać faworyta!
        </p>
      </div>

      {/* Main Duel Arena (Side by Side on Desktop, Stacked on Mobile) */}
      <div className="w-full flex-grow flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-4xl relative my-auto">
        {/* Card 1 (Left / Defender) */}
        <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.96 }}
            animate={{
              opacity: rejectedId === candidateA.id ? 0 : 1,
              x: rejectedId === candidateA.id ? (swipeDirection === 'left' ? -350 : 350) : 0,
              y: rejectedId === candidateA.id ? 50 : 0,
              rotate: rejectedId === candidateA.id ? -30 : selectedWinnerId === candidateA.id ? 2 : 0,
              scale: selectedWinnerId === candidateA.id ? 1.05 : rejectedId === candidateA.id ? 0.85 : 1,
            }}
            transition={cardTransition}
            id={`battle-card-${candidateA.id}`}
            onClick={() => handlePick(candidateA, candidateB, true)}
            className={`tinder-card-hover relative w-full md:w-1/2 aspect-[3/4] rounded-[32px] md:rounded-[36px] border bg-[#1f2128] shadow-2xl shadow-black/80 overflow-hidden flex flex-col group cursor-pointer ${
              selectedWinnerId === candidateA.id
                ? 'ring-4 ring-[#ff2056] border-[#ff2056] shadow-[#ff2056]/30'
                : 'border-white/10 hover:border-white/30'
            }`}
          >
            {/* Card inner */}
            <div className="relative w-full flex-grow h-full overflow-hidden rounded-[32px] md:rounded-[36px] bg-[#16171b]">
              <CardPhoto
                src={candidateA.fakePhotoUrl}
                alt={candidateA.fakeName}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#141518]/90 to-transparent pointer-events-none" />

              {/* Info Button to Open Full Bio */}
              <button
                type="button"
                aria-label={`Więcej informacji o ${candidateA.fakeName}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedCandidate(candidateA);
                }}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
              >
                <Info className="w-4 h-4 text-white" />
              </button>

              {/* Fake Profile Details Overlay */}
              <div className="absolute bottom-0 left-0 p-4 md:p-5 w-full text-white pointer-events-none">
                <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-white drop-shadow-md leading-tight">
                  {candidateA.fakeName}
                  {candidateA.fakeAge ? `, ${candidateA.fakeAge}` : ''}
                </h2>
                {candidateA.fakeJob && (
                  <p className="text-xs md:text-sm text-[#ff476e] flex items-center gap-1.5 mt-0.5 font-bold">
                    <Briefcase className="w-3.5 h-3.5 text-[#ff2056] shrink-0" />
                    {candidateA.fakeJob}
                  </p>
                )}
                {candidateA.fakeBio && (
                  <p className="text-xs md:text-[13px] text-zinc-200 mt-2 line-clamp-4 md:line-clamp-5 leading-relaxed font-normal bg-black/20 backdrop-blur-sm p-3 rounded-2xl border border-white/10 shadow-lg">
                    "{candidateA.fakeBio}"
                  </p>
                )}
              </div>
            </div>
        </motion.div>

        {/* Mobile VS Badge */}
        <div className="md:hidden z-10 bg-gradient-to-tr from-[#ff2056] to-[#ff476e] text-white font-black text-sm rounded-full w-10 h-10 flex items-center justify-center shadow-lg border border-white/20 my-1 select-none">
          VS
        </div>

        {/* Card 2 (Right / Challenger) */}
        <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            animate={{
              opacity: rejectedId === candidateB.id ? 0 : 1,
              x: rejectedId === candidateB.id ? (swipeDirection === 'right' ? 350 : -350) : 0,
              y: rejectedId === candidateB.id ? 50 : 0,
              rotate: rejectedId === candidateB.id ? 30 : selectedWinnerId === candidateB.id ? -2 : 0,
              scale: selectedWinnerId === candidateB.id ? 1.05 : rejectedId === candidateB.id ? 0.85 : 1,
            }}
            transition={cardTransition}
            id={`battle-card-${candidateB.id}`}
            onClick={() => handlePick(candidateB, candidateA, false)}
            className={`tinder-card-hover relative w-full md:w-1/2 aspect-[3/4] rounded-[32px] md:rounded-[36px] border bg-[#1f2128] shadow-2xl shadow-black/80 overflow-hidden flex flex-col group cursor-pointer ${
              selectedWinnerId === candidateB.id
                ? 'ring-4 ring-[#ff2056] border-[#ff2056] shadow-[#ff2056]/30'
                : 'border-white/10 hover:border-white/30'
            }`}
          >
            {/* Card inner */}
            <div className="relative w-full flex-grow h-full overflow-hidden rounded-[32px] md:rounded-[36px] bg-[#16171b]">
              <CardPhoto
                src={candidateB.fakePhotoUrl}
                alt={candidateB.fakeName}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#141518]/90 to-transparent pointer-events-none" />

              {/* Info Button to Open Full Bio */}
              <button
                type="button"
                aria-label={`Więcej informacji o ${candidateB.fakeName}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedCandidate(candidateB);
                }}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
              >
                <Info className="w-4 h-4 text-white" />
              </button>

              {/* Fake Profile Details Overlay */}
              <div className="absolute bottom-0 left-0 p-4 md:p-5 w-full text-white pointer-events-none">
                <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-white drop-shadow-md leading-tight">
                  {candidateB.fakeName}
                  {candidateB.fakeAge ? `, ${candidateB.fakeAge}` : ''}
                </h2>
                {candidateB.fakeJob && (
                  <p className="text-xs md:text-sm text-[#ff476e] flex items-center gap-1.5 mt-0.5 font-bold">
                    <Briefcase className="w-3.5 h-3.5 text-[#ff2056] shrink-0" />
                    {candidateB.fakeJob}
                  </p>
                )}
                {candidateB.fakeBio && (
                  <p className="text-xs md:text-[13px] text-zinc-200 mt-2 line-clamp-4 md:line-clamp-5 leading-relaxed font-normal bg-black/20 backdrop-blur-sm p-3 rounded-2xl border border-white/10 shadow-lg">
                    "{candidateB.fakeBio}"
                  </p>
                )}
              </div>
            </div>
        </motion.div>
      </div>

      {/* Full Bio Modal (Tinder Profile Details Sheet) */}
      <AnimatePresence>
        {expandedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#1f2128] border border-white/15 rounded-[32px] overflow-hidden shadow-2xl text-white max-h-[85vh] flex flex-col"
            >
              {/* Header with photo preview */}
              <div className="relative h-48 bg-[#16171b] shrink-0">
                <img
                  src={expandedCandidate.fakePhotoUrl}
                  alt={expandedCandidate.fakeName}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f2128] via-transparent to-black/50" />
                <button
                  type="button"
                  onClick={() => setExpandedCandidate(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-transform hover:scale-110 cursor-pointer border border-white/20"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-5">
                  <h3 className="text-2xl font-black text-white">
                    {expandedCandidate.fakeName}
                    {expandedCandidate.fakeAge ? `, ${expandedCandidate.fakeAge}` : ''}
                  </h3>
                </div>
              </div>

              {/* Bio content */}
              <div className="p-6 overflow-y-auto space-y-4">
                {expandedCandidate.fakeJob && (
                  <div className="flex items-center gap-2 text-sm text-zinc-200 font-semibold bg-[#282b35] px-3.5 py-2 rounded-xl border border-white/10">
                    <Briefcase className="w-4 h-4 text-[#ff2056] shrink-0" />
                    <span>{expandedCandidate.fakeJob}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-white/10">
                  <h4 className="text-xs uppercase tracking-wider font-extrabold text-[#ff2056] mb-2 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    O mnie
                  </h4>
                  <p className="text-sm text-zinc-200 leading-relaxed font-normal whitespace-pre-line bg-[#16171b] p-4 rounded-2xl border border-white/10">
                    {expandedCandidate.fakeBio}
                  </p>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-4 bg-[#1a1c22] border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setExpandedCandidate(null)}
                  className="w-full py-2.5 rounded-full bg-[#ff2056] hover:bg-[#ff3869] text-white font-extrabold text-sm shadow-md shadow-[#ff2056]/30 transition-all cursor-pointer"
                >
                  Zamknij
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
