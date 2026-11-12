import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CustomizerSection } from './components/CustomizerSection';
import { OpticBanner } from './components/OpticBanner';
import { TechSpecsSection } from './components/TechSpecsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { StudioViewfinderModal } from './components/StudioViewfinderModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ProductConfig, OrderItem } from './types';
import { FINISHES, LENSES, MOUNTS } from './data/productData';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  // Current user configuration
  const [config, setConfig] = useState<ProductConfig>({
    finish: FINISHES[0], // Matte Obsidian
    lens: LENSES[0], // Leica 35mm F/1.8 ASPH
    mount: MOUNTS[0], // Magnetic Precision Monitor Perch
    engraving: '',
    selectedAddons: []
  });

  // Modal & Drawer visibility states
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isStudioOpen, setIsStudioOpen] = useState<boolean>(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [trackingId, setTrackingId] = useState<string>('KMR-78291');

  // Completed order notification modal
  const [confirmedOrder, setConfirmedOrder] = useState<OrderItem | null>(null);

  const handleOrderSuccess = (newOrder: OrderItem) => {
    setConfirmedOrder(newOrder);
    setTrackingId(newOrder.id);
  };

  const handleOpenTrackingFromSuccess = () => {
    if (confirmedOrder) {
      setTrackingId(confirmedOrder.id);
    }
    setConfirmedOrder(null);
    setIsTrackingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#f2f4f7] flex flex-col font-sans selection:bg-emerald-500/20 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenStudio={() => setIsStudioOpen(true)}
        cartCount={1 + config.selectedAddons.length}
        config={config}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section matching reference image */}
        <HeroSection
          onPreorder={() => setIsCartOpen(true)}
          onOpenStudio={() => setIsStudioOpen(true)}
        />

        {/* Customizer Section matching reference image */}
        <CustomizerSection
          config={config}
          onUpdateConfig={setConfig}
          onAddToCart={() => setIsCartOpen(true)}
        />

        {/* Optic Green Flare Banner matching reference image */}
        <OpticBanner
          onOpenStudio={() => setIsStudioOpen(true)}
          onPreorder={() => setIsCartOpen(true)}
        />

        {/* Precision Hardware Comparison & Engineering */}
        <TechSpecsSection />

        {/* Live Customer & Creator Reviews */}
        <ReviewsSection />
      </main>

      {/* Footer with certifications and waitlist */}
      <Footer />

      {/* Interactive Modals & Slide-over Drawers */}
      <StudioViewfinderModal
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        config={config}
        onOrderSuccess={handleOrderSuccess}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialOrderId={trackingId}
      />

      {/* Order Confirmed Success Popup */}
      {confirmedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl border border-emerald-500/30 bg-[#12141a] p-6 shadow-2xl text-center">
            <button
              onClick={() => setConfirmedOrder(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">
              Allocation Reserved
            </h3>
            <p className="text-xs text-neutral-300 mt-2">
              Thank you, {confirmedOrder.customer.name}! Your Kimaro Studio Cube custom build has been allocated with priority batch reservation.
            </p>
            <div className="my-4 p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-left space-y-1">
              <div className="flex justify-between">
                <span className="text-neutral-400">Order Token:</span>
                <span className="text-emerald-400 font-bold">{confirmedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Finish:</span>
                <span className="text-white">{confirmedOrder.product.finish}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Optical Glass:</span>
                <span className="text-white">{confirmedOrder.product.lens}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Total:</span>
                <span className="text-white font-bold">${confirmedOrder.total} USD</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setConfirmedOrder(null)}
                className="flex-1 py-2.5 rounded-lg border border-white/15 bg-white/5 text-xs font-semibold text-neutral-300 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={handleOpenTrackingFromSuccess}
                className="flex-1 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Track Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
