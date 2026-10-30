export type GlassColorMode = 'transparent' | 'black' | 'white' | 'emerald' | 'sapphire' | 'amethyst';

export type GlassBlur = 'low' | 'medium' | 'high';
export type GlassGloss = 'subtle' | 'vibrant' | 'liquid';
export type IconShape = 'squircle' | 'circle' | 'droplet' | 'smooth-hexagon';

export type AppCategory = 'all' | 'system' | 'media' | 'productivity' | 'tools' | 'social';

export interface AppItem {
  id: string;
  name: string;
  iconName: string;
  category: AppCategory;
  accentColor: string;
  badge?: number;
  description?: string;
}

export interface QuickSettingsState {
  wifi: boolean;
  bluetooth: boolean;
  cellular: boolean;
  flashlight: boolean;
  dnd: boolean;
  autoRotate: boolean;
  airplaneMode: boolean;
  brightness: number; // 0 - 100
  volume: number; // 0 - 100
}

export interface WallpaperOption {
  id: string;
  name: string;
  preview: string;
  type: 'css-gradient' | 'liquid-mesh';
  backgroundStyle: string;
}

export interface LauncherSettings {
  glassColorMode: GlassColorMode;
  glassBlur: GlassBlur;
  glassGloss: GlassGloss;
  iconShape: IconShape;
  wallpaperId: string;
  showIconLabels: boolean;
  hapticFeedback: boolean;
  gridColumns: 4 | 5;
  liquidShineAnimation: boolean;
}
