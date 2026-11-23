-- ============================================================================
-- HuntYourTrack Modular SQL Schema: 003_sessions.sql
-- Module: Session Governance, Expiration & Token Tracking
-- Compatibility: PostgreSQL / MySQL / SQLite / Microsoft SQL Server
-- ============================================================================

CREATE TABLE IF NOT EXISTS sessions (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  session_token VARCHAR(255) NOT NULL UNIQUE,
  ip_address VARCHAR(45),
  user_agent TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions (session_token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions (expires_at);
