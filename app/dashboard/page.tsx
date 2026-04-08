'use client'
import Link from 'next/link'
import { ArrowLeft, Eye, MessageCircle, Trophy, TrendingUp, Globe, User, ArrowUpRight, Percent } from 'lucide-react'
import { Header } from '@/components/header'
import { mockTherapists, MEMBERSHIP_LEVELS } from '@/lib/mock-data'

// Demo: shows stats for the first therapist (Valentina)
const therapist = mockTherapists[0]

const mockActivity = [
  { day: 'Hoy',  visits: 24, clicks: 3 },
  { day: 'Ayer', visits: 18, clicks: 2 },
  { day: 'Lun',  visits: 31, clicks: 5 },
  { day: 'Dom',  visits: 42, clicks: 7 },
  { day: 'Sáb',  visits: 58, clicks: 9 },
  { day: 'Vie',  visits: 47, clicks: 6 },
  { day: 'Jue',  visits: 35, clicks: 4 },
]

const mockCountries = [
  { country: 'Argentina', flag: '🇦🇷', pct: 78 },
  { country: 'Uruguay',   flag: '🇺🇾', pct: 9  },
  { country: 'Chile',     flag: '🇨🇱', pct: 7  },
  { country: 'España',    flag: '🇪🇸', pct: 4  },
  { country: 'Otros',     flag: '🌍', pct: 2  },
]

const sorted  = [...mockTherapists].sort((a, b) => (b.profileViews ?? 0) - (a.profileViews ?? 0))
const ranking = sorted.findIndex(t => t.id === therapist.id) + 1
const levelInfo = MEMBERSHIP_LEVELS[therapist.level]

const conversionRate = therapist.profileViews
  ? ((therapist.whatsappClicks ?? 0) / therapist.profileViews * 100).toFixed(1)
  : '0.0'

const weekVisits  = mockActivity.reduce((s, r) => s + r.visits, 0)
const weekClicks  = mockActivity.reduce((s, r) => s + r.clicks, 0)
const maxVisits   = Math.max(...mockActivity.map(r => r.visits))

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#2A153D]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#D4AF37] mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Volver al directorio
        </Link>

        {/* Welcome */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#D4AF37]/60">
            <img src={therapist.photo_url} alt={therapist.name} className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-white/50 text-sm">Bienvenida de vuelta</p>
            <h1 className="text-2xl font-bold text-white">{therapist.name}</h1>
            <span className="text-xs text-[#D4AF37] font-medium">{levelInfo.name}</span>
          </div>
          <Link
            href={`/therapists/${therapist.id}`}
            className="ml-auto flex items-center gap-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <User className="h-4 w-4" /> Ver mi perfil
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: Eye,
              label: 'Visitas totales',
              value: therapist.profileViews?.toLocaleString('es-AR') ?? '0',
              sub: `+${weekVisits} esta semana`,
              color: 'text-blue-400',
              bg: 'bg-blue-500/10 border-blue-500/10',
              trend: '+12%',
            },
            {
              icon: MessageCircle,
              label: 'Clicks WhatsApp',
              value: therapist.whatsappClicks?.toLocaleString('es-AR') ?? '0',
              sub: `+${weekClicks} esta semana`,
              color: 'text-[#25D366]',
              bg: 'bg-emerald-500/10 border-emerald-500/10',
              trend: '+8%',
            },
            {
              icon: Percent,
              label: 'Conversión',
              value: `${conversionRate}%`,
              sub: 'visitas → contacto',
              color: 'text-[#D4AF37]',
              bg: 'bg-yellow-500/10 border-yellow-500/10',
              trend: null,
            },
            {
              icon: Trophy,
              label: 'Posición ranking',
              value: `#${ranking}`,
              sub: `de ${mockTherapists.length} perfiles`,
              color: 'text-purple-400',
              bg: 'bg-purple-500/10 border-purple-500/10',
              trend: null,
            },
          ].map(({ icon: Icon, label, value, sub, color, bg, trend }) => (
            <div key={label} className={`${bg} border rounded-xl p-4 flex flex-col justify-between`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-white/50 uppercase tracking-wider leading-tight">{label}</p>
                <Icon className={`h-4 w-4 shrink-0 ${color}`} />
              </div>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-[11px] text-white/30">{sub}</p>
                {trend && (
                  <span className="flex items-center gap-0.5 text-[10px] text-emerald-400 font-semibold">
                    <ArrowUpRight className="h-3 w-3" />{trend}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Activity chart */}
          <div className="bg-[#1F0F2E] rounded-xl border border-white/5 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-5 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Actividad reciente (7 días)
            </h2>
            <div className="space-y-3">
              {mockActivity.map(row => {
                const visitPct = Math.round((row.visits / maxVisits) * 100)
                const clickPct = Math.round((row.clicks / maxVisits) * 100)
                return (
                  <div key={row.day} className="flex items-center gap-3 text-sm">
                    <span className="w-8 text-white/40 text-xs shrink-0">{row.day}</span>
                    <div className="flex-1 relative h-5 flex flex-col gap-0.5 justify-center">
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-blue-400/60 transition-all" style={{ width: `${visitPct}%` }} />
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-[#25D366]/70 transition-all" style={{ width: `${clickPct}%` }} />
                      </div>
                    </div>
                    <span className="text-blue-300 text-xs w-7 text-right tabular-nums">{row.visits}</span>
                    <span className="text-[#25D366] text-xs w-5 text-right tabular-nums">{row.clicks}</span>
                  </div>
                )
              })}
              <div className="flex items-center gap-3 pt-2 border-t border-white/5 text-[10px] text-white/30">
                <span className="w-8" />
                <div className="flex-1 flex items-center gap-4">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400/60 inline-block" />Visitas</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#25D366]/70 inline-block" />WA</span>
                </div>
                <span className="w-7 text-right text-blue-300/50">{weekVisits}</span>
                <span className="w-5 text-right text-[#25D366]/50">{weekClicks}</span>
              </div>
            </div>
          </div>

          {/* Country breakdown */}
          <div className="bg-[#1F0F2E] rounded-xl border border-white/5 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-5 flex items-center gap-2">
              <Globe className="h-4 w-4" /> Origen de visitas
            </h2>
            <div className="space-y-3">
              {mockCountries.map(c => (
                <div key={c.country} className="flex items-center gap-3 text-sm">
                  <span className="text-base shrink-0">{c.flag}</span>
                  <span className="text-white/70 text-xs w-20 shrink-0">{c.country}</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#D4AF37]/60"
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                  <span className="text-white/40 text-xs w-8 text-right">{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
