-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE airlines (
  id SERIAL PRIMARY KEY,
  airline_name TEXT NOT NULL
);

CREATE TABLE seat_assignments (
id SERIAL PRIMARY KEY,
seat_number TEXT NOT NULL
);

CREATE TABLE passengers (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL
);

CREATE TABLE departures (
  id SERIAL PRIMARY KEY,
  dep_time TIMESTAMP NOT NULL,
  from_city TEXT NOT NULL,
  from_country TEXT NOT NULL
);

CREATE TABLE arrivals (
  id SERIAL PRIMARY KEY,
  arr_time TIMESTAMP NOT NULL,
  to_city TEXT NOT NULL,
  to_country TEXT NOT NULL
);

CREATE TABLE tickets
(
  id SERIAL PRIMARY KEY,
 class_type TEXT NOT NULL,
 seat_id INTEGER REFERENCES seat_assignments,
 passenger_id INTEGER REFERENCES passengers,
 dep_id INTEGER REFERENCES departures,
 arr_id INTEGER REFERENCES arrivals,
 airline_id INTEGER REFERENCES airlines
);


INSERT INTO airlines (airline_name)
VALUES 
('United'),
('British Airways'),
('Delta'),
('TUI Fly Belgium'),
('Air China'),
('American Airlines'),
('Avianca Brasil');

INSERT INTO seat_assignments (seat_number)
VALUES
('33B'), 
('8A'),
('12F'),
('20A'),
('23D'), 
('18C'),
('9E'), 
('1A'), 
('32B'), 
('10D');

