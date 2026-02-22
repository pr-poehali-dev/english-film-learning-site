import { useState } from 'react';
import { Test } from '@/types';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface TestModalProps {
  test: Test;
  onClose: (passed: boolean) => void;
}

export default function TestModal({ test, onClose }: TestModalProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const q = test.questions[current];
  const score = answers.filter((a, i) => a === test.questions[i].correct).length;
  const total = test.questions.length;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);

    if (current + 1 < test.questions.length) {
      setCurrent(c => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const typeLabel = {
    plot: 'Понимание сюжета',
    grammar: 'Грамматика',
    speech: 'Развитие речи',
  }[test.type];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-scale-in">
        {!finished ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <p className="text-xs text-muted-foreground font-medium">{typeLabel}</p>
                <p className="text-sm font-semibold truncate max-w-[240px]">{test.movieTitle}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{current + 1}/{total}</span>
                <button onClick={() => onClose(false)} className="text-muted-foreground hover:text-foreground">
                  <Icon name="X" size={18} />
                </button>
              </div>
            </div>

            {/* Progress */}
            <div className="h-1 bg-secondary">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((current) / total) * 100}%` }}
              />
            </div>

            {/* Question */}
            <div className="p-6">
              <h3 className="font-semibold text-base mb-5 leading-relaxed">{q.text}</h3>
              <div className="space-y-3">
                {q.options.map((opt, idx) => {
                  let cls = 'border-border text-foreground hover:border-primary hover:bg-primary/5';
                  if (selected !== null) {
                    if (idx === q.correct) cls = 'border-green-500 bg-green-50 text-green-700';
                    else if (idx === selected && selected !== q.correct) cls = 'border-red-400 bg-red-50 text-red-600';
                    else cls = 'border-border text-muted-foreground';
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium ${cls}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              <Button
                className="w-full mt-6"
                onClick={handleNext}
                disabled={selected === null}
              >
                {current + 1 < total ? 'Следующий вопрос' : 'Завершить тест'}
              </Button>
            </div>
          </>
        ) : (
          <div className="p-8 text-center animate-scale-in">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${score >= total * 0.7 ? 'bg-green-100' : 'bg-orange-100'}`}>
              <Icon name={score >= total * 0.7 ? 'Trophy' : 'RefreshCw'} size={28} className={score >= total * 0.7 ? 'text-green-600' : 'text-orange-500'} />
            </div>
            <h3 className="text-xl font-bold font-golos mb-2">
              {score >= total * 0.7 ? 'Отличный результат!' : 'Неплохо, но можно лучше!'}
            </h3>
            <p className="text-muted-foreground mb-1">
              Правильных ответов: <strong className="text-foreground">{score} из {total}</strong>
            </p>
            <p className="text-2xl font-bold text-primary mb-6">{Math.round(score / total * 100)}%</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => onClose(false)}>
                Закрыть
              </Button>
              <Button className="flex-1" onClick={() => onClose(score >= total * 0.7)}>
                {score >= total * 0.7 ? 'Готово!' : 'Попробовать снова'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
