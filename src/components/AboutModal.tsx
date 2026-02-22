import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface AboutModalProps {
  onClose: () => void;
}

export default function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="Film" size={18} className="text-white" />
            </div>
            <h2 className="font-bold text-lg font-golos">О сайте</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <Icon name="X" size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">CineEnglish</strong> — это образовательная платформа для изучения английского языка через просмотр фильмов. Мы верим, что лучший способ выучить язык — это погрузиться в реальную речь.
          </p>

          <div className="space-y-3">
            {[
              { icon: 'Film', title: 'Смотри фильмы', desc: 'Каталог фильмов разных жанров и уровней сложности' },
              { icon: 'MousePointer', title: 'Интерактивные субтитры', desc: 'Нажимай на незнакомые слова и получай перевод' },
              { icon: 'BookMarked', title: 'Личный словарь', desc: 'Сохраняй слова и проверяй знания в мини-тестах' },
              { icon: 'Trophy', title: 'Система тестов', desc: 'Тесты на сюжет, грамматику и развитие речи' },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name={item.icon} size={16} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-muted-foreground text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-secondary rounded-xl p-4">
            <p className="text-xs text-muted-foreground text-center">
              Версия 1.0 · Разработано с ❤️ для изучающих английский
            </p>
          </div>
        </div>

        <div className="p-5 pt-0">
          <Button className="w-full" onClick={onClose}>Понятно</Button>
        </div>
      </div>
    </div>
  );
}
