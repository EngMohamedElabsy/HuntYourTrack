-- ============================================================================
-- HuntYourTrack Modular SQL Schema: 002_student_profiles.sql
-- Module: Student Academic Profiles, Discipline Mapping & Career Track
-- Compatibility: PostgreSQL / MySQL / SQLite / Microsoft SQL Server
-- ============================================================================

CREATE TABLE IF NOT EXISTS student_profiles (
  user_id VARCHAR(64) NOT NULL PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  university VARCHAR(150) NOT NULL,
  faculty VARCHAR(100) NOT NULL,
  department VARCHAR(100),
  graduation_year INT NOT NULL,
  career_track VARCHAR(100) DEFAULT 'ai-deeplearning',
  ats_score DECIMAL(5, 2) DEFAULT 0.00,
  bio TEXT,
  linkedin_url VARCHAR(255),
  github_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_profiles_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_student_profiles_faculty ON student_profiles (faculty);
CREATE INDEX IF NOT EXISTS idx_student_profiles_track ON student_profiles (career_track);
