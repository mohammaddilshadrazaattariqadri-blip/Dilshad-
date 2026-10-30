import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Battery, BatteryCharging, Bell, Moon } from 'lucide-react';
import { GlassStyleTokens } from '../utils/launcherLogic';
import { QuickSettingsState } from '../types/launcher';

interface AndroidStatusBarProps {
  tokens: GlassStyleTokens;
  quickSettings: QuickSettingsState;
  onOpenQuickSettings: () => void;
}

export const AndroidStatusBar: React.FC<AndroidStatusBarProps> = ({
  tokens,
  quickSettings,
  onOpenQuickSettings,
}) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      onClick={onOpenQuickSettings}
      className={`
        w-full h-9 px-4 flex items-center justify-between z-40 select-none cursor-pointer
        transition-colors duration-200 hover:bg-white/5 active:bg-white/10
      `}
      style={{
        color: tokens.textColor,
      }}
      title="Tap or drag to open Quick Settings"
      aria-label="Status Bar - tap to open quick settings"
    >
      {/* Left: Time and Notifications */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold tracking-tight font-mono">{timeStr}</span>
        {quickSettings.dnd && (
          <Moon className="w-3 h-3 text-amber-400" aria-label="Do Not Disturb active" />
        )}
        <Bell className="w-3 h-3 opacity-60" aria-label="Notifications" />
      </div>

      {/* Center: Camera Punch Hole */}
      <div className="flex items-center justify-center">
        <div
          className="w-3.5 h-3.5 rounded-full bg-black/90 border border-white/20 shadow-inner flex items-center justify-center"
          title="Camera sensor"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-900/60" />
        </div>
      </div>

      {/* Right: Connectivity & Battery */}
      <div className="flex items-center gap-2">
        {/* Network */}
        <div className="flex items-center gap-0.5" title="5G Ultra Connected">
          <span className="text-[10px] font-bold tracking-tight opacity-80">5G</span>
          <div className="flex items-end gap-[1.5px] h-3">
            <span className="w-0.5 h-1.5 bg-current rounded-xs opacity-90" />
            <span className="w-0.5 h-2 bg-current rounded-xs opacity-90" />
            <span className="w-0.5 h-2.5 bg-current rounded-xs opacity-90" />
            <span className="w-0.5 h-3 bg-current rounded-xs opacity-90" />
          </div>
        </div>

        {/* Wi-Fi */}
        {quickSettings.wifi ? (
          <Wifi className="w-3.5 h-3.5 opacity-90" aria-label="Wi-Fi connected" />
        ) : (
          <WifiOff className="w-3.5 h-3.5 opacity-50" aria-label="Wi-Fi disconnected" />
        )}

        {/* Battery */}
        <div className="flex items-center gap-1" title="Battery: 88%">
          <span className="text-[11px] font-mono font-medium opacity-90">88%</span>
          <div className="relative flex items-center">
            {quickSettings.cellular ? (
              <Battery className="w-4 h-4 opacity-90" />
            ) : (
              <BatteryCharging className="w-4 h-4 text-emerald-400" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
