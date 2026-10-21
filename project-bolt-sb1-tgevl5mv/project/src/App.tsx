import { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import type { View } from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatesSection from '@/components/StatesSection';
import DestinationsSection from '@/components/DestinationsSection';
import DestinationDetail from '@/components/DestinationDetail';
import type { CommentsApi } from '@/components/DestinationDetail';
import CommentsSection from '@/components/CommentsSection';
import Footer from '@/components/Footer';
import { useComments } from '@/hooks/useComments';
import { useReveal } from '@/hooks/useReveal';
import { destinations } from '@/data/mexico';

export default function App() {
  const [view, setView] = useState<View>('inicio');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStateId, setFilterStateId] = useState<string | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);

  const comments = useComments();
  const revealRef = useReveal<HTMLDivElement>();

  const commentsApi: CommentsApi = {
    addComment: comments.addComment,
    deleteComment: comments.deleteComment,
    getForDestination: comments.getForDestination,
    getAverageRating: comments.getAverageRating,
  };

  const detailDestination = useMemo(
    () => (detailId ? destinations.find((d) => d.id === detailId) ?? null : null),
    [detailId],
  );

  const handleNavigate = (next: View) => {
    setView(next);
    if (next !== 'destinos') setFilterStateId(null);
    requestAnimationFrame(() => {
      if (next === 'inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const targetId = next === 'comentarios' ? 'comentarios' : next === 'estados' ? 'estados' : 'destinos-destacados';
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleSelectState = (stateId: string) => {
    setFilterStateId(stateId);
    setView('destinos');
    requestAnimationFrame(() => {
      document.getElementById('destinos-destacados')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleVerMas = (id: string) => setDetailId(id);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.trim() && view === 'inicio') {
      setView('destinos');
      requestAnimationFrame(() => {
        document.getElementById('destinos-destacados')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  const handleJumpToDestination = (id: string) => {
    setView('destinos');
    setFilterStateId(null);
    setDetailId(id);
  };

  // Close modal on Escape
  useEffect(() => {
    if (!detailId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDetailId(null);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [detailId]);

  const commentCount = (id: string) => comments.getForDestination(id).length;

  return (
    <div ref={revealRef} className="min-h-screen">
      <Navbar view={view} onNavigate={handleNavigate} />

      <main>
        <Hero
          onExplore={() => handleNavigate('estados')}
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />

        <StatesSection onSelectState={handleSelectState} highlight={filterStateId} />

        <DestinationsSection
          filterStateId={filterStateId}
          searchQuery={searchQuery}
          averageRating={comments.getAverageRating}
          commentCount={commentCount}
          onVerMas={handleVerMas}
          onClearFilter={() => {
            setFilterStateId(null);
            setSearchQuery('');
          }}
        />

        <CommentsSection
          allComments={comments.comments}
          onDelete={comments.deleteComment}
          onJumpToDestination={handleJumpToDestination}
        />
      </main>

      <Footer />

      <DestinationDetail
        destination={detailDestination}
        onClose={() => setDetailId(null)}
        comments={commentsApi}
      />
    </div>
  );
}
