/*
  # Code Organizer Schema

  1. New Tables
    - `projects`
      - `id` (uuid, primary key) - Unique identifier for each project
      - `name` (text) - Name of the project
      - `description` (text) - Optional description of the project
      - `created_at` (timestamptz) - Timestamp when project was created
      - `updated_at` (timestamptz) - Timestamp when project was last updated
    
    - `code_snippets`
      - `id` (uuid, primary key) - Unique identifier for each code snippet
      - `project_id` (uuid, foreign key) - References the parent project
      - `title` (text) - Title/name of the code snippet
      - `code` (text) - The actual code content
      - `language` (text) - Programming language of the code
      - `created_at` (timestamptz) - Timestamp when snippet was created
      - `updated_at` (timestamptz) - Timestamp when snippet was last updated

  2. Security
    - Enable RLS on both tables
    - Public access for read operations (suitable for single-user app)
    - Public access for write operations (suitable for single-user app)
    
  3. Indexes
    - Index on project_id in code_snippets for faster queries
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS code_snippets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  code text NOT NULL,
  language text DEFAULT 'javascript',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS code_snippets_project_id_idx ON code_snippets(project_id);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_snippets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert projects"
  ON projects FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update projects"
  ON projects FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete projects"
  ON projects FOR DELETE
  USING (true);

CREATE POLICY "Anyone can view code snippets"
  ON code_snippets FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert code snippets"
  ON code_snippets FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update code snippets"
  ON code_snippets FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete code snippets"
  ON code_snippets FOR DELETE
  USING (true);