import React, { useState } from 'react';
import { Candidate } from '../types';
import { Sparkles, Heart, Search, Eye, EyeOff, RotateCw, Play, Flame, Briefcase, Info, X } from 'lucide-react';
import { sounds } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';

interface ResultsGalleryProps {
  candidates: Candidate[];
  onStartGame: () => void;
}

export const ResultsGallery: React.FC<ResultsGalleryProps> = ({
  candidates,
  onStartGame,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [selectedCandidateBio, setSelectedCandidateBio] = useState<Candidate | null>(null);

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        sounds.playReveal();
      }
      return next;
    });
  };

  const revealAll = () => {
    setRevealedIds(new Set(candidates.map((c) => c.id)));
    sounds.playFanfare();
  };

  const hideAll = () => {
    setRevealedIds(new Set());
  };

  const filteredCandidates = candidates.filter((c) => {
    const query = searchQuery.toLowerCase();
    return (
      c.fakeName.toLowerCase().includes(query) ||
      (c.fakeJob && c.fakeJob.toLowerCase().includes(query)) ||
      c.realName.toLowerCase().includes(query) ||
      c.realRole.toLowerCase().includes(query)
    );
  });

  return (
    <div
      id="results-gallery-container"
      className="flex-grow flex flex-col px-4 md:px-8 py-6 w-full max-w-6xl mx-auto min-h-[calc(100vh-140px)] relative"
    >
      {/* Ambient glowing blobs in background */}
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-[#ff2056]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#ff476e]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ff2056]/15 border border-[#ff2056]/30 text-[#ff2056] text-xs font-black uppercase tracking-wider mb-3">
          <Flame className="w-3.5 h-3.5 fill-current" />
          Katalog Uczestniczek
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight font-sans mb-2">
          Profile & Prawdziwe Twarze
        </h1>
        <p className="text-sm md:text-base text-zinc-300 max-w-xl mx-auto font-normal">
          Odkryj kto kryje się za fałszywym profilem! Kliknij <strong className="text-[#ff2056]">"Odkryj"</strong>, aby poznać prawdziwą tożsamość dziewczyn.
        </p>

        {/* Toolbar: Search and Bulk Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              id="input-gallery-search"
              type="text"
              placeholder="Szukaj po imieniu lub zawodzie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-full bg-[#1f2128] border border-white/10 focus:outline-hidden focus:ring-2 focus:ring-[#ff2056] text-white placeholder-zinc-500 shadow-inner"
            />
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              id="btn-reveal-all"
              onClick={revealAll}
              className="px-3.5 py-2 text-xs font-bold rounded-full bg-[#1f2128] hover:bg-[#282b35] text-zinc-200 border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-[#ff2056]" />
              Odkryj wszystkie
            </button>
            <button
              id="btn-hide-all"
              onClick={hideAll}
              className="px-3.5 py-2 text-xs font-bold rounded-full bg-[#1f2128] hover:bg-[#282b35] text-zinc-300 border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <EyeOff className="w-3.5 h-3.5 opacity-60" />
              Ukryj
            </button>
            <button
              id="btn-start-battle-from-gallery"
              onClick={() => {
                sounds.playHeart();
                onStartGame();
              }}
              className="px-4 py-2 text-xs font-extrabold rounded-full bg-[#ff2056] text-white hover:bg-[#ff3869] transition-all flex items-center gap-1.5 shadow-md shadow-[#ff2056]/30 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Graj w Bitwę
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Dark Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
        {filteredCandidates.map((candidate) => {
          const isRevealed = revealedIds.has(candidate.id);

          return (
            <div
              key={candidate.id}
              id={`gallery-card-${candidate.id}`}
              className="perspective-1000 h-[480px] w-full"
            >
              <div
                className={`transform-style-3d relative w-full h-full rounded-[28px] md:rounded-[36px] shadow-2xl transition-transform duration-500 ${
                  isRevealed ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT: Fake Persona */}
                <div className="backface-hidden absolute inset-0 w-full h-full bg-[#1f2128] rounded-[28px] md:rounded-[36px] flex flex-col overflow-hidden border border-white/10 shadow-lg">
                  {/* Photo area */}
                  <div className="h-[92%] relative overflow-hidden bg-[#16171b]">
                    <img
                      src={candidate.fakePhotoUrl}
                      alt={candidate.fakeName}
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#16171b]/85 to-transparent pointer-events-none" />

                    <button
                      type="button"
                      aria-label="Pokaż pełny opis"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCandidateBio(candidate);
                      }}
                      className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-transform hover:scale-110 cursor-pointer border border-white/15 shadow-sm"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>

                    <div className="absolute bottom-0 left-0 w-full p-4 text-white pointer-events-none">
                      <h3 className="font-sans text-2xl font-extrabold text-white drop-shadow-md leading-tight">
                        {candidate.fakeName}
                        {candidate.fakeAge ? `, ${candidate.fakeAge}` : ''}
                      </h3>
                      {candidate.fakeJob && (
                        <p className="text-xs text-[#ff476e] flex items-center gap-1.5 mt-0.5 font-bold">
                          <Briefcase className="w-3.5 h-3.5 text-[#ff2056] shrink-0" />
                          {candidate.fakeJob}
                        </p>
                      )}
                      {candidate.fakeBio && (
                        <p className="text-xs text-zinc-200 mt-1.5 italic font-normal line-clamp-3 md:line-clamp-4 leading-relaxed bg-black/50 backdrop-blur-md p-2.5 rounded-xl border border-white/10 shadow-md">
                          "{candidate.fakeBio}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Button area */}
                  <div className="flex-grow flex items-center justify-center px-3 py-1.5 bg-black/20 backdrop-blur-sm border-t border-white/5">
                    <button
                      id={`btn-reveal-card-${candidate.id}`}
                      onClick={() => toggleReveal(candidate.id)}
                      className="bg-[#ff2056]/80 hover:bg-[#ff3869] text-white w-full py-1.5 rounded-full font-extrabold text-[11px] shadow-md shadow-[#ff2056]/30 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Odkryj tożsamość</span>
                    </button>
                  </div>
                </div>

                {/* BACK: Real Persona (Revealed) */}
                <div className="backface-hidden rotate-y-180 absolute inset-0 w-full h-full bg-[#1f2128] rounded-[28px] md:rounded-[36px] flex flex-col overflow-hidden border border-[#ff2056] shadow-xl">
                  {/* Real photo */}
                  <div className="h-[75%] relative overflow-hidden bg-[#16171b]">
                    <img
                      src={candidate.realPhotoUrl}
                      alt={candidate.realName}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#16171b]/85 to-transparent pointer-events-none" />

                    <div className="absolute top-3.5 left-3.5 bg-[#ff2056] text-white text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md shadow-[#ff2056]/40">
                      <Heart className="w-3 h-3 fill-current" />
                      Prawdziwa tożsamość
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-4 text-white pointer-events-none">
                      <h3 className="font-sans text-2xl font-extrabold text-white drop-shadow-md leading-tight">
                        {candidate.realName}
                        {candidate.realAge ? `, ${candidate.realAge}` : ''}
                      </h3>
                      {candidate.realRole && (
                        <p className="text-xs font-bold text-[#ff476e] mt-0.5">
                          {candidate.realRole}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Real info & Flip-back Button */}
                  <div className="flex-grow flex flex-col items-center justify-between p-3.5 bg-[#1a1c22] border-t border-white/10">
                    <p className="text-xs text-zinc-300 font-normal text-center italic line-clamp-1 px-2">
                      "{candidate.realQuote || 'Królowa dzisiejszego wieczoru!'}"
                    </p>

                    <button
                      id={`btn-flipback-card-${candidate.id}`}
                      onClick={() => toggleReveal(candidate.id)}
                      className="text-xs font-bold text-zinc-300 hover:text-white flex items-center gap-1 py-1 px-3 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <RotateCw className="w-3 h-3 text-[#ff2056]" />
                      <span>Ukryj profil</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-16 relative z-10">
          <p className="text-sm text-zinc-400">Nie znaleziono uczestniczek pasujących do wyszukiwania.</p>
        </div>
      )}

      {/* Candidate Full Bio Modal */}
      <AnimatePresence>
        {selectedCandidateBio && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#1f2128] border border-white/15 rounded-[32px] overflow-hidden shadow-2xl text-white max-h-[85vh] flex flex-col"
            >
              <div className="relative h-48 bg-[#16171b] shrink-0">
                <img
                  src={selectedCandidateBio.fakePhotoUrl}
                  alt={selectedCandidateBio.fakeName}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f2128] via-transparent to-black/50" />
                <button
                  type="button"
                  onClick={() => setSelectedCandidateBio(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-transform hover:scale-110 cursor-pointer border border-white/20"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-5">
                  <h3 className="text-2xl font-black text-white">
                    {selectedCandidateBio.fakeName}
                    {selectedCandidateBio.fakeAge ? `, ${selectedCandidateBio.fakeAge}` : ''}
                  </h3>
                </div>
              </div>

              <div className="p-6 overflow-y-auto space-y-4">
                {selectedCandidateBio.fakeJob && (
                  <div className="flex items-center gap-2 text-sm text-zinc-200 font-semibold bg-[#282b35] px-3.5 py-2 rounded-xl border border-white/10">
                    <Briefcase className="w-4 h-4 text-[#ff2056] shrink-0" />
                    <span>{selectedCandidateBio.fakeJob}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-white/10">
                  <h4 className="text-xs uppercase tracking-wider font-extrabold text-[#ff2056] mb-2 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    O mnie
                  </h4>
                  <p className="text-sm text-zinc-200 leading-relaxed font-normal whitespace-pre-line bg-[#16171b] p-4 rounded-2xl border border-white/10">
                    {selectedCandidateBio.fakeBio}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#1a1c22] border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedCandidateBio(null)}
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
