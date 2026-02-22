import { Page } from '@/types';
import { User } from '@/types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  user: User | null;
  onAbout: () => void;
  onLogin?: () => void;
}

const navItems: { id: Page; label: string }[] = [
  { id: 'movies', label: 'Фильмы' },
  { id: 'dictionary', label: 'Словарь' },
  { id: 'tests', label: 'Тесты' },
];

export default function Navbar({ currentPage, onNavigate, user, onAbout, onLogin }: NavbarProps) {
  return (
    <>
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-40 h-14 items-center px-8" style={{ backgroundColor: '#f3e5e5' }}>
        <button onClick={() => onNavigate('home')} className="font-bold text-lg font-golos text-foreground mr-8 tracking-tight">
          EngFil
        </button>

        <nav className="flex items-center gap-6 flex-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-sm transition-colors ${
                currentPage === item.id
                  ? 'text-foreground font-semibold'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
          {user && (
            <button
              onClick={() => onNavigate('profile')}
              className={`text-sm transition-colors ${
                currentPage === 'profile'
                  ? 'text-foreground font-semibold'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              Профиль
            </button>
          )}
        </nav>

        <div className="flex items-center gap-6">
          <button onClick={onAbout} className="text-sm text-foreground/70 hover:text-foreground transition-colors">
            О сайте
          </button>
          {user ? (
            <button
              onClick={() => onNavigate('profile')}
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              {user.name.substring(0, 2).toLowerCase()}
            </button>
          ) : (
            <button onClick={onLogin} className="text-sm text-foreground/70 hover:text-foreground transition-colors">
              Вход
            </button>
          )}
        </div>
      </header>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border h-14 flex items-center justify-around px-2" style={{ backgroundColor: '#f3e5e5' }}>
        <button onClick={() => onNavigate('home')} className={`text-xs font-medium px-3 py-2 ${currentPage === 'home' ? 'text-foreground font-bold' : 'text-foreground/60'}`}>
          EngFil
        </button>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`text-xs font-medium px-3 py-2 ${currentPage === item.id ? 'text-foreground font-bold' : 'text-foreground/60'}`}
          >
            {item.label}
          </button>
        ))}
        {user ? (
          <button onClick={() => onNavigate('profile')} className={`text-xs font-medium px-3 py-2 ${currentPage === 'profile' ? 'text-foreground font-bold' : 'text-foreground/60'}`}>
            Профиль
          </button>
        ) : (
          <button onClick={onLogin} className="text-xs font-medium px-3 py-2 text-foreground/60">
            Вход
          </button>
        )}
      </nav>

      <div className="hidden md:block h-14" />
    </>
  );
}