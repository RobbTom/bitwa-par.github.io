import React, { useState } from 'react';
import { Candidate, GameSettings } from '../types';
import { INITIAL_CANDIDATES } from '../data/initialCandidates';
import {
  Sliders,
  Plus,
  Trash2,
  Edit2,
  Upload,
  RotateCcw,
  Check,
  X,
  Volume2,
  Shuffle,
  Flame,
  Save,
  Download,
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface SettingsModalProps {
  settings: GameSettings;
  setSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
  candidates: Candidate[];
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
  onStartGame: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  setSettings,
  candidates,
  setCandidates,
  onStartGame,
}) => {
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Form state for candidate editor
  const [formData, setFormData] = useState<Candidate>({
    id: '',
    fakeName: '',
    fakeAge: 28,
    fakeLocation: 'Warszawa',
    fakeBio: '',
    fakePhotoUrl: '',
    realName: '',
    realAge: 27,
    realRole: 'Przyjaciółka Panny Młodej',
    realQuote: '',
    realPhotoUrl: '',
  });

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'fakePhotoUrl' | 'realPhotoUrl'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            [field]: event.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const openEditor = (candidate: Candidate) => {
    setFormData({ ...candidate });
    setEditingCandidate(candidate);
    setIsAddingNew(false);
  };

  const openNewCandidateForm = () => {
    const newId = `candidate-${Date.now()}`;
    setFormData({
      id: newId,
      fakeName: 'Przystojniak',
      fakeAge: 28,
      fakeLocation: 'Warszawa',
      fakeBio: 'Kocha podróże i dobre jedzenie.',
      fakePhotoUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
      realName: 'Ania',
      realAge: 27,
      realRole: 'Uczestniczka Wieczoru',
      realQuote: 'Gotowa na najlepszą imprezę!',
      realPhotoUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
    });
    setEditingCandidate(null);
    setIsAddingNew(true);
  };

  const handleSaveCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fakeName.trim() || !formData.realName.trim()) return;

    if (isAddingNew) {
      setCandidates((prev) => [...prev, { ...formData, id: `c-${Date.now()}` }]);
    } else if (editingCandidate) {
      setCandidates((prev) =>
        prev.map((c) => (c.id === editingCandidate.id ? formData : c))
      );
    }

    setEditingCandidate(null);
    setIsAddingNew(false);
    sounds.playHeart();
    showToast('Zapisano uczestniczkę pomyślnie!');
  };

  const handleDeleteCandidate = (id: string) => {
    if (candidates.length <= 2) {
      alert('Do rozgrywki potrzebne są minimum 2 pary!');
      return;
    }
    setCandidates((prev) => prev.filter((c) => c.id !== id));
    sounds.playWhoosh();
    showToast('Usunięto uczestniczkę.');
  };

  const handleResetToDefaults = () => {
    if (confirm('Czy na pewno chcesz przywrócić domyślne pary ze zdjęciami?')) {
      setCandidates(INITIAL_CANDIDATES);
      sounds.playSuccess();
      showToast('Przywrócono domyślne pary!');
    }
  };

  const showToast = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const exportToJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(candidates, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `the-last-swipe-${settings.brideName || 'iwonki'}-pary.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div
      id="settings-screen-container"
      className="flex-grow w-full max-w-5xl mx-auto px-4 md:px-8 pt-4 pb-24 relative"
    >
      {/* Ambient background glows */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#ff2056]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-[#ff3b68]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Toast alert */}
      {saveSuccessMsg && (
        <div className="fixed top-24 right-6 z-50 bg-[#ff2056] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg shadow-[#ff2056]/30 flex items-center gap-1.5 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ff2056]/15 border border-[#ff2056]/30 text-white text-xs font-bold mb-2">
          <Sliders className="w-3.5 h-3.5 text-[#ff2056]" />
          <span className="uppercase tracking-widest text-[10px]">Centrum Konfiguracji</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2 font-sans">
          Ustawienia i Edycja Par
        </h1>
        <p className="text-sm text-zinc-300 max-w-xl mx-auto font-normal">
          Dostosuj imię Panny Młodej, dodaj własne zdjęcia uczestniczek i przygotuj idealną zabawę w The Last Swipe!
        </p>
      </div>

      {/* General Game Settings Card in Dark Glass */}
      <div className="bg-[#1f2128] rounded-[28px] md:rounded-[32px] p-6 md:p-8 shadow-2xl border border-white/10 mb-8 max-w-3xl mx-auto relative z-10">
        <h2 className="text-lg md:text-xl font-black text-white mb-4 flex items-center gap-2 font-sans">
          <Flame className="w-5 h-5 text-[#ff2056] fill-[#ff2056]" />
          Podstawowe opcje gry
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
              Imię Panny Młodej (w dopełniaczu):
            </label>
            <input
              id="input-bride-name"
              type="text"
              value={settings.brideName}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, brideName: e.target.value }))
              }
              placeholder="np. Iwonki, Kasi, Ani..."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 focus:outline-hidden focus:ring-2 focus:ring-[#ff2056] bg-[#16171b] text-white shadow-inner"
            />
            <p className="text-[11px] text-zinc-400 mt-1 font-medium">
              Wyświetlane w nagłówku "Wieczór Panieński {settings.brideName || 'Iwonki'}"
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                id="checkbox-sound-enabled"
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => {
                  const next = e.target.checked;
                  setSettings((prev) => ({ ...prev, soundEnabled: next }));
                  sounds.setEnabled(next);
                  if (next) sounds.playHeart();
                }}
                className="w-4 h-4 text-[#ff2056] rounded-sm focus:ring-[#ff2056] accent-[#ff2056]"
              />
              <span className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-[#ff2056]" />
                Efekty dźwiękowe (swipy, serduszko, fanfary)
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                id="checkbox-shuffle-enabled"
                type="checkbox"
                checked={settings.shuffleOnStart}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    shuffleOnStart: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#ff2056] rounded-sm focus:ring-[#ff2056] accent-[#ff2056]"
              />
              <span className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Shuffle className="w-4 h-4 text-[#ff2056]" />
                Losuj kolejność par przy starcie gry
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Candidate Editor Modal / Form */}
      {(isAddingNew || editingCandidate) && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1f2128] rounded-[32px] md:rounded-[40px] p-6 md:p-8 max-w-2xl w-full shadow-2xl my-8 max-h-[90vh] overflow-y-auto border border-white/15">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
              <h3 className="text-xl md:text-2xl font-black text-white">
                {isAddingNew ? 'Dodaj nową parę' : `Edytuj: ${formData.fakeName} / ${formData.realName}`}
              </h3>
              <button
                id="btn-close-editor"
                onClick={() => {
                  setEditingCandidate(null);
                  setIsAddingNew(false);
                }}
                className="p-1.5 rounded-full hover:bg-white/10 text-zinc-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCandidate} className="space-y-6">
              {/* Section 1: Fake Male Persona */}
              <div className="p-4 rounded-2xl bg-[#16171b] border border-white/10 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff2056]" />
                  1. Fałszywy Profil Męski (Zabawna fasada)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Fałszywe imię:
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fakeName}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, fakeName: e.target.value }))
                      }
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-white/10 bg-[#252832] text-white focus:ring-2 focus:ring-[#ff2056]"
                      placeholder="np. Tomek, Antonio, Janusz"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Wiek kandydata:
                    </label>
                    <input
                      type="number"
                      value={formData.fakeAge}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          fakeAge: parseInt(e.target.value) || 25,
                        }))
                      }
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-white/10 bg-[#252832] text-white focus:ring-2 focus:ring-[#ff2056]"
                      placeholder="28"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Zawód / Stanowisko / Firma:
                  </label>
                  <input
                    type="text"
                    value={formData.fakeJob || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, fakeJob: e.target.value }))
                    }
                    className="w-full px-3 py-1.5 text-sm rounded-lg border border-white/10 bg-[#252832] text-white focus:ring-2 focus:ring-[#ff2056]"
                    placeholder="np. Key Account Manager | EY, Pilot, Barman"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Opis "O mnie" / Tinder Bio:
                  </label>
                  <textarea
                    rows={3}
                    value={formData.fakeBio}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, fakeBio: e.target.value }))
                    }
                    className="w-full px-3 py-1.5 text-sm rounded-lg border border-white/10 bg-[#252832] text-white focus:ring-2 focus:ring-[#ff2056] resize-none"
                    placeholder="Wpisz opis kandydata..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Zdjęcie przerobione na faceta (URL lub prześlij z dysku):
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="url"
                      value={formData.fakePhotoUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          fakePhotoUrl: e.target.value,
                        }))
                      }
                      className="flex-grow px-3 py-1.5 text-xs rounded-lg border border-white/10 bg-[#252832] text-white"
                      placeholder="https://..."
                    />
                    <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#252832] hover:bg-[#313542] border border-white/10 text-white text-xs font-bold flex items-center gap-1 shrink-0 transition-colors">
                      <Upload className="w-3.5 h-3.5 text-[#ff2056]" />
                      <span>Plik</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'fakePhotoUrl')}
                      />
                    </label>
                  </div>
                  {formData.fakePhotoUrl && (
                    <div className="mt-2 w-16 h-16 rounded-xl overflow-hidden border border-white/20 shadow-sm">
                      <img
                        src={formData.fakePhotoUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Section 2: Real Female Persona */}
              <div className="p-4 rounded-2xl bg-[#16171b] border border-white/10 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff2056]" />
                  2. Prawdziwa Uczestniczka (Odkrywana w finale!)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Prawdziwe imię:
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.realName}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, realName: e.target.value }))
                      }
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-white/10 bg-[#252832] text-white focus:ring-2 focus:ring-[#ff2056]"
                      placeholder="np. Kasia, Ania, Zosia"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Rola / Tytuł:
                    </label>
                    <input
                      type="text"
                      value={formData.realRole}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, realRole: e.target.value }))
                      }
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-white/10 bg-[#252832] text-white focus:ring-2 focus:ring-[#ff2056]"
                      placeholder="np. Świadkowa, Królowa parkietu"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Cytat / Podpis:
                  </label>
                  <input
                    type="text"
                    value={formData.realQuote}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, realQuote: e.target.value }))
                    }
                    className="w-full px-3 py-1.5 text-sm rounded-lg border border-white/10 bg-[#252832] text-white focus:ring-2 focus:ring-[#ff2056]"
                    placeholder="np. Prawdziwa mistrzyni dobrego humoru!"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Prawdziwe zdjęcie kobiety (URL lub prześlij z dysku):
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="url"
                      value={formData.realPhotoUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          realPhotoUrl: e.target.value,
                        }))
                      }
                      className="flex-grow px-3 py-1.5 text-xs rounded-lg border border-white/10 bg-[#252832] text-white"
                      placeholder="https://..."
                    />
                    <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#ff2056] hover:bg-[#ff3869] text-white text-xs font-bold flex items-center gap-1 shrink-0 transition-colors shadow-md shadow-[#ff2056]/30">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Plik</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'realPhotoUrl')}
                      />
                    </label>
                  </div>
                  {formData.realPhotoUrl && (
                    <div className="mt-2 w-16 h-16 rounded-xl overflow-hidden border border-white/20 shadow-sm">
                      <img
                        src={formData.realPhotoUrl}
                        alt="Real Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit & Cancel Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCandidate(null);
                    setIsAddingNew(false);
                  }}
                  className="px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-zinc-300 hover:bg-white/5 cursor-pointer"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#ff2056] hover:bg-[#ff3869] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-[#ff2056]/30 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Zapisz parę</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Candidates List Management */}
      <div className="bg-[#1f2128] rounded-[28px] md:rounded-[32px] p-6 md:p-8 shadow-2xl border border-white/10 max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-lg md:text-xl font-black text-white font-sans">
              Lista Uczestniczek ({candidates.length})
            </h2>
            <p className="text-xs text-zinc-300 font-normal">
              Możesz swobodnie edytować zdjęcia, imiona i dodawać nowe koleżanki.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="btn-add-candidate"
              onClick={openNewCandidateForm}
              className="px-4 py-2 text-xs font-extrabold rounded-full bg-[#ff2056] text-white hover:bg-[#ff3869] transition-all flex items-center gap-1.5 shadow-md shadow-[#ff2056]/30 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Dodaj uczestniczkę</span>
            </button>

            <button
              id="btn-export-json"
              onClick={exportToJson}
              title="Pobierz konfigurację do pliku JSON"
              className="px-3 py-2 text-xs font-bold rounded-full bg-[#16171b] border border-white/10 text-zinc-200 hover:text-white hover:bg-[#252832] transition-all flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#ff2056]" />
              <span>Eksport JSON</span>
            </button>

            <button
              id="btn-reset-defaults"
              onClick={handleResetToDefaults}
              title="Przywróć domyślne zdjęcia z Wieczoru Panieńskiego"
              className="px-3 py-2 text-xs font-bold rounded-full bg-[#16171b] border border-white/10 text-zinc-300 hover:text-white hover:bg-[#252832] transition-all flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* List items with dark glass styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {candidates.map((candidate, idx) => (
            <div
              key={candidate.id}
              className="p-3.5 rounded-2xl border border-white/10 bg-[#16171b]/80 flex items-center justify-between gap-3 shadow-inner hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Photo avatars */}
                <div className="flex -space-x-3 shrink-0">
                  <img
                    src={candidate.fakePhotoUrl}
                    alt={candidate.fakeName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#1f2128] shadow-sm"
                  />
                  <img
                    src={candidate.realPhotoUrl}
                    alt={candidate.realName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#ff2056] shadow-sm"
                  />
                </div>

                <div className="truncate">
                  <div className="text-sm font-bold text-white truncate">
                    {idx + 1}. {candidate.fakeName}{' '}
                    <span className="text-xs font-normal text-[#ff476e]">➔ {candidate.realName}</span>
                  </div>
                  <div className="text-xs text-zinc-400 truncate font-normal">
                    {candidate.realRole || candidate.fakeLocation}
                  </div>
                </div>
              </div>

              {/* Edit / Delete actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  id={`btn-edit-candidate-${candidate.id}`}
                  onClick={() => openEditor(candidate)}
                  className="p-2 rounded-lg bg-[#1f2128] hover:bg-[#282b35] text-zinc-200 hover:text-white transition-all cursor-pointer"
                  title="Edytuj"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  id={`btn-delete-candidate-${candidate.id}`}
                  onClick={() => handleDeleteCandidate(candidate.id)}
                  className="p-2 rounded-lg bg-[#1f2128] hover:bg-rose-950/60 text-rose-400 hover:text-rose-300 transition-all cursor-pointer"
                  title="Usuń"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Start Game Footer Button */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <button
            id="btn-settings-start-game"
            onClick={() => {
              sounds.playHeart();
              onStartGame();
            }}
            className="bg-[#ff2056] hover:bg-[#ff3869] text-white font-extrabold px-8 py-3.5 rounded-full shadow-lg shadow-[#ff2056]/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer text-sm flex items-center gap-2 mx-auto"
          >
            <Flame className="w-4 h-4 fill-white" />
            <span>Zapisz i rozpocznij The Last Swipe!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
