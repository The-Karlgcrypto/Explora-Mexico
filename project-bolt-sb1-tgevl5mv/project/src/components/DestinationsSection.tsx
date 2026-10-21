import { MapPin, Star, ArrowRight, Search } from 'lucide-react';
import { useMemo } from 'react';
import { destinations, states } from '@/data/mexico';
import type { Destination } from '@/data/mexico';
import StarRating from './StarRating';

interface DestinationCardProps {
  destination: Destination;
  averageRating: number;
  commentCount: number;
  onVerMas: (id: string) => void;
}

function DestinationCard({ destination, averageRating, commentCount, onVerMas }: DestinationCardProps) {
  const state = states.find((s) => s.id === destination.stateId);
  return (
    <article className="reveal group flex flex-col rounded-3xl overflow-hidden bg-white/70 backdrop-blur border border-sand-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-sand-50/90 backdrop-blur text-ink text-xs font-semibold">
          {state?.name}
        </span>
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sand-50/90 backdrop-blur text-ink text-xs font-semibold">
          <Star className="w-3 h-3 fill-gold text-gold" />
          {averageRating > 0 ? averageRating.toFixed(1) : '—'}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-xl font-semibold text-ink">{destination.name}</h3>
        <p className="mt-1 inline-flex items-start gap-1.5 text-ink-soft text-sm">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-clay-500" />
          {destination.location}
        </p>
        <p className="mt-3 text-ink-soft text-sm leading-relaxed line-clamp-3">
          {destination.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {destination.activities.slice(0, 3).map((act) => (
            <span
              key={act}
              className="px-2.5 py-1 rounded-full bg-sand-100 text-ink-soft text-xs"
            >
              {act}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between pt-4 border-t border-sand-200">
          <span className="text-xs text-ink-soft">
            {commentCount > 0 ? `${commentCount} comentario${commentCount > 1 ? 's' : ''}` : 'Sin comentarios'}
          </span>
          <button
            onClick={() => onVerMas(destination.id)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink text-sand-50 text-sm font-medium hover:bg-clay-700 transition-colors group/btn"
          >
            Ver más
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
}

interface DestinationsSectionProps {
  filterStateId: string | null;
  searchQuery: string;
  averageRating: (id: string) => number;
  commentCount: (id: string) => number;
  onVerMas: (id: string) => void;
  onClearFilter: () => void;
}

export default function DestinationsSection({
  filterStateId,
  searchQuery,
  averageRating,
  commentCount,
  onVerMas,
  onClearFilter,
}: DestinationsSectionProps) {
  const list = useMemo(() => {
    let result = destinations;
    if (filterStateId) result = result.filter((d) => d.stateId === filterStateId);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((d) => {
        const state = states.find((s) => s.id === d.stateId)?.name.toLowerCase() ?? '';
        return d.name.toLowerCase().includes(q) || state.includes(q);
      });
    }
    return result;
  }, [filterStateId, searchQuery]);

  const filterState = filterStateId ? states.find((s) => s.id === filterStateId) : null;

  return (
    <section id="destinos-destacados" className="py-20 sm:py-28 px-5 sm:px-8 bg-sand-100/60">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 reveal">
          <div>
            <span className="text-terracotta text-sm font-semibold tracking-widest uppercase">
              {filterState ? 'Filtrado por estado' : 'Todos los destinos'}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-ink mt-2">
              {filterState ? filterState.name : 'Destinos destacados'}
            </h2>
            {filterState && (
              <p className="mt-2 text-ink-soft">{filterState.tagline}</p>
            )}
          </div>
          {filterState && (
            <button
              onClick={onClearFilter}
              className="self-start sm:self-auto px-5 py-2.5 rounded-full bg-white border border-sand-200 text-ink text-sm font-medium hover:bg-sand-100 transition-colors"
            >
              Ver todos los estados
            </button>
          )}
        </div>

        {list.length === 0 ? (
          <div className="reveal text-center py-20">
            <Search className="w-12 h-12 mx-auto text-sand-300 mb-4" />
            <p className="text-ink-soft text-lg">
              No encontramos destinos para «{searchQuery}».
            </p>
            <button
              onClick={onClearFilter}
              className="mt-4 px-5 py-2.5 rounded-full bg-ink text-sand-50 text-sm font-medium hover:bg-clay-700 transition-colors"
            >
              Limpiar búsqueda
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((d) => (
              <DestinationCard
                key={d.id}
                destination={d}
                averageRating={averageRating(d.id)}
                commentCount={commentCount(d.id)}
                onVerMas={onVerMas}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
