import { Trash2, MessageSquare } from 'lucide-react';
import StarRating from './StarRating';
import type { Comment } from '@/data/comments';

interface CommentListProps {
  comments: Comment[];
  onDelete: (id: string) => void;
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function CommentList({ comments, onDelete }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-10 px-4 rounded-2xl border border-dashed border-sand-300 bg-sand-50/50">
        <MessageSquare className="w-8 h-8 mx-auto text-sand-300 mb-2" />
        <p className="text-ink-soft text-sm">
          Aún no hay comentarios. ¡Sé el primero en calificar este destino!
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {comments.map((c) => (
        <li
          key={c.id}
          className="rounded-2xl bg-white border border-sand-200 p-4 sm:p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-ink truncate">{c.name}</span>
                <span className="text-xs text-ink-soft">· {formatDate(c.createdAt)}</span>
              </div>
              <StarRating value={c.rating} size={14} />
            </div>
            <button
              onClick={() => onDelete(c.id)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-soft hover:text-terracotta hover:bg-terracotta/10 transition-colors flex-shrink-0"
              aria-label="Eliminar comentario"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-2 text-ink-soft text-sm leading-relaxed break-words whitespace-pre-line">
            {c.text}
          </p>
        </li>
      ))}
    </ul>
  );
}
