import { useState, useEffect, useCallback } from 'react';
import type { Comment, CommentResult } from '@/data/comments';

export type { Comment, CommentResult };

const STORAGE_KEY = 'explora-mexico-comments';

const OFFENSIVE_WORDS = [
  'puto', 'puta', 'pendejo', 'pendeja', 'idiota', 'imbecil', 'imbécil',
  'cabron', 'cabrón', 'chingar', 'chingado', 'verga', 'culo',
  'mierda', 'joder', 'maricon', 'maricón', ' puta ', 'zorra',
  'estupido', 'estúpido', 'estupida', 'estúpida',
];

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export interface ValidationResult {
  valid: boolean;
  message: string;
  cleanedText: string;
}

export function validateComment(name: string, text: string): ValidationResult {
  const trimmedName = name.trim();
  const trimmedText = text.trim();

  if (trimmedName.length === 0) {
    return { valid: false, message: 'Escribe tu nombre para publicar el comentario.', cleanedText: text };
  }
  if (trimmedName.length > 40) {
    return { valid: false, message: 'El nombre es demasiado largo (máximo 40 caracteres).', cleanedText: text };
  }
  if (trimmedText.length === 0) {
    return { valid: false, message: 'El comentario no puede estar vacío.', cleanedText: text };
  }
  if (trimmedText.length > 200) {
    return { valid: false, message: 'El comentario supera los 200 caracteres permitidos.', cleanedText: text };
  }
  if (/[<>]/.test(trimmedText) || /<\/?[a-z][\s\S]*>/i.test(trimmedText)) {
    return { valid: false, message: 'No se permiten etiquetas HTML ni código ejecutable.', cleanedText: text };
  }
  if (/\b(function|script|javascript|onclick|onerror|eval)\b/i.test(trimmedText)) {
    return { valid: false, message: 'No se permite código ejecutable en el comentario.', cleanedText: text };
  }
  const lower = ` ${trimmedText.toLowerCase()} `;
  for (const w of OFFENSIVE_WORDS) {
    if (lower.includes(w)) {
      return { valid: false, message: 'Tu comentario contiene palabras no permitidas. Revisa tu lenguaje.', cleanedText: text };
    }
  }
  return { valid: true, message: '', cleanedText: escapeHtml(trimmedText) };
}

function loadComments(): Comment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((c) => c && c.id && c.destinationId && typeof c.text === 'string');
  } catch {
    return [];
  }
}

export function useComments() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    setComments(loadComments());
  }, []);

  const persist = useCallback((next: Comment[]) => {
    setComments(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* localStorage may be unavailable; in-memory state still works */
    }
  }, []);

  const addComment = useCallback(
    (destinationId: string, name: string, text: string, rating: number) => {
      const result = validateComment(name, text);
      if (!result.valid) return { success: false, message: result.message };
      if (rating < 1 || rating > 5) {
        return { success: false, message: 'Selecciona una calificación entre 1 y 5 estrellas.' };
      }
      const comment: Comment = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        destinationId,
        name: escapeHtml(name.trim()),
        text: result.cleanedText,
        rating,
        createdAt: Date.now(),
      };
      persist([comment, ...comments]);
      return { success: true, message: '¡Comentario publicado con éxito!' };
    },
    [comments, persist],
  );

  const deleteComment = useCallback(
    (id: string) => {
      persist(comments.filter((c) => c.id !== id));
    },
    [comments, persist],
  );

  const getForDestination = useCallback(
    (destinationId: string) => comments.filter((c) => c.destinationId === destinationId),
    [comments],
  );

  const getAverageRating = useCallback(
    (destinationId: string) => {
      const list = comments.filter((c) => c.destinationId === destinationId);
      if (list.length === 0) return 0;
      return list.reduce((acc, c) => acc + c.rating, 0) / list.length;
    },
    [comments],
  );

  return { comments, addComment, deleteComment, getForDestination, getAverageRating };
}
