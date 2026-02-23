import { Movie, DictionaryWord, Test, User } from "@/types";

export const mockUser: User = {
  id: 1,
  name: "Александр",
  email: "alex@example.com",
  streak: 7,
  tasksCompleted: 14,
  wordsAdded: 43,
  moviesWatched: 3,
  joinedAt: "2025-12-01",
};

export const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Scent of a Woman",
    titleRu: "Запах женщины",
    year: 1992,
    genre: ["Drama"],
    topic: ["Prison", "Friendship", "Hope"],
    level: "B2",
    poster:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    description:
      "Классическая история о надежде, дружбе и свободе в стенах тюрьмы Шоушенк.",
    watched: true,
    testPassed: true,
    subtitles: [
      {
        id: 1,
        start: 0,
        end: 4,
        text: "I have to remind myself that some birds aren't meant to be caged.",
        words: [
          { word: "remind", translation: "напоминать", partOfSpeech: "v" },
          { word: "caged", translation: "в клетке", partOfSpeech: "adj" },
        ],
      },
      {
        id: 2,
        start: 5,
        end: 9,
        text: "Their feathers are just too bright.",
        words: [
          { word: "feathers", translation: "перья", partOfSpeech: "n" },
          { word: "bright", translation: "яркий", partOfSpeech: "adj" },
        ],
      },
      {
        id: 3,
        start: 10,
        end: 14,
        text: "Hope is a good thing, maybe the best of things.",
        words: [
          { word: "hope", translation: "надежда", partOfSpeech: "n" },
          { word: "maybe", translation: "возможно", partOfSpeech: "adv" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Forrest Gump",
    titleRu: "Форрест Гамп",
    year: 1994,
    genre: ["Drama", "Comedy"],
    topic: ["Life", "Love", "History"],
    level: "B1",
    poster:
      "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
    duration: "2ч 22мин",
    description:
      "История простого человека с добрым сердцем, чья жизнь стала отражением эпохи.",
    watched: false,
    testPassed: false,
    subtitles: [
      {
        id: 1,
        start: 0,
        end: 4,
        text: "Life is like a box of chocolates.",
        words: [
          {
            word: "chocolates",
            translation: "шоколадные конфеты",
            partOfSpeech: "n",
          },
        ],
      },
      {
        id: 2,
        start: 5,
        end: 9,
        text: "You never know what you're gonna get.",
        words: [
          { word: "gonna", translation: "собираешься", partOfSpeech: "v" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "The Pursuit of Happyness",
    titleRu: "В погоне за счастьем",
    year: 2006,
    genre: ["Drama", "Biography"],
    topic: ["Business", "Family", "Motivation"],
    level: "B1",
    poster:
      "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=600&fit=crop",
    duration: "1ч 57мин",
    description:
      "Реальная история отца, который не сдался перед трудностями жизни.",
    watched: false,
    testPassed: false,
    subtitles: [
      {
        id: 1,
        start: 0,
        end: 4,
        text: "Don't ever let somebody tell you, you can't do something.",
        words: [
          { word: "somebody", translation: "кто-то", partOfSpeech: "pron" },
          { word: "something", translation: "что-то", partOfSpeech: "pron" },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Inception",
    titleRu: "Начало",
    year: 2010,
    genre: ["Sci-Fi", "Thriller"],
    topic: ["Psychology", "Dreams", "Reality"],
    level: "C1",
    poster:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop",
    duration: "2ч 28мин",
    description:
      "Профессиональный вор, специализирующийся на похищении секретов из подсознания.",
    watched: false,
    testPassed: false,
    subtitles: [],
  },
  {
    id: 5,
    title: "The Devil Wears Prada",
    titleRu: "Дьявол носит Prada",
    year: 2006,
    genre: ["Comedy", "Drama"],
    topic: ["Fashion", "Work", "Career"],
    level: "B2",
    poster:
      "https://images.unsplash.com/photo-1558171813-9c5b2c6f499d?w=400&h=600&fit=crop",
    duration: "1ч 49мин",
    description:
      "Молодая журналистка устраивается ассистентом к властной редактору модного журнала.",
    watched: false,
    testPassed: false,
    subtitles: [],
  },
  {
    id: 6,
    title: "Good Will Hunting",
    titleRu: "Умница Уилл Хантинг",
    year: 1997,
    genre: ["Drama"],
    topic: ["Intelligence", "Psychology", "Friendship"],
    level: "C1",
    poster:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    duration: "2ч 06мин",
    description:
      "Гениальный юноша из Бостона и его путь к признанию своего дара.",
    watched: false,
    testPassed: false,
    subtitles: [],
  },
];

export const mockDictionary: DictionaryWord[] = [
  {
    id: 1,
    word: "remind",
    translation: "напоминать",
    partOfSpeech: "v",
    movieTitle: "The Shawshank Redemption",
    addedAt: "2026-02-20",
    learned: false,
  },
  {
    id: 2,
    word: "caged",
    translation: "в клетке",
    partOfSpeech: "adj",
    movieTitle: "The Shawshank Redemption",
    addedAt: "2026-02-20",
    learned: true,
  },
  {
    id: 3,
    word: "feathers",
    translation: "перья",
    partOfSpeech: "n",
    movieTitle: "The Shawshank Redemption",
    addedAt: "2026-02-19",
    learned: false,
  },
  {
    id: 4,
    word: "hope",
    translation: "надежда",
    partOfSpeech: "n",
    movieTitle: "The Shawshank Redemption",
    addedAt: "2026-02-18",
    learned: true,
  },
  {
    id: 5,
    word: "pursuit",
    translation: "погоня, стремление",
    partOfSpeech: "n",
    movieTitle: "The Pursuit of Happyness",
    addedAt: "2026-02-17",
    learned: false,
  },
  {
    id: 6,
    word: "redemption",
    translation: "искупление",
    partOfSpeech: "n",
    movieTitle: "The Shawshank Redemption",
    addedAt: "2026-02-16",
    learned: false,
  },
];

export const mockTests: Test[] = [
  {
    id: 1,
    movieId: 1,
    movieTitle: "The Shawshank Redemption",
    type: "plot",
    completed: true,
    questions: [
      {
        id: 1,
        text: "Why was Andy Dufresne sent to Shawshank?",
        options: [
          "Robbery",
          "Murder of his wife",
          "Fraud",
          "Escape from prison",
        ],
        correct: 1,
      },
      {
        id: 2,
        text: "What did Andy smuggle into prison over 19 years?",
        options: ["Food", "Money", "A small rock hammer", "Letters"],
        correct: 2,
      },
    ],
  },
  {
    id: 2,
    movieId: 1,
    movieTitle: "The Shawshank Redemption",
    type: "grammar",
    completed: false,
    questions: [
      {
        id: 1,
        text: '"Some birds aren\'t meant to be ___." (caged/caging/cage)',
        options: ["caged", "caging", "cage", "cages"],
        correct: 0,
      },
      {
        id: 2,
        text: 'Choose the correct form: "I have to ___ myself that hope is real."',
        options: ["remind", "reminded", "reminding", "reminds"],
        correct: 0,
      },
    ],
  },
  {
    id: 3,
    movieId: 1,
    movieTitle: "The Shawshank Redemption",
    type: "speech",
    completed: false,
    questions: [
      {
        id: 1,
        text: "How would you describe Andy's relationship with Red in one sentence?",
        options: [
          "They were rivals who eventually made peace",
          "They were unlikely friends who gave each other hope",
          "They were cellmates who never got along",
          "They were enemies who forgave each other",
        ],
        correct: 1,
      },
    ],
  },
];
