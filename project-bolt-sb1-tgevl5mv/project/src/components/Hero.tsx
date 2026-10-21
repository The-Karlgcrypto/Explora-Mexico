import { Search, MapPin, Sparkles } from 'lucide-react';
import { destinations, states } from '@/data/mexico';

interface HeroProps {
  onExplore: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export default function Hero({ onExplore, onSearch, searchQuery }: HeroProps) {
  const featured = destinations.slice(0, 6);

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background collage */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 h-full">
          {featured.slice(0, 6).map((d, i) => (
            <div
              key={d.id}
              className={`relative overflow-hidden ${i === 0 ? 'col-span-2 row-span-2 md:col-span-1' : ''}`}
            >
              <img
                src={d.image}
                alt={d.name}
                loading={i < 3 ? 'eager' : 'lazy'}
                className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-[1.2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-sand-50/70 via-sand-50/20 to-sand-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 pt-28 pb-16">
        <span className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sand-50/80 backdrop-blur border border-sand-200 text-ink-soft text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4 text-terracotta" />
          {states.length} estados · {destinations.length} destinos por descubrir
        </span>

        <h1 className="reveal font-display text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight text-ink leading-[1.05] max-w-4xl">
          Explora México
        </h1>
        <p className="reveal mt-5 text-lg sm:text-xl text-ink-soft max-w-2xl leading-relaxed">
          Tradiciones milenarias, paisajes que deslumbran y sabores que cuentan historias.
          Tu próximo viaje empieza aquí.
        </p>

        {/* Search */}
        <div className="reveal mt-8 w-full max-w-xl">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-soft group-focus-within:text-terracotta transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Busca por lugar o estado…"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-sand-50/90 backdrop-blur border border-sand-200 shadow-lg shadow-ink/5 text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
            />
          </div>
        </div>

        <div className="reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onExplore}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ink text-sand-50 font-medium hover:bg-clay-700 shadow-lg shadow-ink/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <MapPin className="w-5 h-5" />
            Explorar estados
          </button>
          <a
            href="#destinos-destacados"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-sand-50/80 backdrop-blur border border-sand-200 text-ink font-medium hover:bg-sand-100 transition-all"
          >
            Ver destinos destacados
          </a>
        </div>
      </div>
    </section>
  );
}
