DROP DATABASE IF EXISTS  medical_center;

CREATE DATABASE medical_center;

\c medical_center

CREATE TABLE diseases (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    specialization TEXT NOT NULL
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    name TEXT   NOT NULL,
    date_of_birth DATE,
    doctor_id INTEGER REFERENCES doctors,
    disease_id INTEGER REFERENCES diseases ON DELETE CASCADE
);

CREATE TABLE visits (
    id SERIAL PRIMARY KEY,
    visit_date DATE,
    doctor_id INTEGER REFERENCES doctors ON DELETE SET NULL,
    patient_id INTEGER REFERENCES patients ON DELETE CASCADE
);

CREATE TABLE diagnoses (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    disease_id INTEGER REFERENCES diseases ON DELETE CASCADE,
    visit_id INTEGER REFERENCES visits ON DELETE SET NULL
);


CREATE INDEX idx_doctor_name ON doctors (name);
CREATE INDEX idx_patient_name ON patients (name);
CREATE INDEX idx_diagnosis_name ON diagnoses (name);
CREATE INDEX idx_disease_name ON diseases (name);
CREATE INDEX idx_visit_date ON visits (visit_date);


