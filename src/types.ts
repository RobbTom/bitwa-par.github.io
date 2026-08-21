export interface Candidate {
  id: string;
  fakeName: string;
  fakeAge: number;
  fakeJob?: string;
  fakeLocation: string;
  fakeBio: string;
  fakePhotoUrl: string;
  realName: string;
  realAge: number;
  realRole: string;
  realQuote: string;
  realPhotoUrl: string;
}

export type AppTab = 'home' | 'battle' | 'winner' | 'gallery' | 'settings';

export interface BattleHistoryItem {
  round: number;
  winner: Candidate;
  loser: Candidate;
}

export interface GameSettings {
  brideName: string;
  soundEnabled: boolean;
  shuffleOnStart: boolean;
}
