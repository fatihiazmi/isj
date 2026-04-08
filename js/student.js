import { supabase } from './supabase.js'

const STORAGE_KEY = 'isj_active_student'

export function getActiveStudent() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : null
}

export function setActiveStudent(student) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(student))
}

export function clearActiveStudent() {
  localStorage.removeItem(STORAGE_KEY)
}

export async function fetchAllStudents() {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('name')
  if (error) throw error
  return data
}
