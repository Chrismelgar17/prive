'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, CheckCircle, Star, Shield, TrendingUp } from 'lucide-react'
import { Header } from '@/components/header'

const NEIGHBORHOODS = [
  'Almagro', 'Belgrano', 'Caballito', 'Chacarita', 'Colegiales', 'Flores',
  'La Boca', 'Núñez', 'Palermo', 'Puerto Madero', 'Recoleta', 'Retiro',
  'San Telmo', 'Villa Crespo', 'Villa Devoto', 'Villa Urquiza', 'Otro',
]

const SERVICES = ['Masaje Relajante', 'Descontracturante', 'Aromaterapia', 'Masaje Tailandés', 'Shiatsu', 'Reflexología', 'Lomi Lomi', 'Masaje Deportivo', 'Piedras Calientes', 'Masaje Sueco']

const MODALITY = ['Lugar propio', 'Domicilio', 'Hotel']

export default function LoginPage() {
  const [form, setForm] = useState({ name: '', age: '', whatsapp: '', neighborhood: '', description: '', modality: [] as string[], services: [] as string[] })
  const [submitted, setSubmitted] = useState(false)

  const toggleArray = (field: 'modality' | 'services', value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#2A153D]">
        <Header />
        <div className="mx-auto max-w-lg px-4 py-20 text-center">
          <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-3">¡Solicitud enviada!</h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Recibimos tu solicitud. Nuestro equipo revisará tu perfil y te contactará por WhatsApp en las próximas 24–48 hs. para completar el proceso.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8962e] text-black font-semibold px-6 py-3 rounded-lg transition-colors">
            Volver al directorio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#2A153D]">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#D4AF37] mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Volver al directorio
        </Link>

        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">Publicá tu Perfil en Privé Relax</h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Llegá a miles de clientes exclusivos en Buenos Aires. Completá el formulario y nuestro equipo se contactará con vos.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: TrendingUp, title: 'Más visibilidad', desc: 'Tu perfil llegará a miles de usuarios premium.' },
            { icon: Shield, title: 'Perfil verificado', desc: 'Badge de verificación para más confianza.' },
            { icon: Star, title: 'Panel propio', desc: 'Estadísticas de visitas y clicks en tiempo real.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-[#1F0F2E] border border-white/5 rounded-xl p-5 text-center">
              <Icon className="h-6 w-6 text-[#D4AF37] mx-auto mb-3" />
              <p className="text-sm font-semibold text-white mb-1">{title}</p>
              <p className="text-xs text-white/50">{desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-[#1F0F2E] border border-white/5 rounded-2xl p-6 space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#D4AF37] mb-2">Formulario de solicitud</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">Nombre *</label>
              <input
                required
                type="text"
                placeholder="Tu nombre artístico"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full bg-[#3D1F54] border border-white/10 focus:border-[#D4AF37]/50 rounded-lg px-4 py-2.5 text-sm text-white outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">Edad *</label>
              <input
                required
                type="number"
                min={18}
                max={60}
                placeholder="Ej: 25"
                value={form.age}
                onChange={e => setForm(p => ({ ...p, age: e.target.value }))}
                className="w-full bg-[#3D1F54] border border-white/10 focus:border-[#D4AF37]/50 rounded-lg px-4 py-2.5 text-sm text-white outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">WhatsApp *</label>
              <input
                required
                type="tel"
                placeholder="+549 11 XXXX-XXXX"
                value={form.whatsapp}
                onChange={e => setForm(p => ({ ...p, whatsapp: e.target.value }))}
                className="w-full bg-[#3D1F54] border border-white/10 focus:border-[#D4AF37]/50 rounded-lg px-4 py-2.5 text-sm text-white outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">Barrio *</label>
              <select
                required
                value={form.neighborhood}
                onChange={e => setForm(p => ({ ...p, neighborhood: e.target.value }))}
                className="w-full bg-[#3D1F54] border border-white/10 focus:border-[#D4AF37]/50 rounded-lg px-4 py-2.5 text-sm text-white outline-none transition-colors"
              >
                <option value="">Seleccioná un barrio</option>
                {NEIGHBORHOODS.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">Descripción</label>
            <textarea
              rows={3}
              placeholder="Contanos sobre vos, tu experiencia y qué ofrecés..."
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              className="w-full bg-[#3D1F54] border border-white/10 focus:border-[#D4AF37]/50 rounded-lg px-4 py-2.5 text-sm text-white outline-none transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs text-white/50 uppercase tracking-wider mb-3">Modalidad de atención</label>
            <div className="flex flex-wrap gap-2">
              {MODALITY.map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleArray('modality', m)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all border ${
                    form.modality.includes(m)
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37]/60 text-[#D4AF37]'
                      : 'bg-transparent border-white/10 text-white/60 hover:border-white/25'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/50 uppercase tracking-wider mb-3">Servicios que ofrecés</label>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleArray('services', s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    form.services.includes(s)
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37]/60 text-[#D4AF37]'
                      : 'bg-transparent border-white/10 text-white/60 hover:border-white/25'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#D4AF37] hover:bg-[#b8962e] text-black font-bold py-3.5 rounded-xl transition-colors text-sm uppercase tracking-wider mt-2"
          >
            Enviar solicitud
          </button>
        </form>

        {/* Contact */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm mb-3">¿Tenés dudas? Hablá con nosotros directamente</p>
          <a
            href="https://wa.me/5491100000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            <MessageCircle className="h-4 w-4" /> Consultar por WhatsApp
          </a>
        </div>
      </main>
    </div>
  )
}
