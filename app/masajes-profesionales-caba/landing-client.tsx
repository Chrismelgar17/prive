'use client'
import Link from 'next/link'
import { trackConversion, trackEvent } from '@/lib/gtag'

const ZONES = [
  { label: 'Palermo', href: '/palermo' },
  { label: 'Recoleta', href: '/recoleta' },
  { label: 'Belgrano', href: '/belgrano' },
  { label: 'Caballito', href: '/caballito' },
  { label: 'Almagro', href: '/almagro' },
  { label: 'Flores', href: '/flores' },
]

const SERVICES = [
  { icon: '🤍', label: 'Masajes relajantes', desc: 'Desconexión y bienestar general' },
  { icon: '💪', label: 'Masajes descontracturantes', desc: 'Alivio de contracturas y tensión' },
  { icon: '🩺', label: 'Masajes terapéuticos', desc: 'Orientados a molestias físicas' },
  { icon: '🦶', label: 'Reflexología podal', desc: 'Bienestar desde los pies' },
]

function handleCTA(label: string) {
  trackConversion()
  trackEvent('click', 'CTA', label)
}

export default function LandingClient() {
  return (
    <div className="min-h-screen bg-background text-white">

      {/* Minimal header */}
      <header className="border-b border-white/10 bg-background/95 backdrop-blur h-14 flex items-center justify-center px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo.jpeg" alt="Privé Relax" width={36} height={36} className="h-9 w-9 object-contain rounded-full" />
          <span className="font-semibold text-white text-sm tracking-wide">Privé Relax</span>
        </Link>
      </header>

      <main>

        {/* Hero */}
        <section className="px-4 sm:px-6 pt-12 pb-10 text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] mb-4 font-medium">
            Buenos Aires · CABA
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
            Masajes Profesionales en <span className="text-[#D4AF37]">CABA</span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Encontrá masajistas profesionales en Buenos Aires. Relajantes, descontracturantes,
            terapéuticos y reflexología. Contacto directo por WhatsApp, sin intermediarios.
          </p>

          <Link
            href="/"
            onClick={() => handleCTA('hero-ver-perfiles')}
            className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8962e] text-black font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-colors shadow-lg shadow-[#D4AF37]/20"
          >
            Ver perfiles disponibles →
          </Link>

          <p className="mt-4 text-xs text-white/30">Sin registro · Contacto directo · Sin comisiones</p>
        </section>

        {/* Servicios */}
        <section className="px-4 sm:px-6 py-10 max-w-3xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 text-center mb-6">
            Tipos de masaje disponibles
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SERVICES.map((s) => (
              <div
                key={s.label}
                className="border border-white/10 rounded-xl p-4 bg-black/20 text-center"
              >
                <div className="text-2xl mb-2">{s.icon}</div>
                <p className="text-xs font-semibold text-white mb-1">{s.label}</p>
                <p className="text-[11px] text-white/40 leading-tight">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Zonas */}
        <section className="px-4 sm:px-6 py-10 max-w-3xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 text-center mb-6">
            Disponible en toda CABA
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {ZONES.map((z) => (
              <Link
                key={z.href}
                href={z.href}
                onClick={() => handleCTA(`zona-${z.label.toLowerCase()}`)}
                className="border border-white/15 hover:border-[#D4AF37]/40 rounded-full px-4 py-1.5 text-xs text-white/60 hover:text-white transition-colors"
              >
                {z.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Trust signals */}
        <section className="px-4 sm:px-6 py-10 max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: '100%', label: 'Profesionales independientes' },
              { value: 'Gratis', label: 'Sin registro para ver perfiles' },
              { value: 'Directo', label: 'Contacto por WhatsApp' },
            ].map((item) => (
              <div key={item.label} className="border border-white/10 rounded-xl p-4 bg-black/20">
                <p className="text-[#D4AF37] font-bold text-lg mb-1">{item.value}</p>
                <p className="text-[11px] text-white/40 leading-tight">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="px-4 sm:px-6 py-12 text-center max-w-xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-3">
            ¿Buscás una masajista en CABA?
          </h2>
          <p className="text-white/50 text-sm mb-6">
            Explorá todos los perfiles disponibles, filtrá por zona o tipo de masaje y contactate directamente.
          </p>
          <Link
            href="/"
            onClick={() => handleCTA('bottom-ver-perfiles')}
            className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8962e] text-black font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-colors"
          >
            Ver todos los perfiles →
          </Link>
        </section>

      </main>

      {/* Minimal footer */}
      <footer className="border-t border-white/8 px-4 py-6 text-center">
        <p className="text-[11px] text-white/25">
          © {new Date().getFullYear()} Privé Relax · Directorio de masajistas profesionales en Buenos Aires
          {' '}·{' '}
          <Link href="/privacidad" className="hover:text-white/40 transition-colors">Privacidad</Link>
        </p>
      </footer>

    </div>
  )
}
