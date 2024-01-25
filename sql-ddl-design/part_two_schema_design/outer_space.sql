-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE galaxies (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  galaxy_id INTEGER REFERENCES galaxies
);

CREATE TABLE moons (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  planet_id INTEGER REFERENCES planets
);

CREATE TABLE orbits (
  id SERIAL PRIMARY KEY,
  orbital_period_in_years FLOAT NOT NULL,
  orbits_around TEXT NOT NULL,
  planet_id INTEGER REFERENCES planets
);

INSERT INTO galaxies (name)
VALUES ('Milky Way');


INSERT INTO planets (name, galaxy_id)
VALUES
  ('Earth', 1),
  ('Mars', 1),
  ('Venus', 1),
  ('Neptune', 1),
  ('Proxima Centauri b', 1),
  ('Gliese 876 b', 1);

INSERT INTO moons (name, planet_id)
VALUES 
  ('The Moon', 1), 
  ('Phobos', 2), ('Deimos', 2),
  ('Naiad', 4), 
  ('Thalassa', 4), 
  ('Despina', 4), 
  ('Galatea', 4), 
  ('Larissa', 4), 
  ('S/2004 N 1', 4), 
  ('Proteus', 4), 
  ('Triton', 4), 
  ('Nereid', 4), 
  ('Halimede', 4), 
  ('Sao', 4), 
  ('Laomedeia', 4), 
  ('Psamathe', 4), 
  ('Neso', 4);

INSERT INTO orbits (orbital_period_in_years, orbits_around, planet_id)
VALUES
  (1.00, 'The Sun', 1),
  (1.88, 'The Sun', 2),
  (0.62, 'The Sun', 3),
  (164.8, 'The Sun', 4),
  (0.03, 'Proxima Centauri', 5),
  (0.23, 'Gliese 876', 6);