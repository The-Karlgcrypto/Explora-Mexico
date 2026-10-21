import { ArrowRight } from 'lucide-react';
import { states, destinations } from '@/data/mexico';

interface StatesSectionProps {
  onSelectState: (stateId: string) => void;
  highlight?: string | null;
}

export default function StatesSection({ onSelectState, highlight }: StatesSectionProps) {
  return (
    <section id="estados" className="py-20 sm:py-28 px-5 sm:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-14 reveal">
        <span className="text-terracotta text-sm font-semibold tracking-widest uppercase">
          Descubre cada rincón
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-semibold text-ink mt-2">
          Estados de México
        </h2>
        <p className="mt-4 text-ink-soft max-w-2xl mx-auto text-lg">
          Cada estado guarda un mundo propio. Elige uno para ver sus destinos, costos y actividades.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {states.map((state) => {
          const count = destinations.filter((d) => d.stateId === state.id).length;
          const isHighlight = highlight === state.id;
          return (
            <button
              key={state.id}
              onClick={() => onSelectState(state.id)}
              className={`reveal group relative overflow-hidden rounded-3xl text-left shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${
                isHighlight ? 'ring-2 ring-terracotta ring-offset-2 ring-offset-sand-50' : ''
              }`}
            >
              <div className="aspect-[4/5] relative">
                <img
                  src={state.image}
                  alt={state.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
                <div
                  className="absolute top-4 left-4 w-3 h-3 rounded-full ring-2 ring-sand-50/80"
                  style={{ backgroundColor: state.color }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-sand-50">
                    {state.name}
                  </h3>
                  <p className="text-sand-100/90 text-sm mt-1 leading-relaxed">
                    {state.tagline}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sand-50 text-sm font-medium">
                    {count} destinos
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
