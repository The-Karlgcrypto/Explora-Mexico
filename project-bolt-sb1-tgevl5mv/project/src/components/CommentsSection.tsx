import { useMemo, useState } from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { destinations, states } from '@/data/mexico';
import type { Comment } from '@/data/comments';

interface CommentsSectionProps {
  allComments: Comment[];
  onDelete: (id: string) => void;
  onJumpToDestination: (id: string) => void;
}

export default function CommentsSection({
  allComments,
  onDelete,
  onJumpToDestination,
}: CommentsSectionProps) {
  const [query, setQuery] = useState('');

  const enriched = useMemo(() => {
    return allComments
      .map((c) => {
        const dest = destinations.find((d) => d.id === c.destinationId);
        const state = dest ? states.find((s) => s.id === dest.stateId) : null;
        return { comment: c, dest, state };
      })
      .filter((item) => item.dest)
      .filter((item) => {
        if (!query.trim()) return true;
        const q = query.trim().toLowerCase();
        return (
          item.dest!.name.toLowerCase().includes(q) ||
          item.state!.name.toLowerCase().includes(q) ||
          item.comment.text.toLowerCase().includes(q) ||
          item.comment.name.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => b.comment.createdAt - a.comment.createdAt);
  }, [allComments, query]);

  return (
    <section id="comentarios" className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 reveal">
          <span className="text-terracotta text-sm font-semibold tracking-widest uppercase">
            La voz de los viajeros
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-ink mt-2">
            Comentarios y calificaciones
          </h2>
          <p className="mt-4 text-ink-soft max-w-2xl mx-auto text-lg">
            Revisa lo que otros viajeros opinan de cada destino. Tus comentarios se guardan en este
            navegador.
          </p>
        </div>

        <div className="reveal relative mb-8 max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-soft" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar comentarios por lugar, estado o autor…"
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-sand-200 shadow-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
          />
        </div>

        {enriched.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-dashed border-sand-300 bg-sand-50/50 reveal">
            <MessageSquare className="w-10 h-10 mx-auto text-sand-300 mb-3" />
            <p className="text-ink-soft">
              {allComments.length === 0
                ? 'Todavía no hay comentarios. Abre un destino y sé el primero en opinar.'
                : 'No encontramos comentarios para tu búsqueda.'}
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {enriched.map(({ comment, dest, state }) => (
              <li
                key={comment.id}
                className="reveal rounded-2xl bg-white border border-sand-200 p-5"
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-ink">{comment.name}</span>
                      <span className="text-xs text-ink-soft">
                        · {new Date(comment.createdAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <button
                      onClick={() => onJumpToDestination(dest!.id)}
                      className="mt-1 text-sm text-clay-600 hover:text-clay-700 hover:underline font-medium"
                    >
                      {dest!.name} · {state!.name}
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span
                          key={s}
                          className={`w-3.5 h-3.5 rounded-full ${
                            s <= comment.rating ? 'bg-gold' : 'bg-sand-200'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => onDelete(comment.id)}
                      className="text-ink-soft hover:text-terracotta text-xs"
                      aria-label="Eliminar comentario"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-ink-soft text-sm leading-relaxed whitespace-pre-line break-words">
                  {comment.text}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
