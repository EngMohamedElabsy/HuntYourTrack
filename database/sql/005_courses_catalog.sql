-- ============================================================================
-- HuntYourTrack Modular SQL Schema: 005_courses_catalog.sql
-- Module: Course Aggregator, Syllabi Entities & Progress Tracking
-- Compatibility: PostgreSQL / MySQL / SQLite / Microsoft SQL Server
-- ============================================================================

CREATE TABLE IF NOT EXISTS courses_catalog (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  institution VARCHAR(150) NOT NULL,
  platform VARCHAR(100) NOT NULL,
  level VARCHAR(50) NOT NULL, -- Foundational, Intermediate, Advanced, Capstone
  discipline VARCHAR(100) NOT NULL,
  duration_weeks INT NOT NULL DEFAULT 8,
  estimated_hours INT NOT NULL DEFAULT 40,
  rating DECIMAL(3, 2) DEFAULT 4.80,
  enrollments_count INT DEFAULT 0,
  syllabus_url VARCHAR(255),
  external_url VARCHAR(255) NOT NULL,
  is_verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_course_enrollments (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  course_id VARCHAR(64) NOT NULL,
  progress_percent INT NOT NULL DEFAULT 0,
  completed_topics INT NOT NULL DEFAULT 0,
  total_topics INT NOT NULL DEFAULT 10,
  status VARCHAR(50) NOT NULL DEFAULT 'in_progress', -- in_progress, completed, paused
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_enroll_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT fk_enroll_course FOREIGN KEY (course_id) REFERENCES courses_catalog (id) ON DELETE CASCADE,
  CONSTRAINT uq_user_course UNIQUE (user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_courses_discipline ON courses_catalog (discipline);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses_catalog (level);
CREATE INDEX IF NOT EXISTS idx_enroll_user_id ON student_course_enrollments (user_id);
