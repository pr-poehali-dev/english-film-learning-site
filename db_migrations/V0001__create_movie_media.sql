CREATE TABLE IF NOT EXISTS movie_media (
  id SERIAL PRIMARY KEY,
  movie_id INTEGER NOT NULL UNIQUE,
  video_url TEXT,
  subtitle_url TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);