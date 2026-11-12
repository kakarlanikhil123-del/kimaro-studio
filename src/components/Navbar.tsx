import React from 'react';
import { ShoppingBag, Search, Sparkles } from 'lucide-react';
import { ProductConfig } from '../types';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenTracking: () => void;
  onOpenStudio: () => void;
  cartCount: number;
  config: ProductConfig;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCart,
  onOpenTracking,
  onOpenStudio,
  cartCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0c0d10]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark with signature round K icon */}
        <a href="#hero" className="flex items-center gap-2.5 text-white whitespace-nowrap shrink-0 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0c0d10] font-bold text-xs tracking-tighter transition-transform group-hover:scale-105">
            K
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Kimaro<span className="text-emerald-400">.</span>
          </span>
        </a>

        {/* Zone 2: Single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
          <a href="#hero" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Overview
          </a>
          <a href="#customizer" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Customizer
          </a>
          <a href="#specs" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Optics & Sensor
          </a>
          <button
            onClick={onOpenStudio}
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            Studio Test
          </button>
          <a href="#reviews" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Reviews
          </a>
          <button
            onClick={onOpenTracking}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Track Order
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Cart Drawer Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label="Open Cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black font-mono-numbers">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="px-4 py-2 text-xs font-semibold text-black bg-white rounded-lg hover:bg-neutral-200 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Preorder $250
          </button>
        </div>
      </div>
    </header>
  );
};
