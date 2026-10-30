import React from 'react';
import { X, Minus } from 'lucide-react';
import { AppItem, LauncherSettings } from '../types/launcher';
import { GlassStyleTokens } from '../utils/launcherLogic';
import { LiquidGlassSurface } from './LiquidGlassSurface';

import { GlassCalculatorApp } from './apps/GlassCalculatorApp';
import { GlassWeatherApp } from './apps/GlassWeatherApp';
import { GlassMusicApp } from './apps/GlassMusicApp';
import { GlassNotesApp } from './apps/GlassNotesApp';
import { GlassCameraApp } from './apps/GlassCameraApp';
import { GlassSettingsApp } from './apps/GlassSettingsApp';

interface AppWindowModalProps {
  app: AppItem | null;
  onClose: () => void;
  tokens: GlassStyleTokens;
  settings: LauncherSettings;
  onUpdateSettings: (newSettings: Partial<LauncherSettings>) => void;
  isPhoneFrameView: boolean;
  onTogglePhoneFrame: () => void;
  onResetDefaults: () => void;
  isPlayingMusic: boolean;
  onTogglePlayMusic: () => void;
}

export const AppWindowModal: React.FC<AppWindowModalProps> = ({
  app,
  onClose,
  tokens,
  settings,
  onUpdateSettings,
  isPhoneFrameView,
  onTogglePhoneFrame,
  onResetDefaults,
  isPlayingMusic,
  onTogglePlayMusic,
}) => {
  if (!app) return null;

  const renderAppContent = () => {
    switch (app.id) {
      case 'calculator':
        return <GlassCalculatorApp tokens={tokens} onClose={onClose} />;
      case 'weather':
        return <GlassWeatherApp tokens={tokens} onClose={onClose} />;
      case 'music':
        return (
          <GlassMusicApp
            tokens={tokens}
            isPlaying={isPlayingMusic}
            onTogglePlay={onTogglePlayMusic}
            onClose={onClose}
          />
        );
      case 'notes':
        return <GlassNotesApp tokens={tokens} onClose={onClose} />;
      case 'camera':
        return <GlassCameraApp tokens={tokens} onClose={onClose} />;
      case 'settings':
        return (
          <GlassSettingsApp
            settings={settings}
            onUpdateSettings={onUpdateSettings}
            tokens={tokens}
            isPhoneFrameView={isPhoneFrameView}
            onTogglePhoneFrame={onTogglePhoneFrame}
            onResetDefaults={onResetDefaults}
            onClose={onClose}
          />
        );
      case 'phone':
        return (
          <div className="flex flex-col h-full justify-between p-4 select-none">
            <div className="text-center py-4">
              <span className="text-2xl font-bold font-mono tracking-wider" style={{ color: tokens.textColor }}>
                +1 (555) 019-2834
              </span>
              <p className="text-xs mt-1 opacity-70" style={{ color: tokens.subtextColor }}>
                Speed Dial · Liquid Glass Carrier
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto w-full">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((d) => (
                <button
                  key={d}
                  className="h-14 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 flex flex-col items-center justify-center font-bold text-lg cursor-pointer"
                  style={{ color: tokens.textColor }}
                >
                  <span>{d}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-center pt-2">
              <button
                className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-xl active:scale-90 transition-transform"
                title="Call"
              >
                📞
              </button>
            </div>
          </div>
        );
      case 'messages':
        return (
          <div className="flex flex-col h-full p-4 overflow-y-auto select-none gap-3">
            <h2 className="text-sm font-bold" style={{ color: tokens.textColor }}>
              Messages
            </h2>
            <div className="flex flex-col gap-2">
              {[
                { sender: 'Sarah Connor', msg: 'System check complete. Liquid glass looks sharp!', time: '10:42 AM' },
                { sender: 'Alex Chen', msg: 'Did you try the obsidian black mode? Loving the dark glass caustics.', time: '9:15 AM' },
                { sender: 'Google Play', msg: 'Your 5 liquid glass widgets have updated to v4.0.', time: 'Yesterday' },
              ].map((m, i) => (
                <div key={i} className="p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: tokens.textColor }}>
                      {m.sender}
                    </span>
                    <span className="text-[10px] opacity-60 font-mono">{m.time}</span>
                  </div>
                  <p className="text-xs mt-1 opacity-80" style={{ color: tokens.subtextColor }}>
                    {m.msg}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'browser':
        return (
          <div className="flex flex-col h-full p-3 select-none gap-3">
            <div className="w-full h-9 rounded-xl bg-white/10 px-3 flex items-center gap-2 border border-white/20 text-xs font-mono">
              <span className="text-cyan-400">🔒 https://</span>
              <span className="opacity-90">google.com</span>
            </div>
            <div className="flex-1 rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col items-center justify-center text-center">
              <span className="text-3xl mb-2">🌐</span>
              <h3 className="text-sm font-bold" style={{ color: tokens.textColor }}>
                Liquid Glass Web Portal
              </h3>
              <p className="text-xs mt-1 max-w-xs opacity-75" style={{ color: tokens.subtextColor }}>
                Secure, hardware-accelerated fluid browsing with refraction edge filters.
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col h-full items-center justify-center p-6 text-center select-none">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl border border-white/40 mb-3"
              style={{
                background: `linear-gradient(135deg, ${app.accentColor}40, rgba(255,255,255,0.15))`,
              }}
            >
              <span className="text-2xl">✨</span>
            </div>
            <h2 className="text-base font-bold" style={{ color: tokens.textColor }}>
              {app.name}
            </h2>
            <p className="text-xs mt-1 max-w-xs opacity-80" style={{ color: tokens.subtextColor }}>
              {app.description || 'Liquid glass native application.'}
            </p>
            <div className="mt-4 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-mono">
              Running in Liquid Glass Sandbox
            </div>
          </div>
        );
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${app.name} App Window`}
      className="absolute inset-0 z-50 flex flex-col justify-end animate-in fade-in duration-200"
    >
      {/* Background Dim Scrim */}
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Liquid Glass App Window Container */}
      <LiquidGlassSurface
        tokens={tokens}
        variant="container"
        className="relative z-10 w-full h-[90%] rounded-t-[36px] flex flex-col shadow-2xl overflow-hidden border-t border-white/40"
      >
        {/* App Titlebar */}
        <div className="w-full h-13 px-4 flex items-center justify-between border-b border-white/15 bg-white/5 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shadow-sm"
              style={{
                background: `linear-gradient(135deg, ${app.accentColor}60, rgba(255,255,255,0.2))`,
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              <span className="text-xs">⚡</span>
            </div>
            <span className="text-sm font-bold tracking-tight" style={{ color: tokens.textColor }}>
              {app.name}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onClose}
              aria-label="Minimize"
              className="w-7 h-7 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-7 h-7 rounded-full flex items-center justify-center bg-white/15 hover:bg-rose-500 text-white transition-all"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Inner App Body */}
        <div className="flex-1 min-h-0 overflow-y-auto">{renderAppContent()}</div>
      </LiquidGlassSurface>
    </div>
  );
};
