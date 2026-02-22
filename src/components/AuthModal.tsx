import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface AuthModalProps {
  onAuth: (name: string, email: string) => void;
}

export default function AuthModal({ onAuth }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = mode === 'register' ? name : email.split('@')[0];
    onAuth(displayName || 'Пользователь', email);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-scale-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-2xl mb-4">
            <Icon name="Film" size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground font-golos">CineEnglish</h1>
          <p className="text-muted-foreground text-sm mt-1">Учи английский через любимые фильмы</p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-muted p-1 mb-6">
          <button
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'login' ? 'bg-white shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setMode('login')}
          >
            Войти
          </button>
          <button
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'register' ? 'bg-white shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setMode('register')}
          >
            Регистрация
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-2 animate-fade-in">
              <Label htmlFor="name" className="text-sm font-medium">Имя</Label>
              <Input
                id="name"
                placeholder="Александр"
                value={name}
                onChange={e => setName(e.target.value)}
                className="h-11"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="h-11"
              required
            />
          </div>

          <Button type="submit" className="w-full h-11 text-base font-medium mt-2">
            {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Нажимая кнопку, вы соглашаетесь с условиями использования сервиса
        </p>
      </div>
    </div>
  );
}
