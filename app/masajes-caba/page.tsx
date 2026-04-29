import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'Masajes en CABA | Masajistas Profesionales en Capital Federal',
  description: 'Encontrá masajistas profesionales en CABA y Capital Federal. Masajes relajantes, descontracturantes, terapéuticos y reflexología en todos los barrios de Buenos Aires.',
  alternates: { canonical: '/masajes-caba' },
  openGraph: {
    title: 'Masajes en CABA | Masajistas Profesionales en Capital Federal',
    description: 'Encontrá masajistas profesionales en CABA y Capital Federal. Masajes relajantes, descontracturantes y reflexología.',
    url: '/masajes-caba',
    type: 'website',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.priverelax.com' },
    { '@type': 'ListItem', position: 2, name: 'Masajes en CABA', item: 'https://www.priverelax.com/masajes-caba' },
  ],
}

const ZONES = [
  { label: 'Masajistas en Palermo', href: '/palermo', desc: 'El barrio con mayor oferta de masoterapia de CABA.' },
  { label: 'Masajistas en Recoleta', href: '/recoleta', desc: 'Profesionales en zona norte con atención personalizada.' },
  { label: 'Masajistas en Belgrano', href: '/belgrano', desc: 'Amplia oferta de bienestar en zona norte.' },
  { label: 'Masajistas en Caballito', href: '/caballito', desc: 'El barrio más céntrico con excelente conectividad.' },
  { label: 'Masajistas en Almagro', href: '/almagro', desc: 'Profesionales accesibles en zona centro.' },
  { label: 'Masajistas en Flores', href: '/flores', desc: 'Servicios de bienestar en la zona oeste de CABA.' },
]

const CATEGORIES = [
  { label: 'Masajes relajantes en CABA', href: '/masajes-relajantes', desc: 'Para aliviar el estrés y recuperar el bienestar.' },
  { label: 'Masajes descontracturantes en CABA', href: '/masajes-descontracturantes', desc: 'Alivio de contracturas en espalda, cuello y hombros.' },
  { label: 'Masajes terapéuticos en CABA', href: '/masajes-terapeuticos', desc: 'Orientados a necesidades físicas específicas.' },
  { label: 'Reflexología en CABA', href: '/reflexologia', desc: 'Bienestar a través de puntos reflejos de los pies.' },
]

export default function MasajesCabaPage() {
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
            <li className="text-[#D4AF37]">Masajes en CABA</li>
          </ol>
        </nav>

        <h1 className="text-4xl font-bold text-white mb-4">
          Masajes en <span className="text-[#D4AF37]">CABA</span>
        </h1>
        <p className="text-white/60 text-base leading-relaxed mb-3 max-w-2xl">
          Directorio de masajistas profesionales en CABA y Capital Federal. Explorá perfiles
          por barrio, tipo de masaje y modalidad de atención. Contacto directo por WhatsApp,
          sin intermediarios.
        </p>
        <p className="text-white/45 text-sm leading-relaxed mb-12 max-w-2xl">
          También buscado como: <em>masajes en Buenos Aires</em>, <em>masajes Capital Federal</em>,
          {' '}<em>masajistas CABA</em>, <em>masajes a domicilio CABA</em>.
        </p>

        {/* CTA principal */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8962e] text-black font-bold px-7 py-3.5 rounded-xl text-sm uppercase tracking-wider transition-colors"
          >
            Ver masajistas disponibles →
          </Link>
        </div>

        {/* Zonas */}
        <section className="mb-14">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
            Masajes por barrio en CABA
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ZONES.map(z => (
              <Link
                key={z.href}
                href={z.href}
                className="group block border border-white/10 hover:border-[#D4AF37]/30 rounded-xl px-5 py-4 transition-colors bg-black/20 hover:bg-black/30"
              >
                <span className="text-sm font-medium text-white group-hover:text-[#D4AF37] transition-colors">{z.label}</span>
                <p className="text-xs text-white/40 mt-1">{z.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Categorías */}
        <section className="mb-14">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
            Tipos de masajes en CABA
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CATEGORIES.map(c => (
              <Link
                key={c.href}
                href={c.href}
                className="group block border border-white/10 hover:border-[#D4AF37]/30 rounded-xl px-5 py-4 transition-colors bg-black/20 hover:bg-black/30"
              >
                <span className="text-sm font-medium text-white group-hover:text-[#D4AF37] transition-colors">{c.label}</span>
                <p className="text-xs text-white/40 mt-1">{c.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO content */}
        <section className="border-t border-white/10 pt-10 text-white/60 text-sm leading-relaxed space-y-5">
          <h2 className="text-xl font-semibold text-white">Masajes profesionales en CABA y Capital Federal</h2>

          <p>
            La Ciudad Autónoma de Buenos Aires (CABA) concentra una de las ofertas más amplias de
            masajistas profesionales del país. Desde barrios como Palermo y Recoleta hasta Caballito,
            Almagro y Flores, podés encontrar profesionales especializadas en distintas técnicas de
            masoterapia y bienestar.
          </p>

          <h3 className="text-base font-semibold text-white/85">¿Qué masajes podés encontrar en CABA?</h3>
          <p>
            La demanda en Capital Federal se concentra principalmente en cuatro servicios: masajes
            relajantes para reducir el estrés cotidiano, masajes descontracturantes para aliviar
            contracturas musculares, masajes terapéuticos para atender molestias físicas específicas,
            y reflexología podal como técnica de bienestar integral.
          </p>
          <p>
            Muchos profesionales en CABA ofrecen servicio a domicilio, lo que permite recibir una
            sesión sin necesidad de trasladarse. Esta modalidad tuvo un crecimiento importante en
            Buenos Aires, especialmente en los barrios del norte y centro de la ciudad.
          </p>

          <h3 className="text-base font-semibold text-white/85">¿Cómo encontrar un masajista en Capital Federal?</h3>
          <p>
            Privé Relax es un directorio de masajistas profesionales en CABA donde podés explorar
            perfiles por barrio y tipo de servicio. Cada perfil muestra la zona de atención,
            tipos de masajes disponibles y modalidades (lugar propio, domicilio, hotel).
            El contacto es directo por WhatsApp, sin intermediarios, comisiones ni registro previo.
          </p>

          <h3 className="text-base font-semibold text-white/85">Preguntas frecuentes sobre masajes en CABA</h3>
          <div className="space-y-4 mt-2">
            {[
              {
                q: '¿En qué barrios de CABA hay más masajistas disponibles?',
                a: 'Palermo, Recoleta, Belgrano y Caballito concentran la mayor oferta. También hay profesionales en Almagro, Flores y otros barrios de la ciudad.',
              },
              {
                q: '¿Se puede pedir masaje a domicilio en CABA?',
                a: 'Sí. Muchos profesionales del directorio ofrecen servicio a domicilio en distintos barrios de Capital Federal.',
              },
              {
                q: '¿Cómo contacto a un masajista en CABA?',
                a: 'A través del perfil en Privé Relax, el contacto es directo por WhatsApp. Sin formularios ni intermediarios.',
              },
              {
                q: '¿Qué diferencia hay entre masaje relajante y descontracturante?',
                a: 'El relajante busca generar bienestar general y reducir el estrés. El descontracturante trabaja en profundidad para aliviar contracturas musculares específicas.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-t border-white/8 pt-4">
                <h4 className="font-semibold text-white/80 mb-1">{q}</h4>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="mt-14 border border-white/10 rounded-2xl px-6 py-8 text-center bg-black/20">
          <h2 className="text-lg font-semibold text-white mb-3">Ver masajistas disponibles en CABA</h2>
          <p className="text-white/50 text-sm mb-5 max-w-md mx-auto">
            Explorá el directorio completo, filtrá por barrio o tipo de masaje y contactate directamente con el profesional.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8962e] text-black font-bold px-7 py-3.5 rounded-xl text-sm uppercase tracking-wider transition-colors"
          >
            Ver directorio completo →
          </Link>
        </section>

      </main>
    </div>
  )
}
