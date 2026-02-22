import { useState } from 'react';
import { Movie, Page } from '@/types';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';

interface MoviesPageProps {
  movies: Movie[];
  onOpenMovie: (movie: Movie) => void;
}

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const genres = ['Drama', 'Comedy', 'Sci-Fi', 'Thriller', 'Biography'];

const levelColors: Record<string, string> = {
  A1: 'bg-green-100 text-green-700',
  A2: 'bg-green-100 text-green-700',
  B1: 'bg-rose-100 text-rose-600',
  B2: 'bg-rose-100 text-rose-600',
  C1: 'bg-purple-100 text-purple-700',
  C2: 'bg-purple-100 text-purple-700',
};

export default function MoviesPage({ movies, onOpenMovie }: MoviesPageProps) {
  const [search, setSearch] = useState('');
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const filtered = movies.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.titleRu.toLowerCase().includes(search.toLowerCase());
    const matchLevel = !activeLevel || m.level === activeLevel;
    const matchGenre = !activeGenre || m.genre.includes(activeGenre);
    return matchSearch && matchLevel && matchGenre;
  });

  return (
    <div className="min-h-screen pb-20 md:pb-8 max-w-5xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-golos mb-1">Каталог фильмов</h1>
        <p className="text-muted-foreground text-sm">{movies.length} фильмов для изучения английского</p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Поиск по названию..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 h-10"
        />
      </div>

      {/* Filters */}
      <div className="space-y-3 mb-6">
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Уровень</p>
          <div className="flex flex-wrap gap-2">
            {levels.map(l => (
              <button
                key={l}
                onClick={() => setActiveLevel(activeLevel === l ? null : l)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                  activeLevel === l
                    ? 'bg-primary text-white border-primary'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary bg-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Жанр</p>
          <div className="flex flex-wrap gap-2">
            {genres.map(g => (
              <button
                key={g}
                onClick={() => setActiveGenre(activeGenre === g ? null : g)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all border ${
                  activeGenre === g
                    ? 'bg-primary text-white border-primary'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary bg-white'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((movie, i) => (
          <div
            key={movie.id}
            className="group bg-white rounded-2xl border border-border overflow-hidden cursor-pointer card-hover animate-fade-in"
            style={{ animationDelay: `${i * 0.06}s` }}
            onClick={() => onOpenMovie(movie)}
          >
            <div className="relative overflow-hidden">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2">
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${levelColors[movie.level]}`}>
                  {movie.level}
                </span>
              </div>
              {movie.watched && (
                <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                  <Icon name="Check" size={10} className="text-white" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100 duration-200">
                  <Icon name="Play" size={18} className="text-primary ml-0.5" />
                </div>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm leading-tight line-clamp-1">{movie.title}</h3>
              <p className="text-muted-foreground text-xs mt-0.5">{movie.year} · {movie.duration}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {movie.genre.slice(0, 2).map(g => (
                  <span key={g} className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded-md">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Icon name="SearchX" size={40} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Ничего не найдено. Попробуй другие фильтры.</p>
        </div>
      )}
    </div>
  );
}