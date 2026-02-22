import Icon from '@/components/ui/icon';
import { User } from '@/types';
import { Page } from '@/types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  user: User;
  onAbout: () => void;
}

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'movies', label: 'Фильмы', icon: 'Film' },
  { id: 'tests', label: 'Тесты', icon: 'BookOpen' },
  { id: 'dictionary', label: 'Словарь', icon: 'BookMarked' },
  { id: 'profile', label: 'Профиль', icon: 'User' },
];

export default function Navbar({ currentPage, onNavigate, user, onAbout }: NavbarProps) {
  return (
    <>
      {/* Desktop top navbar */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-border h-16 items-center px-6">
        <div className="flex items-center gap-2 mr-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Film" size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg font-golos text-foreground">CineEnglish</span>
        </div>

        <nav className="flex items-center gap-1 flex-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === item.id
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onAbout}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            О сайте
          </button>
          <div className="flex items-center gap-2 bg-secondary rounded-full pl-3 pr-1 py-1">
            <span className="text-sm font-medium">{user.name}</span>
            <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{user.name[0]}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile bottom navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border h-16 flex items-center justify-around px-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              currentPage === item.id ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon name={item.icon} size={22} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Spacer for top navbar */}
      <div className="hidden md:block h-16" />
    </>
  );
}
