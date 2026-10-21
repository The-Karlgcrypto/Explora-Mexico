import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import StarRating from './StarRating';
import type { CommentResult } from '@/data/comments';

interface CommentFormProps {
  onSubmit: (name: string, text: string, rating: number) => CommentResult;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [result, setResult] = useState<CommentResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = onSubmit(name, text, rating);
    setResult(res);
    if (res.success) {
      setName('');
      setText('');
      setRating(0);
    }
  };

  const remaining = 200 - text.length;

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-sand-200 p-5">
      <div className="grid gap-4">
        <div>
          <label htmlFor="c-name" className="block text-sm font-medium text-ink mb-1.5">
            Tu nombre
          </label>
          <input
            id="c-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 40))}
            placeholder="¿Cómo te llamas?"
            className="w-full px-4 py-2.5 rounded-xl bg-sand-50 border border-sand-200 text-ink placeholder:text-ink-soft/50 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
            maxLength={40}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="c-text" className="block text-sm font-medium text-ink">
              Tu comentario
            </label>
            <span
              className={`text-xs ${remaining < 0 ? 'text-terracotta' : 'text-ink-soft'}`}
            >
              {remaining} caracteres
            </span>
          </div>
          <textarea
            id="c-text"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 200))}
            placeholder="Cuéntanos qué te pareció este destino…"
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl bg-sand-50 border border-sand-200 text-ink placeholder:text-ink-soft/50 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all resize-none"
          />
        </div>

        <div>
          <span className="block text-sm font-medium text-ink mb-1.5">Calificación</span>
          <StarRating value={rating} size={28} interactive onChange={setRating} />
        </div>

        {result && (
          <div
            className={`flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm ${
              result.success
                ? 'bg-mint/30 text-ink border border-mint/50'
                : 'bg-terracotta/10 text-terracotta border border-terracotta/30'
            }`}
            role="status"
          >
            {result.success ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            )}
            <span>{result.message}</span>
          </div>
        )}

        <button
          type="submit"
          className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-sand-50 font-medium hover:bg-clay-700 transition-colors disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          Publicar comentario
        </button>
      </div>
    </form>
  );
}
