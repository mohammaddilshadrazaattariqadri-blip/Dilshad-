import React, { CSSProperties } from 'react';
import { GlassStyleTokens } from '../utils/launcherLogic';

interface LiquidGlassSurfaceProps {
  tokens: GlassStyleTokens;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  variant?: 'card' | 'container' | 'pill' | 'dock';
  interactive?: boolean;
  role?: string;
  ariaLabel?: string;
  dataTestId?: string;
}

export const LiquidGlassSurface: React.FC<LiquidGlassSurfaceProps> = ({
  tokens,
  children,
  className = '',
  style = {},
  onClick,
  variant = 'card',
  interactive = false,
  role,
  ariaLabel,
  dataTestId,
}) => {
  let background = tokens.cardBg;
  if (variant === 'container') background = tokens.containerBg;
  if (variant === 'pill') background = tokens.pillBg;
  if (variant === 'dock') background = tokens.dockBg;

  const combinedStyles: CSSProperties = {
    background,
    border: tokens.border,
    boxShadow: `${tokens.innerShadow}, ${tokens.dropShadow}`,
    color: tokens.textColor,
    ...style,
  };

  return (
    <div
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
      data-testid={dataTestId}
      className={`
        liquid-glass-base
        ${tokens.backdropBlurClass}
        ${interactive ? 'cursor-pointer active:scale-[0.98] transition-transform duration-200' : ''}
        ${className}
      `}
      style={combinedStyles}
    >
      {/* Specular Highlight Sheen Layer */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 pointer-events-none rounded-t-inherit"
        style={{
          background: `linear-gradient(180deg, rgba(255, 255, 255, ${tokens.specularOpacity * 0.45}) 0%, rgba(255, 255, 255, ${tokens.specularOpacity * 0.08}) 70%, transparent 100%)`,
        }}
        aria-hidden="true"
      />

      {/* Subtle Refractive Rim Edge Glow */}
      <div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        style={{
          boxShadow: `inset 0 1px 1px 0 rgba(255, 255, 255, ${tokens.specularOpacity * 0.6})`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};
