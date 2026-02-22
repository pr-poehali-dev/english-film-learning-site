import { useState } from 'react';
import { User, Movie, DictionaryWord, Test, Page } from '@/types';
import { mockUser, mockMovies, mockDictionary, mockTests } from '@/data/mockData';
import AuthModal from '@/components/AuthModal';
import Navbar from '@/components/Navbar';
import AboutModal from '@/components/AboutModal';
import HomePage from './HomePage';
import MoviesPage from './MoviesPage';
import TestsPage from './TestsPage';
import DictionaryPage from './DictionaryPage';
import ProfilePage from './ProfilePage';
import MoviePlayerPage from './MoviePlayerPage';

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>(mockMovies);
  const [dictionary, setDictionary] = useState<DictionaryWord[]>(mockDictionary);
  const [tests, setTests] = useState<Test[]>(mockTests);
  const [showAbout, setShowAbout] = useState(false);

  const watchedMovieIds = movies.filter(m => m.testPassed).map(m => m.id);

  const handleAuth = (name: string, email: string) => {
    setUser({ ...mockUser, name, email });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
    setActiveMovie(null);
  };

  const handleOpenMovie = (movie: Movie) => {
    setActiveMovie(movie);
    setCurrentPage('movie-player');
  };

  const handleAddWord = (word: DictionaryWord) => {
    setDictionary(prev => {
      if (prev.find(w => w.word === word.word)) return prev;
      return [word, ...prev];
    });
    setUser(prev => prev ? { ...prev, wordsAdded: prev.wordsAdded + 1 } : prev);
  };

  const handleTestPassed = (movieId: number) => {
    setMovies(prev => prev.map(m =>
      m.id === movieId ? { ...m, watched: true, testPassed: true } : m
    ));
    setUser(prev => prev ? { ...prev, tasksCompleted: prev.tasksCompleted + 1, moviesWatched: prev.moviesWatched + 1 } : prev);
  };

  const handleTestComplete = (testId: number) => {
    setTests(prev => prev.map(t => t.id === testId ? { ...t, completed: true } : t));
    setUser(prev => prev ? { ...prev, tasksCompleted: prev.tasksCompleted + 1 } : prev);
  };

  const handleToggleLearned = (id: number) => {
    setDictionary(prev => prev.map(w => w.id === id ? { ...w, learned: !w.learned } : w));
  };

  const handleNavigate = (page: Page) => {
    if (page !== 'movie-player') setActiveMovie(null);
    setCurrentPage(page);
  };

  if (!user) {
    return <AuthModal onAuth={handleAuth} />;
  }

  const plotTest = activeMovie
    ? tests.find(t => t.movieId === activeMovie.id && t.type === 'plot')
    : undefined;

  return (
    <div className="min-h-screen bg-background">
      {currentPage !== 'movie-player' && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          user={user}
          onAbout={() => setShowAbout(true)}
        />
      )}

      <main>
        {currentPage === 'home' && (
          <HomePage
            user={user}
            movies={movies}
            onNavigate={handleNavigate}
            onOpenMovie={handleOpenMovie}
          />
        )}
        {currentPage === 'movies' && (
          <MoviesPage movies={movies} onOpenMovie={handleOpenMovie} />
        )}
        {currentPage === 'tests' && (
          <TestsPage
            tests={tests}
            watchedMovieIds={watchedMovieIds}
            onTestComplete={handleTestComplete}
          />
        )}
        {currentPage === 'dictionary' && (
          <DictionaryPage words={dictionary} onToggleLearned={handleToggleLearned} />
        )}
        {currentPage === 'profile' && (
          <ProfilePage user={user} movies={movies} words={dictionary} onLogout={handleLogout} />
        )}
        {currentPage === 'movie-player' && activeMovie && (
          <MoviePlayerPage
            movie={activeMovie}
            onBack={() => handleNavigate('movies')}
            onAddWord={handleAddWord}
            onTestPassed={handleTestPassed}
            plotTest={plotTest}
          />
        )}
      </main>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </div>
  );
}
