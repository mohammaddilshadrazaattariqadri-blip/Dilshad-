import React from 'react';
import {
  Phone,
  MessageSquare,
  Camera,
  Music,
  CloudSun,
  Clock,
  Calculator,
  FileText,
  Image,
  Settings,
  Compass,
  Calendar,
  Folder,
  Activity,
  Radio,
  Terminal,
  HelpCircle,
} from 'lucide-react';
import { AppItem, IconShape } from '../types/launcher';
import { GlassStyleTokens } from '../utils/launcherLogic';

interface GlassAppIconProps {
  app: AppItem;
  tokens: GlassStyleTokens;
  shape?: IconShape;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick: (app: AppItem) => void;
  liquidAnimation?: boolean;
}

const ICON_COMPONENTS: Record<string, React.ElementType> = {
  Phone,
  MessageSquare,
  Camera,
  Music,
  CloudSun,
  Clock,
  Calculator,
  FileText,
  Image,
  Settings,
  Compass,
  Calendar,
  Folder,
  Activity,
  Radio,
  Terminal,
};

export const GlassAppIcon: React.FC<GlassAppIconProps> = ({
  app,
  tokens,
  shape = 'squircle',
  showLabel = true,
  size = 'md',
  onClick,
  liquidAnimation = true,
}) => {
  const IconComponent = ICON_COMPONENTS[app.iconName] || HelpCircle;

  // Shapes
  const shapeRadius: Record<IconShape, string> = {
    squircle: 'rounded-2xl',
    circle: 'rounded-full',
    droplet: 'rounded-3xl rounded-tr-sm',
    'smooth-hexagon': 'rounded-[20px]',
  };

  const sizeClasses = {
    sm: { container: 'w-11 h-11', icon: 'w-5 h-5', text: 'text-[10px]' },
    md: { container: 'w-14 h-14', icon: 'w-6 h-6', text: 'text-[11px]' },
    lg: { container: 'w-16 h-16', icon: 'w-7 h-7', text: 'text-xs' },
  }[size];

  return (
    <button
      onClick={() => onClick(app)}
      aria-label={`Open ${app.name}`}
      className="group relative flex flex-col items-center justify-center p-1 cursor-pointer focus:outline-none select-none transition-transform active:scale-90"
    >
      {/* Liquid Glass Icon Shell */}
      <div
        className={`
          relative ${sizeClasses.container} ${shapeRadius[shape]}
          flex items-center justify-center
          ${tokens.backdropBlurClass}
          transition-all duration-300
          group-hover:scale-105 group-active:scale-95
          shadow-lg
        `}
        style={{
          background: `linear-gradient(135deg, ${app.accentColor}33 0%, ${tokens.cardBg} 60%, ${app.accentColor}15 100%)`,
          border: tokens.border,
          boxShadow: `
            inset 0 1.5px 2px 0 rgba(255, 255, 255, ${tokens.specularOpacity * 0.9}),
            inset 0 -2px 4px 0 rgba(0, 0, 0, 0.35),
            0 8px 20px -2px rgba(0, 0, 0, 0.4),
            0 0 12px ${app.accentColor}25
          `,
        }}
      >
        {/* Specular Liquid Dome Reflection */}
        <div
          className={`absolute inset-x-1 top-1 h-1/2 ${shapeRadius[shape]} pointer-events-none`}
          style={{
            background: `linear-gradient(180deg, rgba(255, 255, 255, ${tokens.specularOpacity * 0.75}) 0%, rgba(255, 255, 255, 0.08) 60%, transparent 100%)`,
          }}
          aria-hidden="true"
        />

        {/* Fluid Caustic Lens Shimmer */}
        {liquidAnimation && (
          <div
            className="absolute inset-0 rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 40% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Inner Icon Glyph */}
        <div
          className="relative z-10 flex items-center justify-center"
          style={{
            color: tokens.textColor,
            filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.4))`,
          }}
        >
          <IconComponent className={sizeClasses.icon} strokeWidth={2.2} />
        </div>

        {/* Liquid Glass Notification Badge */}
        {app.badge !== undefined && app.badge > 0 && (
          <div
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-md border border-white/60 z-20 backdrop-blur-md"
            style={{
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(185, 28, 28, 0.85) 100%)',
              boxShadow: '0 2px 6px rgba(239, 68, 68, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.6)',
            }}
            aria-label={`${app.badge} unread notifications`}
          >
            {app.badge}
          </div>
        )}
      </div>

      {/* App Label */}
      {showLabel && (
        <span
          className={`
            mt-1.5 ${sizeClasses.text} font-medium tracking-tight text-center truncate max-w-[68px]
            transition-colors duration-200
          `}
          style={{
            color: tokens.textColor,
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
          }}
        >
          {app.name}
        </span>
      )}
    </button>
  );
};
