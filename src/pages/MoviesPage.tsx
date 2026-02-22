import { useState } from 'react';
import { Movie } from '@/types';
import Icon from '@/components/ui/icon';

interface MoviesPageProps {
  movies: Movie[];
  onOpenMovie: (movie: Movie) => void;
}

type FilterType = 'all' | 'levels' | 'genres' | 'topics';

export default function MoviesPage({ movies, onOpenMovie }: MoviesPageProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'Все' },
    { id: 'levels', label: 'Уровни' },
    { id: 'genres', label: 'Жанры' },
    { id: 'topics', label: 'Тематика' },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-8 max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl md:text-3xl font-bold font-golos mb-8">Библиотека фильмов.</h1>

      <div className="flex justify-center gap-3 mb-10">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all border ${
              activeFilter === f.id
                ? 'text-white border-transparent'
                : 'border-foreground/30 text-foreground/70 hover:border-foreground/50 bg-transparent'
            }`}
            style={activeFilter === f.id ? { backgroundColor: '#d98c8c', borderColor: '#d98c8c' } : {}}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie, i) => (
          <div
            key={movie.id}
            className="group cursor-pointer animate-fade-in"
            style={{ animationDelay: `${i * 0.06}s` }}
            onClick={() => onOpenMovie(movie)}
          >
            <div
              className="rounded-2xl overflow-hidden p-2 mb-3 transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-1"
              style={{ backgroundColor: '#f3e5e5' }}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full aspect-[3/4] object-cover rounded-xl"
              />
            </div>
            <h3 className="font-semibold text-sm text-foreground">{movie.title}</h3>
          </div>
        ))}
      </div>

      {movies.length === 0 && (
        <div className="text-center py-16">
          <Icon name="SearchX" size={40} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Ничего не найдено.</p>
        </div>
      )}
    </div>
  );
}
