-- supabase/schema.sql

-- Students table
CREATE TABLE students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  avatar_emoji TEXT NOT NULL DEFAULT '🧒',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Progress table (per mission, per letter)
CREATE TABLE progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  mission INT NOT NULL CHECK (mission BETWEEN 1 AND 3),
  level INT NOT NULL CHECK (level BETWEEN 1 AND 28),
  completed BOOLEAN DEFAULT FALSE,
  score INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, mission, level)
);

-- Attempts log
CREATE TABLE attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  mission INT NOT NULL CHECK (mission BETWEEN 1 AND 3),
  level INT NOT NULL CHECK (level BETWEEN 1 AND 28),
  type TEXT NOT NULL CHECK (type IN ('speech', 'manual', 'trace')),
  result TEXT NOT NULL CHECK (result IN ('correct', 'incorrect')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_progress_student ON progress(student_id);
CREATE INDEX idx_attempts_student ON attempts(student_id);

-- RLS: allow all via anon key (no auth)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all on students" ON students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on progress" ON progress FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on attempts" ON attempts FOR ALL USING (true) WITH CHECK (true);

-- Seed students
INSERT INTO students (name, avatar_emoji) VALUES
  ('Ahmad', '🧒'),
  ('Aisyah', '👧'),
  ('Zaid', '👦'),
  ('Fatimah', '🧕'),
  ('Umar', '🧑');
