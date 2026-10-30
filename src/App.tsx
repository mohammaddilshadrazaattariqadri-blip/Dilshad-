/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import {
  DEFAULT_APPS,
  DOCK_APP_IDS,
  WALLPAPERS,
  getGlassThemeStyles,
  filterApps,
} from './utils/launcherLogic';
import {
  GlassColorMode,
  QuickSettingsState,
  LauncherSettings,
  AppItem,
} from './types/launcher';

import { AndroidStatusBar } from './components/AndroidStatusBar';
import { AndroidNavBar } from './components/AndroidNavBar';
import { GlassWidgets } from './components/GlassWidgets';
import { GlassDock } from './components/GlassDock';
import { GlassAppIcon } from './components/GlassAppIcon';
import { AppDrawer } from './components/AppDrawer';
import { QuickSettingsShade } from './components/QuickSettingsShade';
import { AppWindowModal } from './components/AppWindowModal';

export default function App() {
  // Launcher configuration state
  const [settings, setSettings] = useState<LauncherSettings>({
    glassColorMode: 'transparent',
    glassBlur: 'medium',
    glassGloss: 'vibrant',
    iconShape: 'squircle',
    wallpaperId: 'prism-wave',
    showIconLabels: true,
    hapticFeedback: true,
    gridColumns: 4,
    liquidShineAnimation: true,
  });

  // Android System State
  const [quickSettings, setQuickSettings] = useState<QuickSettingsState>({
    wifi: true,
    bluetooth: true,
    cellular: true,
    flashlight: false,
    dnd: false,
    autoRotate: true,
    airplaneMode: false,
    brightness: 85,
    volume: 75,
  });

  // View state
  const [isPhoneFrameView, setIsPhoneFrameView] = useState(true);
  const [activeApp, setActiveApp] = useState<AppItem | null>(null);
  const [isAppDrawerOpen, setIsAppDrawerOpen] = useState(false);
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Compute Active Wallpaper
  const currentWallpaper = useMemo(() => {
    return WALLPAPERS.find((w) => w.id === settings.wallpaperId) || WALLPAPERS[0];
  }, [settings.wallpaperId]);

  // Compute Liquid Glass Styling Tokens
  const glassTokens = useMemo(() => {
    return getGlassThemeStyles(settings.glassColorMode, settings.glassBlur, settings.glassGloss);
  }, [settings.glassColorMode, settings.glassBlur, settings.glassGloss]);

  // Pinned Dock Apps
  const dockApps = useMemo(() => {
    return DOCK_APP_IDS.map((id) => DEFAULT_APPS.find((a) => a.id === id)!).filter(Boolean);
  }, []);

  // Home Screen Apps (excluding dock apps)
  const homeScreenApps = useMemo(() => {
    const unpinned = DEFAULT_APPS.filter((a) => !DOCK_APP_IDS.includes(a.id));
    if (searchQuery.trim()) {
      return filterApps(DEFAULT_APPS, searchQuery, 'all');
    }
    // Show top 8 apps on home screen
    return unpinned.slice(0, 8);
  }, [searchQuery]);

  // Setting update helper
  const handleUpdateSettings = (newSettings: Partial<LauncherSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleResetDefaults = () => {
    setSettings({
      glassColorMode: 'transparent',
      glassBlur: 'medium',
      glassGloss: 'vibrant',
      iconShape: 'squircle',
      wallpaperId: 'prism-wave',
      showIconLabels: true,
      hapticFeedback: true,
      gridColumns: 4,
      liquidShineAnimation: true,
    });
  };

  // Quick settings toggler
  const handleToggleQuickSetting = (
    key: keyof Omit<QuickSettingsState, 'brightness' | 'volume'>
  ) => {
    setQuickSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Android Navigation bar handlers
  const handleNavBack = () => {
    if (isQuickSettingsOpen) {
      setIsQuickSettingsOpen(false);
    } else if (isAppDrawerOpen) {
      setIsAppDrawerOpen(false);
    } else if (activeApp) {
      setActiveApp(null);
    } else if (searchQuery) {
      setSearchQuery('');
    }
  };

  const handleNavHome = () => {
    setIsQuickSettingsOpen(false);
    setIsAppDrawerOpen(false);
    setActiveApp(null);
    setSearchQuery('');
  };

  const handleNavRecents = () => {
    if (activeApp) {
      setActiveApp(null);
    } else {
      setIsAppDrawerOpen((prev) => !prev);
    }
  };

  // Fast theme switcher options for quick access
  const themeSwitchOptions: { id: GlassColorMode; label: string; desc: string; icon: string }[] = [
    { id: 'transparent', label: 'Transparent Glass', desc: 'Crystal Clear Refraction', icon: '💎' },
    { id: 'black', label: 'Black Obsidian', desc: 'Dark Smoked Liquid Sheen', icon: '🌑' },
    { id: 'white', label: 'White Opal', desc: 'Frosted Opaline Porcelain', icon: '⚪' },
    { id: 'emerald', label: 'Emerald Gem', desc: 'Gemstone Liquid Green', icon: '🟢' },
    { id: 'sapphire', label: 'Sapphire Blue', desc: 'Royal Blue Crystal', icon: '🔵' },
  ];

  return (
    <div className="w-screen min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Dynamic Background Ambiance */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 blur-3xl transition-all duration-700"
        style={{
          background: currentWallpaper.backgroundStyle,
        }}
        aria-hidden="true"
      />

      {/* Top Desktop Master Toolbar */}
      <header className="w-full max-w-6xl px-4 py-3 z-50 flex items-center justify-between gap-4 border-b border-white/10 backdrop-blur-md bg-slate-900/60 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
            LG
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              LiquidGlass Android Launcher
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                Android 15
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              Interactive liquid glass items with customizable transparent, black, and white glass
            </p>
          </div>
        </div>

        {/* Quick Glass Color Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {themeSwitchOptions.map((opt) => {
            const isSelected = settings.glassColorMode === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSettings((s) => ({ ...s, glassColorMode: opt.id }))}
                aria-pressed={isSelected}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all duration-200 whitespace-nowrap
                  ${
                    isSelected
                      ? 'bg-cyan-500 text-white font-bold shadow-lg shadow-cyan-500/30 scale-105 border border-cyan-300'
                      : 'bg-white/10 hover:bg-white/20 text-slate-300 border border-white/15'
                  }
                `}
                title={opt.desc}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle: Phone Frame vs Full Screen */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsPhoneFrameView(!isPhoneFrameView)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all border
              ${
                isPhoneFrameView
                  ? 'bg-slate-800 text-slate-200 border-white/20 hover:bg-slate-700'
                  : 'bg-indigo-600 text-white border-indigo-400 shadow-md'
              }
            `}
          >
            <span>{isPhoneFrameView ? '📱 Phone Bezel' : '🖥 Full Screen'}</span>
          </button>
        </div>
      </header>

      {/* Main Launcher Stage Container */}
      <main className="w-full flex-1 flex items-center justify-center p-2 md:p-6 overflow-hidden">
        {/* Android Device Shell (Phone Bezel Simulation or Full Screen) */}
        <div
          className={`
            relative overflow-hidden transition-all duration-500 flex flex-col justify-between
            ${
              isPhoneFrameView
                ? 'w-full max-w-[412px] h-[860px] max-h-[92vh] rounded-[48px] border-[10px] border-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_2px_rgba(255,255,255,0.15)] ring-1 ring-slate-800'
                : 'w-full max-w-4xl h-[90vh] rounded-3xl border border-white/20 shadow-2xl'
            }
          `}
          style={{
            background: currentWallpaper.backgroundStyle,
          }}
        >
          {/* Torch/Flashlight Simulation Overlay */}
          {quickSettings.flashlight && (
            <div
              className="absolute inset-0 bg-white/90 z-40 pointer-events-none animate-pulse"
              title="Torch active"
            />
          )}

          {/* Android Status Bar (Clickable to pull down Quick Settings) */}
          <AndroidStatusBar
            tokens={glassTokens}
            quickSettings={quickSettings}
            onOpenQuickSettings={() => setIsQuickSettingsOpen(true)}
          />

          {/* Home Screen Central Scrollable Feed */}
          <div className="flex-1 w-full overflow-y-auto px-1 py-2 flex flex-col justify-between no-scrollbar">
            {/* Top Widgets: Clock, Weather, Music, Search Capsule */}
            <GlassWidgets
              tokens={glassTokens}
              onOpenApp={(id) => {
                const found = DEFAULT_APPS.find((a) => a.id === id);
                if (found) setActiveApp(found);
              }}
              onOpenSettings={() => {
                const settingsApp = DEFAULT_APPS.find((a) => a.id === 'settings');
                if (settingsApp) setActiveApp(settingsApp);
              }}
              onOpenAppDrawer={() => setIsAppDrawerOpen(true)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              isPlayingMusic={isPlayingMusic}
              onTogglePlayMusic={() => setIsPlayingMusic(!isPlayingMusic)}
            />

            {/* Pinned Home Screen App Grid */}
            <div className="w-full px-3 py-4">
              <div
                className={`
                  grid gap-y-4 gap-x-2
                  ${settings.gridColumns === 5 ? 'grid-cols-5' : 'grid-cols-4'}
                `}
              >
                {homeScreenApps.map((app) => (
                  <div key={app.id} className="flex justify-center">
                    <GlassAppIcon
                      app={app}
                      tokens={glassTokens}
                      shape={settings.iconShape}
                      showLabel={settings.showIconLabels}
                      size="md"
                      onClick={(chosen) => setActiveApp(chosen)}
                      liquidAnimation={settings.liquidShineAnimation}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Liquid Glass Bottom Dock with Pinned Apps */}
            <GlassDock
              dockApps={dockApps}
              tokens={glassTokens}
              shape={settings.iconShape}
              onOpenApp={(chosen) => setActiveApp(chosen)}
              onOpenAppDrawer={() => setIsAppDrawerOpen(true)}
              liquidAnimation={settings.liquidShineAnimation}
            />
          </div>

          {/* Android Bottom Navigation Bar (Back, Home, Recents) */}
          <AndroidNavBar
            tokens={glassTokens}
            onBack={handleNavBack}
            onHome={handleNavHome}
            onRecents={handleNavRecents}
          />

          {/* 1. Interactive App Drawer Sheet */}
          <AppDrawer
            isOpen={isAppDrawerOpen}
            onClose={() => setIsAppDrawerOpen(false)}
            apps={DEFAULT_APPS}
            tokens={glassTokens}
            shape={settings.iconShape}
            showLabels={settings.showIconLabels}
            onOpenApp={(chosen) => setActiveApp(chosen)}
            liquidAnimation={settings.liquidShineAnimation}
          />

          {/* 2. Interactive Quick Settings & Control Center Shade */}
          <QuickSettingsShade
            isOpen={isQuickSettingsOpen}
            onClose={() => setIsQuickSettingsOpen(false)}
            tokens={glassTokens}
            quickSettings={quickSettings}
            onToggleSetting={handleToggleQuickSetting}
            onChangeBrightness={(val) => setQuickSettings((s) => ({ ...s, brightness: val }))}
            onChangeVolume={(val) => setQuickSettings((s) => ({ ...s, volume: val }))}
            activeGlassMode={settings.glassColorMode}
            onSelectGlassMode={(mode) => setSettings((s) => ({ ...s, glassColorMode: mode }))}
            onOpenFullSettings={() => {
              const settingsApp = DEFAULT_APPS.find((a) => a.id === 'settings');
              if (settingsApp) setActiveApp(settingsApp);
            }}
          />

          {/* 3. Interactive Running App Window (Calculator, Weather, Music, Notes, Camera, Settings) */}
          <AppWindowModal
            app={activeApp}
            onClose={() => setActiveApp(null)}
            tokens={glassTokens}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            isPhoneFrameView={isPhoneFrameView}
            onTogglePhoneFrame={() => setIsPhoneFrameView(!isPhoneFrameView)}
            onResetDefaults={handleResetDefaults}
            isPlayingMusic={isPlayingMusic}
            onTogglePlayMusic={() => setIsPlayingMusic(!isPlayingMusic)}
          />
        </div>
      </main>
    </div>
  );
}
