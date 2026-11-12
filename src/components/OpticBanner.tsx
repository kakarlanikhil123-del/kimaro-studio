import React from 'react';
import { Camera, Sparkles, ArrowRight, Play } from 'lucide-react';
import opticGlowImg from '../assets/images/kimaro_green_optic_glow_1794495477344.jpg';

interface OpticBannerProps {
  onOpenStudio: () => void;
  onPreorder: () => void;
}

export const OpticBanner: React.FC<OpticBannerProps> = ({ onOpenStudio, onPreorder }) => {
  return (
    <section className="relative w-full py-12 bg-[#0c0d10]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Banner card matching the bottom banner in reference image */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0e1014] shadow-2xl min-h-[300px] flex flex-col justify-between p-6 sm:p-10">
          
          {/* Background optic green aperture image */}
          <div className="absolute inset-0">
            <img
              src={opticGlowImg}
              alt="Optical anamorphic emerald aperture glow"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-80 mix-blend-screen scale-105"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/85" />
          </div>

          {/* Top Row: [K] mark, [ CUSTOM ], kimarocam.com */}
          <div className="relative z-10 flex items-center justify-between">
            {/* Left K round mark */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs shadow-md">
                K
              </div>
              <span className="text-sm font-bold text-white tracking-tight">Kimaro</span>
            </div>

            {/* Center [ CUSTOM ] bracket tag */}
            <div className="px-3 py-1 rounded border border-white/25 bg-black/40 backdrop-blur-md text-[10px] font-mono tracking-widest text-white uppercase font-semibold">
              [ CUSTOM ]
            </div>

            {/* Right URL link */}
            <a
              href="#hero"
              className="text-xs font-mono text-neutral-300 hover:text-white transition-colors"
            >
              kimarocam.com
            </a>
          </div>

          {/* Center / Bottom Content: TRY INNOVATIVE KIMARO WEB CAMERA */}
          <div className="relative z-10 my-8 max-w-2xl">
            <div className="flex items-center gap-2 mb-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Broadcast Quality in a 5cm Cube</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase leading-tight">
              Try Innovative
              <br />
              Kimaro Web Camera
            </h2>

            <p className="mt-3 text-sm text-neutral-300 leading-relaxed max-w-lg">
              Test uncompressed 4K 60fps sensor output, real-time eye-tracking autofocus, and low-light TrueHDR directly inside your browser.
            </p>
          </div>

          {/* Action Row */}
          <div className="relative z-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenStudio}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Launch Studio Viewfinder</span>
            </button>

            <button
              onClick={onPreorder}
              className="px-6 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Reserve Batch 1 ($250)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <span className="text-[11px] font-mono text-neutral-400 sm:ml-auto">
              Limited to 2,000 units in Batch 1
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
