import React, { useState } from 'react';
import { X, Trash2, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, CreditCard, Clock } from 'lucide-react';
import { ProductConfig, OrderItem } from '../types';
import explodedCameraImg from '../assets/images/kimaro_camera_exploded_1794495477714.jpg';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: ProductConfig;
  onOrderSuccess: (order: OrderItem) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onOrderSuccess,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [paymentMode, setPaymentMode] = useState<'card' | 'reserve'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const basePrice = 250;
  const finishPrice = config.finish.priceDelta;
  const lensPrice = config.lens.priceDelta;
  const mountPrice = config.mount.priceDelta;
  const addonsPrice = config.selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = basePrice + finishPrice + lensPrice + mountPrice + addonsPrice;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName.trim() || !customerEmail.trim()) {
      setErrorMessage('Please enter your full name and email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      setErrorMessage('Please provide a valid email format.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: customerName,
            email: customerEmail,
            address: customerAddress || '742 Evergreen Terrace',
            city: customerCity || 'Express Air Dispatch'
          },
          product: {
            finish: config.finish.name,
            finishPrice: config.finish.priceDelta,
            lens: config.lens.name,
            lensPrice: config.lens.priceDelta,
            mount: config.mount.name,
            mountPrice: config.mount.priceDelta,
            engraving: config.engraving || null
          },
          addons: config.selectedAddons,
          paymentMethod: paymentMode === 'card' ? 'Visa / Mastercard (Verified)' : 'Batch Priority Reservation',
          isPreorder: true
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit order.');
      }

      onOrderSuccess(data.order);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error while placing order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e1014] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#12141a]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Studio Order Allocation
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg border border-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-5 overflow-y-auto flex-1 space-y-6">
            
            {/* Item Summary Card */}
            <div className="p-4 rounded-xl border border-white/15 bg-white/5 space-y-3">
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/15 bg-black shrink-0">
                  <img
                    src={explodedCameraImg}
                    alt="Kimaro studio cube preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-bold text-white truncate">
                      Kimaro Studio Cube 4K
                    </h4>
                    <span className="text-sm font-mono font-bold text-emerald-400">
                      ${basePrice}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1 font-mono">
                    Finish: <span className="text-white">{config.finish.name}</span>
                    {config.finish.priceDelta > 0 && ` (+$${config.finish.priceDelta})`}
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono">
                    Lens: <span className="text-white">{config.lens.name}</span>
                    {config.lens.priceDelta > 0 && ` (+$${config.lens.priceDelta})`}
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono">
                    Mount: <span className="text-white">{config.mount.name}</span>
                    {config.mount.priceDelta > 0 && ` (+$${config.mount.priceDelta})`}
                  </div>
                  {config.engraving && (
                    <div className="text-[11px] text-emerald-400 font-mono font-semibold">
                      Engraved: "{config.engraving}"
                    </div>
                  )}
                </div>
              </div>

              {/* Addons breakdown if selected */}
              {config.selectedAddons.length > 0 && (
                <div className="pt-2 border-t border-white/10 space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
                    Included Add-ons:
                  </span>
                  {config.selectedAddons.map((addon) => (
                    <div key={addon.id} className="flex justify-between text-xs text-neutral-300">
                      <span>+ {addon.name}</span>
                      <span className="font-mono text-white">+${addon.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Error Message banner */}
            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300 font-mono">
                {errorMessage}
              </div>
            )}

            {/* Customer Details Form */}
            <form id="order-form" onSubmit={handleSubmitOrder} className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold">
                Dispatch & Reservation Information
              </h4>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                  Email Address (for Dispatch Tracking) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="maya.lin@studio.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                    City / Country
                  </label>
                  <input
                    type="text"
                    placeholder="New York, USA"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    placeholder="450 Broadway St"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Payment Mode */}
              <div>
                <label className="text-[11px] font-mono text-neutral-400 block mb-2">
                  Reservation Option
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('card')}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                      paymentMode === 'card'
                        ? 'border-emerald-400 bg-white/10 ring-1 ring-emerald-400/50'
                        : 'border-white/10 bg-white/5 text-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-white mb-0.5">
                      <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Instant Card</span>
                    </div>
                    <span className="text-[10px] text-neutral-400">
                      Standard Checkout
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMode('reserve')}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                      paymentMode === 'reserve'
                        ? 'border-emerald-400 bg-white/10 ring-1 ring-emerald-400/50'
                        : 'border-white/10 bg-white/5 text-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-white mb-0.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>$0 Pre-Reserve</span>
                    </div>
                    <span className="text-[10px] text-neutral-400">
                      Pay on dispatch
                    </span>
                  </button>
                </div>
              </div>
            </form>

            {/* Price Calculations */}
            <div className="p-3.5 rounded-xl border border-white/10 bg-black/40 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span>${totalPrice} USD</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>DHL Express Global Air</span>
                <span className="text-emerald-400 font-semibold">FREE ($0)</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Estimated VAT / Duties</span>
                <span>Included</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-white font-bold text-sm">
                <span>Order Total</span>
                <span className="text-emerald-400">${totalPrice} USD</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>30-Day Money-Back Studio Trial · 2-Year Global Hardware Warranty</span>
            </div>

          </div>

          {/* Drawer Footer Actions */}
          <div className="p-5 border-t border-white/10 bg-[#12141a]">
            <button
              type="submit"
              form="order-form"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Securing Allocation...' : `Confirm Preorder ($${totalPrice})`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
