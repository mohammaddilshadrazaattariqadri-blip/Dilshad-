import React from 'react';
import { ChevronUp } from 'lucide-react';
import { AppItem, IconShape } from '../types/launcher';
import { GlassStyleTokens } from '../utils/launcherLogic';
import { GlassAppIcon } from './GlassAppIcon';
import { LiquidGlassSurface } from './LiquidGlassSurface';

interface GlassDockProps {
  dockApps: AppItem[];
  tokens: GlassStyleTokens;
  shape: IconShape;
  onOpenApp: (app: AppItem) => void;
  onOpenAppDrawer: () => void;
  liquidAnimation: boolean;
}

export const GlassDock: React.FC<GlassDockProps> = ({
  dockApps,
  tokens,
  shape,
  onOpenApp,
  onOpenAppDrawer,
  liquidAnimation,
}) => {
  return (
    <div className="w-full px-3 flex flex-col items-center gap-1 z-30 select-none pb-1">
      {/* Swipe Up Drawer Hint Affordance */}
      <button
        onClick={onOpenAppDrawer}
        aria-label="Swipe up to open App Drawer"
        className="group flex flex-col items-center justify-center py-1 opacity-70 hover:opacity-100 transition-opacity"
      >
        <ChevronUp
          className="w-4 h-4 animate-bounce group-hover:scale-125 transition-transform"
          style={{ color: tokens.textColor }}
        />
        <span
          className="text-[9px] font-semibold tracking-wider uppercase"
          style={{ color: tokens.subtextColor }}
        >
          Swipe up for Apps
        </span>
      </button>

      {/* Fluid Liquid Glass Dock Container */}
      <LiquidGlassSurface
        tokens={tokens}
        variant="dock"
        className="w-full max-w-sm rounded-[28px] px-3 py-2.5 shadow-2xl transition-all duration-300"
      >
        <div className="flex items-center justify-around w-full">
          {dockApps.map((app) => (
            <GlassAppIcon
              key={app.id}
              app={app}
              tokens={tokens}
              shape={shape}
              showLabel={false}
              size="md"
              onClick={onOpenApp}
              liquidAnimation={liquidAnimation}
            />
          ))}
        </div>
      </LiquidGlassSurface>
    </div>
  );
};
