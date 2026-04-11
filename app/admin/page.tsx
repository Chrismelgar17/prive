'use client'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { therapistUrl } from '@/lib/utils'
import {
  ArrowLeft, Eye, MessageCircle, Users, UserCheck, PauseCircle, PlayCircle,
  TrendingUp, Shield, Plus, Pencil, Trash2, FileCheck, ImageIcon, Check,
  Search, AlertTriangle, Save, X, Phone, Tag, FileText, Percent, ArrowUpRight,
  Settings, LogOut, ExternalLink, Mail, Clock, CalendarDays, MessageSquareOff,
} from 'lucide-react'
import { Header } from '@/components/header'
import {
  getProfiles, upsertProfile, deleteProfile, uploadPhoto,
  getSettings, saveSettings,
  checkAdminAuth, setAdminAuth, clearAdminAuth, AdminSettings,
} from '@/lib/store'
import { mockTherapists, MEMBERSHIP_LEVELS, SERVICE_CATEGORIES, DAYS_OF_WEEK, MembershipLevel, Therapist } from '@/lib/mock-data'

// ─── Constants ────────────────────────────────────────────────────────────────
const MODALITY_OPTIONS = ['Lugar propio', 'Domicilio', 'Hotel']

const levelColors: Record<MembershipLevel, string> = {
  5: 'text-yellow-400', 4: 'text-red-400', 3: 'text-blue-400', 2: 'text-yellow-500', 1: 'text-gray-400',
}
const levelBg: Record<MembershipLevel, string> = {
  5: 'bg-yellow-400/10 border-yellow-400/20',
  4: 'bg-red-400/10 border-red-400/20',
  3: 'bg-blue-400/10 border-blue-400/20',
  2: 'bg-yellow-500/10 border-yellow-500/20',
  1: 'bg-gray-400/10 border-gray-400/20',
}

// ─── Form types ───────────────────────────────────────────────────────────────
interface PF {
  name: string; age: string; neighborhood: string; location: string
  photo_url: string; gallery: string[]; description: string
  categories: string[]; services: string[]; modality: string[]
  priceRange: string; level: MembershipLevel
  verified: boolean; docVerified: boolean; contentVerified: boolean
  whatsapp: string; isOnline: boolean
  workingHours: string; availableDays: string[]; reviewsEnabled: boolean
}
const INIT: PF = {
  name: '', age: '', neighborhood: '', location: '', photo_url: '',
  gallery: [], description: '', categories: [], services: [],
  modality: [], priceRange: '', level: 1,
  verified: false, docVerified: false, contentVerified: false,
  whatsapp: '', isOnline: false,
  workingHours: '', availableDays: [], reviewsEnabled: true,
}
type FE = Partial<Record<keyof PF, string>>

// ─── Small UI helpers ─────────────────────────────────────────────────────────
const inputCls = (err?: string) =>
  `w-full bg-white/5 border ${err ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#D4AF37]/50 transition-colors`

function FInput({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-white/60 mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}

function SectionHead({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
      <Icon className="h-4 w-4 text-[#D4AF37]" />
      <h3 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">{label}</h3>
    </div>
  )
}

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-11 h-6 rounded-full border-2 transition-all relative shrink-0 ${value ? 'bg-emerald-500 border-emerald-500' : 'bg-white/5 border-white/10'}`}
    >
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${value ? 'left-5' : 'left-0.5'}`} />
    </button>
  )
}

export default function AdminPage() {
  const [profiles, setProfiles] = useState<Therapist[]>([])
  const [loadingProfiles, setLoadingProfiles] = useState(true)
  const [saving, setSaving] = useState(false)
  const [view, setView] = useState<'list' | 'form'>('list')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState<PF>(INIT)
  const [errors, setErrors] = useState<FE>({})
  const [galleryInput, setGalleryInput] = useState('')
  const [galleryKey, setGalleryKey] = useState(0)
  const [serviceInput, setServiceInput] = useState('')
  const [search, setSearch] = useState('')
  // ── Auth & Settings ──
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [settings, setSettings] = useState<AdminSettings>({ ownerWhatsapp: '', ownerEmail: '', adminPassword: 'Pr1v3@Adm1n#2026!' })
  const [showSettings, setShowSettings] = useState(false)
  const [settingsForm, setSettingsForm] = useState<AdminSettings>({ ownerWhatsapp: '', ownerEmail: '', adminPassword: 'Pr1v3@Adm1n#2026!' })

  useEffect(() => {
    const s = getSettings()
    setSettings(s)
    setSettingsForm(s)
    setIsAuthenticated(checkAdminAuth())
    getProfiles().then(setProfiles).finally(() => setLoadingProfiles(false))
  }, [])

  // ── Metrics ──
  const activeCount = profiles.filter(t => !t.isPaused).length
  const pausedCount = profiles.filter(t => t.isPaused).length
  const totalViews = profiles.reduce((s, t) => s + (t.profileViews ?? 0), 0)
  const totalClicks = profiles.reduce((s, t) => s + (t.whatsappClicks ?? 0), 0)
  const globalConversion = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0.0'
  const unverifiedCount = profiles.filter(t => !t.docVerified || !t.contentVerified).length
  const topProfiles = useMemo(() => [...profiles].sort((a, b) => (b.profileViews ?? 0) - (a.profileViews ?? 0)).slice(0, 5), [profiles])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return profiles
    return profiles.filter(p => p.name.toLowerCase().includes(q) || p.neighborhood.toLowerCase().includes(q))
  }, [profiles, search])

  // ── Validation ──
  const validate = (f: PF): boolean => {
    const e: FE = {}
    if (!f.name.trim()) e.name = 'Nombre requerido'
    const age = Number(f.age)
    if (!f.age || isNaN(age) || age < 18 || age > 99) e.age = 'Debe estar entre 18 y 99'
    if (!f.neighborhood.trim()) e.neighborhood = 'Zona requerida'
    if (!f.photo_url.trim()) e.photo_url = 'URL de foto principal requerida'
    if (!f.whatsapp.trim()) e.whatsapp = 'WhatsApp requerido'
    else if (!/^\+?[\d\s\-()+]{7,20}$/.test(f.whatsapp)) e.whatsapp = 'Formato inválido (ej. +5491123456789)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // ── Open form ──
  const openNew = () => {
    setForm(INIT); setErrors({}); setGalleryInput(''); setServiceInput(''); setEditingId(null); setView('form')
  }
  const openEdit = (t: Therapist) => {
    setForm({
      name: t.name, age: String(t.age), neighborhood: t.neighborhood,
      location: t.location ?? '', photo_url: t.photo_url,
      gallery: t.gallery ?? [], description: t.description ?? '',
      categories: t.categories ?? [], services: t.services ?? [],
      modality: t.modality ?? [], priceRange: t.priceRange ?? '',
      level: t.level, verified: t.verified,
      docVerified: t.docVerified ?? false, contentVerified: t.contentVerified ?? false,
      whatsapp: t.whatsapp ?? '', isOnline: t.isOnline ?? false,
      workingHours: t.workingHours ?? '', availableDays: t.availableDays ?? [],
      reviewsEnabled: t.reviewsEnabled ?? true,
    })
    setErrors({}); setGalleryInput(''); setServiceInput(''); setEditingId(t.id); setView('form')
  }

  // ── Save ──
  const handleSave = async () => {
    if (!validate(form)) return
    setSaving(true)
    try {
      const existing = editingId ? profiles.find(p => p.id === editingId) : null
      const updated: Therapist = {
        id: editingId ?? String(Date.now()),
        name: form.name.trim(), age: Number(form.age),
        neighborhood: form.neighborhood.trim(),
        location: form.location.trim() || form.neighborhood.trim(),
        photo_url: form.photo_url.trim(), gallery: form.gallery,
        description: form.description.trim(), categories: form.categories,
        services: form.services, modality: form.modality,
        priceRange: form.priceRange.trim(), level: form.level,
        verified: form.verified, docVerified: form.docVerified,
        contentVerified: form.contentVerified, whatsapp: form.whatsapp.trim(),
        isOnline: form.isOnline,
        workingHours: form.workingHours.trim(),
        availableDays: form.availableDays,
        reviewsEnabled: form.reviewsEnabled,
        profileViews: existing?.profileViews ?? 0,
        whatsappClicks: existing?.whatsappClicks ?? 0,
        reviews: existing?.reviews ?? [],
      }
      await upsertProfile(updated)
      const newProfiles = editingId
        ? profiles.map(p => p.id === editingId ? updated : p)
        : [updated, ...profiles]
      setProfiles(newProfiles)
      setView('list')
    } catch (err) {
      console.error(err)
      alert('Error al guardar. Verificá la conexión a Supabase.')
    } finally {
      setSaving(false)
    }
  }

  // ── Delete ──
  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteProfile(deleteId)
      setProfiles(prev => prev.filter(p => p.id !== deleteId))
    } catch (err) {
      console.error(err)
      alert('Error al eliminar. Verificá la conexión a Supabase.')
    }
    setDeleteId(null)
  }

  const togglePause = async (id: string) => {
    const target = profiles.find(p => p.id === id)
    if (!target) return
    const updated = { ...target, isPaused: !target.isPaused }
    try {
      await upsertProfile(updated)
      setProfiles(prev => prev.map(p => p.id === id ? updated : p))
    } catch (err) {
      console.error(err)
      alert('Error al actualizar estado.')
    }
  }

  // ── Auth ──
  const handleAuth = () => {
    if (passwordInput === settings.adminPassword) {
      setAdminAuth()
      setIsAuthenticated(true)
      setPasswordError('')
    } else {
      setPasswordError('Contraseña incorrecta')
      setPasswordInput('')
    }
  }

  const handleLogout = () => {
    clearAdminAuth()
    setIsAuthenticated(false)
    setPasswordInput('')
  }

  const handleSaveSettings = () => {
    setSettings(settingsForm)
    saveSettings(settingsForm)
    setShowSettings(false)
  }

  const toggleArr = (field: 'categories' | 'modality', val: string) =>
    setForm(f => ({ ...f, [field]: f[field].includes(val) ? f[field].filter(v => v !== val) : [...f[field], val] }))

  const addGallery = () => {
    const u = galleryInput.trim(); if (!u) return
    setForm(f => ({ ...f, gallery: [...f.gallery, u] })); setGalleryInput('')
  }
  const addService = () => {
    const s = serviceInput.trim(); if (!s || form.services.includes(s)) return
    setForm(f => ({ ...f, services: [...f.services, s] })); setServiceInput('')
  }

  // ── File → Supabase Storage ──
  const handleMainPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    try {
      const url = await uploadPhoto(file)
      setForm(f => ({ ...f, photo_url: url }))
    } catch (err) {
      console.error(err)
      alert('Error al subir la foto. Verificá la conexión a Supabase Storage.')
    }
    e.target.value = ''
  }

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    try {
      const urls = await Promise.all(files.map(uploadPhoto))
      setForm(f => ({ ...f, gallery: [...f.gallery, ...urls] }))
    } catch (err) {
      console.error(err)
      alert('Error al subir fotos de galería.')
    }
    setGalleryKey(k => k + 1)
  }

  // ── Password gate ──
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#2A153D] flex items-center justify-center px-4">
        <div className="bg-[#1F0F2E] border border-white/10 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
          <h1 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-[#D4AF37]" /> Panel Privé Relax
          </h1>
          <p className="text-sm text-white/40 mb-6">Ingresá la contraseña para continuar.</p>
          <div className="flex gap-2">
            <input
              type="password"
              value={passwordInput}
              onChange={e => { setPasswordInput(e.target.value); setPasswordError('') }}
              onKeyDown={e => e.key === 'Enter' && handleAuth()}
              placeholder="Contraseña"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#D4AF37]/50 transition-colors"
              autoFocus
            />
            <button onClick={handleAuth}
              className="bg-[#D4AF37] hover:bg-[#C49D2F] text-black font-bold px-4 py-2.5 rounded-lg text-sm transition-colors">
              Entrar
            </button>
          </div>
          {passwordError && <p className="mt-2 text-xs text-red-400">{passwordError}</p>}
          <p className="mt-4 text-[10px] text-white/20 text-center">Acceso restringido · Solo administradores</p>
        </div>
      </div>
    )
  }

  // ════════════════════════════════════════════════════════════════════
  // FORM VIEW
  // ════════════════════════════════════════════════════════════════════
  if (view === 'form') {
    return (
      <div className="min-h-screen bg-[#2A153D]">
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <button onClick={() => setView('list')} className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#D4AF37] mb-2 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Volver a la lista
              </button>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-[#D4AF37]" />
                {editingId ? 'Editar Perfil' : 'Nuevo Perfil'}
              </h1>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setView('list')} className="px-4 py-2.5 rounded-lg border border-white/10 text-white/70 text-sm hover:bg-white/5 transition-colors">
                Cancelar
              </button>
              <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C49D2F] disabled:opacity-60 text-black font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors">
                <Save className="h-4 w-4" /> {saving ? 'Guardando…' : editingId ? 'Guardar cambios' : 'Crear perfil'}
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {/* ── Información básica ── */}
            <div className="bg-[#1F0F2E] rounded-xl border border-white/5 p-6">
              <SectionHead icon={Users} label="Información básica" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FInput label="Nombre *" error={errors.name}>
                  <input className={inputCls(errors.name)} value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Valentina" />
                </FInput>
                <FInput label="Edad *" error={errors.age}>
                  <input type="number" className={inputCls(errors.age)} value={form.age}
                    onChange={e => setForm(f => ({ ...f, age: e.target.value }))} placeholder="25" min="18" max="99" />
                </FInput>
                <FInput label="Barrio / Zona *" error={errors.neighborhood}>
                  <input className={inputCls(errors.neighborhood)} value={form.neighborhood}
                    onChange={e => setForm(f => ({ ...f, neighborhood: e.target.value }))} placeholder="Palermo" />
                </FInput>
                <FInput label="Dirección completa">
                  <input className={inputCls()} value={form.location}
                    onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Palermo Soho, Buenos Aires" />
                </FInput>
              </div>
            </div>

            {/* ── Foto y galería ── */}
            <div className="bg-[#1F0F2E] rounded-xl border border-white/5 p-6">
              <SectionHead icon={ImageIcon} label="Foto y galería" />
              <div className="space-y-5">

                {/* Foto principal */}
                <FInput label="Foto principal *" error={errors.photo_url}>
                  <label className={`flex items-center justify-center gap-3 w-full border-2 border-dashed rounded-xl px-4 py-5 cursor-pointer transition-colors ${
                    errors.photo_url ? 'border-red-500/40 bg-red-500/5' : 'border-white/10 bg-white/[0.03] hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5'
                  }`}>
                    <input type="file" accept="image/*" className="hidden" onChange={handleMainPhotoUpload} />
                    <ImageIcon className="h-5 w-5 text-white/30" />
                    <div className="text-center">
                      <p className="text-sm text-white/60">Tocá para subir foto</p>
                      <p className="text-[11px] text-white/30 mt-0.5">JPG, PNG, WEBP · Máx. 10 MB</p>
                    </div>
                  </label>
                  {/* URL fallback */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-[10px] text-white/25 uppercase tracking-wider">o pegá una URL</span>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>
                  <input className={`mt-2 ${inputCls(errors.photo_url)}`} value={form.photo_url.startsWith('data:') ? '' : form.photo_url}
                    onChange={e => setForm(f => ({ ...f, photo_url: e.target.value }))} placeholder="https://..." />
                </FInput>

                {/* Preview foto principal */}
                {form.photo_url && (
                  <div className="relative group w-24 h-28 rounded-xl overflow-hidden ring-2 ring-[#D4AF37]/30">
                    <img src={form.photo_url} alt="preview" className="w-full h-full object-cover" />
                    <button type="button"
                      onClick={() => setForm(f => ({ ...f, photo_url: '' }))}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="h-5 w-5 text-white" />
                    </button>
                  </div>
                )}

                {/* Galería */}
                <FInput label="Galería (varias fotos)">
                  <label className="flex items-center justify-center gap-3 w-full border-2 border-dashed border-white/10 bg-white/[0.03] hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5 rounded-xl px-4 py-4 cursor-pointer transition-colors">
                    <input key={galleryKey} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
                    <Plus className="h-4 w-4 text-white/30" />
                    <span className="text-sm text-white/50">Agregar fotos a la galería</span>
                  </label>
                </FInput>

                {form.gallery.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {form.gallery.map((url, i) => (
                      <div key={i} className="relative group w-16 h-20 rounded-lg overflow-hidden ring-1 ring-white/10">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setForm(f => ({ ...f, gallery: f.gallery.filter((_, idx) => idx !== i) }))}
                          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── Descripción ── */}
            <div className="bg-[#1F0F2E] rounded-xl border border-white/5 p-6">
              <SectionHead icon={FileText} label="Descripción" />
              <FInput label="Descripción del perfil">
                <textarea className={`${inputCls()} resize-none`} rows={4} value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Descripción atractiva del perfil..." />
              </FInput>
            </div>

            {/* ── Categorías y servicios ── */}
            <div className="bg-[#1F0F2E] rounded-xl border border-white/5 p-6">
              <SectionHead icon={Tag} label="Categorías y servicios" />
              <div className="space-y-5">
                <FInput label="Categorías">
                  <div className="flex flex-wrap gap-2 mt-1">
                    {SERVICE_CATEGORIES.map(cat => (
                      <button key={cat} type="button" onClick={() => toggleArr('categories', cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          form.categories.includes(cat)
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                            : 'bg-transparent text-white/60 border-white/10 hover:border-white/30'
                        }`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </FInput>
                <FInput label="Modalidad de atención">
                  <div className="flex flex-wrap gap-2 mt-1">
                    {MODALITY_OPTIONS.map(m => (
                      <button key={m} type="button" onClick={() => toggleArr('modality', m)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          form.modality.includes(m)
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                            : 'bg-transparent text-white/60 border-white/10 hover:border-white/30'
                        }`}>
                        {m}
                      </button>
                    ))}
                  </div>
                </FInput>
                <FInput label="Servicios">
                  <div className="flex gap-2 mb-2">
                    <input className={inputCls()} value={serviceInput}
                      onChange={e => setServiceInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addService())}
                      placeholder="Masaje relajante…" />
                    <button onClick={addService} className="shrink-0 px-3 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-colors">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  {form.services.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {form.services.map((s, i) => (
                        <span key={i} className="inline-flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-xs text-white/70">
                          {s}
                          <button onClick={() => setForm(f => ({ ...f, services: f.services.filter((_, idx) => idx !== i) }))}
                            className="text-white/40 hover:text-red-400 transition-colors">
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </FInput>
                <FInput label="Rango de precios">
                  <input className={inputCls()} value={form.priceRange}
                    onChange={e => setForm(f => ({ ...f, priceRange: e.target.value }))} placeholder="$5.000 - $10.000" />
                </FInput>
              </div>
            </div>

            {/* ── Disponibilidad ── */}
            <div className="bg-[#1F0F2E] rounded-xl border border-white/5 p-6">
              <SectionHead icon={Clock} label="Disponibilidad" />
              <div className="space-y-5">
                <FInput label="Horario de atención">
                  <input className={inputCls()} value={form.workingHours}
                    onChange={e => setForm(f => ({ ...f, workingHours: e.target.value }))}
                    placeholder="10:00 - 22:00" />
                </FInput>
                <FInput label="Días disponibles">
                  <div className="flex flex-wrap gap-2 mt-1">
                    {DAYS_OF_WEEK.map(day => (
                      <button key={day} type="button"
                        onClick={() => setForm(f => ({
                          ...f,
                          availableDays: f.availableDays.includes(day)
                            ? f.availableDays.filter(d => d !== day)
                            : [...f.availableDays, day],
                        }))}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          form.availableDays.includes(day)
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                            : 'bg-transparent text-white/60 border-white/10 hover:border-white/30'
                        }`}>
                        {day}
                      </button>
                    ))}
                  </div>
                </FInput>
                <label className="flex items-center gap-4 p-3 rounded-lg border border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${form.reviewsEnabled ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                    <MessageSquareOff className={`h-5 w-5 ${form.reviewsEnabled ? 'text-emerald-400' : 'text-white/20'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Comentarios habilitados</p>
                    <p className="text-xs text-white/40 mt-0.5">Mostrar la sección de reseñas en el perfil público</p>
                  </div>
                  <Toggle value={form.reviewsEnabled} onChange={() => setForm(f => ({ ...f, reviewsEnabled: !f.reviewsEnabled }))} />
                </label>
              </div>
            </div>

            {/* ── Membresía ── */}
            <div className="bg-[#1F0F2E] rounded-xl border border-white/5 p-6">
              <SectionHead icon={TrendingUp} label="Membresía" />
              <FInput label="Nivel de membresía">
                <select className={`${inputCls()} cursor-pointer`} value={form.level}
                  onChange={e => setForm(f => ({ ...f, level: Number(e.target.value) as MembershipLevel }))}>
                  {([5, 4, 3, 2, 1] as MembershipLevel[]).map(l => (
                    <option key={l} value={l} className="bg-[#1F0F2E]">
                      Nivel {l} — {MEMBERSHIP_LEVELS[l].name}
                    </option>
                  ))}
                </select>
              </FInput>
            </div>

            {/* ── Verificación ── */}
            <div className="bg-[#1F0F2E] rounded-xl border border-white/5 p-6">
              <SectionHead icon={Shield} label="Verificación y estado" />
              <div className="space-y-2">
                {([
                  { field: 'docVerified' as keyof PF, label: 'Documento verificado', desc: 'Se verificó identidad con documento oficial válido', icon: FileCheck },
                  { field: 'contentVerified' as keyof PF, label: 'Contenido verificado', desc: 'Las fotos corresponden a la persona real (sin retoques engañosos)', icon: ImageIcon },
                  { field: 'verified' as keyof PF, label: 'Badge de verificación (público)', desc: 'Muestra el tilde dorado en el perfil visible a los clientes', icon: Check },
                  { field: 'isOnline' as keyof PF, label: 'Disponible ahora', desc: 'Muestra el indicador verde de disponibilidad en tiempo real', icon: UserCheck },
                ] as const).map(({ field, label, desc, icon: Icon }) => (
                  <label key={field} className="flex items-center gap-4 p-3 rounded-lg border border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${(form[field] as boolean) ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                      <Icon className={`h-5 w-5 transition-colors ${(form[field] as boolean) ? 'text-emerald-400' : 'text-white/20'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{label}</p>
                      <p className="text-xs text-white/40 mt-0.5">{desc}</p>
                    </div>
                    <Toggle value={form[field] as boolean} onChange={() => setForm(f => ({ ...f, [field]: !f[field] }))} />
                  </label>
                ))}
              </div>
            </div>

            {/* ── Contacto ── */}
            <div className="bg-[#1F0F2E] rounded-xl border border-white/5 p-6">
              <SectionHead icon={Phone} label="Contacto" />
              <FInput label="WhatsApp * (formato internacional)" error={errors.whatsapp}>
                <input className={inputCls(errors.whatsapp)} value={form.whatsapp}
                  onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))} placeholder="+5491123456789" />
              </FInput>
              {form.whatsapp && !errors.whatsapp && (
                <a
                  href={`https://wa.me/${form.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-xs text-[#25D366] hover:underline"
                >
                  <ExternalLink className="h-3 w-3" /> Probar enlace de WhatsApp
                </a>
              )}
              <p className="mt-2 text-[10px] text-white/30">Ejemplo correcto: +5491112345678 (código país + código área sin 0 + número)</p>
            </div>

            {/* Bottom save buttons */}
            <div className="flex gap-3 justify-end pb-8">
              <button onClick={() => setView('list')} className="px-5 py-2.5 rounded-lg border border-white/10 text-white/70 text-sm hover:bg-white/5 transition-colors">
                Cancelar
              </button>
              <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C49D2F] disabled:opacity-60 text-black font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
                <Save className="h-4 w-4" /> {saving ? 'Guardando…' : editingId ? 'Guardar cambios' : 'Crear perfil'}
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // ════════════════════════════════════════════════════════════════════
  // LIST VIEW
  // ════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#2A153D]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">

        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#D4AF37] mb-2 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Volver al directorio
            </Link>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Shield className="h-6 w-6 text-[#D4AF37]" /> Panel de Administración
            </h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { setShowSettings(s => !s); setSettingsForm(settings) }}
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 px-3 py-2.5 rounded-lg text-sm transition-colors">
              <Settings className="h-4 w-4" />
            </button>
            <button onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 px-3 py-2.5 rounded-lg text-sm transition-colors" title="Cerrar sesión">
              <LogOut className="h-4 w-4" />
            </button>
            <button onClick={openNew}
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C49D2F] text-black font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors">
              <Plus className="h-4 w-4" /> Nuevo Perfil
            </button>
          </div>
        </div>

        {/* ── Settings Panel ── */}
        {showSettings && (
          <div className="mb-6 bg-[#1F0F2E] rounded-xl border border-[#D4AF37]/20 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-4 flex items-center gap-2">
              <Settings className="h-3.5 w-3.5" /> Configuración del Panel
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Tu WhatsApp (contacto del sitio)</label>
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#D4AF37]/50"
                  value={settingsForm.ownerWhatsapp}
                  onChange={e => setSettingsForm(f => ({ ...f, ownerWhatsapp: e.target.value }))}
                  placeholder="+5491112345678"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Tu Email</label>
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#D4AF37]/50"
                  value={settingsForm.ownerEmail}
                  onChange={e => setSettingsForm(f => ({ ...f, ownerEmail: e.target.value }))}
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Contraseña del panel</label>
                <input
                  type="password"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#D4AF37]/50"
                  value={settingsForm.adminPassword}
                  onChange={e => setSettingsForm(f => ({ ...f, adminPassword: e.target.value }))}
                  placeholder="Nueva contraseña"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleSaveSettings}
                className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C49D2F] text-black font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                <Save className="h-4 w-4" /> Guardar configuración
              </button>
              <button onClick={() => setShowSettings(false)}
                className="px-4 py-2 rounded-lg border border-white/10 text-white/60 text-sm hover:bg-white/5 transition-colors">
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* ── Owner contact shortcuts ── */}
        {(settings.ownerWhatsapp || settings.ownerEmail) && (
          <div className="mb-6 flex flex-wrap items-center gap-4 bg-white/3 border border-white/5 rounded-xl px-4 py-3">
            <span className="text-[10px] uppercase tracking-widest text-white/30">Mis contactos</span>
            {settings.ownerWhatsapp && (
              <a href={`https://wa.me/${settings.ownerWhatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#25D366] hover:underline">
                <Phone className="h-3.5 w-3.5" /> {settings.ownerWhatsapp}
              </a>
            )}
            {settings.ownerEmail && (
              <a href={`mailto:${settings.ownerEmail}`}
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:underline">
                <Mail className="h-3.5 w-3.5" /> {settings.ownerEmail}
              </a>
            )}
          </div>
        )}

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {[
            { icon: Users,       label: 'Perfiles',   value: profiles.length,                             color: 'text-white',       bg: 'bg-white/5'           },
            { icon: UserCheck,   label: 'Activos',    value: activeCount,                                 color: 'text-emerald-400', bg: 'bg-emerald-500/10'    },
            { icon: PauseCircle, label: 'Pausados',   value: pausedCount,                              color: 'text-amber-400',   bg: 'bg-amber-500/10'      },
            { icon: Eye,         label: 'Visitas',    value: totalViews.toLocaleString('es-AR'),          color: 'text-blue-400',    bg: 'bg-blue-500/10'       },
            { icon: MessageCircle, label: 'Clicks WA', value: totalClicks.toLocaleString('es-AR'),        color: 'text-[#25D366]',   bg: 'bg-emerald-500/10'    },
            { icon: Percent,     label: 'Conv. Rate', value: `${globalConversion}%`,                      color: 'text-[#D4AF37]',   bg: 'bg-yellow-500/10'     },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className={`${bg} border border-white/5 rounded-xl p-4`}>
              <Icon className={`h-4 w-4 mb-2 ${color}`} />
              <p className={`text-xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-white/40 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Top profiles strip */}
        <div className="mb-6 bg-[#1F0F2E] rounded-xl border border-white/5 p-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3 flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5" /> Más visitadas
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {topProfiles.map((t, i) => (
              <div key={t.id} className="flex-shrink-0 flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-[#D4AF37]/40 shrink-0">
                  <img src={t.photo_url} alt={t.name} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white leading-none">{t.name}</p>
                  <p className="text-[10px] text-white/40 mt-0.5">#{i + 1} · {t.profileViews?.toLocaleString('es-AR')} vis.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending verification alert */}
        {unverifiedCount > 0 && (
          <div className="mb-6 flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
            <p className="text-sm text-amber-300">
              <span className="font-semibold">{unverifiedCount} perfil{unverifiedCount > 1 ? 'es' : ''}</span>
              {' '}pendiente{unverifiedCount > 1 ? 's' : ''} de verificación completa.
              {' '}Editá cada perfil para completar el proceso.
            </p>
          </div>
        )}

        {/* Profile table */}
        <div className="bg-[#1F0F2E] rounded-xl border border-white/5 overflow-hidden">
          {loadingProfiles ? (
            <div className="flex items-center justify-center gap-3 py-16 text-white/40 text-sm">
              <div className="w-5 h-5 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
              Cargando perfiles…
            </div>
          ) : (
            <>
          <div className="p-5 border-b border-white/5 flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#D4AF37] shrink-0">
              Gestión de Perfiles
            </h2>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input type="text" placeholder="Buscar por nombre o zona…" value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-[#D4AF37]/40 transition-colors" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-white/40">Perfil</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-white/40 hidden sm:table-cell">Zona</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-white/40 hidden md:table-cell">Nivel</th>
                  <th className="text-center px-4 py-3 text-xs uppercase tracking-wider text-white/40 hidden lg:table-cell">Verificación</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-white/40 hidden sm:table-cell">Visitas</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-white/40 hidden md:table-cell">WA</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-white/40 hidden xl:table-cell">Conv.</th>
                  <th className="text-center px-4 py-3 text-xs uppercase tracking-wider text-white/40">Estado</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-white/40">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(t => {
                  const isPaused = t.isPaused ?? false
                  const docV = t.docVerified ?? false
                  const contentV = t.contentVerified ?? false
                  const conv = t.profileViews ? ((t.whatsappClicks ?? 0) / t.profileViews * 100).toFixed(1) : null
                  return (
                    <tr key={t.id} className={`border-b border-white/5 transition-colors ${isPaused ? 'opacity-50' : 'hover:bg-white/[0.02]'}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-1 ring-white/10">
                            <img src={t.photo_url} alt={t.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <Link href={therapistUrl(t.id, t.name)} className="text-white font-medium hover:text-[#D4AF37] transition-colors text-sm">
                              {t.name}
                            </Link>
                            <p className="text-[10px] text-white/40">{t.age} años</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white/60 text-xs hidden sm:table-cell">{t.neighborhood}</td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border ${levelBg[t.level]} ${levelColors[t.level]}`}>
                          {MEMBERSHIP_LEVELS[t.level].name}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <div className="flex items-center justify-center gap-1.5">
                          <span title="Documento" className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border ${docV ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10' : 'text-white/30 border-white/5 bg-white/5'}`}>
                            <FileCheck className="h-3 w-3" /> Doc
                          </span>
                          <span title="Fotos" className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border ${contentV ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10' : 'text-white/30 border-white/5 bg-white/5'}`}>
                            <ImageIcon className="h-3 w-3" /> Foto
                          </span>
                          <span title="Badge público" className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border ${t.verified ? 'text-[#D4AF37] border-[#D4AF37]/20 bg-[#D4AF37]/10' : 'text-white/30 border-white/5 bg-white/5'}`}>
                            <Check className="h-3 w-3" /> OK
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-xs text-white/60 hidden sm:table-cell">
                        {t.profileViews?.toLocaleString('es-AR') ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-right text-xs text-[#25D366] hidden md:table-cell">
                        {t.whatsappClicks ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-right hidden xl:table-cell">
                        {conv !== null ? (
                          <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                            Number(conv) >= 10 ? 'text-emerald-400' : Number(conv) >= 5 ? 'text-yellow-400' : 'text-white/40'
                          }`}>
                            <ArrowUpRight className="h-3 w-3" />{conv}%
                          </span>
                        ) : <span className="text-white/20 text-xs">—</span>}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${isPaused ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                          {isPaused ? 'Pausado' : 'Activo'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(t)} title="Editar"
                            className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-md border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition-colors">
                            <Pencil className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Editar</span>
                          </button>
                          <button onClick={() => togglePause(t.id)} title={isPaused ? 'Activar' : 'Pausar'}
                            className={`inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-md border transition-colors ${
                              isPaused
                                ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                                : 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10'
                            }`}>
                            {isPaused ? <PlayCircle className="h-3.5 w-3.5" /> : <PauseCircle className="h-3.5 w-3.5" />}
                            <span className="hidden sm:inline">{isPaused ? 'Activar' : 'Pausar'}</span>
                          </button>
                          <button onClick={() => setDeleteId(t.id)} title="Eliminar"
                            className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-md border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">
                            <Trash2 className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Eliminar</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-14 text-center text-white/30 text-sm">
                      No se encontraron perfiles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
            </>
          )}
        </div>
      </main>

      {/* ── Delete confirmation modal ── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setDeleteId(null)}>
          <div className="bg-[#1F0F2E] border border-white/10 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Trash2 className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Eliminar perfil</h3>
                <p className="text-xs text-white/50 mt-1">Esta acción no se puede deshacer.</p>
              </div>
            </div>
            <p className="text-sm text-white/60 mb-6">
              ¿Estás seguro que querés eliminar el perfil de{' '}
              <span className="text-white font-semibold">{profiles.find(p => p.id === deleteId)?.name}</span>?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-lg border border-white/10 text-white/70 text-sm hover:bg-white/5 transition-colors">
                Cancelar
              </button>
              <button onClick={handleDelete}
                className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
