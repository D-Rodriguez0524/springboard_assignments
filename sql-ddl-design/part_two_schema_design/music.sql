-- from the terminal run:
-- psql < music.sql
DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE producers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  artist_id INTEGER REFERENCES artists
);

CREATE TABLE albums (
  id  SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  release_date DATE NOT NULL,
  song_id INTEGER REFERENCES songs
);

CREATE TABLE song_producers (
  id SERIAL PRIMARY KEY,
  song_id INTEGER REFERENCES songs,
  producer_id INTEGER REFERENCES producers
);


INSERT INTO artists (name)
VALUES 
('Hanson'), 
('Queen'), 
('Mariah Cary'), 
('Boyz II Men'),
('Lady Gaga'), 
('Bradley Cooper'),
('Nickelback'),
('Jay Z'), 
('Alicia Keys'),
('Katy Perry'), 
('Juicy J'), 
('Maroon 5'),
('Christina Aguilera'),
('Avril Lavigne'),
('Destiny''s Child');

INSERT INTO producers (name)
VALUES
('Dust Brothers'), 
('Stephen Lironi'),
('Roy Thomas Baker'),
('Walter Afanasieff'),
('Benjamin Rice'),
('Rick Parashar'),
('Al Shux'),
('Max Martin'),
('Cirkut'),
('Shellback'), 
('Benny Blanco'),
('The Matrix'),
('Darkchild');


INSERT INTO songs
  (title, duration_in_seconds, artist_id)
VALUES
  ('MMMBop', 238, 1),
  ('Bohemian Rhapsody', 355, 2);

INSERT INTO song_producers (song_id, producer_id)
VALUES 
(1, 1), 
(1, 2),
(2,3);

