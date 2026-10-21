import { Compass, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export type View = 'inicio' | 'estados' | 'destinos' | 'comentarios';

interface NavbarProps {
  view: View;
  onNavigate: (view: View) => void;
}

const items: { id: View; label: string }[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'estados', label: 'Estados' },
  { id: 'destinos', label: 'Destinos' },
  { id: 'comentarios', label: 'Comentarios' },
];

export default function Navbar({ view, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (v: View) => {
    onNavigate(v);
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-sand-50/90 backdrop-blur-md shadow-[0_4px_20px_-8px_rgba(58,51,40,0.25)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <button
          onClick={() => go('inicio')}
          className="flex items-center gap-2.5 group"
          aria-label="Ir al inicio"
        >
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-terracotta to-clay-500 flex items-center justify-center text-sand-50 shadow-md group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5" strokeWidth={2.2} />
          </span>
          <span className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-ink">
            Explora México
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                view === item.id
                  ? 'bg-ink text-sand-50 shadow-sm'
                  : 'text-ink-soft hover:bg-sand-200 hover:text-ink'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-ink hover:bg-sand-200 transition-colors"
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-sand-50/95 backdrop-blur-md border-t border-sand-200">
          <div className="px-5 py-3 flex flex-col gap-1">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`px-4 py-3 rounded-xl text-left font-medium transition-all ${
                  view === item.id
                    ? 'bg-ink text-sand-50'
                    : 'text-ink-soft hover:bg-sand-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
