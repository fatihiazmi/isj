import { supabase } from './supabase.js'

export async function getStudentProgress(studentId) {
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('student_id', studentId)
    .eq('completed', true)
    .order('mission')
    .order('level')
    .order('baris')
  if (error) throw error
  return data || []
}

export async function markLevelComplete(studentId, mission, level, baris) {
  const { error } = await supabase
    .from('progress')
    .upsert({
      student_id: studentId,
      mission,
      level,
      baris,
      completed: true,
      score: 100,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'student_id,mission,level,baris' })
  if (error) throw error
}

export async function logAttempt(studentId, mission, level, baris, type, result) {
  const { error } = await supabase
    .from('attempts')
    .insert({ student_id: studentId, mission, level, baris, type, result })
  if (error) throw error
}

// Returns { level, baris } — the next incomplete step across all missions
export async function getCurrentLevel(studentId) {
  const progress = await getStudentProgress(studentId)
  for (let level = 1; level <= 28; level++) {
    for (let baris = 1; baris <= 3; baris++) {
      const m1 = progress.find(p => p.mission === 1 && p.level === level && p.baris === baris)
      const m2 = progress.find(p => p.mission === 2 && p.level === level && p.baris === baris)
      const m3 = progress.find(p => p.mission === 3 && p.level === level && p.baris === baris)
      if (!m1 || !m2 || !m3) return { level, baris }
    }
  }
  return { level: 29, baris: 1 } // All done
}

// Returns which baris (1-3) is next for a specific mission+level, or null if all done
export function getNextBaris(progress, mission, level) {
  for (let baris = 1; baris <= 3; baris++) {
    const done = progress.find(p => p.mission === mission && p.level === level && p.baris === baris && p.completed)
    if (!done) return baris
  }
  return null // All 3 baris done for this mission+level
}

// Check if all 3 baris are complete for a mission+level
export function isLetterCompleteForMission(progress, mission, level) {
  return getNextBaris(progress, mission, level) === null
}

// Check if mission is available for this level (previous missions must have all 3 baris done)
export async function isMissionAvailable(studentId, mission, level) {
  if (mission === 1) return true
  const progress = await getStudentProgress(studentId)
  for (let m = 1; m < mission; m++) {
    if (!isLetterCompleteForMission(progress, m, level)) return false
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
// Now checks all 3 baris per mission
export async function getCompletedMissionForLevel(studentId, level) {
  const progress = await getStudentProgress(studentId)
  const m1Done = isLetterCompleteForMission(progress, 1, level)
  const m2Done = isLetterCompleteForMission(progress, 2, level)
  const m3Done = isLetterCompleteForMission(progress, 3, level)
  if (m1Done && m2Done && m3Done) return 'all'
  if (m1Done && m2Done) return 2
  if (m1Done) return 1
  return 0
}

// Count fully completed letters (all 3 missions × 3 baris)
export function countCompletedLetters(progress) {
  let count = 0
  for (let level = 1; level <= 28; level++) {
    let allDone = true
    for (let mission = 1; mission <= 3; mission++) {
      if (!isLetterCompleteForMission(progress, mission, level)) {
        allDone = false
        break
      }
    }
    if (allDone) count++
  }
  return count
}

// Count completed baris entries for a specific mission (for progress bars)
export function countMissionCompleted(progress, mission) {
  return progress.filter(p => p.mission === mission).length
}
