import React from 'react';
import { GlassStyleTokens } from '../utils/launcherLogic';

interface AndroidNavBarProps {
  tokens: GlassStyleTokens;
  onBack: () => void;
  onHome: () => void;
  onRecents: () => void;
  useGestureBar?: boolean;
}

export const AndroidNavBar: React.FC<AndroidNavBarProps> = ({
  tokens,
  onBack,
  onHome,
  onRecents,
  useGestureBar = false,
}) => {
  if (useGestureBar) {
    return (
      <nav
        aria-label="Gesture navigation bar"
        className="w-full h-8 flex items-center justify-center pb-1 z-40 select-none"
      >
        <button
          onClick={onHome}
          aria-label="Swipe or click Home gesture bar"
          className="w-32 h-1.5 rounded-full bg-white/60 hover:bg-white/90 active:scale-95 transition-all shadow-sm"
          style={{
            boxShadow: `0 1px 4px rgba(0,0,0,0.4), 0 0 10px ${tokens.accentColor}40`,
          }}
        />
      </nav>
    );
  }

  return (
    <nav
      aria-label="Android navigation bar"
      className="w-full h-11 px-8 flex items-center justify-around z-40 select-none"
    >
      {/* Back button */}
      <button
        onClick={onBack}
        aria-label="Back"
        className="w-12 h-9 flex items-center justify-center rounded-xl text-white/80 hover:text-white hover:bg-white/10 active:scale-90 transition-all"
        style={{ color: tokens.textColor }}
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Home button */}
      <button
        onClick={onHome}
        aria-label="Home"
        className="w-12 h-9 flex items-center justify-center rounded-xl text-white/80 hover:text-white hover:bg-white/10 active:scale-90 transition-all"
        style={{ color: tokens.textColor }}
      >
        <div
          className="w-3.5 h-3.5 rounded-full border-2 border-current"
          style={{ borderColor: tokens.textColor }}
        />
      </button>

      {/* Recents button */}
      <button
        onClick={onRecents}
        aria-label="Recent Apps"
        className="w-12 h-9 flex items-center justify-center rounded-xl text-white/80 hover:text-white hover:bg-white/10 active:scale-90 transition-all"
        style={{ color: tokens.textColor }}
      >
        <div
          className="w-3.5 h-3.5 rounded-sm border-2 border-current"
          style={{ borderColor: tokens.textColor }}
        />
      </button>
    </nav>
  );
};
