/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Candidate, AppTab, GameSettings } from './types';
import { INITIAL_CANDIDATES } from './data/initialCandidates';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { BattleScreen } from './components/BattleScreen';
import { WinnerRevealScreen } from './components/WinnerRevealScreen';
import { ResultsGallery } from './components/ResultsGallery';
import { SettingsModal } from './components/SettingsModal';
import { sounds } from './utils/audio';
import { preloadImages } from './utils/preloadImages';

const STORAGE_KEY_SETTINGS = 'bachelorette_settings_v4';

export default function App() {
  // Candidates always come straight from initialCandidates.ts — no localStorage
  // override, so editing that file is always reflected on reload.
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);

  // Persistence of settings
  const [settings, setSettings] = useState<GameSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      brideName: 'Iwonki',
      soundEnabled: true,
      shuffleOnStart: true,
    };
  });

  // Active tab state
  const [currentTab, setTab] = useState<AppTab>('home');

  // Battle Engine States
  const [activeChampion, setActiveChampion] = useState<Candidate | null>(null);
  const [activeChallenger, setActiveChallenger] = useState<Candidate | null>(null);
  const [remainingPool, setRemainingPool] = useState<Candidate[]>([]);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [totalRounds, setTotalRounds] = useState<number>(1);
  const [finalWinner, setFinalWinner] = useState<Candidate | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
      sounds.setEnabled(settings.soundEnabled);
    } catch {
      // ignore
    }
  }, [settings]);

  // Warm the browser cache with every photo up front. The battle swaps photos
  // the instant a round is decided, so anything not already downloaded AND
  // decoded by then shows up as a flicker on the card.
  useEffect(() => {
    preloadImages(
      candidates.flatMap((c) => [c.fakePhotoUrl, c.realPhotoUrl]).filter(Boolean),
    );
  }, [candidates]);

  // Start a new tournament / battle sequence
  const startNewGame = () => {
    if (candidates.length < 2) return;

    let pool = [...candidates];
    if (settings.shuffleOnStart) {
      pool = pool.sort(() => Math.random() - 0.5);
    }

    const champ = pool[0];
    const challenger = pool[1];
    const rest = pool.slice(2);

    setActiveChampion(champ);
    setActiveChallenger(challenger);
    setRemainingPool(rest);
    setCurrentRound(1);
    setTotalRounds(candidates.length - 1);
    setFinalWinner(null);
    setTab('battle');
  };

  // Handle choice between Champion and Challenger
  const handleSelectWinner = (selected: Candidate, _defeated: Candidate) => {
    if (remainingPool.length === 0) {
      // Tournament complete! Champion is the ultimate winner!
      setFinalWinner(selected);
      setTab('winner');
      sounds.playSuccess();
    } else {
      // Next challenger joins the battle against the winner
      const nextChallenger = remainingPool[0];
      const nextPool = remainingPool.slice(1);

      setActiveChampion(selected);
      setActiveChallenger(nextChallenger);
      setRemainingPool(nextPool);
      setCurrentRound((prev) => prev + 1);
    }
  };

  return (
    <div
      id="app-root-layout"
      className="min-h-screen bg-[#16171b] text-white flex flex-col pt-20 pb-20 md:pb-12 relative overflow-x-hidden"
    >
      {/* Top App Bar with Bride Name and Action Controls */}
      <Header
        currentTab={currentTab}
        setTab={setTab}
        settings={settings}
        setSettings={setSettings}
        onRestartGame={startNewGame}
      />

      {/* Dynamic View Canvas */}
      <main id="main-content-canvas" className="flex-grow flex flex-col relative z-10">
        {currentTab === 'home' && (
          <HomeScreen
            settings={settings}
            candidateCount={candidates.length}
            onStartGame={startNewGame}
            onOpenGallery={() => setTab('gallery')}
          />
        )}

        {currentTab === 'battle' && activeChampion && activeChallenger && (
          <BattleScreen
            currentPair={[activeChampion, activeChallenger]}
            round={currentRound}
            totalRounds={totalRounds}
            onSelectWinner={handleSelectWinner}
          />
        )}

        {currentTab === 'winner' && (finalWinner || activeChampion) && (
          <WinnerRevealScreen
            winner={finalWinner || activeChampion!}
            onPlayAgain={startNewGame}
            onOpenGallery={() => setTab('gallery')}
          />
        )}

        {currentTab === 'gallery' && (
          <ResultsGallery
            candidates={candidates}
            onStartGame={startNewGame}
          />
        )}

        {currentTab === 'settings' && (
          <SettingsModal
            settings={settings}
            setSettings={setSettings}
            candidates={candidates}
            setCandidates={setCandidates}
            onStartGame={startNewGame}
          />
        )}
      </main>

      {/* Navigation (Mobile Bottom Bar) */}
      <Navigation currentTab={currentTab} setTab={setTab} />

      {/* Dark Glass Footer Banner */}
      <footer className="hidden md:flex h-14 mt-auto items-center justify-center bg-[#1f2128]/50 backdrop-blur-sm border-t border-white/10 text-center px-4">
        <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-zinc-400">
          The Last Swipe • Wieczór Panieński {settings.brideName || 'Iwonki'}
        </p>
      </footer>
    </div>
  );
}
