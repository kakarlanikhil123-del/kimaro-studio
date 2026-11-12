import React, { useState, useRef } from 'react';
import { Camera, Aperture, Eye, Sparkles, Check, ChevronRight, X, Info } from 'lucide-react';
import heroWebcamImg from '../assets/images/kimaro_hero_webcam_1794495476009.jpg';
import womanPortraitImg from '../assets/images/kimaro_woman_portrait_1794495476614.jpg';
import manPortraitImg from '../assets/images/kimaro_man_portrait_1794495477229.jpg';

interface HeroSectionProps {
  onPreorder: () => void;
  onOpenStudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onPreorder, onOpenStudio }) => {
  // Hotspot modal state
  const [activeHotspot, setActiveHotspot] = useState<'lens' | 'sensor' | null>(null);

  // Left card: Clarity comparison state (Standard 1080p vs Kimaro 4K HDR)
  const [showHdComparison, setShowHdComparison] = useState(false);
  const [claritySlider, setClaritySlider] = useState(50);

  // Right card: Focus mode selection
  const [focusMode, setFocusMode] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 35 });
  const rightCardRef = useRef<HTMLDivElement>(null);

  const focusModes = [
    { title: 'AI Eye-Tracking', latency: '0.015s', desc: 'Continuous sub-pixel eye tracking across 120fps' },
    { title: 'Dual-Pixel PDAF', latency: '0.020s', desc: '100% sensor surface phase detection focus points' },
    { title: 'Cinematic Rack', latency: '0.800s', desc: 'Gradual logarithmic focus transition for speech pauses' }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rightCardRef.current) return;
    const rect = rightCardRef.current.getBoundingClientRect();
    const x = Math.max(15, Math.min(85, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(15, Math.min(85, ((e.clientY - rect.top) / rect.height) * 100));
    setMousePos({ x, y });
  };

  return (
    <section id="hero" className="relative w-full pt-6 pb-12 overflow-hidden bg-[#0c0d10]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main 3-column composition matching reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
          
          {/* ============================================================== */}
          {/* LEFT CARD: CAPTURE EMOTIONS / LIVE VISUALS */}
          {/* ============================================================== */}
          <div className="lg:col-span-3 group relative rounded-2xl overflow-hidden border border-white/10 bg-[#121318] shadow-2xl flex flex-col justify-between min-h-[520px]">
            {/* Background image & optional clarity preview */}
            <div className="absolute inset-0">
              <img
                src={womanPortraitImg}
                alt="Portrait demonstrating Kimaro high-clarity video capture"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-all duration-500 ${
                  showHdComparison && claritySlider < 50 ? 'blur-[1.5px] contrast-90 brightness-95' : 'contrast-105'
                }`}
              />
              {/* Dark subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none" />
            </div>

            {/* Viewfinder Rule-of-Thirds Grid Overlay */}
            <div className="absolute inset-4 pointer-events-none grid grid-cols-3 grid-rows-3 border border-white/15">
              <div className="border-r border-b border-white/10" />
              <div className="border-r border-b border-white/10" />
              <div className="border-b border-white/10" />
              <div className="border-r border-b border-white/10" />
              <div className="border-r border-b border-white/10" />
              <div className="border-b border-white/10" />
              <div className="border-r border-white/10" />
              <div className="border-r border-white/10" />
              <div />
            </div>

            {/* Corner brackets */}
            <div className="absolute top-6 left-6 w-3 h-3 border-t-2 border-l-2 border-white/60 pointer-events-none" />
            <div className="absolute top-6 right-6 w-3 h-3 border-t-2 border-r-2 border-white/60 pointer-events-none" />
            <div className="absolute bottom-28 left-6 w-3 h-3 border-b-2 border-l-2 border-white/60 pointer-events-none" />
            <div className="absolute bottom-28 right-6 w-3 h-3 border-b-2 border-r-2 border-white/60 pointer-events-none" />

            {/* Top Bar: BEST WEBCAM & REC */}
            <div className="relative z-10 p-5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/90 font-semibold">
                  Rec
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-neutral-300 uppercase font-semibold">
                BEST WEBCAM
              </span>
            </div>

            {/* Bottom Content: CAPTURE EMOTIONS / Live Visuals */}
            <div className="relative z-10 p-5 pt-0 text-center flex flex-col items-center">
              {/* Stylized round K logo */}
              <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs mb-3 shadow-md">
                K
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase leading-tight">
                Capture
                <br />
                Emotions
              </h2>

              <p className="text-xs text-neutral-300 mt-1 mb-4 font-medium">
                Live Visuals · 60 FPS TrueHDR
              </p>

              {/* Interactive Clarity Toggle / Comparison */}
              <div className="w-full">
                {!showHdComparison ? (
                  <button
                    onClick={() => setShowHdComparison(true)}
                    className="w-full py-2.5 px-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md text-[11px] font-semibold text-white tracking-wider uppercase hover:bg-white/20 hover:border-white/30 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Explore The Clarity</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="p-2.5 rounded-lg border border-white/20 bg-black/75 backdrop-blur-md text-left">
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1.5">
                      <span>Standard 1080p</span>
                      <span className="text-emerald-400 font-semibold">Kimaro 4K HDR</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={claritySlider}
                      onChange={(e) => setClaritySlider(Number(e.target.value))}
                      className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[9px] text-neutral-400 font-mono">
                        {claritySlider < 50 ? 'Simulating budget webcam' : 'Leica 35mm optical glass'}
                      </span>
                      <button
                        onClick={() => setShowHdComparison(false)}
                        className="text-[9px] text-neutral-400 hover:text-white"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>


          {/* ============================================================== */}
          {/* CENTER MAIN SHOWCASE: KIMARO CUBE & HOTSPOTS */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-white/10 bg-[#101115] shadow-2xl flex flex-col justify-between min-h-[520px]">
            {/* Background webcam product shot */}
            <div className="absolute inset-0">
              <img
                src={heroWebcamImg}
                alt="Kimaro precision machined aluminum cubic webcam with Leica optics"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/70 pointer-events-none" />
            </div>

            {/* Top Bar inside Center Card */}
            <div className="relative z-10 p-6 flex items-center justify-between">
              {/* Brand lockup */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center font-bold text-[10px]">
                  K
                </div>
                <span className="text-xs font-semibold tracking-tight text-white/90">
                  Kimaro
                </span>
              </div>

              {/* Technical tag */}
              <div className="px-2.5 py-0.5 rounded border border-white/20 bg-white/5 backdrop-blur-sm text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                PROFFESIONAL WEBCAM
              </div>

              {/* Preorder Top-Right button */}
              <button
                onClick={onPreorder}
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-black bg-white hover:bg-neutral-200 transition-colors shadow-sm"
              >
                PREORDER
              </button>
            </div>

            {/* Center Big Headline */}
            <div className="relative z-10 text-center px-6 mt-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                Kimaro<span className="text-emerald-400">.</span>
              </h1>
            </div>

            {/* Interactive Hotspots with connecting leader lines */}
            <div className="relative z-20 flex-1 flex items-center justify-between px-4 sm:px-8 pointer-events-none">
              
              {/* LEFT HOTSPOT: Ultra lenses / 35 mm Leica */}
              <div className="pointer-events-auto flex flex-col items-start max-w-[170px] group cursor-pointer"
                   onClick={() => setActiveHotspot(activeHotspot === 'lens' ? null : 'lens')}>
                <div className="flex items-center gap-2 bg-[#121318]/90 hover:bg-[#1c1e24] border border-white/20 rounded-xl p-2.5 backdrop-blur-md transition-all shadow-lg">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Aperture className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white uppercase tracking-wider">
                      Ultra lenses
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400">
                      35 mm Leica
                    </div>
                  </div>
                </div>
                {/* Thin connector indicator */}
                <div className="ml-5 w-8 h-[1px] bg-emerald-400/50 hidden sm:block" />
              </div>

              {/* RIGHT HOTSPOT: DSLR quality / For the first time on webcam */}
              <div className="pointer-events-auto flex flex-col items-end max-w-[190px] group cursor-pointer text-right"
                   onClick={() => setActiveHotspot(activeHotspot === 'sensor' ? null : 'sensor')}>
                <div className="flex items-center gap-2 bg-[#121318]/90 hover:bg-[#1c1e24] border border-white/20 rounded-xl p-2.5 backdrop-blur-md transition-all shadow-lg text-left">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white uppercase tracking-wider">
                      DSLR quality
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400">
                      For the first time on webcam.
                    </div>
                  </div>
                </div>
                <div className="mr-5 w-8 h-[1px] bg-emerald-400/50 hidden sm:block" />
              </div>
            </div>

            {/* Bottom Call to Action: BUY NOW + From $250 */}
            <div className="relative z-10 p-6 flex items-center justify-center">
              <div className="inline-flex items-center rounded-full bg-[#181a20]/95 border border-white/20 p-1.5 pl-2 pr-4 shadow-xl backdrop-blur-md hover:border-white/40 transition-all">
                <button
                  onClick={onPreorder}
                  className="px-5 py-2 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  Buy Now
                </button>
                <div className="ml-3 text-left">
                  <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-mono block leading-none">
                    From
                  </span>
                  <span className="text-sm font-bold text-white font-mono-numbers leading-none">
                    $250
                  </span>
                </div>
              </div>
            </div>

            {/* Hotspot detail drawer / popover if selected */}
            {activeHotspot && (
              <div className="absolute inset-x-4 bottom-20 z-30 p-4 rounded-xl border border-white/20 bg-[#12141a]/95 backdrop-blur-lg shadow-2xl animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      {activeHotspot === 'lens' ? 'Leica 35mm F/1.8 ASPH Optical Stack' : 'Sony STARVIS 2 Type 1/1.2" Sensor'}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="text-neutral-400 hover:text-white p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="mt-2.5 text-xs text-neutral-300 leading-relaxed font-normal">
                  {activeHotspot === 'lens' ? (
                    <p>
                      Composed of 8 precision optical elements arranged in 6 groups, including two anomalous dispersion glasses that eliminate chromatic aberration. Delivers creamy, authentic optical depth-of-field without artificial digital blur.
                    </p>
                  ) : (
                    <p>
                      An unprecedented 1/1.2" back-illuminated sensor boasting 2.4μm quad-binned pixels. Captures 400% more light than typical webcams, allowing noise-free broadcasting even in dim 10-lux ambient room lighting.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>


          {/* ============================================================== */}
          {/* RIGHT CARD: SMOOTHEST FOCUS / LIKE NEVER BEFORE */}
          {/* ============================================================== */}
          <div
            ref={rightCardRef}
            onMouseMove={handleMouseMove}
            className="lg:col-span-3 relative rounded-2xl overflow-hidden border border-white/10 bg-[#121318] shadow-2xl flex flex-col justify-between min-h-[520px] select-none"
          >
            {/* Background image: Studio Man */}
            <div className="absolute inset-0">
              <img
                src={manPortraitImg}
                alt="Studio portrait showcasing Kimaro instantaneous autofocus"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none" />
            </div>

            {/* Top Bar: REC and focus indicator */}
            <div className="relative z-10 p-5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/90 font-semibold">
                  Rec
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-300 uppercase tracking-widest font-semibold">
                AF-C 60FPS
              </span>
            </div>

            {/* Dynamic AI Face Tracking Box that tracks the cursor */}
            <div
              className="absolute pointer-events-none transition-all duration-150 ease-out z-20"
              style={{
                left: `${mousePos.x}%`,
                top: `${mousePos.y}%`,
                transform: 'translate(-50%, -50%)',
                width: '120px',
                height: '140px'
              }}
            >
              <div className="relative w-full h-full border border-emerald-400/80 rounded">
                {/* Corner reticles */}
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-emerald-400" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-emerald-400" />
                <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-emerald-400" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-emerald-400" />
                
                {/* Mini telemetry badge */}
                <div className="absolute -bottom-5 left-0 px-1 bg-black/80 text-[8px] font-mono text-emerald-300 uppercase tracking-wider rounded">
                  Lock {focusModes[focusMode].latency}
                </div>
              </div>
            </div>

            {/* Bottom Content: SMOOTHEST FOCUS / Like never before */}
            <div className="relative z-10 p-5 pt-0 text-center flex flex-col items-center">
              {/* Focus target reticle icon */}
              <div className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center mb-2.5">
                <div className="w-3 h-3 rounded-full border border-white flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-emerald-400" />
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase leading-tight">
                Smoothest
                <br />
                Focus
              </h2>

              <p className="text-xs text-neutral-300 mt-1 mb-4 font-medium">
                Like never before.
              </p>

              {/* Focus mode carousel slider controls */}
              <div className="w-full">
                <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/60 border border-white/10 mb-2">
                  {focusModes.map((mode, index) => (
                    <button
                      key={mode.title}
                      onClick={() => setFocusMode(index)}
                      className={`flex-1 h-1.5 rounded-full transition-all ${
                        focusMode === index
                          ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                          : 'bg-white/20 hover:bg-white/40'
                      }`}
                      title={mode.title}
                      aria-label={mode.title}
                    />
                  ))}
                </div>

                <div className="p-2 rounded-lg bg-black/50 border border-white/10 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                      {focusModes[focusMode].title}
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400">
                      {focusModes[focusMode].latency} lock
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">
                    {focusModes[focusMode].desc}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
