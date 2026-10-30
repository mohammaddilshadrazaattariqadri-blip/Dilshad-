import { GlassColorMode, GlassBlur, GlassGloss, AppItem, QuickSettingsState, WallpaperOption } from '../types/launcher';

export interface GlassStyleTokens {
  containerBg: string;
  cardBg: string;
  pillBg: string;
  dockBg: string;
  border: string;
  innerShadow: string;
  dropShadow: string;
  textColor: string;
  subtextColor: string;
  accentColor: string;
  backdropBlurClass: string;
  specularOpacity: number;
}

export function getGlassThemeStyles(
  mode: GlassColorMode,
  blur: GlassBlur = 'medium',
  gloss: GlassGloss = 'vibrant'
): GlassStyleTokens {
  const blurMap: Record<GlassBlur, string> = {
    low: 'backdrop-blur-md',
    medium: 'backdrop-blur-xl',
    high: 'backdrop-blur-2xl',
  };

  const specularMap: Record<GlassGloss, number> = {
    subtle: 0.25,
    vibrant: 0.65,
    liquid: 0.95,
  };

  switch (mode) {
    case 'black':
      return {
        containerBg: 'rgba(12, 14, 20, 0.72)',
        cardBg: 'rgba(18, 22, 32, 0.65)',
        pillBg: 'rgba(28, 34, 48, 0.7)',
        dockBg: 'rgba(14, 17, 26, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        innerShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), inset 0 -2px 4px 0 rgba(0, 0, 0, 0.6)',
        dropShadow: '0 12px 36px -4px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        textColor: '#FFFFFF',
        subtextColor: 'rgba(255, 255, 255, 0.68)',
        accentColor: '#38bdf8', // Ice Cyan
        backdropBlurClass: blurMap[blur],
        specularOpacity: specularMap[gloss],
      };

    case 'white':
      return {
        containerBg: 'rgba(255, 255, 255, 0.62)',
        cardBg: 'rgba(255, 255, 255, 0.72)',
        pillBg: 'rgba(255, 255, 255, 0.82)',
        dockBg: 'rgba(255, 255, 255, 0.78)',
        border: '1px solid rgba(255, 255, 255, 0.95)',
        innerShadow: 'inset 0 1.5px 2px 0 rgba(255, 255, 255, 1), inset 0 -1px 3px 0 rgba(0, 0, 0, 0.08)',
        dropShadow: '0 12px 36px -4px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(255, 255, 255, 0.8)',
        textColor: '#0f172a',
        subtextColor: '#475569',
        accentColor: '#2563eb', // Royal Blue
        backdropBlurClass: blurMap[blur],
        specularOpacity: specularMap[gloss],
      };

    case 'emerald':
      return {
        containerBg: 'rgba(6, 40, 30, 0.65)',
        cardBg: 'rgba(10, 56, 42, 0.6)',
        pillBg: 'rgba(16, 78, 58, 0.65)',
        dockBg: 'rgba(6, 36, 28, 0.75)',
        border: '1px solid rgba(52, 211, 153, 0.35)',
        innerShadow: 'inset 0 1px 2px 0 rgba(167, 243, 208, 0.45), inset 0 -2px 4px 0 rgba(0, 0, 0, 0.5)',
        dropShadow: '0 12px 36px -4px rgba(4, 30, 22, 0.8), 0 0 16px rgba(16, 185, 129, 0.2)',
        textColor: '#F0FDF4',
        subtextColor: 'rgba(209, 250, 229, 0.75)',
        accentColor: '#34d399',
        backdropBlurClass: blurMap[blur],
        specularOpacity: specularMap[gloss],
      };

    case 'sapphire':
      return {
        containerBg: 'rgba(15, 28, 56, 0.65)',
        cardBg: 'rgba(22, 42, 82, 0.6)',
        pillBg: 'rgba(30, 58, 114, 0.65)',
        dockBg: 'rgba(12, 24, 48, 0.75)',
        border: '1px solid rgba(96, 165, 250, 0.35)',
        innerShadow: 'inset 0 1px 2px 0 rgba(191, 219, 254, 0.45), inset 0 -2px 4px 0 rgba(0, 0, 0, 0.5)',
        dropShadow: '0 12px 36px -4px rgba(8, 18, 38, 0.8), 0 0 16px rgba(59, 130, 246, 0.2)',
        textColor: '#EFF6FF',
        subtextColor: 'rgba(219, 234, 254, 0.75)',
        accentColor: '#60a5fa',
        backdropBlurClass: blurMap[blur],
        specularOpacity: specularMap[gloss],
      };

    case 'amethyst':
      return {
        containerBg: 'rgba(38, 16, 52, 0.65)',
        cardBg: 'rgba(54, 24, 74, 0.6)',
        pillBg: 'rgba(74, 34, 102, 0.65)',
        dockBg: 'rgba(32, 14, 44, 0.75)',
        border: '1px solid rgba(192, 132, 252, 0.35)',
        innerShadow: 'inset 0 1px 2px 0 rgba(233, 213, 255, 0.45), inset 0 -2px 4px 0 rgba(0, 0, 0, 0.5)',
        dropShadow: '0 12px 36px -4px rgba(24, 10, 34, 0.8), 0 0 16px rgba(168, 85, 247, 0.2)',
        textColor: '#FAF5FF',
        subtextColor: 'rgba(243, 232, 255, 0.75)',
        accentColor: '#c084fc',
        backdropBlurClass: blurMap[blur],
        specularOpacity: specularMap[gloss],
      };

    case 'transparent':
    default:
      return {
        containerBg: 'rgba(255, 255, 255, 0.12)',
        cardBg: 'rgba(255, 255, 255, 0.16)',
        pillBg: 'rgba(255, 255, 255, 0.22)',
        dockBg: 'rgba(255, 255, 255, 0.18)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        innerShadow: 'inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.65), inset 0 -1.5px 3px 0 rgba(0, 0, 0, 0.2)',
        dropShadow: '0 16px 40px 0 rgba(0, 0, 0, 0.35), 0 0 1px rgba(255, 255, 255, 0.5)',
        textColor: '#FFFFFF',
        subtextColor: 'rgba(255, 255, 255, 0.78)',
        accentColor: '#ffffff',
        backdropBlurClass: blurMap[blur],
        specularOpacity: specularMap[gloss],
      };
  }
}

export function filterApps(apps: AppItem[], query: string, category: string): AppItem[] {
  const cleanQuery = query.trim().toLowerCase();
  return apps.filter((app) => {
    const matchesCategory = category === 'all' || app.category === category;
    const matchesQuery =
      cleanQuery === '' ||
      app.name.toLowerCase().includes(cleanQuery) ||
      (app.description && app.description.toLowerCase().includes(cleanQuery));
    return matchesCategory && matchesQuery;
  });
}

export function calculateExpression(expression: string): { result: string; error?: string } {
  try {
    const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');
    // Verify only allowed mathematical tokens
    if (!/^[0-9+\-*/().\s]+$/.test(sanitized)) {
      return { result: 'Error', error: 'Invalid characters' };
    }
    // eslint-disable-next-line no-new-func
    const evaluated = Function(`'use strict'; return (${sanitized})`)();
    if (typeof evaluated !== 'number' || !Number.isFinite(evaluated)) {
      return { result: 'Error', error: 'Calculation error' };
    }
    // Round to avoid floating point precision artifacts
    const rounded = Math.round(evaluated * 1000000) / 1000000;
    return { result: rounded.toString() };
  } catch {
    return { result: 'Error', error: 'Malformed expression' };
  }
}

export function toggleQuickSetting(
  state: QuickSettingsState,
  key: keyof Omit<QuickSettingsState, 'brightness' | 'volume'>
): QuickSettingsState {
  return {
    ...state,
    [key]: !state[key],
  };
}

export const WALLPAPERS: WallpaperOption[] = [
  {
    id: 'prism-wave',
    name: 'Liquid Prism',
    preview: 'linear-gradient(135deg, #09090e 0%, #1e1b4b 35%, #0369a1 70%, #064e3b 100%)',
    type: 'css-gradient',
    backgroundStyle: 'radial-gradient(ellipse at 80% 20%, rgba(56, 189, 248, 0.45) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(168, 85, 247, 0.4) 0%, transparent 65%), linear-gradient(145deg, #090d16 0%, #151b2d 50%, #06090e 100%)',
  },
  {
    id: 'obsidian-deep',
    name: 'Obsidian Velvet',
    preview: 'linear-gradient(160deg, #030712 0%, #111827 50%, #1f2937 100%)',
    type: 'css-gradient',
    backgroundStyle: 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 70%), linear-gradient(180deg, #030712 0%, #0b0f19 50%, #020408 100%)',
  },
  {
    id: 'pearl-fluid',
    name: 'Pearl Opaline',
    preview: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
    type: 'css-gradient',
    backgroundStyle: 'radial-gradient(ellipse at 70% 20%, rgba(186, 230, 253, 0.6) 0%, transparent 55%), radial-gradient(ellipse at 20% 75%, rgba(253, 186, 116, 0.4) 0%, transparent 60%), linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #f8fafc 100%)',
  },
  {
    id: 'cosmic-aurora',
    name: 'Cosmic Aurora',
    preview: 'linear-gradient(135deg, #022c22 0%, #064e3b 30%, #0284c7 70%, #4f46e5 100%)',
    type: 'css-gradient',
    backgroundStyle: 'radial-gradient(circle at 10% 20%, rgba(52, 211, 153, 0.5) 0%, transparent 50%), radial-gradient(circle at 90% 70%, rgba(129, 140, 248, 0.45) 0%, transparent 55%), linear-gradient(160deg, #022c22 0%, #041d24 50%, #050b14 100%)',
  },
  {
    id: 'rose-gold-liquid',
    name: 'Rose Quicksilver',
    preview: 'linear-gradient(135deg, #4c0519 0%, #831843 40%, #be123c 80%, #fb7185 100%)',
    type: 'css-gradient',
    backgroundStyle: 'radial-gradient(circle at 80% 30%, rgba(251, 113, 133, 0.45) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(190, 24, 93, 0.4) 0%, transparent 60%), linear-gradient(140deg, #2a0310 0%, #47061d 50%, #150107 100%)',
  },
];

export const DEFAULT_APPS: AppItem[] = [
  { id: 'phone', name: 'Phone', iconName: 'Phone', category: 'system', accentColor: '#22c55e', badge: 2, description: 'Speed dial & call logs' },
  { id: 'messages', name: 'Messages', iconName: 'MessageSquare', category: 'social', accentColor: '#3b82f6', badge: 4, description: 'Glass chat & texts' },
  { id: 'camera', name: 'Camera', iconName: 'Camera', category: 'media', accentColor: '#ec4899', description: 'Liquid optics & live capture' },
  { id: 'music', name: 'Music', iconName: 'Music', category: 'media', accentColor: '#a855f7', description: 'Fluid lo-fi audio player' },
  { id: 'weather', name: 'Weather', iconName: 'CloudSun', category: 'tools', accentColor: '#0ea5e9', description: 'Atmospheric fluid weather' },
  { id: 'clock', name: 'Clock', iconName: 'Clock', category: 'tools', accentColor: '#f97316', description: 'Timer, stopwatch & alarms' },
  { id: 'calculator', name: 'Calculator', iconName: 'Calculator', category: 'productivity', accentColor: '#eab308', description: 'Glass tactile math solver' },
  { id: 'notes', name: 'Notes', iconName: 'FileText', category: 'productivity', accentColor: '#10b981', description: 'Glass pad & checklists' },
  { id: 'gallery', name: 'Gallery', iconName: 'Image', category: 'media', accentColor: '#f43f5e', description: 'Fluid photo album' },
  { id: 'settings', name: 'Settings', iconName: 'Settings', category: 'system', accentColor: '#64748b', description: 'Liquid glass & launcher controls' },
  { id: 'browser', name: 'Browser', iconName: 'Compass', category: 'tools', accentColor: '#06b6d4', description: 'Web exploration portal' },
  { id: 'calendar', name: 'Calendar', iconName: 'Calendar', category: 'productivity', accentColor: '#8b5cf6', description: 'Schedule & events' },
  { id: 'files', name: 'Files', iconName: 'Folder', category: 'system', accentColor: '#d97706', description: 'Storage & liquid docs' },
  { id: 'health', name: 'Health', iconName: 'Activity', category: 'productivity', accentColor: '#14b8a6', description: 'Steps & biometric vitals' },
  { id: 'radio', name: 'Radio', iconName: 'Radio', category: 'media', accentColor: '#f43f5e', description: 'Liquid FM & ambient waves' },
  { id: 'terminal', name: 'Terminal', iconName: 'Terminal', category: 'tools', accentColor: '#6366f1', description: 'Android debug shell' },
];

export const DOCK_APP_IDS = ['phone', 'messages', 'camera', 'music', 'browser'];
