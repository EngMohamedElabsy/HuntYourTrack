-- ============================================================================
-- HuntYourTrack Modular SQL Schema: 004_applications.sql
-- Module: Internship & Training Applications Lifecycle
-- Compatibility: PostgreSQL / MySQL / SQLite / Microsoft SQL Server
-- ============================================================================

CREATE TABLE IF NOT EXISTS opportunity_applications (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  opportunity_id VARCHAR(64) NOT NULL,
  opportunity_title VARCHAR(255) NOT NULL,
  company_name VARCHAR(150) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'submitted', -- submitted, reviewing, shortlisted, rejected, accepted
  resume_url VARCHAR(255),
  match_rate DECIMAL(5, 2) DEFAULT 0.00,
  notes TEXT,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_apps_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT uq_user_opportunity UNIQUE (user_id, opportunity_id)
);

CREATE INDEX IF NOT EXISTS idx_apps_user_id ON opportunity_applications (user_id);
CREATE INDEX IF NOT EXISTS idx_apps_opp_id ON opportunity_applications (opportunity_id);
CREATE INDEX IF NOT EXISTS idx_apps_status ON opportunity_applications (status);
