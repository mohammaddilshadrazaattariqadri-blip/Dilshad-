import React from 'react';
import {
  Wifi,
  Bluetooth,
  Flashlight,
  Moon,
  RotateCw,
  Plane,
  Sun,
  Volume2,
  X,
  Sparkles,
  Sliders,
  Check,
  Bell,
  Trash2,
} from 'lucide-react';
import { GlassColorMode, QuickSettingsState } from '../types/launcher';
import { GlassStyleTokens } from '../utils/launcherLogic';
import { LiquidGlassSurface } from './LiquidGlassSurface';

interface QuickSettingsShadeProps {
  isOpen: boolean;
  onClose: () => void;
  tokens: GlassStyleTokens;
  quickSettings: QuickSettingsState;
  onToggleSetting: (key: keyof Omit<QuickSettingsState, 'brightness' | 'volume'>) => void;
  onChangeBrightness: (val: number) => void;
  onChangeVolume: (val: number) => void;
  activeGlassMode: GlassColorMode;
  onSelectGlassMode: (mode: GlassColorMode) => void;
  onOpenFullSettings: () => void;
}

export const QuickSettingsShade: React.FC<QuickSettingsShadeProps> = ({
  isOpen,
  onClose,
  tokens,
  quickSettings,
  onToggleSetting,
  onChangeBrightness,
  onChangeVolume,
  activeGlassMode,
  onSelectGlassMode,
  onOpenFullSettings,
}) => {
  if (!isOpen) return null;

  const glassModes: { id: GlassColorMode; label: string; swatch: string }[] = [
    { id: 'transparent', label: 'Transparent', swatch: 'border-white/80 bg-white/20' },
    { id: 'black', label: 'Black Obsidian', swatch: 'border-white/40 bg-slate-900' },
    { id: 'white', label: 'White Opal', swatch: 'border-slate-300 bg-white' },
    { id: 'emerald', label: 'Emerald', swatch: 'border-emerald-400 bg-emerald-900' },
    { id: 'sapphire', label: 'Sapphire', swatch: 'border-blue-400 bg-blue-900' },
    { id: 'amethyst', label: 'Amethyst', swatch: 'border-purple-400 bg-purple-900' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick Settings & Notifications"
      className="absolute inset-0 z-50 flex flex-col justify-start animate-in slide-in-from-top duration-250 select-none"
    >
      {/* Background Scrim */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Liquid Glass Pull-down Container */}
      <LiquidGlassSurface
        tokens={tokens}
        variant="container"
        className="relative z-10 w-full max-h-[92%] rounded-b-[36px] flex flex-col px-4 pt-4 pb-6 shadow-2xl overflow-y-auto border-b border-white/30"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h2
              className="text-sm font-bold tracking-tight"
              style={{ color: tokens.textColor }}
            >
              Control Center & Quick Settings
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenFullSettings();
              }}
              aria-label="Open Full Launcher Settings"
              className="w-7 h-7 rounded-full flex items-center justify-center bg-white/15 hover:bg-white/30 text-white transition-all"
              title="Full Settings"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close Quick Settings"
              className="w-7 h-7 rounded-full flex items-center justify-center bg-white/15 hover:bg-white/30 text-white transition-all"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 1. Quick Switcher: Liquid Glass Color Modes */}
        <div className="mt-3">
          <span
            className="text-[11px] font-semibold tracking-wider uppercase opacity-75 block mb-1.5"
            style={{ color: tokens.subtextColor }}
          >
            Glass Color Mode (Liquid Type)
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            {glassModes.map((m) => {
              const isSelected = activeGlassMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onSelectGlassMode(m.id)}
                  aria-pressed={isSelected}
                  className={`
                    flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all
                    ${isSelected ? 'border-2 border-cyan-400 shadow-md scale-[1.02]' : 'border border-white/20 hover:bg-white/10'}
                  `}
                  style={{
                    background: isSelected ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                    color: tokens.textColor,
                  }}
                >
                  <span className={`w-3.5 h-3.5 rounded-full border ${m.swatch} flex-shrink-0 flex items-center justify-center`}>
                    {isSelected && <Check className="w-2.5 h-2.5 text-cyan-300" />}
                  </span>
                  <span className="truncate">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Interactive Quick Tile Grid */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {/* Wi-Fi */}
          <button
            onClick={() => onToggleSetting('wifi')}
            className={`
              flex flex-col items-center justify-center p-2.5 rounded-2xl cursor-pointer transition-all duration-200
              ${quickSettings.wifi ? 'bg-cyan-500/80 text-white shadow-lg' : 'border border-white/20 hover:bg-white/20'}
            `}
            style={{
              background: quickSettings.wifi ? undefined : 'rgba(128, 128, 128, 0.15)',
              color: quickSettings.wifi ? '#ffffff' : tokens.textColor,
            }}
          >
            <Wifi className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Wi-Fi</span>
            <span className="text-[9px] opacity-75">{quickSettings.wifi ? 'On' : 'Off'}</span>
          </button>

          {/* Bluetooth */}
          <button
            onClick={() => onToggleSetting('bluetooth')}
            className={`
              flex flex-col items-center justify-center p-2.5 rounded-2xl cursor-pointer transition-all duration-200
              ${quickSettings.bluetooth ? 'bg-blue-600/80 text-white shadow-lg' : 'border border-white/20 hover:bg-white/20'}
            `}
            style={{
              background: quickSettings.bluetooth ? undefined : 'rgba(128, 128, 128, 0.15)',
              color: quickSettings.bluetooth ? '#ffffff' : tokens.textColor,
            }}
          >
            <Bluetooth className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Bluetooth</span>
            <span className="text-[9px] opacity-75">{quickSettings.bluetooth ? 'Connected' : 'Off'}</span>
          </button>

          {/* Flashlight */}
          <button
            onClick={() => onToggleSetting('flashlight')}
            className={`
              flex flex-col items-center justify-center p-2.5 rounded-2xl cursor-pointer transition-all duration-200
              ${quickSettings.flashlight ? 'bg-amber-500/90 text-slate-950 shadow-lg' : 'border border-white/20 hover:bg-white/20'}
            `}
            style={{
              background: quickSettings.flashlight ? undefined : 'rgba(128, 128, 128, 0.15)',
              color: quickSettings.flashlight ? '#0f172a' : tokens.textColor,
            }}
          >
            <Flashlight className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Torch</span>
            <span className="text-[9px] opacity-75">{quickSettings.flashlight ? 'Beam' : 'Off'}</span>
          </button>

          {/* Do Not Disturb */}
          <button
            onClick={() => onToggleSetting('dnd')}
            className={`
              flex flex-col items-center justify-center p-2.5 rounded-2xl cursor-pointer transition-all duration-200
              ${quickSettings.dnd ? 'bg-purple-600/80 text-white shadow-lg' : 'border border-white/20 hover:bg-white/20'}
            `}
            style={{
              background: quickSettings.dnd ? undefined : 'rgba(128, 128, 128, 0.15)',
              color: quickSettings.dnd ? '#ffffff' : tokens.textColor,
            }}
          >
            <Moon className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">DND</span>
            <span className="text-[9px] opacity-75">{quickSettings.dnd ? 'Silent' : 'Off'}</span>
          </button>

          {/* Auto Rotate */}
          <button
            onClick={() => onToggleSetting('autoRotate')}
            className={`
              flex flex-col items-center justify-center p-2.5 rounded-2xl cursor-pointer transition-all duration-200
              ${quickSettings.autoRotate ? 'bg-emerald-600/80 text-white shadow-lg' : 'border border-white/20 hover:bg-white/20'}
            `}
            style={{
              background: quickSettings.autoRotate ? undefined : 'rgba(128, 128, 128, 0.15)',
              color: quickSettings.autoRotate ? '#ffffff' : tokens.textColor,
            }}
          >
            <RotateCw className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Auto-Rotate</span>
            <span className="text-[9px] opacity-75">{quickSettings.autoRotate ? 'Unlocked' : 'Locked'}</span>
          </button>

          {/* Airplane Mode */}
          <button
            onClick={() => onToggleSetting('airplaneMode')}
            className={`
              flex flex-col items-center justify-center p-2.5 rounded-2xl cursor-pointer transition-all duration-200
              ${quickSettings.airplaneMode ? 'bg-rose-600/80 text-white shadow-lg' : 'border border-white/20 hover:bg-white/20'}
            `}
            style={{
              background: quickSettings.airplaneMode ? undefined : 'rgba(128, 128, 128, 0.15)',
              color: quickSettings.airplaneMode ? '#ffffff' : tokens.textColor,
            }}
          >
            <Plane className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Airplane</span>
            <span className="text-[9px] opacity-75">{quickSettings.airplaneMode ? 'Flight' : 'Off'}</span>
          </button>
        </div>

        {/* 3. Sliders: Brightness & Volume */}
        <div className="mt-4 flex flex-col gap-2.5 bg-white/5 p-3 rounded-2xl border border-white/10">
          {/* Brightness */}
          <div className="flex items-center gap-3">
            <Sun className="w-4 h-4 opacity-75" style={{ color: tokens.textColor }} />
            <input
              type="range"
              min="10"
              max="100"
              value={quickSettings.brightness}
              onChange={(e) => onChangeBrightness(Number(e.target.value))}
              aria-label="Display Brightness"
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-white/20 rounded-lg appearance-none"
            />
            <span className="text-[10px] font-mono w-7 text-right" style={{ color: tokens.textColor }}>
              {quickSettings.brightness}%
            </span>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4 opacity-75" style={{ color: tokens.textColor }} />
            <input
              type="range"
              min="0"
              max="100"
              value={quickSettings.volume}
              onChange={(e) => onChangeVolume(Number(e.target.value))}
              aria-label="System Volume"
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-white/20 rounded-lg appearance-none"
            />
            <span className="text-[10px] font-mono w-7 text-right" style={{ color: tokens.textColor }}>
              {quickSettings.volume}%
            </span>
          </div>
        </div>

        {/* 4. Notification Shade Stack */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 opacity-70" style={{ color: tokens.textColor }} />
              <span className="text-xs font-semibold" style={{ color: tokens.textColor }}>
                Notifications
              </span>
            </div>
            <button
              onClick={() => {}}
              className="text-[10px] flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: tokens.subtextColor }}
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear all</span>
            </button>
          </div>

          {/* Notification Items */}
          <div className="flex flex-col gap-2">
            <div className="p-2.5 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/80 flex items-center justify-center text-white flex-shrink-0 text-xs font-bold">
                M
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold truncate" style={{ color: tokens.textColor }}>
                    Alex Chen · Messages
                  </span>
                  <span className="text-[10px] opacity-60">2m ago</span>
                </div>
                <p className="text-[11px] truncate mt-0.5" style={{ color: tokens.subtextColor }}>
                  Loving this liquid glass launcher style! Pure refractive bliss.
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/80 flex items-center justify-center text-white flex-shrink-0 text-xs font-bold">
                ✓
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold truncate" style={{ color: tokens.textColor }}>
                    Liquid Shield
                  </span>
                  <span className="text-[10px] opacity-60">Just now</span>
                </div>
                <p className="text-[11px] truncate mt-0.5" style={{ color: tokens.subtextColor }}>
                  Active refraction and battery optimizer running smoothly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Drag handle */}
        <div
          onClick={onClose}
          className="w-full flex justify-center py-2 cursor-pointer mt-3"
          title="Tap to close"
        >
          <div className="w-10 h-1 rounded-full bg-white/30 hover:bg-white/60" />
        </div>
      </LiquidGlassSurface>
    </div>
  );
};
