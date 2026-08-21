import React from 'react';
import { AppTab, GameSettings } from '../types';
import { RotateCcw, Settings, Volume2, VolumeX, Flame } from 'lucide-react';
import { sounds } from '../utils/audio';

interface HeaderProps {
  currentTab: AppTab;
  setTab: (tab: AppTab) => void;
  settings: GameSettings;
  setSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
  onRestartGame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setTab,
  settings,
  setSettings,
  onRestartGame,
}) => {
  const toggleSound = () => {
    const next = !settings.soundEnabled;
    setSettings((prev) => ({ ...prev, soundEnabled: next }));
    sounds.setEnabled(next);
    if (next) sounds.playHeart();
  };

  const initialLetter = (settings.brideName || 'Iwonki').trim().charAt(0).toUpperCase() || 'I';

  return (
    <header
      id="top-app-bar"
      className="h-20 flex items-center justify-between px-4 sm:px-8 md:px-12 bg-[#16171b]/80 backdrop-blur-xl border-b border-white/10 shadow-lg fixed top-0 left-0 right-0 z-50 transition-all"
    >
      {/* Brand Logo / Title */}
      <button
        id="header-brand-button"
        onClick={() => {
          sounds.playWhoosh();
          setTab('home');
        }}
        className="flex items-center gap-3 text-left group transition-transform active:scale-95 cursor-pointer"
      >
        {/* Tinder-style Flame Icon Badge */}
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff2056] via-[#ff3b68] to-[#ff6079] flex items-center justify-center shadow-lg shadow-[#ff2056]/30 group-hover:scale-105 transition-transform">
          <Flame className="w-6 h-6 text-white fill-white animate-pulse" />
        </div>

        <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-1.5 font-sans">
            The Last Swipe
          </h1>
          <span className="text-[11px] font-semibold text-zinc-400">
            Wieczór Panieński {settings.brideName || 'Iwonki'}
          </span>
        </div>
      </button>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-2 text-xs font-semibold bg-[#1f2128]/80 p-1 rounded-full border border-white/10">
        <button
          id="nav-desktop-play"
          onClick={() => {
            sounds.playWhoosh();
            setTab(currentTab === 'winner' ? 'winner' : 'battle');
          }}
          className={`px-5 py-2 rounded-full transition-all cursor-pointer ${
            currentTab === 'battle' || currentTab === 'winner' || currentTab === 'home'
              ? 'bg-[#ff2056] text-white shadow-md shadow-[#ff2056]/30 font-bold'
              : 'text-zinc-300 hover:text-white hover:bg-white/5'
          }`}
        >
          Bitwa Par
        </button>
        <button
          id="nav-desktop-gallery"
          onClick={() => {
            sounds.playWhoosh();
            setTab('gallery');
          }}
          className={`px-5 py-2 rounded-full transition-all cursor-pointer ${
            currentTab === 'gallery'
              ? 'bg-[#ff2056] text-white shadow-md shadow-[#ff2056]/30 font-bold'
              : 'text-zinc-300 hover:text-white hover:bg-white/5'
          }`}
        >
          Wszystkie Pary
        </button>
      </div>

      {/* Trailing Action Icons */}
      <div className="flex items-center gap-2 sm:gap-3 text-white">
        <button
          id="btn-toggle-sound"
          onClick={toggleSound}
          title={settings.soundEnabled ? 'Wycisz dźwięki' : 'Włącz dźwięki'}
          className="p-2.5 rounded-full bg-[#1f2128] hover:bg-[#282b35] border border-white/10 transition-all text-zinc-300 hover:text-white active:scale-90 cursor-pointer shadow-sm"
        >
          {settings.soundEnabled ? (
            <Volume2 className="w-4 h-4 text-[#ff2056]" />
          ) : (
            <VolumeX className="w-4 h-4 opacity-50" />
          )}
        </button>

        <button
          id="btn-restart-game"
          onClick={() => {
            sounds.playWhoosh();
            onRestartGame();
          }}
          title="Rozpocznij bitwę od nowa"
          className="p-2.5 rounded-full bg-[#1f2128] hover:bg-[#282b35] border border-white/10 transition-all text-zinc-300 hover:text-white active:scale-90 cursor-pointer shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          id="btn-open-settings"
          onClick={() => {
            sounds.playWhoosh();
            setTab('settings');
          }}
          title="Ustawienia gry i zdjęć"
          className={`p-2.5 rounded-full border border-white/10 transition-all active:scale-90 cursor-pointer shadow-sm ${
            currentTab === 'settings'
              ? 'bg-[#ff2056] text-white shadow-md shadow-[#ff2056]/30'
              : 'bg-[#1f2128] hover:bg-[#282b35] text-zinc-300 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Bride Initial Badge */}
        <div
          title={`Panna Młoda: ${settings.brideName || 'Iwonka'}`}
          className="w-10 h-10 rounded-full border-2 border-[#ff2056] bg-gradient-to-br from-[#1f2128] to-[#2b2e38] flex items-center justify-center text-[#ff2056] font-extrabold text-sm shadow-md select-none ml-1 hidden sm:flex"
        >
          {initialLetter}
        </div>
      </div>
    </header>
  );
};

