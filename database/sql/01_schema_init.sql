-- HuntYourTrack — Relational Core Database Schema
-- Dialect: Compatible with Microsoft SQL Server (T-SQL) & MySQL 8.0+
-- Purpose: Secure User Authentication, Role-Based Access Control (RBAC), and User Profiles

-- 1. Users Table (Core Identity & RBAC)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_uuid VARCHAR(36) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'employer', 'admin')),
    faculty VARCHAR(80) NOT NULL DEFAULT 'computers-ai',
    department VARCHAR(80) NULL,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (email),
    INDEX idx_user_role (role)
);

-- 2. Student Profiles & ATS Metadata
CREATE TABLE IF NOT EXISTS student_profiles (
    profile_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    active_track VARCHAR(80) NOT NULL DEFAULT 'ai-deeplearning',
    academic_year VARCHAR(20) NULL,
    cv_filename VARCHAR(255) NULL,
    detected_skills_json TEXT NULL, -- Serialized JSON array of matched keywords
    headline VARCHAR(255) NULL,
    github_handle VARCHAR(100) NULL,
    linkedin_url VARCHAR(255) NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Authentication Sessions
CREATE TABLE IF NOT EXISTS user_sessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    session_token VARCHAR(128) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_session_token (session_token)
);

-- 4. Course Enrollments & Progress
CREATE TABLE IF NOT EXISTS course_enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id VARCHAR(50) NOT NULL,
    enrollment_status VARCHAR(20) NOT NULL DEFAULT 'in_progress' CHECK (enrollment_status IN ('saved', 'in_progress', 'completed')),
    progress_percentage INT NOT NULL DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uq_user_course (user_id, course_id)
);

-- 5. Internship Applications
CREATE TABLE IF NOT EXISTS opportunity_applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    opportunity_id VARCHAR(50) NOT NULL,
    application_status VARCHAR(20) NOT NULL DEFAULT 'submitted' CHECK (application_status IN ('submitted', 'under_review', 'accepted', 'rejected')),
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uq_user_opportunity (user_id, opportunity_id)
);
