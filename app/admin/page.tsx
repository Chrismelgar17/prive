'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Eye, MessageCircle, Users, UserCheck, PauseCircle, PlayCircle, TrendingUp, Shield } from 'lucide-react'
import { Header } from '@/components/header'
import { mockTherapists, MEMBERSHIP_LEVELS, MembershipLevel } from '@/lib/mock-data'

const levelColors: Record<MembershipLevel, string> = {
  5: 'text-yellow-400',
  4: 'text-red-400',
  3: 'text-blue-400',
  2: 'text-yellow-500',
  1: 'text-gray-400',
}

export default function AdminPage() {
  const [pausedIds, setPausedIds] = useState<Set<string>>(new Set())

  const togglePause = (id: string) => {
    setPausedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const activeCount = mockTherapists.length - pausedIds.size
  const totalViews = mockTherapists.reduce((s, t) => s + (t.profileViews ?? 0), 0)
  const totalClicks = mockTherapists.reduce((s, t) => s + (t.whatsappClicks ?? 0), 0)

  const sorted = [...mockTherapists].sort((a, b) => (b.profileViews ?? 0) - (a.profileViews ?? 0))

  return (
    <div className="min-h-screen bg-[#2A153D]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#D4AF37] mb-2 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Volver al directorio
            </Link>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Shield className="h-6 w-6 text-[#D4AF37]" /> Panel de Administración
            </h1>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {[
            { icon: Users, label: 'Total Perfiles', value: mockTherapists.length, color: 'text-white' },
            { icon: UserCheck, label: 'Activos', value: activeCount, color: 'text-emerald-400' },
            { icon: PauseCircle, label: 'Pausados', value: pausedIds.size, color: 'text-amber-400' },
            { icon: Eye, label: 'Total Visitas', value: totalViews.toLocaleString('es-AR'), color: 'text-blue-400' },
            { icon: MessageCircle, label: 'Total Clicks WA', value: totalClicks.toLocaleString('es-AR'), color: 'text-[#25D366]' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-[#1F0F2E] rounded-xl p-4 border border-white/5">
              <Icon className={`h-5 w-5 mb-2 ${color}`} />
              <p className={`text-xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-white/40 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Top profiles */}
        <div className="mb-8 bg-[#1F0F2E] rounded-xl border border-white/5 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#D4AF37] mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> Perfiles más vistos
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {sorted.slice(0, 5).map((t, i) => (
              <div key={t.id} className="flex-shrink-0 w-32 text-center">
                <div className="relative w-16 aspect-square rounded-full overflow-hidden mx-auto mb-2 ring-2 ring-[#D4AF37]/40">
                  <img src={t.photo_url} alt={t.name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-[#D4AF37] text-black text-[9px] font-bold flex items-center justify-center">
                    #{i + 1}
                  </div>
                </div>
                <p className="text-xs font-semibold text-white">{t.name}</p>
                <p className="text-[10px] text-white/40">{t.profileViews?.toLocaleString('es-AR')} visitas</p>
              </div>
            ))}
          </div>
        </div>

        {/* Therapist Table */}
        <div className="bg-[#1F0F2E] rounded-xl border border-white/5 overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#D4AF37]">Gestión de Perfiles</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-white/40">Perfil</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-white/40 hidden sm:table-cell">Barrio</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-white/40 hidden md:table-cell">Nivel</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-white/40">Visitas</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-white/40 hidden sm:table-cell">WA</th>
                  <th className="text-center px-4 py-3 text-xs uppercase tracking-wider text-white/40">Estado</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-white/40">Acción</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map(t => {
                  const isPaused = pausedIds.has(t.id)
                  return (
                    <tr key={t.id} className={`border-b border-white/5 transition-colors ${isPaused ? 'opacity-40' : 'hover:bg-white/3'}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 ring-white/10">
                            <img src={t.photo_url} alt={t.name} className="absolute inset-0 w-full h-full object-cover" />
                          </div>
                          <div>
                            <Link href={`/therapists/${t.id}`} className="text-white font-medium hover:text-[#D4AF37] transition-colors">
                              {t.name}
                            </Link>
                            <p className="text-[10px] text-white/40">{t.age} años</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white/60 text-xs hidden sm:table-cell">{t.neighborhood}</td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className={`text-xs font-medium ${levelColors[t.level]}`}>
                          {MEMBERSHIP_LEVELS[t.level].name}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-white text-xs">{t.profileViews?.toLocaleString('es-AR') ?? '—'}</span>
                      </td>
                      <td className="px-4 py-3 text-right hidden sm:table-cell">
                        <span className="text-[#25D366] text-xs">{t.whatsappClicks ?? '—'}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${isPaused ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                          {isPaused ? 'Pausado' : 'Activo'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => togglePause(t.id)}
                          className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border transition-colors ${
                            isPaused
                              ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                              : 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10'
                          }`}
                        >
                          {isPaused ? <PlayCircle className="h-3.5 w-3.5" /> : <PauseCircle className="h-3.5 w-3.5" />}
                          {isPaused ? 'Activar' : 'Pausar'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
