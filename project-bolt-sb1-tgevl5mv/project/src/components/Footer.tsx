import { Compass, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-sand-200 bg-sand-100/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-terracotta to-clay-500 flex items-center justify-center text-sand-50">
            <Compass className="w-4 h-4" strokeWidth={2.2} />
          </span>
          <span className="font-display text-lg font-semibold text-ink">Explora México</span>
        </div>
        <p className="text-sm text-ink-soft flex items-center gap-1.5">
          Hecho con <Heart className="w-3.5 h-3.5 text-terracotta fill-terracotta" /> para viajeros · 2026
        </p>
      </div>
    </footer>
  );
}
