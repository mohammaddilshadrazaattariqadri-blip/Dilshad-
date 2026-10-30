import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Disc, Heart, Repeat, Shuffle } from 'lucide-react';
import { GlassStyleTokens } from '../../utils/launcherLogic';

interface GlassMusicAppProps {
  tokens: GlassStyleTokens;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  durationSec: number;
  color: string;
}

export const GlassMusicApp: React.FC<GlassMusicAppProps> = ({
  tokens,
  isPlaying,
  onTogglePlay,
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [volume, setVolume] = useState(80);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const playlist: Track[] = [
    {
      id: 1,
      title: 'Liquid Resonance',
      artist: 'Aether Waves',
      album: 'Refractive Horizons',
      duration: '3:45',
      durationSec: 225,
      color: '#38bdf8',
    },
    {
      id: 2,
      title: 'Obsidian Velvet Glow',
      artist: 'Midnight Glass',
      album: 'Subsurface Scattering',
      duration: '4:12',
      durationSec: 252,
      color: '#a855f7',
    },
    {
      id: 3,
      title: 'Prism Dispersion',
      artist: 'Spectral Echo',
      album: 'Caustic Bloom',
      duration: '3:18',
      durationSec: 198,
      color: '#34d399',
    },
    {
      id: 4,
      title: 'Opaline Dawn',
      artist: 'Solaris Cloud',
      album: 'Pure Atmosphere',
      duration: '4:30',
      durationSec: 270,
      color: '#fb7185',
    },
  ];

  const currentTrack = playlist[currentTrackIndex];

  // Synth audio generation for real ambient sounds
  useEffect(() => {
    if (isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Ambient chord frequency
        const freqs = [220, 261.63, 329.63, 392.0];
        osc.frequency.setValueAtTime(freqs[currentTrackIndex % freqs.length], ctx.currentTime);
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime((volume / 100) * 0.08, ctx.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscRef.current = osc;
        gainRef.current = gain;
      } catch (err) {
        console.warn('Audio Context init silent catch:', err);
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.3);
        setTimeout(() => {
          try {
            oscRef.current?.stop();
            oscRef.current?.disconnect();
          } catch {}
        }, 300);
      }
    }

    return () => {
      try {
        oscRef.current?.stop();
        oscRef.current?.disconnect();
      } catch {}
    };
  }, [isPlaying, currentTrackIndex, volume]);

  // Track progress timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= currentTrack.durationSec) {
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack.durationSec]);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setCurrentTime(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setCurrentTime(0);
  };

  const formatSec = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex flex-col h-full justify-between p-4 select-none">
      {/* Vinyl Disc with Liquid Sheen */}
      <div className="flex flex-col items-center justify-center my-auto py-2">
        <div
          className={`
            relative w-44 h-44 rounded-full shadow-2xl flex items-center justify-center border-4 border-white/20
            ${isPlaying ? 'animate-spin' : ''}
          `}
          style={{
            animationDuration: '10s',
            background: `radial-gradient(circle, #1e293b 0%, #0f172a 50%, #020617 100%)`,
            boxShadow: `0 16px 36px rgba(0, 0, 0, 0.6), 0 0 24px ${currentTrack.color}40`,
          }}
        >
          {/* Concentric Vinyl Grooves */}
          <div className="absolute inset-4 rounded-full border border-white/10" />
          <div className="absolute inset-8 rounded-full border border-white/5" />
          <div className="absolute inset-12 rounded-full border border-white/10" />

          {/* Center Label */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-2 border-white/40"
            style={{
              background: `linear-gradient(135deg, ${currentTrack.color} 0%, #1e1b4b 100%)`,
            }}
          >
            <Disc className="w-7 h-7 text-white/90" />
          </div>
        </div>

        {/* Track Title and Artist */}
        <div className="text-center mt-5 w-full px-4">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-lg font-bold truncate" style={{ color: tokens.textColor }}>
              {currentTrack.title}
            </h2>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="text-white/60 hover:text-rose-500 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
          <p className="text-xs mt-0.5" style={{ color: tokens.subtextColor }}>
            {currentTrack.artist} · {currentTrack.album}
          </p>
        </div>

        {/* Liquid Visualizer Waveform */}
        <div className="flex items-center justify-center gap-1.5 h-6 mt-3 w-48">
          {[20, 60, 45, 90, 75, 100, 50, 80, 40, 95, 30, 85].map((h, i) => (
            <span
              key={i}
              className="w-1.5 rounded-full transition-all duration-300"
              style={{
                height: isPlaying ? `${h}%` : '15%',
                background: `linear-gradient(to top, ${currentTrack.color}, #ffffff)`,
                opacity: isPlaying ? 0.9 : 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress Scrubber */}
      <div className="w-full flex flex-col gap-1 mt-2">
        <input
          type="range"
          min="0"
          max={currentTrack.durationSec}
          value={currentTime}
          onChange={(e) => setCurrentTime(Number(e.target.value))}
          className="w-full accent-cyan-400 h-1.5 bg-white/20 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-mono opacity-70" style={{ color: tokens.subtextColor }}>
          <span>{formatSec(currentTime)}</span>
          <span>{currentTrack.duration}</span>
        </div>
      </div>

      {/* Player Action Buttons */}
      <div className="flex items-center justify-between px-6 py-2">
        <button className="text-white/60 hover:text-white transition-colors">
          <Shuffle className="w-4 h-4" />
        </button>

        <button
          onClick={handlePrev}
          aria-label="Previous Track"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-95 text-white"
        >
          <SkipBack className="w-5 h-5 fill-current" />
        </button>

        <button
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Track"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-95 text-white"
        >
          <SkipForward className="w-5 h-5 fill-current" />
        </button>

        <button className="text-white/60 hover:text-white transition-colors">
          <Repeat className="w-4 h-4" />
        </button>
      </div>

      {/* Volume slider */}
      <div className="flex items-center gap-3 px-4 py-1">
        <Volume2 className="w-4 h-4 opacity-60" style={{ color: tokens.textColor }} />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full accent-cyan-400 h-1.5 bg-white/20 rounded-lg"
        />
        <span className="text-[10px] font-mono w-6 text-right opacity-70" style={{ color: tokens.textColor }}>
          {volume}%
        </span>
      </div>
    </div>
  );
};
