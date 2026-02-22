import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface AboutModalProps {
  onClose: () => void;
}

export default function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-bold text-lg font-golos">О сайте</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <Icon name="X" size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">EngFil</strong> — образовательная платформа для изучения английского языка через просмотр фильмов. Лучший способ выучить язык — погрузиться в реальную речь.
          </p>

          <div className="space-y-3">
            {[
              { icon: 'Globe', title: 'Английский в мире', desc: 'Живая речь, сленг и идиомы из реальных фильмов' },
              { icon: 'MessageSquare', title: 'Перевод слов', desc: 'Нажимай на незнакомые слова и получай перевод' },
              { icon: 'BookOpen', title: 'Личный словарь', desc: 'Сохраняй слова и проверяй знания в мини-тестах' },
              { icon: 'GraduationCap', title: 'Грамматика', desc: 'Задания на основе пройденного материала' },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#f3e5e5' }}>
                  <Icon name={item.icon} size={16} style={{ color: '#d98c8c' }} />
                </div>
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-muted-foreground text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-4" style={{ backgroundColor: '#f3e5e5' }}>
            <p className="text-xs text-muted-foreground text-center">
              EngFil. Created by K.V.V.
            </p>
          </div>
        </div>

        <div className="p-5 pt-0">
          <Button className="w-full rounded-full" style={{ backgroundColor: '#d98c8c' }} onClick={onClose}>Понятно</Button>
        </div>
      </div>
    </div>
  );
}
