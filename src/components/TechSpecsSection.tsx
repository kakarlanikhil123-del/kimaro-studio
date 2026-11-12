import React from 'react';
import { Check, X, Shield, Cpu, Zap, Layers, Volume2, Sparkles } from 'lucide-react';

export const TechSpecsSection: React.FC = () => {
  const specsMatrix = [
    {
      feature: 'Optical Glass Construction',
      kimaro: 'Leica 35mm F/1.8 ASPH (8 Elements / 6 Groups)',
      standard4k: 'Molded plastic lenses (2-3 elements)',
      dslr: '35mm F/1.4 Full Frame Lens (650g heavy)'
    },
    {
      feature: 'Image Sensor',
      kimaro: 'Sony STARVIS 2 Type 1/1.2" (Quad-Binned 2.4μm)',
      standard4k: 'Budget 1/2.8" mobile-class sensor',
      dslr: '35mm Full-Frame CMOS'
    },
    {
      feature: 'Depth of Field (Bokeh)',
      kimaro: 'Authentic physical optical blur (F/1.8 glass)',
      standard4k: 'Artificial software cutout (halos around hair)',
      dslr: 'Authentic optical blur'
    },
    {
      feature: 'Acoustic Isolation Audio',
      kimaro: 'Dual Beamforming Capsules (-45dB DNR)',
      standard4k: 'Omnidirectional mono (picks up fan noise)',
      dslr: 'Requires external $200+ shotgun mic'
    },
    {
      feature: 'Thermal Management',
      kimaro: 'Solid 6063 Aluminum CNC Heatsink (0dB noise)',
      standard4k: 'Plastic enclosure (thermal throttling)',
      dslr: 'Internal fan noise or 30-min shutdown'
    },
    {
      feature: 'Desk Footprint & Weight',
      kimaro: '50mm cube · 215g magnetic perch',
      standard4k: '80mm wide · 120g plastic clip',
      dslr: 'Bulky 1.4kg rig requiring heavy C-stand'
    },
    {
      feature: 'Power & Latency',
      kimaro: 'Single USB-C 3.2 Gen 2 (10Gbps) · <12ms',
      standard4k: 'USB 2.0 compressed MJPEG · ~65ms',
      dslr: 'HDMI cable + CamLink + AC dummy battery'
    },
    {
      feature: 'Total System Cost',
      kimaro: '$250 USD (All-in-One)',
      standard4k: '$199 - $299 USD (Plastic build)',
      dslr: '$2,400 - $3,200 USD (Camera + Lens + Rig)'
    }
  ];

  return (
    <section id="specs" className="relative w-full py-16 bg-[#0a0b0e] border-t border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-3">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Precision Optical Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
            DSLR Fidelity Without
            <br />
            The Cable Labyrinth
          </h2>
          <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
            See how the Kimaro Studio Cube compares directly against traditional plastic 4K webcams and bulky full-frame DSLR streaming rigs.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl border border-white/10 bg-[#101217] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-black/40 text-xs font-mono uppercase tracking-wider">
                  <th className="py-4 px-6 text-neutral-400 font-semibold w-1/4">
                    Architectural Metric
                  </th>
                  <th className="py-4 px-6 text-emerald-400 font-bold w-1/3 bg-emerald-500/10 border-x border-emerald-500/20">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>Kimaro Studio Cube</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-neutral-400 font-medium w-1/4">
                    Standard 4K Webcams
                  </th>
                  <th className="py-4 px-6 text-neutral-400 font-medium w-1/4">
                    DSLR + HDMI Rig
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs">
                {specsMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 font-semibold text-white bg-emerald-500/[0.04] border-x border-emerald-500/20">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{row.kimaro}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-neutral-400">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-red-400/80 shrink-0" />
                        <span>{row.standard4k}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-neutral-300">
                      <span>{row.dslr}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <div className="p-4 bg-black/50 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-400 gap-4">
            <div>
              Firmware updateable via WebUSB · Zero driver installation required on macOS & Windows.
            </div>
            <div className="text-emerald-400 font-semibold">
              Pre-calibrated in Munich optical laboratories
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
