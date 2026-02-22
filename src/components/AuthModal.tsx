import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface AuthModalProps {
  onAuth: (name: string, email: string) => void;
  onClose?: () => void;
  standalone?: boolean;
}

export default function AuthModal({ onAuth, onClose, standalone = true }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = mode === 'register' ? name : email.split('@')[0];
    onAuth(displayName || 'Пользователь', email);
  };

  const modal = (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-scale-in relative">
      {onClose && (
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <Icon name="X" size={20} />
        </button>
      )}

      <div className="text-center mb-6">
        <h2 className="text-lg font-bold text-foreground font-golos">
          Чтобы начать обучение, войдите в аккаунт или зарегистрируйтесь
        </h2>
        <p className="text-muted-foreground text-sm mt-2">
          Перед началом обучения рекомендуем ознакомиться с сайтом.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <div className="space-y-2 animate-fade-in">
            <Label htmlFor="name" className="text-sm font-medium">Имя</Label>
            <Input id="name" placeholder="Александр" value={name} onChange={e => setName(e.target.value)} className="h-11" required />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email</Label>
          <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className="h-11" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">Пароль</Label>
          <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="h-11" required />
        </div>

        <Button type="submit" className="w-full h-11 text-base font-medium rounded-full" style={{ backgroundColor: '#d98c8c', color: 'white' }}>
          {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
        </Button>
      </form>

      <button
        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        className="w-full text-center text-sm text-muted-foreground mt-4 hover:text-foreground transition-colors"
      >
        {mode === 'login' ? 'Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
      </button>
    </div>
  );

  if (!standalone) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={e => { if (e.target === e.currentTarget && onClose) onClose(); }}>
        {modal}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {modal}
    </div>
  );
}
