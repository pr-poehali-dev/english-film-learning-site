import { useState } from 'react';
import { DictionaryWord } from '@/types';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface WordCheckModalProps {
  words: DictionaryWord[];
  onClose: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function WordCheckModal({ words, onClose }: WordCheckModalProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const word = words[current];
  const wrong = words.filter(w => w.word !== word.word);
  const wrongOption = shuffle(wrong)[0];
  const options = shuffle([word.translation, wrongOption?.translation || 'неизвестно']);

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === word.translation) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 < words.length) {
      setCurrent(c => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm animate-scale-in">
        {!finished ? (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm font-medium text-muted-foreground">Проверка слов {current + 1}/{words.length}</p>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={18} />
              </button>
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔤</span>
              </div>
              <h2 className="text-2xl font-bold font-golos">{word.word}</h2>
              <p className="text-muted-foreground text-xs mt-1">{word.partOfSpeech} · из «{word.movieTitle}»</p>
            </div>

            <p className="text-center text-sm text-muted-foreground mb-4">Выбери правильный перевод:</p>

            <div className="space-y-3">
              {options.map((opt, i) => {
                let cls = 'border-border hover:border-primary hover:bg-primary/5 text-foreground';
                if (selected) {
                  if (opt === word.translation) cls = 'border-green-500 bg-green-50 text-green-700';
                  else if (opt === selected) cls = 'border-red-400 bg-red-50 text-red-600';
                  else cls = 'border-border text-muted-foreground';
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt)}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {selected && (
              <Button className="w-full mt-5" onClick={handleNext}>
                {current + 1 < words.length ? 'Следующее слово' : 'Завершить'}
              </Button>
            )}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="text-4xl mb-4">{score === words.length ? '🏆' : '📚'}</div>
            <h3 className="text-xl font-bold font-golos mb-2">
              {score === words.length ? 'Отлично!' : 'Продолжай учиться!'}
            </h3>
            <p className="text-muted-foreground mb-1">Правильно: <strong className="text-foreground">{score} из {words.length}</strong></p>
            <p className="text-2xl font-bold text-primary mb-6">{Math.round(score / words.length * 100)}%</p>
            <Button className="w-full" onClick={onClose}>Закрыть</Button>
          </div>
        )}
      </div>
    </div>
  );
}
