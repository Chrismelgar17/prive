import type { Metadata } from 'next'
import { CategoryPageClient } from '@/components/category-page-client'

export const metadata: Metadata = {
  title: 'Masajes Relajantes en Buenos Aires',
  description: 'Encontrá masajistas especializadas en masajes relajantes en Buenos Aires y CABA. Perfiles verificados con atención en local, hotel o a domicilio.',
  alternates: { canonical: '/masajes-relajantes' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 2, name: 'Categorías', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 3, name: 'Masajes Relajantes', item: 'https://priverelax.com/masajes-relajantes' },
  ],
}

const seoContent = (
  <div className="space-y-4">
    <h2 className="text-base font-semibold text-white">¿Qué son los masajes relajantes?</h2>
    <p>
      Los masajes relajantes son una de las técnicas más buscadas en Buenos Aires. Su objetivo principal
      es generar una sensación profunda de descanso, bienestar y desconexión del estrés cotidiano.
    </p>
    <p>
      Se realizan con movimientos suaves, continuos y rítmicos sobre la espalda, hombros, cuello y piernas.
      Son ideales para personas que acumulan tensión por el trabajo, el sedentarismo o el ritmo acelerado
      de la vida urbana.
    </p>
    <h3 className="font-semibold text-white/80 mt-4">Beneficios del masaje relajante</h3>
    <ul className="list-disc list-inside space-y-1 pl-2">
      <li>Reduce el estrés y la ansiedad</li>
      <li>Mejora la calidad del sueño</li>
      <li>Alivia la tensión muscular superficial</li>
      <li>Genera bienestar físico y mental</li>
      <li>Favorece la recuperación del sistema nervioso</li>
    </ul>
    <p>
      En Privé Relax podés encontrar masajistas especializadas en técnicas relajantes en distintos barrios
      de Buenos Aires y CABA. Podés filtrar por zona, modalidad de atención y disponibilidad horaria.
    </p>
  </div>
)

export default function MasajesRelajantesPage() {
  return (
    <CategoryPageClient
      category="Relajante"
      slug="masajes-relajantes"
      h1="Masajes Relajantes en Buenos Aires"
      description="Encontrá masajistas especializadas en masajes relajantes en Buenos Aires y CABA. Servicios de relajación profunda, alivio del estrés y bienestar."
      seoContent={seoContent}
      breadcrumbSchema={breadcrumbSchema}
    />
  )
}
