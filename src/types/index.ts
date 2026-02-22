export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  streak: number;
  tasksCompleted: number;
  wordsAdded: number;
  moviesWatched: number;
  joinedAt: string;
}

export interface Movie {
  id: number;
  title: string;
  titleRu: string;
  year: number;
  genre: string[];
  topic: string[];
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  poster: string;
  duration: string;
  description: string;
  videoUrl?: string;
  subtitles: Subtitle[];
  watched: boolean;
  testPassed: boolean;
}

export interface Subtitle {
  id: number;
  start: number;
  end: number;
  text: string;
  words: SubtitleWord[];
}

export interface SubtitleWord {
  word: string;
  translation: string;
  partOfSpeech: string;
}

export interface DictionaryWord {
  id: number;
  word: string;
  translation: string;
  partOfSpeech: string;
  movieTitle: string;
  addedAt: string;
  learned: boolean;
}

export interface Test {
  id: number;
  movieId: number;
  movieTitle: string;
  type: 'plot' | 'grammar' | 'speech';
  questions: Question[];
  completed: boolean;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

export type Page = 'home' | 'movies' | 'tests' | 'dictionary' | 'profile' | 'movie-player';
