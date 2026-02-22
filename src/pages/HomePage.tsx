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
  {
    icon: 'Globe',
    title: 'Английский в мире',
    desc: 'Фильмы дают возможность услышать живую, разговорную речь, сленг и идиомы, которые редко встречаются в учебниках.',
  },
  {
    icon: 'MessageSquare',
    title: 'Перевод слов и выражений',
    desc: 'Перевод доступен прямо в видеоплеере. Сразу же можно ознакомиться с вариантами перевода.',
  },
  {
    icon: 'Volume2',
    title: 'Навыки восприятия речи',
    desc: 'Просмотр фильмов помогает привыкнуть к звучанию языка, различным акцентам и манере речи.',
  },
  {
    icon: 'BookOpen',
    title: 'Богатый словарный запас',
    desc: 'Во время просмотра добавляйте незнакомые слова и фразы в личный словарь для дальнейшего изучения.',
  },
  {
    icon: 'GraduationCap',
    title: 'Знание грамматики',
    desc: 'После просмотра фильма Вы сможете практиковать грамматику в заданиях, основанных на пройденном материале.',
  },
];

const moviePosters = [
  'https://cdn.poehali.dev/files/ce28299f-e83f-4eb0-8f85-b72b8a05acba.JPG',
];

export default function HomePage({ user, movies, onNavigate, onOpenMovie }: HomePageProps) {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 rounded-full opacity-60 -translate-x-1/3 -translate-y-1/4" style={{ backgroundColor: '#d98c8c' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 md:w-[500px] md:h-[500px] rounded-full opacity-40 translate-x-1/4 translate-y-1/4" style={{ backgroundColor: '#d98c8c' }} />

        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 z-10">
            <h1 className="text-3xl md:text-5xl font-bold font-golos text-foreground mb-4 animate-fade-in leading-tight">
              EngFil - English<br />based on films
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Изучение английского языка по фильмам.
            </p>
            <Button
              onClick={() => onNavigate('movies')}
              className="rounded-full px-8 py-3 h-auto text-base font-semibold animate-fade-in"
              style={{ backgroundColor: '#d98c8c', color: 'white', animationDelay: '0.2s' }}
            >
              Начать обучение
            </Button>
          </div>

          <div className="flex-1 flex justify-center z-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-72 h-80 md:w-96 md:h-[420px]">
              {movies.slice(0, 5).map((movie, i) => {
                const rotations = [-12, -6, 0, 6, 12];
                const offsets = ['-20px', '-10px', '0px', '10px', '20px'];
                const zIndex = i === 2 ? 10 : 5 - Math.abs(i - 2);
                return (
                  <div
                    key={movie.id}
                    className="absolute top-1/2 left-1/2 w-36 h-52 md:w-44 md:h-64 rounded-xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-105 cursor-pointer"
                    style={{
                      transform: `translate(-50%, -50%) translateX(${offsets[i]}) rotate(${rotations[i]}deg)`,
                      zIndex,
                      marginLeft: `${(i - 2) * 30}px`,
                    }}
                    onClick={() => onOpenMovie(movie)}
                  >
                    <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute top-0 left-0 w-64 h-64 md:w-80 md:h-80 rounded-full opacity-40 -translate-x-1/3 translate-y-1/4" style={{ backgroundColor: '#d98c8c' }} />
        <div className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 rounded-full opacity-30 translate-x-1/4 -translate-y-1/4" style={{ backgroundColor: '#d98c8c' }} />

        <div className="relative max-w-5xl mx-auto px-6 z-10">
          <h2 className="text-2xl md:text-3xl font-bold font-golos text-foreground text-center mb-12">
            Специфика обучения английского языка на нашем сайте:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.slice(0, 4).map((f, i) => (
              <div
                key={f.title}
                className="rounded-2xl p-6 flex items-start gap-4 animate-fade-in"
                style={{ backgroundColor: '#f3e5e5', animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex-1">
                  <h3 className="font-bold text-base mb-2 text-foreground">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#d98c8c20' }}>
                  <Icon name={f.icon} size={20} className="text-foreground/60" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-5">
            <div
              className="rounded-2xl p-6 flex items-start gap-4 w-full md:w-[calc(50%-10px)] animate-fade-in"
              style={{ backgroundColor: '#f3e5e5', animationDelay: '0.4s' }}
            >
              <div className="flex-1">
                <h3 className="font-bold text-base mb-2 text-foreground">{features[4].title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{features[4].desc}</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#d98c8c20' }}>
                <Icon name={features[4].icon} size={20} className="text-foreground/60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-border">
        <p className="font-bold font-golos text-foreground text-base mb-1">EngFil</p>
        <p className="text-muted-foreground text-xs uppercase tracking-wider">EngFil. Created by K.V.V.</p>
      </footer>
    </div>
  );
}
