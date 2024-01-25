DROP DATABASE IF EXISTS  soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league

CREATE TABLE seasons (
   id SERIAL PRIMARY KEY,
   start_date DATE NOT NULL,
   end_date DATE NOT NULL
);

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    season_id INTEGER REFERENCES seasons
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    team_id INTEGER REFERENCES teams ON DELETE CASCADE
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    amount INTEGER CHECK (amount >= 0),
    player_id INTEGER REFERENCES players ON DELETE CASCADE,
    match_id INTEGER REFERENCES matches ON DELETE CASCADE
);

CREATE TABLE referees (
    id SERIAL PRIMARY KEY,
    name TEXT   NOT NULL,
    match_id INTEGER REFERENCES matches
);

CREATE TABLE standings (
    id SERIAL PRIMARY KEY,
    team_id INTEGER REFERENCES teams ON DELETE CASCADE,
    match_id INTEGER REFERENCES matches ON DELETE CASCADE
);

CREATE INDEX idx_teams_name ON teams (name);
CREATE INDEX idx_players_name ON players (name);
CREATE INDEX idx_referees_name ON referees (name);