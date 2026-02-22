import { useState } from 'react';
import { Test } from '@/types';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import TestModal from '@/components/TestModal';

interface TestsPageProps {
  tests: Test[];
  watchedMovieIds: number[];
  onTestComplete: (testId: number) => void;
}

export default function TestsPage({ tests, watchedMovieIds, onTestComplete }: TestsPageProps) {
  const [activeType, setActiveType] = useState<'grammar' | 'speech'>('grammar');
  const [activeTest, setActiveTest] = useState<Test | null>(null);

  const availableTests = tests.filter(
    t => t.type === activeType && watchedMovieIds.includes(t.movieId)
  );

  const handleClose = (passed: boolean) => {
    if (passed && activeTest) {
      onTestComplete(activeTest.id);
    }
    setActiveTest(null);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-golos mb-1">Тесты</h1>
        <p className="text-muted-foreground text-sm">Проверяй знания грамматики и развивай речь</p>
      </div>

      {/* Type selector */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <button
          onClick={() => setActiveType('grammar')}
          className={`rounded-2xl border-2 p-5 text-left transition-all ${
            activeType === 'grammar'
              ? 'border-primary bg-primary/5'
              : 'border-border bg-white hover:border-primary/40'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${activeType === 'grammar' ? 'bg-primary' : 'bg-secondary'}`}>
            <Icon name="BookOpen" size={20} className={activeType === 'grammar' ? 'text-white' : 'text-muted-foreground'} />
          </div>
          <h3 className="font-semibold mb-1">Грамматика</h3>
          <p className="text-muted-foreground text-xs">Закрепляй грамматические конструкции из просмотренных фильмов</p>
        </button>

        <button
          onClick={() => setActiveType('speech')}
          className={`rounded-2xl border-2 p-5 text-left transition-all ${
            activeType === 'speech'
              ? 'border-primary bg-primary/5'
              : 'border-border bg-white hover:border-primary/40'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${activeType === 'speech' ? 'bg-primary' : 'bg-secondary'}`}>
            <Icon name="MessageSquare" size={20} className={activeType === 'speech' ? 'text-white' : 'text-muted-foreground'} />
          </div>
          <h3 className="font-semibold mb-1">Развитие речи</h3>
          <p className="text-muted-foreground text-xs">Учись выражать мысли и понимать контекст разговора</p>
        </button>
      </div>

      {/* Tests list */}
      <div>
        <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
          {activeType === 'grammar' ? 'Тесты на грамматику' : 'Тесты на развитие речи'}
          <span className="bg-secondary text-muted-foreground text-xs px-2 py-0.5 rounded-full font-normal">
            {availableTests.length}
          </span>
        </h2>

        {availableTests.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border p-10 text-center">
            <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Film" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Нет доступных тестов</h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              Посмотри фильм и пройди тест на понимание сюжета — тогда здесь появятся тесты на грамматику и речь
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {availableTests.map(test => (
              <div key={test.id} className="bg-white rounded-2xl border border-border p-5 flex items-center justify-between card-hover">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${test.completed ? 'bg-green-100' : 'bg-secondary'}`}>
                    <Icon
                      name={test.completed ? 'CheckCircle' : 'Circle'}
                      size={20}
                      className={test.completed ? 'text-green-600' : 'text-muted-foreground'}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{test.movieTitle}</h3>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {test.questions.length} вопросов · {test.completed ? 'Пройден' : 'Не пройден'}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={test.completed ? 'outline' : 'default'}
                  onClick={() => setActiveTest(test)}
                >
                  {test.completed ? 'Повторить' : 'Начать'}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {activeTest && (
        <TestModal test={activeTest} onClose={handleClose} />
      )}
    </div>
  );
}
