import type { Therapist } from './mock-data'
import { mockTherapists } from './mock-data'

const PROFILES_KEY = 'prive_profiles_v2'
const SETTINGS_KEY = 'prive_settings_v1'
const AUTH_KEY = 'prive_admin_auth'

function isBrowser() { return typeof window !== 'undefined' }

// ─── Profiles ─────────────────────────────────────────────────────────────────

export function getStoredProfiles(): Therapist[] {
  if (!isBrowser()) return mockTherapists
  try {
    const raw = localStorage.getItem(PROFILES_KEY)
    if (raw) return JSON.parse(raw) as Therapist[]
  } catch {}
  return [...mockTherapists]
}

export function persistProfiles(profiles: Therapist[]): void {
  if (!isBrowser()) return
  try { localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles)) } catch {}
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export interface AdminSettings {
  ownerWhatsapp: string
  ownerEmail: string
  adminPassword: string
}

const DEFAULT_SETTINGS: AdminSettings = {
  ownerWhatsapp: '',
  ownerEmail: '',
  adminPassword: 'prive2026',
}

export function getSettings(): AdminSettings {
  if (!isBrowser()) return DEFAULT_SETTINGS
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {}
  return DEFAULT_SETTINGS
}

export function saveSettings(s: AdminSettings): void {
  if (!isBrowser()) return
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)) } catch {}
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export function checkAdminAuth(): boolean {
  if (!isBrowser()) return false
  return sessionStorage.getItem(AUTH_KEY) === '1'
}

export function setAdminAuth(): void {
  if (!isBrowser()) return
  sessionStorage.setItem(AUTH_KEY, '1')
}

export function clearAdminAuth(): void {
  if (!isBrowser()) return
  sessionStorage.removeItem(AUTH_KEY)
}
