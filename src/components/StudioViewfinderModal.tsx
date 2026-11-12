import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, RefreshCw, Volume2, Sliders, Check, Eye, Sun, Download, Sparkles } from 'lucide-react';
import womanPortraitImg from '../assets/images/kimaro_woman_portrait_1794495476614.jpg';
import manPortraitImg from '../assets/images/kimaro_man_portrait_1794495477229.jpg';

interface StudioViewfinderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudioViewfinderModal: React.FC<StudioViewfinderModalProps> = ({ isOpen, onClose }) => {
  const [sourceMode, setSourceMode] = useState<'simulated' | 'real'>('simulated');
  const [simulatedActor, setSimulatedActor] = useState<'woman' | 'man'>('woman');
  const [hasWebcamPermission, setHasWebcamPermission] = useState<boolean>(false);
  const [webcamError, setWebcamError] = useState<string | null>(null);

  // Viewfinder settings
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showFaceBox, setShowFaceBox] = useState<boolean>(true);
  const [iso, setIso] = useState<number>(200);
  const [ev, setEv] = useState<number>(0);
  const [colorGrade, setColorGrade] = useState<'neutral' | 'warm' | 'noir'>('neutral');
  const [recSeconds, setRecSeconds] = useState<number>(14);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Timer simulation
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setRecSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Handle webcam stream start/stop
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    if (sourceMode === 'real') {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, sourceMode]);

  const startCamera = async () => {
    setWebcamError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setHasWebcamPermission(true);
    } catch (err: any) {
      console.warn('Webcam permission not granted or device unavailable:', err);
      setWebcamError(
        'Real camera access denied or device in use. Switched back to Studio Simulation mode.'
      );
      setSourceMode('simulated');
      setHasWebcamPermission(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleTakeSnapshot = () => {
    if (sourceMode === 'simulated') {
      setCapturedPhoto(simulatedActor === 'woman' ? womanPortraitImg : manPortraitImg);
    } else if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 1280;
      canvas.height = videoRef.current.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setCapturedPhoto(canvas.toDataURL('image/jpeg'));
      }
    }
  };

  if (!isOpen) return null;

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `00:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-2xl border border-white/20 bg-[#0c0d10] shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:px-6 border-b border-white/10 flex items-center justify-between bg-[#12141a]">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
              K
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                <span>Kimaro Studio Viewfinder 4K</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  LIVE FEED
                </span>
              </div>
              <div className="text-[10px] font-mono text-neutral-400">
                Type 1/1.2" Sensor · Leica 35mm F/1.8 ASPH · TrueHDR
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Source switch */}
            <div className="flex items-center p-0.5 rounded-lg bg-black/60 border border-white/15 text-xs font-mono">
              <button
                onClick={() => setSourceMode('simulated')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  sourceMode === 'simulated' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Studio Sim
              </button>
              <button
                onClick={() => setSourceMode('real')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  sourceMode === 'real' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                My Webcam
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {webcamError && (
          <div className="px-6 py-2 bg-amber-500/10 border-b border-amber-500/20 text-[11px] font-mono text-amber-300">
            {webcamError}
          </div>
        )}

        {/* Viewfinder Main Stage */}
        <div className="relative flex-1 bg-black min-h-[380px] sm:min-h-[460px] flex items-center justify-center overflow-hidden">
          
          {/* Real video stream */}
          {sourceMode === 'real' ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{
                filter: `brightness(${1 + ev * 0.15}) contrast(${1 + (iso - 200) * 0.0005}) ${
                  colorGrade === 'warm'
                    ? 'sepia(0.2) saturate(1.15)'
                    : colorGrade === 'noir'
                    ? 'grayscale(1) contrast(1.25)'
                    : 'none'
                }`
              }}
            />
          ) : (
            /* Studio Simulated Feed */
            <img
              src={simulatedActor === 'woman' ? womanPortraitImg : manPortraitImg}
              alt="Simulated studio webcam feed"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-all duration-300"
              style={{
                filter: `brightness(${1 + ev * 0.15}) contrast(${1 + (iso - 200) * 0.0005}) ${
                  colorGrade === 'warm'
                    ? 'sepia(0.2) saturate(1.15)'
                    : colorGrade === 'noir'
                    ? 'grayscale(1) contrast(1.25)'
                    : 'none'
                }`
              }}
            />
          )}

          {/* Rule of Thirds Grid Overlay */}
          {showGrid && (
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
              <div className="border-r border-b border-white/15" />
              <div className="border-r border-b border-white/15" />
              <div className="border-b border-white/15" />
              <div className="border-r border-b border-white/15" />
              <div className="border-r border-b border-white/15" />
              <div className="border-b border-white/15" />
              <div className="border-r border-white/15" />
              <div className="border-r border-white/15" />
              <div />
            </div>
          )}

          {/* Dynamic AI Face Tracking Box */}
          {showFaceBox && (
            <div className="absolute top-[28%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-48 h-56 border border-emerald-400/90 rounded pointer-events-none transition-all">
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-emerald-400" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-emerald-400" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-emerald-400" />
              <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-emerald-400">
                EYE LOCK · 60FPS
              </div>
            </div>
          )}

          {/* HUD Top Overlay Bar */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between text-xs font-mono text-white/90 pointer-events-none">
            <div className="flex items-center gap-2 bg-black/60 px-3 py-1 rounded-md backdrop-blur-sm border border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-bold tracking-wider">REC</span>
              <span className="text-neutral-300">{formatTimer(recSeconds)}</span>
            </div>

            <div className="hidden sm:flex items-center gap-3 bg-black/60 px-3 py-1 rounded-md backdrop-blur-sm border border-white/10 text-[11px]">
              <span>3840×2160 (4K)</span>
              <span>·</span>
              <span className="text-emerald-400">60.00 FPS</span>
              <span>·</span>
              <span>10-BIT 4:2:2</span>
            </div>

            {/* Audio VU Meter */}
            <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1 rounded-md backdrop-blur-sm border border-white/10">
              <Volume2 className="w-3.5 h-3.5 text-neutral-400" />
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse" />
                <span className="w-1 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="w-1 h-1.5 bg-emerald-400 rounded-full" />
              </div>
              <span className="text-[10px] text-neutral-300">-12dB</span>
            </div>
          </div>

          {/* HUD Bottom Telemetry Bar */}
          <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-[11px] font-mono text-white/90 pointer-events-none">
            <div className="bg-black/60 px-3 py-1 rounded-md backdrop-blur-sm border border-white/10 flex items-center gap-3">
              <span>F/1.8</span>
              <span>1/120s</span>
              <span className="text-emerald-400">ISO {iso}</span>
              <span>EV {ev > 0 ? `+${ev}` : ev}</span>
            </div>

            <div className="bg-black/60 px-3 py-1 rounded-md backdrop-blur-sm border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>LEICA 35mm ASPH</span>
            </div>
          </div>
        </div>

        {/* Viewfinder Control Deck */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#12141a] grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Switch Sim Actor (if simulated mode) */}
          <div className="md:col-span-3 flex items-center gap-2">
            {sourceMode === 'simulated' ? (
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/60 border border-white/10 text-xs w-full">
                <button
                  onClick={() => setSimulatedActor('woman')}
                  className={`flex-1 py-1 rounded font-medium transition-colors ${
                    simulatedActor === 'woman' ? 'bg-white/20 text-white font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Elena (Warm Studio)
                </button>
                <button
                  onClick={() => setSimulatedActor('man')}
                  className={`flex-1 py-1 rounded font-medium transition-colors ${
                    simulatedActor === 'man' ? 'bg-white/20 text-white font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Marcus (Contrast)
                </button>
              </div>
            ) : (
              <span className="text-xs font-mono text-neutral-400">
                Connected to active user webcam device.
              </span>
            )}
          </div>

          {/* Toggles: Grid, Face Box, Grade */}
          <div className="md:col-span-5 flex flex-wrap items-center gap-3 justify-center">
            {/* Grid toggle */}
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                showGrid
                  ? 'border-emerald-400/50 bg-emerald-500/10 text-emerald-400'
                  : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              Grid Overlay
            </button>

            {/* Face Box toggle */}
            <button
              onClick={() => setShowFaceBox(!showFaceBox)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                showFaceBox
                  ? 'border-emerald-400/50 bg-emerald-500/10 text-emerald-400'
                  : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              Eye-Tracking Reticle
            </button>

            {/* Color Grade */}
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/60 border border-white/10 text-xs">
              {(['neutral', 'warm', 'noir'] as const).map((grade) => (
                <button
                  key={grade}
                  onClick={() => setColorGrade(grade)}
                  className={`px-2 py-1 rounded capitalize font-mono text-[10px] transition-colors ${
                    colorGrade === grade
                      ? 'bg-white/20 text-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>

          {/* Actions: ISO Slider & Snapshot */}
          <div className="md:col-span-4 flex items-center justify-end gap-3">
            {/* EV compensation slider */}
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <input
                type="range"
                min="-2"
                max="2"
                step="0.5"
                value={ev}
                onChange={(e) => setEv(Number(e.target.value))}
                className="w-16 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                title="Exposure Compensation"
              />
            </div>

            {/* Snapshot button */}
            <button
              onClick={handleTakeSnapshot}
              className="px-4 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Snapshot</span>
            </button>
          </div>

        </div>

        {/* Snapshot Preview Modal if user took snapshot */}
        {capturedPhoto && (
          <div className="absolute inset-0 z-40 bg-black/95 flex flex-col items-center justify-center p-6 animate-in fade-in">
            <div className="max-w-md w-full rounded-2xl overflow-hidden border border-white/20 bg-[#12141a] p-4 text-center">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Studio Freeze-Frame Captured (4K RAW)
                </span>
                <button
                  onClick={() => setCapturedPhoto(null)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 mb-4 bg-black">
                <img
                  src={capturedPhoto}
                  alt="Captured snapshot preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setCapturedPhoto(null)}
                  className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 text-xs font-medium text-white hover:bg-white/10"
                >
                  Discard
                </button>
                <a
                  href={capturedPhoto}
                  download="kimaro_studio_snapshot.jpg"
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Save High-Res Still
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
