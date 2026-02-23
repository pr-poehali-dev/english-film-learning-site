import { useState, useRef, useEffect } from 'react';
import { mockMovies } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import func2url from '../../backend/func2url.json';

interface MediaStatus {
  videoUrl: string | null;
  subtitleUrl: string | null;
}

type UploadMode = 'url' | 'file';

export default function AdminPage() {
  const [selectedMovieId, setSelectedMovieId] = useState<number>(mockMovies[0].id);
  const [mediaMap, setMediaMap] = useState<Record<number, MediaStatus>>({});
  const [mode, setMode] = useState<UploadMode>('url');

  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [subtitleUrlInput, setSubtitleUrlInput] = useState('');
  const [subtitleFile, setSubtitleFile] = useState<File | null>(null);
  const subRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

  useEffect(() => {
    fetch(func2url['get-movie-media'])
      .then(r => r.json())
      .then(data => setMediaMap(data))
      .catch(() => {});
  }, []);

  const currentMedia = mediaMap[selectedMovieId];

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSave = async () => {
    const hasVideo = mode === 'url' && videoUrlInput.trim();
    const hasSubUrl = mode === 'url' && subtitleUrlInput.trim();
    const hasSubFile = mode === 'file' && subtitleFile;

    if (!hasVideo && !hasSubUrl && !hasSubFile) {
      setMessage({ text: 'Заполни хотя бы одно поле', ok: false });
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const body: Record<string, string | number> = { movieId: selectedMovieId };

      if (mode === 'url') {
        if (videoUrlInput.trim()) body.videoUrl = videoUrlInput.trim();
        if (subtitleUrlInput.trim()) body.subtitleUrl = subtitleUrlInput.trim();
      } else {
        if (subtitleFile) {
          body.subtitleFile = await toBase64(subtitleFile);
          body.subtitleFilename = subtitleFile.name;
        }
      }

      const res = await fetch(func2url['save-movie-media'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка');

      setMediaMap(prev => ({
        ...prev,
        [selectedMovieId]: {
          videoUrl: data.videoUrl ?? prev[selectedMovieId]?.videoUrl ?? null,
          subtitleUrl: data.subtitleUrl ?? prev[selectedMovieId]?.subtitleUrl ?? null,
        },
      }));
      setVideoUrlInput('');
      setSubtitleUrlInput('');
      setSubtitleFile(null);
      if (subRef.current) subRef.current.value = '';
      setMessage({ text: 'Сохранено!', ok: true });
    } catch (e: unknown) {
      setMessage({ text: e instanceof Error ? e.message : 'Ошибка', ok: false });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Icon name="Settings" size={22} className="text-rose-400" />
        <h1 className="text-xl font-bold">Управление медиа</h1>
      </div>

      <div className="mb-6">
        <label className="text-white/60 text-sm mb-2 block">Фильм</label>
        <select
          value={selectedMovieId}
          onChange={e => {
            setSelectedMovieId(Number(e.target.value));
            setMessage(null);
            setVideoUrlInput('');
            setSubtitleUrlInput('');
            setSubtitleFile(null);
          }}
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500"
        >
          {mockMovies.map(m => (
            <option key={m.id} value={m.id}>{m.title} — {m.titleRu}</option>
          ))}
        </select>
      </div>

      {/* Current status */}
      <div className="bg-gray-900 rounded-2xl p-4 mb-6 space-y-2">
        <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-3">Текущее состояние</p>
        <div className="flex items-center gap-2">
          <Icon name={currentMedia?.videoUrl ? 'CheckCircle' : 'Circle'} size={16} className={currentMedia?.videoUrl ? 'text-green-400' : 'text-white/30'} />
          <span className="text-sm text-white/70">Видео</span>
          {currentMedia?.videoUrl && (
            <span className="text-xs text-green-400 ml-auto truncate max-w-xs">{currentMedia.videoUrl.replace(/^https?:\/\//, '').substring(0, 50)}…</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Icon name={currentMedia?.subtitleUrl ? 'CheckCircle' : 'Circle'} size={16} className={currentMedia?.subtitleUrl ? 'text-green-400' : 'text-white/30'} />
          <span className="text-sm text-white/70">Субтитры</span>
          {currentMedia?.subtitleUrl && (
            <span className="text-xs text-green-400 ml-auto truncate max-w-xs">{currentMedia.subtitleUrl.split('/').pop()}</span>
          )}
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex bg-gray-900 rounded-xl p-1 mb-5">
        <button
          onClick={() => setMode('url')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'url' ? 'bg-rose-600 text-white' : 'text-white/50 hover:text-white'}`}
        >
          По ссылке
        </button>
        <button
          onClick={() => setMode('file')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'file' ? 'bg-rose-600 text-white' : 'text-white/50 hover:text-white'}`}
        >
          Файл субтитров
        </button>
      </div>

      {mode === 'url' ? (
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-white/60 text-sm mb-1.5 block">Ссылка на видео</label>
            <input
              type="url"
              value={videoUrlInput}
              onChange={e => setVideoUrlInput(e.target.value)}
              placeholder="https://…/movie.mp4"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-rose-500 text-sm"
            />
            <p className="text-white/30 text-xs mt-1">Прямая ссылка на MP4/WebM файл с любого хостинга</p>
          </div>
          <div>
            <label className="text-white/60 text-sm mb-1.5 block">Ссылка на субтитры</label>
            <input
              type="url"
              value={subtitleUrlInput}
              onChange={e => setSubtitleUrlInput(e.target.value)}
              placeholder="https://…/subs.vtt"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-rose-500 text-sm"
            />
            <p className="text-white/30 text-xs mt-1">Прямая ссылка на VTT или SRT файл</p>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <div
            onClick={() => subRef.current?.click()}
            className="border-2 border-dashed border-gray-700 hover:border-rose-500 rounded-2xl p-5 cursor-pointer transition-colors"
          >
            <input ref={subRef} type="file" accept=".srt,.vtt" className="hidden" onChange={e => setSubtitleFile(e.target.files?.[0] || null)} />
            <div className="flex items-center gap-3">
              <Icon name="AlignLeft" size={20} className="text-rose-400 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">{subtitleFile ? subtitleFile.name : 'Нажми, чтобы выбрать файл субтитров'}</p>
                <p className="text-white/40 text-xs mt-0.5">SRT или VTT</p>
              </div>
              {subtitleFile && (
                <Icon name="X" size={16} className="text-white/40" onClick={e => { e.stopPropagation(); setSubtitleFile(null); if (subRef.current) subRef.current.value = ''; }} />
              )}
            </div>
          </div>
          <p className="text-white/30 text-xs mt-2 text-center">Для видео — используй вкладку "По ссылке": файлы слишком большие для прямой загрузки</p>
        </div>
      )}

      {message && (
        <div className={`rounded-xl px-4 py-3 text-sm mb-4 ${message.ok ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {message.text}
        </div>
      )}

      <Button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-rose-600 hover:bg-rose-500 text-white font-semibold py-3"
      >
        {saving
          ? <><Icon name="Loader2" size={16} className="mr-2 animate-spin" />Сохраняю...</>
          : <><Icon name="Save" size={16} className="mr-2" />Сохранить</>
        }
      </Button>

      <p className="text-white/30 text-xs text-center mt-4">Эта страница доступна только тебе · /admin</p>
    </div>
  );
}
