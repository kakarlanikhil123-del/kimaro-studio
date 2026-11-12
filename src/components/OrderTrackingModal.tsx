import React, { useState } from 'react';
import { Search, X, PackageCheck, Truck, Cpu, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { OrderItem } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = '',
}) => {
  const [searchId, setSearchId] = useState(initialOrderId || 'KMR-78291');
  const [order, setOrder] = useState<OrderItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLookup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchId.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/orders/${encodeURIComponent(searchId.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Order tracking token not found.');
      }
      setOrder(data);
    } catch (err: any) {
      setError(err.message || 'Unable to locate order.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: 'Allocation Reserved', desc: 'Order confirmed & queued' },
    { title: 'CNC Aluminum Milling', desc: '6063-T6 block precision cut' },
    { title: 'Optical Alignment', desc: 'Leica 35mm multi-coating assembly' },
    { title: 'Quality Assurance', desc: '4K TrueHDR & acoustic sweep tested' },
    { title: 'Global Air Courier', desc: 'DHL Express tracked dispatch' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-2xl border border-white/20 bg-[#101217] p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Kimaro Order & Dispatch Tracker
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input form */}
        <form onSubmit={handleLookup} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter Order ID (e.g. KMR-78291)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value.toUpperCase())}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/60 border border-white/15 text-xs font-mono uppercase text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Locating...' : 'Track'}
          </button>
        </form>

        {error && (
          <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/25 flex items-center gap-2 text-xs text-red-300 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Order Details Display */}
        {order && (
          <div className="space-y-5 animate-in fade-in">
            {/* Summary card */}
            <div className="p-4 rounded-xl border border-white/15 bg-white/5 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400">
                    Tracking Token
                  </span>
                  <div className="text-sm font-mono font-bold text-emerald-400">
                    {order.id}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-neutral-400">
                    Estimated Delivery
                  </span>
                  <div className="text-xs font-mono font-bold text-white">
                    {order.estimatedDelivery}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                <div>
                  <span className="text-neutral-400">Customer: </span>
                  <span className="text-white font-medium">{order.customer.name}</span>
                </div>
                <div>
                  <span className="text-neutral-400">Total: </span>
                  <span className="text-emerald-400 font-bold">${order.total} USD</span>
                </div>
                <div>
                  <span className="text-neutral-400">Finish: </span>
                  <span className="text-white">{order.product.finish}</span>
                </div>
                <div>
                  <span className="text-neutral-400">Lens: </span>
                  <span className="text-white">{order.product.lens}</span>
                </div>
              </div>

              {order.product.engraving && (
                <div className="text-xs font-mono text-emerald-400">
                  Custom Engraving: "{order.product.engraving}"
                </div>
              )}
            </div>

            {/* Milestone timeline */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3 font-semibold">
                Assembly & Fulfillment Milestones
              </h4>
              <div className="space-y-3">
                {steps.map((step, idx) => {
                  const isCompleted = idx <= 2;
                  const isCurrent = idx === 2;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="pt-0.5">
                        {isCompleted ? (
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            isCurrent ? 'bg-emerald-400 text-black ring-4 ring-emerald-400/20' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-white/20 bg-black/40" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`text-xs font-bold leading-tight ${
                          isCompleted ? 'text-white' : 'text-neutral-500'
                        }`}>
                          {step.title}
                        </div>
                        <div className="text-[10px] font-mono text-neutral-400">
                          {step.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {!order && !error && (
          <div className="text-center py-6 text-neutral-400 text-xs font-mono">
            Enter your token above or click below to view sample batch allocation:
            <div className="mt-3">
              <button
                type="button"
                onClick={() => {
                  setSearchId('KMR-78291');
                  handleLookup();
                }}
                className="px-3 py-1.5 rounded-lg border border-white/20 bg-white/5 text-xs text-white hover:bg-white/10"
              >
                Load Sample Order (KMR-78291)
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
