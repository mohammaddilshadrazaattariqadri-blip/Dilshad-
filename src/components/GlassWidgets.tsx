import React, { useState, useEffect } from 'react';
import {
  CloudSun,
  Play,
  Pause,
  SkipForward,
  Search,
  Mic,
  SlidersHorizontal,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { GlassStyleTokens } from '../utils/launcherLogic';
import { LiquidGlassSurface } from './LiquidGlassSurface';

interface GlassWidgetsProps {
  tokens: GlassStyleTokens;
  onOpenApp: (appId: string) => void;
  onOpenSettings: () => void;
  onOpenAppDrawer: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isPlayingMusic: boolean;
  onTogglePlayMusic: () => void;
}

export const GlassWidgets: React.FC<GlassWidgetsProps> = ({
  tokens,
  onOpenApp,
  onOpenSettings,
  onOpenAppDrawer,
  searchQuery,
  onSearchChange,
  isPlayingMusic,
  onTogglePlayMusic,
}) => {
  const [currentTime, setCurrentTime] = useState({ time: '10:48', date: 'Thursday, Oct 30' });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false });
      const date = now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
      setCurrentTime({ time, date });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col gap-3 px-3">
      {/* 1. Liquid Glass Clock & Weather Card */}
      <LiquidGlassSurface
        tokens={tokens}
        interactive
        onClick={() => onOpenApp('weather')}
        ariaLabel="Open Weather and Clock app"
        className="w-full rounded-3xl p-4 transition-all duration-300 hover:shadow-2xl"
      >
        <div className="flex items-center justify-between">
          {/* Left: Time and Date */}
          <div className="flex flex-col">
            <span
              className="text-4xl md:text-5xl font-extrabold tracking-tight font-mono leading-none"
              style={{
                color: tokens.textColor,
                textShadow: '0 2px 8px rgba(0,0,0,0.4)',
              }}
            >
              {currentTime.time}
            </span>
            <span
              className="text-xs md:text-sm font-medium mt-1.5 opacity-80 tracking-wide"
              style={{ color: tokens.subtextColor }}
            >
              {currentTime.date}
            </span>
          </div>

          {/* Right: Weather Pod */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              onOpenApp('weather');
            }}
            className="flex flex-col items-end gap-1 cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <CloudSun className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform drop-shadow-md" />
              <span
                className="text-2xl font-bold font-mono"
                style={{ color: tokens.textColor }}
              >
                72°
              </span>
            </div>
            <div className="text-right">
              <span
                className="text-[11px] font-medium block"
                style={{ color: tokens.subtextColor }}
              >
                Sunny · Feels like 74°
              </span>
              <span className="text-[10px] opacity-60">San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Liquid highlight bar */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 opacity-80">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Liquid Glass Engine 4.0 Active</span>
          </div>
          <div className="flex items-center gap-1 opacity-70">
            <Cpu className="w-3 h-3" />
            <span>RAM 3.8 / 8GB</span>
          </div>
        </div>
      </LiquidGlassSurface>

      {/* 2. Liquid Glass Audio Widget */}
      <LiquidGlassSurface
        tokens={tokens}
        interactive
        variant="card"
        className="w-full rounded-2xl p-3 flex items-center justify-between gap-3"
      >
        {/* Album Art / Liquid Vinyl */}
        <div
          onClick={() => onOpenApp('music')}
          className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer group shadow-md"
          style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #06b6d4 100%)',
            border: '1px solid rgba(255,255,255,0.4)',
          }}
          title="Open Music Player"
        >
          {/* Animated vinyl grooves */}
          <div
            className={`w-full h-full flex items-center justify-center ${isPlayingMusic ? 'animate-spin' : ''}`}
            style={{ animationDuration: '6s' }}
          >
            <div className="w-4 h-4 rounded-full bg-slate-900 border border-white/60 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>
          </div>
        </div>

        {/* Track Info */}
        <div
          onClick={() => onOpenApp('music')}
          className="flex-1 min-w-0 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold truncate block"
              style={{ color: tokens.textColor }}
            >
              Liquid Resonance (Glass Refraction)
            </span>
          </div>
          <p
            className="text-[11px] truncate"
            style={{ color: tokens.subtextColor }}
          >
            Aether Waves · High Fidelity
          </p>

          {/* Animated Liquid Visualizer Waveform */}
          <div className="flex items-end gap-1 h-2.5 mt-1">
            {[40, 80, 55, 95, 30, 70, 85, 45, 90, 60].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-full transition-all duration-300"
                style={{
                  height: isPlayingMusic ? `${h}%` : '20%',
                  background: `linear-gradient(to top, ${tokens.accentColor}, #ffffff)`,
                  opacity: isPlayingMusic ? 0.9 : 0.4,
                }}
              />
            ))}
          </div>
        </div>

        {/* Media Controls */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={onTogglePlayMusic}
            aria-label={isPlayingMusic ? 'Pause Music' : 'Play Music'}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/30 active:scale-90 transition-all border border-white/40 shadow-sm"
            style={{ color: tokens.textColor }}
          >
            {isPlayingMusic ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </button>
          <button
            onClick={() => onOpenApp('music')}
            aria-label="Next track"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-90 transition-all text-white/80"
            style={{ color: tokens.textColor }}
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </LiquidGlassSurface>

      {/* 3. Liquid Glass Search Bar Capsule */}
      <LiquidGlassSurface
        tokens={tokens}
        variant="pill"
        className="w-full h-12 rounded-full px-4 flex items-center gap-2.5 shadow-lg"
      >
        <Search className="w-4 h-4 opacity-70 flex-shrink-0" style={{ color: tokens.textColor }} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search apps, web, settings..."
          className="w-full bg-transparent border-none outline-none text-xs md:text-sm font-medium placeholder:opacity-50"
          style={{
            color: tokens.textColor,
          }}
          aria-label="Search apps and web"
        />
        {searchQuery ? (
          <button
            onClick={() => onSearchChange('')}
            className="text-xs px-2 py-0.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            ✕
          </button>
        ) : (
          <button
            onClick={onOpenAppDrawer}
            aria-label="Voice search or drawer"
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all opacity-80"
            style={{ color: tokens.textColor }}
          >
            <Mic className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          onClick={onOpenSettings}
          aria-label="Launcher settings"
          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all opacity-80"
          style={{ color: tokens.textColor }}
          title="Customize Glass Colors & Options"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </LiquidGlassSurface>
    </div>
  );
};
