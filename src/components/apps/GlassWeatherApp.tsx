import React, { useState } from 'react';
import { CloudSun, CloudRain, Sun, Wind, Droplets, Compass, Eye, Thermometer } from 'lucide-react';
import { GlassStyleTokens } from '../../utils/launcherLogic';

interface GlassWeatherAppProps {
  tokens: GlassStyleTokens;
  onClose: () => void;
}

export const GlassWeatherApp: React.FC<GlassWeatherAppProps> = ({ tokens }) => {
  const [unit, setUnit] = useState<'F' | 'C'>('F');
  const [selectedCity, setSelectedCity] = useState('San Francisco');

  const cities = ['San Francisco', 'Tokyo', 'London', 'Dubai'];

  const hourly = [
    { time: 'Now', tempF: 72, tempC: 22, icon: CloudSun },
    { time: '11 AM', tempF: 74, tempC: 23, icon: Sun },
    { time: '12 PM', tempF: 76, tempC: 24, icon: Sun },
    { time: '1 PM', tempF: 75, tempC: 24, icon: CloudSun },
    { time: '2 PM', tempF: 73, tempC: 23, icon: CloudRain },
    { time: '3 PM', tempF: 70, tempC: 21, icon: CloudRain },
  ];

  const daily = [
    { day: 'Today', condition: 'Sunny', highF: 76, lowF: 58, highC: 24, lowC: 14, icon: Sun },
    { day: 'Friday', condition: 'Partly Cloudy', highF: 72, lowF: 55, highC: 22, lowC: 13, icon: CloudSun },
    { day: 'Saturday', condition: 'Light Rain', highF: 68, lowF: 53, highC: 20, lowC: 12, icon: CloudRain },
    { day: 'Sunday', condition: 'Clear', highF: 75, lowF: 56, highC: 24, lowC: 13, icon: Sun },
    { day: 'Monday', condition: 'Sunny', highF: 78, lowF: 59, highC: 25, lowC: 15, icon: Sun },
  ];

  const currentTemp = unit === 'F' ? 72 : 22;

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 select-none gap-4">
      {/* City Bar & Unit Switcher */}
      <div className="flex items-center justify-between">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="bg-white/10 text-xs font-semibold rounded-xl px-3 py-1.5 border border-white/20 outline-none cursor-pointer"
          style={{ color: tokens.textColor }}
        >
          {cities.map((c) => (
            <option key={c} value={c} className="bg-slate-900 text-white">
              {c}
            </option>
          ))}
        </select>

        {/* F / C Toggle */}
        <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl border border-white/20">
          <button
            onClick={() => setUnit('F')}
            className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all ${unit === 'F' ? 'bg-cyan-500 text-white shadow' : 'opacity-60'}`}
          >
            °F
          </button>
          <button
            onClick={() => setUnit('C')}
            className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all ${unit === 'C' ? 'bg-cyan-500 text-white shadow' : 'opacity-60'}`}
          >
            °C
          </button>
        </div>
      </div>

      {/* Main Temperature Display */}
      <div className="flex flex-col items-center justify-center py-4">
        <Sun className="w-16 h-16 text-amber-400 drop-shadow-xl animate-spin" style={{ animationDuration: '24s' }} />
        <div className="flex items-start mt-2">
          <span className="text-6xl font-extrabold font-mono" style={{ color: tokens.textColor }}>
            {currentTemp}
          </span>
          <span className="text-2xl font-bold ml-1 opacity-75">°{unit}</span>
        </div>
        <p className="text-sm font-medium mt-1" style={{ color: tokens.subtextColor }}>
          Mostly Sunny · Air Quality: 28 (Good)
        </p>
      </div>

      {/* Hourly Forecast Carousel */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-80" style={{ color: tokens.subtextColor }}>
          Hourly Forecast
        </h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {hourly.map((h, i) => {
            const Icon = h.icon;
            const temp = unit === 'F' ? h.tempF : h.tempC;
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center min-w-[64px] py-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-sm"
              >
                <span className="text-[11px] opacity-75 font-medium">{h.time}</span>
                <Icon className="w-5 h-5 text-amber-300 my-2" />
                <span className="text-xs font-bold font-mono" style={{ color: tokens.textColor }}>
                  {temp}°
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3">
          <Wind className="w-5 h-5 text-cyan-300 flex-shrink-0" />
          <div>
            <span className="text-[10px] opacity-70 block">Wind Speed</span>
            <span className="text-xs font-bold font-mono">9.4 mph WNW</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3">
          <Droplets className="w-5 h-5 text-blue-300 flex-shrink-0" />
          <div>
            <span className="text-[10px] opacity-70 block">Humidity</span>
            <span className="text-xs font-bold font-mono">54%</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3">
          <Eye className="w-5 h-5 text-emerald-300 flex-shrink-0" />
          <div>
            <span className="text-[10px] opacity-70 block">Visibility</span>
            <span className="text-xs font-bold font-mono">10.0 mi</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3">
          <Thermometer className="w-5 h-5 text-rose-300 flex-shrink-0" />
          <div>
            <span className="text-[10px] opacity-70 block">Pressure</span>
            <span className="text-xs font-bold font-mono">1014 hPa</span>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="p-3 rounded-2xl bg-white/10 border border-white/15">
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-80" style={{ color: tokens.subtextColor }}>
          5-Day Forecast
        </h3>
        <div className="flex flex-col gap-2">
          {daily.map((d, idx) => {
            const Icon = d.icon;
            const high = unit === 'F' ? d.highF : d.highC;
            const low = unit === 'F' ? d.lowF : d.lowC;
            return (
              <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-none">
                <span className="w-16 font-medium">{d.day}</span>
                <div className="flex items-center gap-1.5 flex-1 justify-center">
                  <Icon className="w-4 h-4 text-amber-300" />
                  <span className="text-[11px] opacity-75">{d.condition}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold">{high}°</span>
                  <span className="opacity-50">{low}°</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
