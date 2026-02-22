import { useState, useRef, useEffect } from 'react';
import { Movie } from '@/types';
import Icon from '@/components/ui/icon';

interface MoviesPageProps {
  movies: Movie[];
  onOpenMovie: (movie: Movie) => void;
}

type FilterType = 'all' | 'levels' | 'genres' | 'topics';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const GENRES = ['Драма', 'Романтика', 'Комедия', 'Фантастика'];
const TOPICS = ['Животные', 'Еда', 'Путешествия'];

const GENRE_MAP: Record<string, string[]> = {
  'Драма': ['Drama'],
  'Романтика': ['Romance'],
  'Комедия': ['Comedy'],
  'Фантастика': ['Sci-Fi'],
};

const TOPIC_MAP: Record<string, string[]> = {
  'Животные': ['Animals'],
  'Еда': ['Food'],
  'Путешествия': ['Travel'],
};

export default function MoviesPage({ movies, onOpenMovie }: MoviesPageProps) {
  const [openDropdown, setOpenDropdown] = useState<FilterType | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const toggleDropdown = (id: FilterType) => {
    if (id === 'all') {
      setSelectedLevel(null);
      setSelectedGenre(null);
      setSelectedTopic(null);
      setOpenDropdown(null);
      return;
    }
    setOpenDropdown(prev => prev === id ? null : id);
  };

  const isAllActive = !selectedLevel && !selectedGenre && !selectedTopic;

  const filtered = movies.filter(m => {
    if (selectedLevel && m.level !== selectedLevel) return false;
    if (selectedGenre && !m.genre.some(g => GENRE_MAP[selectedGenre]?.includes(g))) return false;
    if (selectedTopic && !m.topic?.some(t => TOPIC_MAP[selectedTopic]?.includes(t))) return false;
    return true;
  });

  const getLabel = (id: FilterType) => {
    if (id === 'levels') return selectedLevel || 'Уровни';
    if (id === 'genres') return selectedGenre || 'Жанры';
    if (id === 'topics') return selectedTopic || 'Тематика';
    return 'Все';
  };

  const isActive = (id: FilterType) => {
    if (id === 'all') return isAllActive;
    if (id === 'levels') return !!selectedLevel;
    if (id === 'genres') return !!selectedGenre;
    if (id === 'topics') return !!selectedTopic;
    return false;
  };

  const filters: FilterType[] = ['all', 'levels', 'genres', 'topics'];

  return (
    <div className="min-h-screen pb-20 md:pb-8 max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl md:text-3xl font-bold font-golos mb-8">Библиотека фильмов.</h1>

      <div className="flex justify-center gap-3 mb-10 relative" ref={dropdownRef}>
        {filters.map(f => (
          <div key={f} className="relative">
            <button
              onClick={() => toggleDropdown(f)}
              className={`flex items-center gap-1.5 px-6 py-2 rounded-full text-sm font-medium transition-all border ${
                isActive(f)
                  ? 'text-white border-transparent'
                  : 'border-foreground/30 text-foreground/70 hover:border-foreground/50 bg-transparent'
              }`}
              style={isActive(f) ? { backgroundColor: '#d98c8c', borderColor: '#d98c8c' } : {}}
            >
              {getLabel(f)}
              {f !== 'all' && (
                <Icon name="ChevronDown" size={14} className={`transition-transform ${openDropdown === f ? 'rotate-180' : ''}`} />
              )}
            </button>

            {openDropdown === f && f !== 'all' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-xl border border-border z-50 py-2 min-w-[140px] animate-scale-in">
                {f === 'levels' && LEVELS.map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => { setSelectedLevel(selectedLevel === lvl ? null : lvl); setOpenDropdown(null); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${selectedLevel === lvl ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}
                  >
                    {selectedLevel === lvl && <span className="mr-2">✓</span>}{lvl}
                  </button>
                ))}
                {f === 'genres' && GENRES.map(g => (
                  <button
                    key={g}
                    onClick={() => { setSelectedGenre(selectedGenre === g ? null : g); setOpenDropdown(null); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${selectedGenre === g ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}
                  >
                    {selectedGenre === g && <span className="mr-2">✓</span>}{g}
                  </button>
                ))}
                {f === 'topics' && TOPICS.map(t => (
                  <button
                    key={t}
                    onClick={() => { setSelectedTopic(selectedTopic === t ? null : t); setOpenDropdown(null); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${selectedTopic === t ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}
                  >
                    {selectedTopic === t && <span className="mr-2">✓</span>}{t}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((movie, i) => (
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

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Icon name="SearchX" size={40} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Ничего не найдено. Попробуй другой фильтр.</p>
        </div>
      )}
    </div>
  );
}
