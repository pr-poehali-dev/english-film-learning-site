import { User, Movie, DictionaryWord } from '@/types';
import Icon from '@/components/ui/icon';

interface ProfilePageProps {
  user: User;
  movies: Movie[];
  words: DictionaryWord[];
  onLogout: () => void;
}

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function ProfilePage({ user, movies, words, onLogout }: ProfilePageProps) {
  const watchedMovies = movies.filter(m => m.watched);
  const learnedWords = words.filter(w => w.learned);

  const stats = [
    { icon: 'Flame', label: 'Дней подряд', value: user.streak, color: 'text-orange-500', bg: 'bg-orange-50' },
    { icon: 'Film', label: 'Фильмов просмотрено', value: watchedMovies.length, color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: 'Trophy', label: 'Тестов пройдено', value: user.tasksCompleted, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { icon: 'BookMarked', label: 'Слов добавлено', value: words.length, color: 'text-green-600', bg: 'bg-green-50' },
    { icon: 'CheckCircle', label: 'Слов изучено', value: learnedWords.length, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-8 max-w-3xl mx-auto px-4 py-6">
      {/* Profile header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-bold">
            {user.name[0]}
          </div>
          <div>
            <h1 className="text-xl font-bold font-golos">{user.name}</h1>
            <p className="text-blue-200 text-sm">{user.email}</p>
            <div className="flex items-center gap-1 mt-1">
              <Icon name="Calendar" size={12} className="text-blue-300" />
              <span className="text-blue-300 text-xs">На сайте с {new Date(user.joinedAt).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Streak */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-blue-200 text-xs font-semibold uppercase tracking-wide">Streak этой недели</p>
            <div className="flex items-center gap-1">
              <Icon name="Flame" size={14} className="text-orange-300" />
              <span className="text-white text-sm font-semibold">{user.streak} дней</span>
            </div>
          </div>
          <div className="flex gap-1.5">
            {daysOfWeek.map((day, i) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <div className={`w-full h-1.5 rounded-full ${i < user.streak % 7 ? 'bg-orange-400' : 'bg-white/20'}`} />
                <span className="text-[10px] text-blue-300">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6">
        <h2 className="text-base font-semibold mb-3">Статистика</h2>
        <div className="grid grid-cols-2 gap-3">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-border p-4 flex items-center gap-3">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                <Icon name={s.icon} size={20} className={s.color} />
              </div>
              <div>
                <div className="text-xl font-bold">{s.value}</div>
                <div className="text-muted-foreground text-xs leading-tight">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Watched movies */}
      {watchedMovies.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-semibold mb-3">Просмотренные фильмы</h2>
          <div className="space-y-2">
            {watchedMovies.map(m => (
              <div key={m.id} className="bg-white rounded-2xl border border-border p-4 flex items-center gap-4">
                <img src={m.poster} alt={m.title} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{m.title}</h3>
                  <p className="text-muted-foreground text-xs">{m.titleRu} · {m.level}</p>
                </div>
                {m.testPassed && (
                  <div className="flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded-lg">
                    <Icon name="CheckCircle" size={12} />
                    Тест пройден
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-border text-muted-foreground hover:border-red-300 hover:text-red-500 transition-all text-sm font-medium"
      >
        <Icon name="LogOut" size={16} />
        Выйти из аккаунта
      </button>
    </div>
  );
}
