import React from 'react';
import { AppTab } from '../types';
import { Flame, Trophy, Sliders } from 'lucide-react';
import { sounds } from '../utils/audio';

interface NavigationProps {
  currentTab: AppTab;
  setTab: (tab: AppTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, setTab }) => {
  return (
    <>
      {/* Mobile Bottom Navigation Bar in Tinder Dark Theme */}
      <nav
        id="mobile-bottom-nav"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex justify-around items-center px-4 pb-4 pt-2 bg-[#16171b]/95 backdrop-blur-xl shadow-[0px_-4px_20px_rgba(0,0,0,0.6)] border-t border-white/10"
      >
        <button
          id="tab-mobile-play"
          onClick={() => {
            sounds.playWhoosh();
            setTab(currentTab === 'winner' ? 'winner' : 'battle');
          }}
          className={`flex flex-col items-center justify-center rounded-full px-5 py-1.5 transition-all duration-300 ${
            currentTab === 'battle' || currentTab === 'winner' || currentTab === 'home'
              ? 'bg-[#ff2056] text-white shadow-md shadow-[#ff2056]/30 scale-105'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Flame className="w-5 h-5 mb-0.5 fill-current" />
          <span className="text-xs font-bold">Bitwa</span>
        </button>

        <button
          id="tab-mobile-gallery"
          onClick={() => {
            sounds.playWhoosh();
            setTab('gallery');
          }}
          className={`flex flex-col items-center justify-center rounded-full px-5 py-1.5 transition-all duration-300 ${
            currentTab === 'gallery'
              ? 'bg-[#ff2056] text-white shadow-md shadow-[#ff2056]/30 scale-105'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Trophy className="w-5 h-5 mb-0.5" />
          <span className="text-xs font-bold">Pary</span>
        </button>

        <button
          id="tab-mobile-settings"
          onClick={() => {
            sounds.playWhoosh();
            setTab('settings');
          }}
          className={`flex flex-col items-center justify-center rounded-full px-5 py-1.5 transition-all duration-300 ${
            currentTab === 'settings'
              ? 'bg-[#ff2056] text-white shadow-md shadow-[#ff2056]/30 scale-105'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Sliders className="w-5 h-5 mb-0.5" />
          <span className="text-xs font-bold">Opcje</span>
        </button>
      </nav>
    </>
  );
};
