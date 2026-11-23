-- ============================================================================
-- HuntYourTrack Modular SQL Schema: 001_users_rbac.sql
-- Module: Identity, Authentication & Role-Based Access Control (RBAC)
-- Compatibility: PostgreSQL / MySQL / SQLite / Microsoft SQL Server
-- ============================================================================

CREATE TABLE IF NOT EXISTS roles (
  id INT NOT NULL PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Canonical Platform Roles
INSERT INTO roles (id, code, description) VALUES
  (1, 'student', 'Undergraduate and graduate university learners'),
  (2, 'recruiter', 'Verified corporate recruiters and opportunities posters'),
  (3, 'admin', 'Executive platform administrators and verifiers')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  email VARCHAR(191) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role_id INT NOT NULL DEFAULT 1,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_role_id ON users (role_id);
