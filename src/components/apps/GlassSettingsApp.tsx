import React from 'react';
import {
  Palette,
  Sparkles,
  Layers,
  Smartphone,
  Eye,
  Check,
  RotateCcw,
  Sliders,
} from 'lucide-react';
import {
  GlassColorMode,
  GlassBlur,
  GlassGloss,
  IconShape,
  LauncherSettings,
} from '../../types/launcher';
import { GlassStyleTokens, WALLPAPERS } from '../../utils/launcherLogic';

interface GlassSettingsAppProps {
  settings: LauncherSettings;
  onUpdateSettings: (newSettings: Partial<LauncherSettings>) => void;
  tokens: GlassStyleTokens;
  isPhoneFrameView: boolean;
  onTogglePhoneFrame: () => void;
  onResetDefaults: () => void;
  onClose: () => void;
}

export const GlassSettingsApp: React.FC<GlassSettingsAppProps> = ({
  settings,
  onUpdateSettings,
  tokens,
  isPhoneFrameView,
  onTogglePhoneFrame,
  onResetDefaults,
}) => {
  const glassColorOptions: {
    id: GlassColorMode;
    name: string;
    description: string;
    previewBg: string;
    badge: string;
  }[] = [
    {
      id: 'transparent',
      name: 'Transparent Crystal',
      description: 'Clear fluid glass with crisp refraction & light specular shine',
      previewBg: 'rgba(255, 255, 255, 0.18)',
      badge: 'border-white/90 bg-white/30',
    },
    {
      id: 'black',
      name: 'Black Obsidian Glass',
      description: 'Smoked midnight dark glass with platinum liquid highlights',
      previewBg: 'rgba(12, 14, 20, 0.85)',
      badge: 'border-white/30 bg-slate-900',
    },
    {
      id: 'white',
      name: 'White Opal Glass',
      description: 'Frosted milky opaline porcelain glass with bright pearl diffusion',
      previewBg: 'rgba(255, 255, 255, 0.85)',
      badge: 'border-slate-300 bg-white text-slate-900',
    },
    {
      id: 'emerald',
      name: 'Emerald Liquid',
      description: 'Deep green gemstone fluid glass with caustic rim glow',
      previewBg: 'rgba(6, 40, 30, 0.8)',
      badge: 'border-emerald-400 bg-emerald-900',
    },
    {
      id: 'sapphire',
      name: 'Sapphire Liquid',
      description: 'Deep royal blue refractive liquid glass with ice highlights',
      previewBg: 'rgba(15, 28, 56, 0.8)',
      badge: 'border-blue-400 bg-blue-900',
    },
    {
      id: 'amethyst',
      name: 'Amethyst Liquid',
      description: 'Regal violet fluid crystal glass with violet edge dispersion',
      previewBg: 'rgba(38, 16, 52, 0.8)',
      badge: 'border-purple-400 bg-purple-900',
    },
  ];

  const blurOptions: { id: GlassBlur; label: string }[] = [
    { id: 'low', label: 'Crisp (Low)' },
    { id: 'medium', label: 'Balanced (Med)' },
    { id: 'high', label: 'Frosted (Deep)' },
  ];

  const glossOptions: { id: GlassGloss; label: string }[] = [
    { id: 'subtle', label: 'Subtle Matte' },
    { id: 'vibrant', label: 'Vibrant Glass' },
    { id: 'liquid', label: 'Liquid Caustic' },
  ];

  const iconShapes: { id: IconShape; label: string; iconClass: string }[] = [
    { id: 'squircle', label: 'Squircle', iconClass: 'rounded-xl' },
    { id: 'circle', label: 'Circle', iconClass: 'rounded-full' },
    { id: 'droplet', label: 'Droplet', iconClass: 'rounded-2xl rounded-tr-xs' },
    { id: 'smooth-hexagon', label: 'Hexagon', iconClass: 'rounded-[14px]' },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 select-none gap-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-cyan-400" />
          <div>
            <h2 className="text-base font-bold tracking-tight" style={{ color: tokens.textColor }}>
              Liquid Glass Engine Settings
            </h2>
            <p className="text-[11px] opacity-75" style={{ color: tokens.subtextColor }}>
              Customize glass aesthetics, refraction, and launcher style
            </p>
          </div>
        </div>
        <button
          onClick={onResetDefaults}
          aria-label="Reset to default settings"
          className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white/70 hover:text-white"
          title="Reset to default launcher settings"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* 1. Core Glass Color Choice (Transparent, Black, White + Tints) */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: tokens.textColor }}>
            Glass Color Type (Android Theme)
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {glassColorOptions.map((opt) => {
            const isSelected = settings.glassColorMode === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onUpdateSettings({ glassColorMode: opt.id })}
                className={`
                  relative p-3 rounded-2xl flex items-center gap-3 text-left transition-all cursor-pointer backdrop-blur-md
                  ${
                    isSelected
                      ? 'border-2 border-cyan-400 shadow-xl scale-[1.01]'
                      : 'border border-white/15 hover:border-white/30 hover:bg-white/10'
                  }
                `}
                style={{
                  background: opt.previewBg,
                  color: opt.id === 'white' ? '#0f172a' : '#ffffff',
                }}
              >
                {/* Visual Swatch Pill */}
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 shadow-inner ${opt.badge}`}
                >
                  {isSelected && <Check className="w-5 h-5 text-cyan-400" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate">{opt.name}</span>
                    {isSelected && (
                      <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-400/30">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] mt-0.5 line-clamp-2 opacity-80 leading-snug">
                    {opt.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Glass Blur and Refraction Level */}
      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold" style={{ color: tokens.textColor }}>
              Backdrop Blur Intensity
            </span>
          </div>
          <span className="text-[11px] font-mono opacity-70" style={{ color: tokens.textColor }}>
            {settings.glassBlur.toUpperCase()}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {blurOptions.map((b) => (
            <button
              key={b.id}
              onClick={() => onUpdateSettings({ glassBlur: b.id })}
              className={`
                py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer border
                ${
                  settings.glassBlur === b.id
                    ? 'bg-cyan-500/40 border-cyan-400 text-white shadow-md'
                    : 'bg-white/10 border-white/15 text-white/70 hover:text-white'
                }
              `}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Liquid Gloss & Specular Caustics */}
      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold" style={{ color: tokens.textColor }}>
              Liquid Gloss & Specular Sheen
            </span>
          </div>
          <span className="text-[11px] font-mono opacity-70" style={{ color: tokens.textColor }}>
            {settings.glassGloss.toUpperCase()}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {glossOptions.map((g) => (
            <button
              key={g.id}
              onClick={() => onUpdateSettings({ glassGloss: g.id })}
              className={`
                py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer border
                ${
                  settings.glassGloss === g.id
                    ? 'bg-cyan-500/40 border-cyan-400 text-white shadow-md'
                    : 'bg-white/10 border-white/15 text-white/70 hover:text-white'
                }
              `}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Wallpaper Selection */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Eye className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: tokens.textColor }}>
            Wallpaper Under Glass
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {WALLPAPERS.map((wp) => {
            const isSelected = settings.wallpaperId === wp.id;
            return (
              <button
                key={wp.id}
                onClick={() => onUpdateSettings({ wallpaperId: wp.id })}
                className={`
                  relative h-20 rounded-2xl overflow-hidden border transition-all cursor-pointer p-2 flex flex-col justify-end
                  ${
                    isSelected
                      ? 'border-2 border-cyan-400 shadow-xl scale-[1.02]'
                      : 'border-white/20 hover:border-white/40'
                  }
                `}
                style={{ background: wp.preview }}
              >
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className="text-[11px] font-bold text-white drop-shadow truncate">
                    {wp.name}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 drop-shadow" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Android Icon Shapes */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: tokens.textColor }}>
          Android App Icon Shape
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {iconShapes.map((shape) => {
            const isSelected = settings.iconShape === shape.id;
            return (
              <button
                key={shape.id}
                onClick={() => onUpdateSettings({ iconShape: shape.id })}
                className={`
                  flex flex-col items-center justify-center py-2.5 px-1 rounded-2xl border transition-all cursor-pointer
                  ${
                    isSelected
                      ? 'bg-cyan-500/30 border-cyan-400 text-white shadow-md'
                      : 'bg-white/10 border-white/15 text-white/70 hover:text-white'
                  }
                `}
              >
                <div className={`w-7 h-7 mb-1.5 border border-white/60 bg-white/20 shadow-sm ${shape.iconClass}`} />
                <span className="text-[10px] font-medium">{shape.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Display Device View Mode */}
      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Smartphone className="w-5 h-5 text-cyan-400" />
          <div>
            <span className="text-xs font-bold block" style={{ color: tokens.textColor }}>
              Display Mode
            </span>
            <span className="text-[10px] opacity-70" style={{ color: tokens.subtextColor }}>
              {isPhoneFrameView ? 'Smartphone Bezel Simulation' : 'Full Screen Launcher'}
            </span>
          </div>
        </div>
        <button
          onClick={onTogglePhoneFrame}
          className={`
            px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer
            ${isPhoneFrameView ? 'bg-cyan-500 text-white border-cyan-400 shadow' : 'bg-white/10 text-white border-white/20'}
          `}
        >
          {isPhoneFrameView ? 'Phone Frame' : 'Full Screen'}
        </button>
      </div>

      {/* 7. Additional Toggles */}
      <div className="flex flex-col gap-2 pt-1 border-t border-white/10">
        <label className="flex items-center justify-between text-xs cursor-pointer py-1">
          <span style={{ color: tokens.textColor }}>Show App Icon Labels</span>
          <input
            type="checkbox"
            checked={settings.showIconLabels}
            onChange={(e) => onUpdateSettings({ showIconLabels: e.target.checked })}
            className="w-4 h-4 accent-cyan-400 cursor-pointer"
          />
        </label>
        <label className="flex items-center justify-between text-xs cursor-pointer py-1">
          <span style={{ color: tokens.textColor }}>Liquid Shimmering Reflections</span>
          <input
            type="checkbox"
            checked={settings.liquidShineAnimation}
            onChange={(e) => onUpdateSettings({ liquidShineAnimation: e.target.checked })}
            className="w-4 h-4 accent-cyan-400 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
};
