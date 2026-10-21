import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  size?: number;
  interactive?: boolean;
  onChange?: (value: number) => void;
}

export default function StarRating({
  value,
  size = 20,
  interactive = false,
  onChange,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5" role="radiogroup" aria-label="Calificación">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.round(value);
        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(star)}
            aria-label={`${star} estrella${star > 1 ? 's' : ''}`}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              width={size}
              height={size}
              className={filled ? 'fill-gold text-gold' : 'fill-none text-sand-300'}
              strokeWidth={1.8}
            />
          </button>
        );
      })}
    </div>
  );
}
