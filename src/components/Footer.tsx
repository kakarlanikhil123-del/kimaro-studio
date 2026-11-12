import React, { useState } from 'react';
import { Send, CheckCircle2, Shield, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail || !waitlistEmail.includes('@')) return;

    try {
      setLoading(true);
      setStatusMsg(null);
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: waitlistEmail, interest: 'Kimaro Cam Batch 1' })
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMsg(data.message || 'VIP reservation confirmed!');
        setWaitlistEmail('');
      }
    } catch (err) {
      console.error(err);
      setStatusMsg('Network issue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full bg-[#08090b] text-neutral-400 border-t border-white/[0.08] pt-14 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top footer row: Brand and VIP Signup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/[0.08] items-center">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2.5 text-white mb-3">
              <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
                K
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Kimaro<span className="text-emerald-400">.</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-md leading-relaxed font-normal">
              Designed for directors, researchers, and creators who demand uncompromising optical authenticity. Solid CNC machined 6063-T6 aluminum housing with Leica coated optics.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase text-white font-semibold">
                  Batch 2 Allocation Priority List
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  Instant Dispatch Notice
                </span>
              </div>
              <form onSubmit={handleWaitlistSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@studio.com"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 flex items-center gap-1.5 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Joining...' : 'Notify Me'}</span>
                </button>
              </form>
              {statusMsg && (
                <div className="mt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{statusMsg}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Links Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 text-xs">
          <div>
            <h4 className="font-mono uppercase text-white font-semibold mb-3 tracking-wider">
              Optics & Sensors
            </h4>
            <ul className="space-y-2">
              <li><a href="#specs" className="hover:text-white transition-colors">Sony STARVIS 2 1/1.2"</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors">Leica 35mm F/1.8 Glass</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors">Beamforming Isolation Array</a></li>
              <li><a href="#customizer" className="hover:text-white transition-colors">Modular Lens Mounts</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono uppercase text-white font-semibold mb-3 tracking-wider">
              Industrial Craft
            </h4>
            <ul className="space-y-2">
              <li><a href="#customizer" className="hover:text-white transition-colors">6063-T6 CNC Aluminum</a></li>
              <li><a href="#customizer" className="hover:text-white transition-colors">Basalt Powder Coating</a></li>
              <li><a href="#customizer" className="hover:text-white transition-colors">Laser Engraving Service</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors">Zero-Noise Passive Thermal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono uppercase text-white font-semibold mb-3 tracking-wider">
              Studio Resources
            </h4>
            <ul className="space-y-2">
              <li><a href="#reviews" className="hover:text-white transition-colors">Verified Creator Reviews</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Color Science & LUT Profiles</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors">OBS / vMix Integration</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Firmware Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono uppercase text-white font-semibold mb-3 tracking-wider">
              Support & Warranty
            </h4>
            <ul className="space-y-2">
              <li><span className="text-white">Global Express Courier:</span> Free DHL</li>
              <li><span className="text-white">Trial Period:</span> 30 Days Full Refund</li>
              <li><span className="text-white">Hardware Guarantee:</span> 2-Year Replacement</li>
              <li><span className="text-white">Engineering Support:</span> support@kimarocam.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal compliance */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-4">
          <div className="flex items-center gap-3">
            <span>© 2026 Kimaro Cam Inc.</span>
            <span>·</span>
            <span>All rights reserved.</span>
            <span>·</span>
            <span className="text-neutral-400">kimarocam.com</span>
          </div>

          <div className="flex items-center gap-4">
            <span>CE Certified</span>
            <span>FCC Part 15 Class B</span>
            <span>RoHS 2.0 Compliant</span>
            <span>WEEE Eco-Recyclable</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
