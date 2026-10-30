import React, { useState, useMemo } from 'react';
import { Search, X, Grid } from 'lucide-react';
import { AppItem, AppCategory, IconShape } from '../types/launcher';
import { GlassStyleTokens, filterApps } from '../utils/launcherLogic';
import { GlassAppIcon } from './GlassAppIcon';
import { LiquidGlassSurface } from './LiquidGlassSurface';

interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  apps: AppItem[];
  tokens: GlassStyleTokens;
  shape: IconShape;
  showLabels: boolean;
  onOpenApp: (app: AppItem) => void;
  liquidAnimation: boolean;
}

export const AppDrawer: React.FC<AppDrawerProps> = ({
  isOpen,
  onClose,
  apps,
  tokens,
  shape,
  showLabels,
  onOpenApp,
  liquidAnimation,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AppCategory>('all');

  const categories: { key: AppCategory; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'system', label: 'System' },
    { key: 'media', label: 'Media' },
    { key: 'productivity', label: 'Work' },
    { key: 'tools', label: 'Tools' },
  ];

  const filtered = useMemo(() => {
    return filterApps(apps, search, selectedCategory);
  }, [apps, search, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="App Drawer"
      className="absolute inset-0 z-50 flex flex-col justify-end animate-in fade-in duration-200"
    >
      {/* Backdrop scrim */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Slide-Up Liquid Glass Drawer Sheet */}
      <LiquidGlassSurface
        tokens={tokens}
        variant="container"
        className="relative z-10 w-full h-[88%] rounded-t-[36px] flex flex-col px-4 pt-3 pb-6 shadow-2xl overflow-hidden border-t border-white/30"
      >
        {/* Grab Handle */}
        <div
          onClick={onClose}
          className="w-full flex flex-col items-center justify-center cursor-pointer py-1"
          title="Drag down or tap to close"
        >
          <div className="w-12 h-1.5 rounded-full bg-white/40 hover:bg-white/70 transition-colors" />
        </div>

        {/* Drawer Header & Search */}
        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Grid className="w-5 h-5 opacity-80" style={{ color: tokens.textColor }} />
            <h2
              className="text-base font-bold tracking-tight"
              style={{ color: tokens.textColor }}
            >
              All Applications
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close App Drawer"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/25 active:scale-90 transition-all"
            style={{ color: tokens.textColor }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Search Field */}
        <div className="mt-3 relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 opacity-60" style={{ color: tokens.textColor }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search all installed apps..."
            className="w-full h-10 pl-10 pr-9 rounded-2xl text-xs font-medium bg-white/10 border border-white/20 outline-none focus:border-white/50 transition-all placeholder:opacity-50"
            style={{ color: tokens.textColor }}
            autoFocus
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-2.5 text-xs text-white/60 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Interactive Category Segmented Tabs */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`
                  px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer
                  ${isActive ? 'shadow-md border border-white/40' : 'opacity-70 hover:opacity-100 hover:bg-white/10'}
                `}
                style={{
                  background: isActive ? 'rgba(255, 255, 255, 0.28)' : 'transparent',
                  color: tokens.textColor,
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Apps Grid */}
        <div className="mt-3 flex-1 overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="w-full h-48 flex flex-col items-center justify-center text-center opacity-60">
              <Search className="w-8 h-8 mb-2" />
              <p className="text-sm">No applications found for &quot;{search}&quot;</p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('all');
                }}
                className="mt-2 text-xs underline font-medium hover:text-white"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-y-4 gap-x-2 py-2">
              {filtered.map((app) => (
                <div key={app.id} className="flex justify-center">
                  <GlassAppIcon
                    app={app}
                    tokens={tokens}
                    shape={shape}
                    showLabel={showLabels}
                    size="md"
                    onClick={(chosenApp) => {
                      onOpenApp(chosenApp);
                      onClose();
                    }}
                    liquidAnimation={liquidAnimation}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div
          className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] opacity-70"
          style={{ color: tokens.subtextColor }}
        >
          <span>{filtered.length} Apps available</span>
          <span>Liquid Glass Android 15</span>
        </div>
      </LiquidGlassSurface>
    </div>
  );
};
