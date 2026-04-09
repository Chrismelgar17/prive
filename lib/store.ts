import { supabase } from './supabase'
import type { Therapist } from './mock-data'

// ─── Row mappers ───────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToTherapist(row: any): Therapist {
  return {
    id: String(row.id),
    name: row.name,
    age: row.age,
    neighborhood: row.neighborhood,
    location: row.location ?? '',
    photo_url: row.photo_url ?? '',
    level: row.level ?? 1,
    verified: row.verified ?? false,
    isOnline: row.is_online ?? false,
    description: row.description ?? '',
    services: row.services ?? [],
    modality: row.modality ?? [],
    amenities: row.amenities ?? [],
    categories: row.categories ?? [],
    priceRange: row.price_range ?? '',
    gallery: row.gallery ?? [],
    whatsapp: row.whatsapp ?? '',
    reviews: row.reviews ?? [],
    profileViews: row.profile_views ?? 0,
    whatsappClicks: row.whatsapp_clicks ?? 0,
    docVerified: row.doc_verified ?? false,
    contentVerified: row.content_verified ?? false,
    isPaused: row.is_paused ?? false,
  }
}

function therapistToRow(t: Therapist) {
  return {
    id: t.id,
    name: t.name,
    age: t.age,
    neighborhood: t.neighborhood,
    location: t.location ?? '',
    photo_url: t.photo_url,
    level: t.level,
    verified: t.verified,
    is_online: t.isOnline ?? false,
    description: t.description ?? '',
    services: t.services ?? [],
    modality: t.modality ?? [],
    amenities: t.amenities ?? [],
    categories: t.categories ?? [],
    price_range: t.priceRange ?? '',
    gallery: t.gallery ?? [],
    whatsapp: t.whatsapp ?? '',
    reviews: t.reviews ?? [],
    profile_views: t.profileViews ?? 0,
    whatsapp_clicks: t.whatsappClicks ?? 0,
    doc_verified: t.docVerified ?? false,
    content_verified: t.contentVerified ?? false,
    is_paused: t.isPaused ?? false,
  }
}

// ─── Profiles (Supabase) ──────────────────────────────────────────────────────

export async function getProfiles(): Promise<Therapist[]> {
  try {
    const { data, error } = await supabase
      .from('therapists')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) { console.error(error); return [] }
    return (data ?? []).map(rowToTherapist)
  } catch (err) {
    console.error('[getProfiles]', err)
    return []
  }
}

export async function upsertProfile(t: Therapist): Promise<void> {
  const { error } = await supabase.from('therapists').upsert(therapistToRow(t))
  if (error) throw error
}

export async function deleteProfile(id: string): Promise<void> {
  const { error } = await supabase.from('therapists').delete().eq('id', id)
  if (error) throw error
}

// ─── Photo upload (Supabase Storage) ─────────────────────────────────────────

export async function uploadPhoto(file: File): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'jpg'
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { data, error } = await supabase.storage
    .from('photos')
    .upload(fileName, file, { cacheControl: '3600', upsert: false })
  if (error) throw error
  const { data: urlData } = supabase.storage.from('photos').getPublicUrl(data.path)
  return urlData.publicUrl
}

// ─── Settings (localStorage) ──────────────────────────────────────────────────

export interface AdminSettings {
  ownerWhatsapp: string
  ownerEmail: string
  adminPassword: string
}

const SETTINGS_KEY = 'prive_settings_v1'
const AUTH_KEY = 'prive_admin_auth'

const DEFAULT_SETTINGS: AdminSettings = {
  ownerWhatsapp: '',
  ownerEmail: '',
  adminPassword: 'prive2026',
}

function isBrowser() { return typeof window !== 'undefined' }

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

// ─── Auth (sessionStorage) ────────────────────────────────────────────────────

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
