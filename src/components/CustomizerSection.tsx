import React, { useState } from 'react';
import { Mic, Grid, Sliders, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { ProductConfig, ProductFinish, LensOption, MountOption, AddonItem } from '../types';
import { FINISHES, LENSES, MOUNTS, ADDONS } from '../data/productData';
import explodedCameraImg from '../assets/images/kimaro_camera_exploded_1794495477714.jpg';

interface CustomizerSectionProps {
  config: ProductConfig;
  onUpdateConfig: (newConfig: ProductConfig) => void;
  onAddToCart: () => void;
}

export const CustomizerSection: React.FC<CustomizerSectionProps> = ({
  config,
  onUpdateConfig,
  onAddToCart,
}) => {
  // Active demo tabs inside the feature chips
  const [activeChip, setActiveChip] = useState<'mic' | 'matrix' | null>('mic');
  // Noise cancellation test simulation
  const [noiseSuppressionOn, setNoiseSuppressionOn] = useState<boolean>(true);
  // Matrix binning mode
  const [matrixMode, setMatrixMode] = useState<'hdr' | 'lowlight'>('hdr');

  const basePrice = 250;
  const finishPrice = config.finish.priceDelta;
  const lensPrice = config.lens.priceDelta;
  const mountPrice = config.mount.priceDelta;
  const addonsPrice = config.selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = basePrice + finishPrice + lensPrice + mountPrice + addonsPrice;

  const handleFinishChange = (finish: ProductFinish) => {
    onUpdateConfig({ ...config, finish });
  };

  const handleLensChange = (lens: LensOption) => {
    onUpdateConfig({ ...config, lens });
  };

  const handleMountChange = (mount: MountOption) => {
    onUpdateConfig({ ...config, mount });
  };

  const handleEngravingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateConfig({ ...config, engraving: e.target.value.slice(0, 16) });
  };

  const toggleAddon = (addon: AddonItem) => {
    const exists = config.selectedAddons.some((a) => a.id === addon.id);
    const updated = exists
      ? config.selectedAddons.filter((a) => a.id !== addon.id)
      : [...config.selectedAddons, addon];
    onUpdateConfig({ ...config, selectedAddons: updated });
  };

  return (
    <section id="customizer" className="relative w-full py-16 bg-[#0c0d10] border-t border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/[0.08] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                Bespoke Industrial Engineering
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
              Customize Your Camera
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="px-2.5 py-1 rounded border border-white/20 bg-white/5 uppercase tracking-wider text-white">
              Online Editor
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">CNC Machined to Order</span>
          </div>
        </div>

        {/* Main Customizer Card from Reference Screenshot */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#15171d] to-[#0f1013] overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left 5 Cols: Camera Preview on Rock + Live Engraving */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0d] shadow-inner group">
                <img
                  src={explodedCameraImg}
                  alt="Kimaro custom aluminum cube webcam preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    filter:
                      config.finish.id === 'silver'
                        ? 'brightness(1.25) contrast(1.15) saturate(0.2)'
                        : config.finish.id === 'titanium'
                        ? 'brightness(1.05) contrast(1.1) hue-rotate(190deg) saturate(0.6)'
                        : config.finish.id === 'bronze'
                        ? 'sepia(0.5) contrast(1.1) brightness(0.95)'
                        : 'none'
                  }}
                />

                {/* Live Laser Engraving watermark on the camera body */}
                {config.engraving && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-6 px-3 py-1 rounded bg-black/60 border border-white/20 backdrop-blur-sm pointer-events-none">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-200 uppercase font-bold">
                      {config.engraving}
                    </span>
                  </div>
                )}

                {/* Finish Badge Overlay */}
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full border border-white/30"
                    style={{ backgroundColor: config.finish.hex }}
                  />
                  <span className="text-xs font-semibold text-white tracking-wide">
                    {config.finish.name}
                  </span>
                </div>

                {/* Lens Badge Overlay */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-emerald-400">
                  {config.lens.name.split(' ')[0]} {config.lens.fov.split(' ')[0]}
                </div>
              </div>

              {/* Chassis description matching reference copy */}
              <div className="mt-5 text-center sm:text-left">
                <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                  The Kimaro is built to last. An understated painted finish with{' '}
                  <strong className="text-white font-semibold">precisely-machined aluminum</strong>{' '}
                  specifically designed for you.
                </p>
              </div>

              {/* Feature Chips matching the reference image (Isolation Mic & 2x Matrix Pixels) */}
              <div className="grid grid-cols-2 gap-3 w-full mt-6">
                {/* Feature Chip 1: Isolation Mic */}
                <div
                  onClick={() => setActiveChip('mic')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    activeChip === 'mic'
                      ? 'border-emerald-500/60 bg-emerald-500/10 shadow-md'
                      : 'border-white/10 bg-white/5 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-lg bg-black/60 flex items-center justify-center text-emerald-400">
                      <Mic className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wide">
                      Isolation Mic
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-400">
                    Dual beamforming acoustic cancellation
                  </p>
                </div>

                {/* Feature Chip 2: 2x Matrix Pixels */}
                <div
                  onClick={() => setActiveChip('matrix')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    activeChip === 'matrix'
                      ? 'border-emerald-500/60 bg-emerald-500/10 shadow-md'
                      : 'border-white/10 bg-white/5 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-lg bg-black/60 flex items-center justify-center text-amber-400">
                      <Grid className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wide">
                      2x Matrix Pixels
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-400">
                    Quad-binned 2.4μm Starvis 2 sensor
                  </p>
                </div>
              </div>

              {/* Interactive Mini-Demonstrator for Selected Feature Chip */}
              {activeChip === 'mic' && (
                <div className="w-full mt-3 p-3.5 rounded-xl border border-white/15 bg-black/60 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-neutral-300 font-medium">Acoustic Suppression Demo</span>
                    <button
                      onClick={() => setNoiseSuppressionOn(!noiseSuppressionOn)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-colors ${
                        noiseSuppressionOn
                          ? 'bg-emerald-400 text-black'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                      }`}
                    >
                      {noiseSuppressionOn ? 'ACTIVE (-45dB DNR)' : 'RAW AMBIENT'}
                    </button>
                  </div>
                  {/* Waveform graphic */}
                  <div className="flex items-center justify-between h-7 gap-1 px-1">
                    {[16, 24, 38, 45, 60, 32, 18, 40, 55, 75, 42, 28, 50, 68, 35, 20, 48, 62, 30, 15].map(
                      (val, idx) => (
                        <div
                          key={idx}
                          className={`w-1 rounded-full transition-all duration-300 ${
                            noiseSuppressionOn
                              ? 'bg-emerald-400/80'
                              : 'bg-amber-400/70'
                          }`}
                          style={{
                            height: noiseSuppressionOn ? `${Math.max(4, val * 0.35)}px` : `${val * 0.75}px`
                          }}
                        />
                      )
                    )}
                  </div>
                  <p className="text-[9px] text-neutral-400 mt-2 font-mono">
                    {noiseSuppressionOn
                      ? 'Rejects mechanical keyboard clicks, HVAC airflow, and room echoes.'
                      : 'Simulating typical unshielded condenser capsule with room echo.'}
                  </p>
                </div>
              )}

              {activeChip === 'matrix' && (
                <div className="w-full mt-3 p-3.5 rounded-xl border border-white/15 bg-black/60 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-neutral-300 font-medium">Sony Starvis 2 Pixel Array</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setMatrixMode('hdr')}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                          matrixMode === 'hdr' ? 'bg-amber-400 text-black font-bold' : 'text-neutral-400'
                        }`}
                      >
                        4K HDR
                      </button>
                      <button
                        onClick={() => setMatrixMode('lowlight')}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                          matrixMode === 'lowlight' ? 'bg-amber-400 text-black font-bold' : 'text-neutral-400'
                        }`}
                      >
                        LOW-LIGHT
                      </button>
                    </div>
                  </div>
                  {/* Matrix grid visualizer */}
                  <div className="grid grid-cols-8 gap-1 p-2 rounded bg-neutral-950 border border-neutral-800">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 rounded-[1px] transition-colors ${
                          matrixMode === 'hdr'
                            ? (i % 3 === 0 ? 'bg-amber-400' : 'bg-amber-600/60')
                            : (i % 2 === 0 ? 'bg-emerald-400' : 'bg-emerald-600/40')
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[9px] text-neutral-400 mt-2 font-mono">
                    {matrixMode === 'hdr'
                      ? 'Simultaneous dual-gain readout: preserves bright window highlights & deep shadow details.'
                      : '4-in-1 pixel binning: 2.4μm effective photosites deliver clean 10-lux low light performance.'}
                  </p>
                </div>
              )}
            </div>

            {/* Right 7 Cols: Interactive Controls (Finish, Lens, Mount, Engraving, Addons, Total) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Finish Selection */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 flex items-center justify-between mb-2.5">
                  <span className="font-semibold text-white">1. Aluminum Chassis Finish</span>
                  <span className="text-neutral-400">
                    {config.finish.name} {config.finish.priceDelta > 0 && `(+$${config.finish.priceDelta})`}
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {FINISHES.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => handleFinishChange(f)}
                      className={`p-3 rounded-xl border text-left transition-all relative ${
                        config.finish.id === f.id
                          ? 'border-emerald-400 bg-white/10 ring-1 ring-emerald-400/50'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className="w-5 h-5 rounded-full border border-white/30 shadow-sm"
                          style={{ backgroundColor: f.hex }}
                        />
                        {config.finish.id === f.id && (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </div>
                      <div className="text-xs font-bold text-white leading-tight">
                        {f.name}
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                        {f.priceDelta === 0 ? 'Included' : `+$${f.priceDelta}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Lens Stack Selection */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 flex items-center justify-between mb-2.5">
                  <span className="font-semibold text-white">2. Optical Glass Lens Stack</span>
                  <span className="text-neutral-400">{config.lens.fov}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {LENSES.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => handleLensChange(l)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        config.lens.id === l.id
                          ? 'border-emerald-400 bg-white/10 ring-1 ring-emerald-400/50'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">
                          {l.name}
                        </span>
                        {config.lens.id === l.id && (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400 mt-1">
                        {l.fov} · {l.priceDelta === 0 ? 'Standard' : `+$${l.priceDelta}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Mount System */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 flex items-center justify-between mb-2.5">
                  <span className="font-semibold text-white">3. Precision Mounting System</span>
                  <span className="text-neutral-400">{config.mount.name}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {MOUNTS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleMountChange(m)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        config.mount.id === m.id
                          ? 'border-emerald-400 bg-white/10 ring-1 ring-emerald-400/50'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white line-clamp-1">
                          {m.name}
                        </span>
                        {config.mount.id === m.id && (
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        )}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400 mt-1">
                        {m.priceDelta === 0 ? 'Included' : `+$${m.priceDelta}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Custom Laser Engraving Input */}
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="engraving-input" className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    Custom Laser Engraving (Free)
                  </label>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {config.engraving.length}/16 chars
                  </span>
                </div>
                <input
                  id="engraving-input"
                  type="text"
                  placeholder="e.g. STUDIO 01 or YOUR NAME"
                  value={config.engraving}
                  onChange={handleEngravingChange}
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/20 text-xs font-mono uppercase text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* 5. Optional Addons */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block mb-2.5 font-semibold text-white">
                  4. Studio Accessories & Filters
                </label>
                <div className="space-y-2">
                  {ADDONS.map((addon) => {
                    const isSelected = config.selectedAddons.some((a) => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'border-emerald-400/60 bg-emerald-500/10'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                            className="rounded accent-emerald-400 cursor-pointer"
                          />
                          <span className="text-xs font-medium text-neutral-200">
                            {addon.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-semibold text-white">
                          +${addon.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price & Checkout Summary Bar */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    Configured Total (Free Global Express Delivery)
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono-numbers">
                    ${totalPrice}{' '}
                    <span className="text-xs font-normal text-neutral-400 font-sans">
                      USD
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={onAddToCart}
                    className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Reserve Custom Build</span>
                  </button>
                </div>
              </div>

              {/* Trust statement */}
              <div className="flex items-center gap-4 text-[11px] text-neutral-400 pt-1 font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 2-Year Full Hardware Warranty
                </span>
                <span>·</span>
                <span>30-Day Studio Trial</span>
                <span>·</span>
                <span>Made in limited batch</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
