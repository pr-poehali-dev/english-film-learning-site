import { useState } from 'react';
import { DictionaryWord } from '@/types';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import WordCheckModal from '@/components/WordCheckModal';

interface DictionaryPageProps {
  words: DictionaryWord[];
  onToggleLearned: (id: number) => void;
}

export default function DictionaryPage({ words, onToggleLearned }: DictionaryPageProps) {
  const [search, setSearch] = useState('');
  const [showCheck, setShowCheck] = useState(false);

  const filtered = words.filter(
    w => w.word.toLowerCase().includes(search.toLowerCase()) ||
      w.translation.toLowerCase().includes(search.toLowerCase())
  );

  const unlearnedWords = words.filter(w => !w.learned);

  return (
    <div className="min-h-screen pb-20 md:pb-8 max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-golos mb-1">Мой словарь</h1>
          <p className="text-muted-foreground text-sm">
            {words.length} слов · {words.filter(w => w.learned).length} изучено
          </p>
        </div>
        {unlearnedWords.length >= 2 && (
          <Button onClick={() => setShowCheck(true)} size="sm">
            <Icon name="Brain" size={14} className="mr-1.5" />
            Проверить
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-2xl border border-border p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{words.length}</div>
          <div className="text-muted-foreground text-xs mt-0.5">всего слов</div>
        </div>
        <div className="bg-white rounded-2xl border border-border p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{words.filter(w => w.learned).length}</div>
          <div className="text-muted-foreground text-xs mt-0.5">изучено</div>
        </div>
        <div className="bg-white rounded-2xl border border-border p-4 text-center">
          <div className="text-2xl font-bold text-orange-500">{words.filter(w => !w.learned).length}</div>
          <div className="text-muted-foreground text-xs mt-0.5">в процессе</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Поиск по словам..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 h-10"
        />
      </div>

      {/* Words list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          {words.length === 0 ? (
            <>
              <Icon name="BookMarked" size={40} className="text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Словарь пуст</h3>
              <p className="text-muted-foreground text-sm">Нажимай на слова в субтитрах во время просмотра фильма</p>
            </>
          ) : (
            <>
              <Icon name="SearchX" size={40} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Ничего не найдено</p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((word, i) => (
            <div
              key={word.id}
              className={`bg-white rounded-2xl border border-border p-4 flex items-center justify-between animate-fade-in ${word.learned ? 'opacity-70' : ''}`}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onToggleLearned(word.id)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    word.learned
                      ? 'border-green-500 bg-green-500'
                      : 'border-border hover:border-green-400'
                  }`}
                >
                  {word.learned && <Icon name="Check" size={14} className="text-white" />}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-sm ${word.learned ? 'line-through text-muted-foreground' : ''}`}>
                      {word.word}
                    </span>
                    <span className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded-md">
                      {word.partOfSpeech}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{word.translation}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">из «{word.movieTitle}»</p>
                </div>
              </div>
              <div className="text-muted-foreground text-xs text-right">
                {word.addedAt}
              </div>
            </div>
          ))}
        </div>
      )}

      {showCheck && unlearnedWords.length >= 2 && (
        <WordCheckModal words={unlearnedWords} onClose={() => setShowCheck(false)} />
      )}
    </div>
  );
}
