import { useMemo } from 'react';
import { X, MapPin, Wallet, Activity, Star } from 'lucide-react';
import { states } from '@/data/mexico';
import type { Destination } from '@/data/mexico';
import type { Comment, CommentResult } from '@/data/comments';
import StarRating from './StarRating';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

export interface CommentsApi {
  addComment: (destinationId: string, name: string, text: string, rating: number) => CommentResult;
  deleteComment: (id: string) => void;
  getForDestination: (destinationId: string) => Comment[];
  getAverageRating: (destinationId: string) => number;
}

interface DestinationDetailProps {
  destination: Destination | null;
  onClose: () => void;
  comments: CommentsApi;
}

export default function DestinationDetail({
  destination,
  onClose,
  comments,
}: DestinationDetailProps) {
  const state = useMemo(
    () => (destination ? states.find((s) => s.id === destination.stateId) : null),
    [destination],
  );

  if (!destination) return null;

  const costRows: { label: string; value: string }[] = [
    { label: 'Entrada', value: destination.costs.entrada },
    { label: 'Transporte', value: destination.costs.transporte },
    { label: 'Comida', value: destination.costs.comida },
    { label: 'Hospedaje', value: destination.costs.hospedaje },
  ];

  const list = comments.getForDestination(destination.id);
  const avg = comments.getAverageRating(destination.id);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center bg-ink/60 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-3xl max-h-screen sm:max-h-[90vh] overflow-y-auto bg-sand-50 rounded-none sm:rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-sand-50/90 backdrop-blur flex items-center justify-center text-ink hover:bg-sand-100 transition-colors shadow-md"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative aspect-[16/10] sm:aspect-[2/1] overflow-hidden sm:rounded-t-3xl">
          <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="px-3 py-1 rounded-full bg-sand-50/90 backdrop-blur text-ink text-xs font-semibold">
              {state?.name}
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-sand-50">
              {destination.name}
            </h2>
            <div className="mt-2 flex items-center gap-3 text-sand-100">
              <StarRating value={avg} size={18} />
              <span className="text-sm">
                {list.length > 0
                  ? `${avg.toFixed(1)} · ${list.length} comentario${list.length > 1 ? 's' : ''}`
                  : 'Aún sin calificaciones'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          <div>
            <h3 className="font-display text-xl font-semibold text-ink mb-2">Descripción</h3>
            <p className="text-ink-soft leading-relaxed">{destination.description}</p>
          </div>

          <div className="flex items-start gap-2 text-ink-soft">
            <MapPin className="w-5 h-5 mt-0.5 text-clay-500 flex-shrink-0" />
            <span>{destination.location}</span>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-ink mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-terracotta" />
              Actividades disponibles
            </h3>
            <div className="flex flex-wrap gap-2">
              {destination.activities.map((act) => (
                <span
                  key={act}
                  className="px-3.5 py-1.5 rounded-full bg-sand-100 text-ink text-sm border border-sand-200"
                >
                  {act}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-ink mb-3 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-clay-600" />
              Costos aproximados
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {costRows.map((row) => (
                <div
                  key={row.label}
                  className="rounded-2xl bg-white border border-sand-200 p-4"
                >
                  <p className="text-xs uppercase tracking-wide text-ink-soft font-medium">
                    {row.label}
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold text-clay-700">
                    {row.value}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-ink-soft">
              Precios de referencia en pesos mexicanos (MXN). Pueden variar por temporada.
            </p>
          </div>

          <div className="pt-2 border-t border-sand-200">
            <h3 className="font-display text-xl font-semibold text-ink mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-gold fill-gold" />
              Comentarios y calificaciones
            </h3>
            <CommentForm
              onSubmit={(name, text, rating) => comments.addComment(destination.id, name, text, rating)}
            />
            <div className="mt-6">
              <CommentList comments={list} onDelete={comments.deleteComment} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
