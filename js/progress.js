import { supabase } from './supabase.js'

export async function getStudentProgress(studentId) {
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('student_id', studentId)
    .eq('completed', true)
    .order('mission')
    .order('level')
  if (error) throw error
  return data || []
}

export async function markLevelComplete(studentId, mission, level) {
  const { error } = await supabase
    .from('progress')
    .upsert({
      student_id: studentId,
      mission,
      level,
      completed: true,
      score: 100,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'student_id,mission,level' })
  if (error) throw error
}

export async function logAttempt(studentId, mission, level, type, result) {
  const { error } = await supabase
    .from('attempts')
    .insert({ student_id: studentId, mission, level, type, result })
  if (error) throw error
}

export async function getCurrentLevel(studentId) {
  const progress = await getStudentProgress(studentId)
  for (let level = 1; level <= 28; level++) {
    const m1 = progress.find(p => p.mission === 1 && p.level === level)
    const m2 = progress.find(p => p.mission === 2 && p.level === level)
    const m3 = progress.find(p => p.mission === 3 && p.level === level)
    if (!m1 || !m2 || !m3) return level
  }
  return 29
}

export async function isMissionAvailable(studentId, mission, level) {
  if (mission === 1) return true
  const progress = await getStudentProgress(studentId)
  for (let m = 1; m < mission; m++) {
    const done = progress.find(p => p.mission === m && p.level === level && p.completed)
    if (!done) return false
  }
  return true
}

export function calculateEnergy(progress) {
  return progress.length * 50
}

export async function resetStudentProgress(studentId) {
  const { error: e1 } = await supabase
    .from('progress')
    .delete()
    .eq('student_id', studentId)
  if (e1) throw e1
  const { error: e2 } = await supabase
    .from('attempts')
    .delete()
    .eq('student_id', studentId)
  if (e2) throw e2
}

// Returns which mission was just completed for the current level (used for celebration)
export async function getCompletedMissionForLevel(studentId, level) {
  const progress = await getStudentProgress(studentId)
  const m1 = progress.find(p => p.mission === 1 && p.level === level)
  const m2 = progress.find(p => p.mission === 2 && p.level === level)
  const m3 = progress.find(p => p.mission === 3 && p.level === level)
  if (m1 && m2 && m3) return 'all'
  if (m1 && m2) return 2
  if (m1) return 1
  return 0
}
