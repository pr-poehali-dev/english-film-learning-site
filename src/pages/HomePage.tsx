import { User, Movie } from '@/types';
import { Page } from '@/types';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface HomePageProps {
  user: User;
  movies: Movie[];
  onNavigate: (page: Page) => void;
  onOpenMovie: (movie: Movie) => void;
}

const features = [
  { icon: 'Film', title: 'Учись по фильмам', desc: 'Смотри настоящее кино на английском с интерактивными субтитрами' },
  { icon: 'MousePointer', title: 'Кликай на слова', desc: 'Нажми на любое слово в субтитрах — получи перевод мгновенно' },
  { icon: 'BookMarked', title: 'Личный словарь', desc: 'Сохраняй слова в словарь и проверяй знания в любое время' },
  { icon: 'Trophy', title: 'Тесты и прогресс', desc: 'Проходи тесты на понимание сюжета, грамматику и развитие речи' },
];

export default function HomePage({ user, movies, onNavigate, onOpenMovie }: HomePageProps) {
  const recentMovie = movies.find(m => !m.watched) || movies[0];
  const watchedCount = movies.filter(m => m.watched).length;

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-200 text-sm font-medium mb-2 animate-fade-in">Привет, {user.name} 👋</p>
          <h1 className="text-3xl md:text-5xl font-bold font-golos mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Учи английский<br />через любимые фильмы
          </h1>
          <p className="text-blue-100 text-base md:text-lg mb-8 max-w-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Интерактивные субтитры, личный словарь и тесты — всё что нужно для прогресса
          </p>
          <div className="flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button onClick={() => onNavigate('movies')} size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold">
              <Icon name="Play" size={18} className="mr-2" />
              Начать смотреть
            </Button>
            <Button onClick={() => onNavigate('tests')} variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Пройти тест
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div>
              <div className="text-2xl font-bold">{user.streak}</div>
              <div className="text-blue-200 text-xs">дней подряд 🔥</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{watchedCount}</div>
              <div className="text-blue-200 text-xs">просмотрено</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{user.wordsAdded}</div>
              <div className="text-blue-200 text-xs">слов в словаре</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{user.tasksCompleted}</div>
              <div className="text-blue-200 text-xs">тестов пройдено</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-12">
        {/* Continue watching */}
        {recentMovie && (
          <section className="animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold font-golos">Продолжить обучение</h2>
              <button onClick={() => onNavigate('movies')} className="text-primary text-sm font-medium hover:underline">
                Все фильмы →
              </button>
            </div>
            <div
              className="bg-white rounded-2xl border border-border overflow-hidden flex flex-col md:flex-row cursor-pointer card-hover"
              onClick={() => onOpenMovie(recentMovie)}
            >
              <img
                src={recentMovie.poster}
                alt={recentMovie.title}
                className="w-full md:w-48 h-40 md:h-auto object-cover"
              />
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-md">{recentMovie.level}</span>
                    <span className="text-muted-foreground text-xs">{recentMovie.genre.join(', ')}</span>
                  </div>
                  <h3 className="font-bold text-lg">{recentMovie.title}</h3>
                  <p className="text-muted-foreground text-sm">{recentMovie.titleRu}, {recentMovie.year}</p>
                  <p className="text-sm mt-2 line-clamp-2">{recentMovie.description}</p>
                </div>
                <Button className="mt-4 w-fit" size="sm">
                  <Icon name="Play" size={14} className="mr-1.5" />
                  Смотреть
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Features */}
        <section>
          <h2 className="text-xl font-bold font-golos mb-6">Как это работает</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl border border-border p-5 flex gap-4 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name={f.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
