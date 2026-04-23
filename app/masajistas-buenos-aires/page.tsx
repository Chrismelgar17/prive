import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'Masajistas en Buenos Aires',
  description: 'Directorio de masajistas profesionales en Buenos Aires y CABA. Explorá perfiles por barrio, tipo de masaje y modalidad de atención. Contacto directo por WhatsApp.',
  alternates: { canonical: '/masajistas-buenos-aires' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 2, name: 'Masajistas en Buenos Aires', item: 'https://priverelax.com/masajistas-buenos-aires' },
  ],
}

const ZONES = [
  { label: 'Masajistas en Palermo', href: '/palermo', description: 'El barrio con mayor oferta de servicios de bienestar en CABA.' },
  { label: 'Masajistas en Recoleta', href: '/recoleta', description: 'Profesionales con atención personalizada en zona norte.' },
  { label: 'Masajistas en Belgrano', href: '/belgrano', description: 'Amplia oferta de masoterapia en uno de los barrios más activos.' },
  { label: 'Masajistas en Caballito', href: '/caballito', description: 'El barrio más céntrico de Buenos Aires, excelente conectividad.' },
  { label: 'Masajistas en Almagro', href: '/almagro', description: 'Profesionales accesibles y bien ubicadas en zona centro.' },
  { label: 'Masajistas en Flores', href: '/flores', description: 'Servicios de bienestar en uno de los barrios más populares del oeste.' },
]

const CATEGORIES = [
  { label: 'Masajes relajantes', href: '/masajes-relajantes', description: 'Para aliviar el estrés y recuperar el bienestar general.' },
  { label: 'Masajes descontracturantes', href: '/masajes-descontracturantes', description: 'Alivio de contracturas en espalda, cuello y hombros.' },
  { label: 'Masajes terapéuticos', href: '/masajes-terapeuticos', description: 'Orientados a necesidades físicas específicas.' },
  { label: 'Reflexología', href: '/reflexologia', description: 'Técnica de bienestar basada en puntos reflejos de los pies.' },
]

export default function MasajistasBuenosAiresPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-white/40 mb-8">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">Inicio</Link></li>
            <li className="text-white/20">/</li>
            <li className="text-[#D4AF37]">Masajistas en Buenos Aires</li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold text-white mb-4">
          Masajistas en <span className="text-[#D4AF37]">Buenos Aires</span>
        </h1>
        <p className="text-white/60 text-base leading-relaxed mb-12 max-w-2xl">
          Directorio de masajistas profesionales en Buenos Aires y CABA. Explorá perfiles por barrio,
          tipo de masaje y modalidad de atención. Contacto directo por WhatsApp, sin intermediarios.
        </p>

        {/* Zonas */}
        <section className="mb-14">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
            Masajistas por zona en Buenos Aires
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ZONES.map(z => (
              <Link
                key={z.href}
                href={z.href}
                className="group block border border-white/10 hover:border-[#D4AF37]/30 rounded-xl px-5 py-4 transition-colors bg-black/20 hover:bg-black/30"
              >
                <span className="text-sm font-medium text-white group-hover:text-[#D4AF37] transition-colors">{z.label}</span>
                <p className="text-xs text-white/40 mt-1">{z.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Categorías */}
        <section className="mb-14">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
            Masajes por tipo de servicio
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CATEGORIES.map(c => (
              <Link
                key={c.href}
                href={c.href}
                className="group block border border-white/10 hover:border-[#D4AF37]/30 rounded-xl px-5 py-4 transition-colors bg-black/20 hover:bg-black/30"
              >
                <span className="text-sm font-medium text-white group-hover:text-[#D4AF37] transition-colors">{c.label}</span>
                <p className="text-xs text-white/40 mt-1">{c.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA al directorio */}
        <section className="border border-white/10 rounded-2xl px-6 py-8 text-center bg-black/20">
          <h2 className="text-lg font-semibold text-white mb-3">Ver todos los perfiles</h2>
          <p className="text-white/50 text-sm mb-5">
            Explorá el directorio completo con todos los perfiles disponibles en Buenos Aires y CABA.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c9a227] text-black font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Ver directorio completo
          </Link>
        </section>

        {/* SEO text */}
        <section className="mt-14 border-t border-white/10 pt-10 text-white/60 text-sm leading-relaxed space-y-4">
          <h2 className="text-base font-semibold text-white">Masajistas profesionales en Buenos Aires</h2>
          <p>
            Buenos Aires cuenta con una amplia oferta de masajistas profesionales en distintos barrios de CABA.
            Desde Palermo hasta Flores, desde Recoleta hasta Almagro, podés encontrar profesionales
            independientes especializadas en masoterapia, relajación y bienestar.
          </p>
          <p>
            Las técnicas más buscadas en Buenos Aires son el masaje relajante, el descontracturante para
            aliviar contracturas musculares, el masaje terapéutico y la reflexología podal. Muchas
            profesionales ofrecen atención en su propio espacio, a domicilio o en hotel, con flexibilidad
            horaria incluyendo fines de semana.
          </p>
          <p>
            Privé Relax es un directorio de masajistas profesionales en Buenos Aires donde podés explorar
            perfiles por barrio y tipo de servicio, y contactar directamente a la profesional de tu
            preferencia por WhatsApp, sin intermediarios ni comisiones.
          </p>
          <h3 className="font-semibold text-white/80 mt-4">¿Cómo encontrar una masajista en Buenos Aires?</h3>
          <p>
            El proceso es simple: explorá los perfiles disponibles en el directorio, filtrá por zona o
            tipo de masaje, revisá los servicios y modalidades de atención de cada profesional, y contactate
            directamente por WhatsApp para acordar turno, horario y servicio.
          </p>
          <p>
            Todas las profesionales en Privé Relax operan de forma autónoma e independiente. El directorio
            no intermedia en acuerdos, pagos ni reservas.
          </p>
        </section>

      </main>
    </div>
  )
}
