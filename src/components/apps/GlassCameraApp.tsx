import React, { useState, useEffect, useRef } from 'react';
import { Camera, RefreshCw, Zap, Sliders, Image as ImageIcon } from 'lucide-react';
import { GlassStyleTokens } from '../../utils/launcherLogic';

interface GlassCameraAppProps {
  tokens: GlassStyleTokens;
  onClose: () => void;
}

export const GlassCameraApp: React.FC<GlassCameraAppProps> = ({ tokens }) => {
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [filter, setFilter] = useState<'normal' | 'obsidian' | 'emerald' | 'warm'>('normal');
  const [flash, setFlash] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [isShutterActive, setIsShutterActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const initCamera = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
            audio: false,
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setHasCamera(true);
          }
        } else {
          setHasCamera(false);
        }
      } catch (e) {
        console.warn('Camera stream error, using simulated viewfinder:', e);
        setHasCamera(false);
      }
    };

    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    setIsShutterActive(true);
    setTimeout(() => setIsShutterActive(false), 200);

    // Save thumbnail
    const sample = `photo_${Date.now()}`;
    setCapturedPhotos((prev) => [sample, ...prev]);
  };

  const getFilterStyle = () => {
    switch (filter) {
      case 'obsidian':
        return 'grayscale(100%) contrast(125%)';
      case 'emerald':
        return 'hue-rotate(90deg) saturate(140%)';
      case 'warm':
        return 'sepia(40%) saturate(120%)';
      case 'normal':
      default:
        return 'none';
    }
  };

  return (
    <div className="flex flex-col h-full justify-between p-3 select-none relative bg-black/40 rounded-3xl overflow-hidden">
      {/* Top Controls */}
      <div className="flex items-center justify-between px-3 py-2 z-20">
        <button
          onClick={() => setFlash(!flash)}
          className={`p-2 rounded-full backdrop-blur-md border border-white/20 transition-all ${flash ? 'bg-amber-400 text-slate-900 shadow-lg' : 'bg-white/10 text-white'}`}
          title="Flash toggle"
        >
          <Zap className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1 bg-white/10 p-1 rounded-full border border-white/20">
          {(['normal', 'obsidian', 'emerald', 'warm'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize transition-all ${filter === f ? 'bg-cyan-500 text-white' : 'text-white/60 hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <button
          onClick={() => setFilter(filter === 'normal' ? 'obsidian' : 'normal')}
          className="p-2 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>

      {/* Viewfinder Area */}
      <div className="relative flex-1 rounded-2xl overflow-hidden flex items-center justify-center my-2 border border-white/20 bg-slate-950/80 shadow-inner">
        {/* Shutter flash overlay */}
        {isShutterActive && (
          <div className="absolute inset-0 bg-white z-30 animate-out fade-out duration-200" />
        )}

        {hasCamera ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ filter: getFilterStyle() }}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
            style={{
              background: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #090d16 100%)',
              filter: getFilterStyle(),
            }}
          >
            {/* Liquid Viewfinder Simulation */}
            <div className="w-40 h-40 rounded-full border-2 border-dashed border-cyan-400/40 flex items-center justify-center animate-pulse">
              <div className="w-20 h-20 rounded-full border border-cyan-400/60 flex items-center justify-center">
                <Camera className="w-8 h-8 text-cyan-400 opacity-80" />
              </div>
            </div>
            <span className="text-[11px] font-mono tracking-wider mt-3 opacity-60 text-white">
              LIQUID GLASS OPTICS · 4K 60FPS
            </span>
          </div>
        )}

        {/* Viewfinder crosshairs */}
        <div className="absolute inset-6 pointer-events-none flex flex-col justify-between">
          <div className="flex justify-between">
            <span className="w-4 h-4 border-t-2 border-l-2 border-white/60" />
            <span className="w-4 h-4 border-t-2 border-r-2 border-white/60" />
          </div>
          <div className="flex justify-between">
            <span className="w-4 h-4 border-b-2 border-l-2 border-white/60" />
            <span className="w-4 h-4 border-b-2 border-r-2 border-white/60" />
          </div>
        </div>
      </div>

      {/* Bottom Shutter & Gallery Strip */}
      <div className="flex items-center justify-between px-6 py-3 z-20">
        {/* Gallery Preview Thumbnail */}
        <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/30 flex items-center justify-center overflow-hidden shadow">
          {capturedPhotos.length > 0 ? (
            <div className="w-full h-full bg-cyan-600 flex items-center justify-center text-white text-[10px] font-bold">
              {capturedPhotos.length}
            </div>
          ) : (
            <ImageIcon className="w-5 h-5 opacity-60 text-white" />
          )}
        </div>

        {/* Shutter Button with Liquid Specular Rings */}
        <button
          onClick={handleCapture}
          aria-label="Capture photo"
          className="w-18 h-18 rounded-full p-1 bg-white/20 border-2 border-white/80 flex items-center justify-center shadow-2xl active:scale-90 transition-transform cursor-pointer"
        >
          <div className="w-14 h-14 rounded-full bg-white shadow-inner flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-slate-900/10" />
          </div>
        </button>

        {/* Flip Camera */}
        <button
          onClick={() => {}}
          className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white active:rotate-180 transition-transform"
          title="Switch lens"
        >
          <RefreshCw className="w-5 h-5 opacity-80" />
        </button>
      </div>
    </div>
  );
};
