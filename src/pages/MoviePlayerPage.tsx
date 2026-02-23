import { useState, useEffect } from 'react';
import { Movie, DictionaryWord, Test } from '@/types';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import TestModal from '@/components/TestModal';
import func2url from '../../backend/func2url.json';

interface MoviePlayerPageProps {
  movie: Movie;
  onBack: () => void;
  onAddWord: (word: DictionaryWord) => void;
  onTestPassed: (movieId: number) => void;
  plotTest: Test | undefined;
}

export default function MoviePlayerPage({ movie, onBack, onAddWord, onTestPassed, plotTest }: MoviePlayerPageProps) {
  const [selectedWord, setSelectedWord] = useState<{ word: string; translation: string; partOfSpeech: string } | null>(null);
  const [addedWords, setAddedWords] = useState<Set<string>>(new Set());
  const [showTest, setShowTest] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [subtitleUrl, setSubtitleUrl] = useState<string | null>(null);
  const [loadingMedia, setLoadingMedia] = useState(true);

  useEffect(() => {
    setLoadingMedia(true);
    fetch(`${func2url['get-movie-media']}?movieId=${movie.id}`)
      .then(r => r.json())
      .then(data => {
        setVideoUrl(data.videoUrl || null);
        setSubtitleUrl(data.subtitleUrl || null);
      })
      .catch(() => {})
      .finally(() => setLoadingMedia(false));
  }, [movie.id]);

  const handleWordClick = (w: { word: string; translation: string; partOfSpeech: string }) => {
    setSelectedWord(w);
  };

  const handleAddWord = () => {
    if (!selectedWord) return;
    const newWord: DictionaryWord = {
      id: Date.now(),
      word: selectedWord.word,
      translation: selectedWord.translation,
      partOfSpeech: selectedWord.partOfSpeech,
      movieTitle: movie.title,
      addedAt: new Date().toISOString().split('T')[0],
      learned: false,
    };
    onAddWord(newWord);
    setAddedWords(prev => new Set([...prev, selectedWord.word]));
    setSelectedWord(null);
  };

  const handleTestClose = (passed: boolean) => {
    setShowTest(false);
    if (passed) onTestPassed(movie.id);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 bg-gray-950">
      {/* Back button */}
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={onBack} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
          <Icon name="ArrowLeft" size={18} />
          <span className="text-sm">Назад</span>
        </button>
        <div className="flex-1" />
        <div>
          <h1 className="text-white font-semibold text-sm">{movie.title}</h1>
          <p className="text-white/50 text-xs">{movie.titleRu} · {movie.level}</p>
        </div>
      </div>

      {/* Video Player */}
      <div className="relative bg-black mx-4 rounded-2xl overflow-hidden mb-4 aspect-video flex items-center justify-center">
        {loadingMedia ? (
          <div className="flex flex-col items-center gap-3">
            <Icon name="Loader2" size={32} className="text-white/40 animate-spin" />
          </div>
        ) : videoUrl ? (
          <video
            src={videoUrl}
            controls
            className="w-full h-full object-contain"
            crossOrigin="anonymous"
          >
            {subtitleUrl && <track kind="subtitles" src={subtitleUrl} srcLang="en" label="English" default />}
            Ваш браузер не поддерживает видео.
          </video>
        ) : (
          <>
            <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                <Icon name="Play" size={28} className="text-white ml-1" />
              </div>
              <p className="text-white/60 text-sm">Видео скоро появится</p>
            </div>
          </>
        )}

        {/* Subtitle overlay — только если нет нативного плеера */}
        {!videoUrl && !loadingMedia && movie.subtitles.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <div className="inline-block bg-black/75 rounded-lg px-4 py-2">
              <p className="text-white text-sm">
                {movie.subtitles[currentSubtitle]?.text.split(' ').map((w, i) => {
                  const wordData = movie.subtitles[currentSubtitle]?.words.find(
                    ww => ww.word.toLowerCase() === w.toLowerCase().replace(/[.,!?'"]/g, '')
                  );
                  if (wordData) {
                    return (
                      <span key={i} onClick={() => handleWordClick(wordData)} className="subtitle-word">
                        {w}{' '}
                      </span>
                    );
                  }
                  return <span key={i}>{w} </span>;
                })}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Subtitle navigation */}
      {movie.subtitles.length > 0 && (
        <div className="mx-4 mb-4">
          <div className="bg-gray-900 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wide">Субтитры</p>
              <p className="text-white/40 text-xs">{currentSubtitle + 1} / {movie.subtitles.length}</p>
            </div>
            <div className="space-y-2">
              {movie.subtitles.map((sub, i) => (
                <div
                  key={sub.id}
                  onClick={() => setCurrentSubtitle(i)}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${i === currentSubtitle ? 'bg-primary/20 border border-primary/30' : 'hover:bg-white/5'}`}
                >
                  <p className="text-white/90 text-sm leading-relaxed">
                    {sub.text.split(' ').map((w, wi) => {
                      const wordData = sub.words.find(
                        ww => ww.word.toLowerCase() === w.toLowerCase().replace(/[.,!?'"]/g, '')
                      );
                      if (wordData) {
                        return (
                          <span
                            key={wi}
                            onClick={e => { e.stopPropagation(); handleWordClick(wordData); }}
                            className={`cursor-pointer rounded px-0.5 transition-colors ${addedWords.has(wordData.word) ? 'text-green-400' : 'text-rose-300 hover:bg-rose-400/20'}`}
                          >
                            {w}{' '}
                          </span>
                        );
                      }
                      return <span key={wi} className="text-white/70">{w} </span>;
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Word popup */}
      {selectedWord && (
        <div className="fixed bottom-24 md:bottom-8 left-4 right-4 z-30 animate-slide-up">
          <div className="bg-white rounded-2xl shadow-2xl p-5 max-w-sm mx-auto">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg">{selectedWord.word}</h3>
                <p className="text-muted-foreground text-sm">{selectedWord.partOfSpeech}</p>
              </div>
              <button onClick={() => setSelectedWord(null)} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={18} />
              </button>
            </div>
            <p className="text-foreground font-medium mb-4">{selectedWord.translation}</p>
            <Button
              onClick={handleAddWord}
              disabled={addedWords.has(selectedWord.word)}
              className="w-full"
              size="sm"
            >
              {addedWords.has(selectedWord.word) ? (
                <><Icon name="Check" size={14} className="mr-1.5" />Добавлено в словарь</>
              ) : (
                <><Icon name="Plus" size={14} className="mr-1.5" />Добавить в словарь</>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Test button */}
      {plotTest && (
        <div className="mx-4">
          <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-white font-semibold">Тест на понимание</p>
              <p className="text-rose-200 text-sm mt-0.5">Проверь, как ты усвоил сюжет</p>
            </div>
            <Button
              onClick={() => setShowTest(true)}
              className="bg-white text-rose-600 hover:bg-rose-50 font-semibold shrink-0"
            >
              Пройти
            </Button>
          </div>
        </div>
      )}

      {showTest && plotTest && (
        <TestModal test={plotTest} onClose={handleTestClose} />
      )}
    </div>
  );
}
