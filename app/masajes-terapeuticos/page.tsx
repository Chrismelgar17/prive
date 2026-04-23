import type { Metadata } from 'next'
import { CategoryPageClient } from '@/components/category-page-client'

export const metadata: Metadata = {
  title: 'Masajes Terapéuticos en Buenos Aires',
  description: 'Explorá perfiles de masajes terapéuticos en Buenos Aires y CABA. Encontrá opciones por zona y modalidad de atención en Privé Relax.',
  alternates: { canonical: '/masajes-terapeuticos' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 2, name: 'Categorías', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 3, name: 'Masajes Terapéuticos', item: 'https://priverelax.com/masajes-terapeuticos' },
  ],
}

const seoContent = (
  <div className="space-y-4">
    <h2 className="text-base font-semibold text-white">¿Qué son los masajes terapéuticos?</h2>
    <p>
      Los masajes terapéuticos están orientados a atender necesidades físicas específicas, como molestias
      musculares, tensión localizada o recuperación general. Se diferencian de los masajes puramente
      relajantes en que el trabajo es más enfocado y adaptado a la situación de cada persona.
    </p>
    <p>
      En Buenos Aires, muchas personas buscan masajes terapéuticos para complementar su rutina de bienestar,
      mejorar la movilidad o simplemente recuperarse del desgaste físico cotidiano.
    </p>
    <h3 className="font-semibold text-white/80 mt-4">Beneficios del masaje terapéutico</h3>
    <ul className="list-disc list-inside space-y-1 pl-2">
      <li>Alivio de molestias musculares específicas</li>
      <li>Mejora de la movilidad articular</li>
      <li>Recuperación de zonas con tensión crónica</li>
      <li>Complemento para hábitos de vida saludable</li>
      <li>Mayor conciencia corporal</li>
    </ul>
    <p>
      Encontrá masajistas especializadas en técnicas terapéuticas en distintos barrios de Buenos Aires
      y CABA en Privé Relax. Contactá directamente por WhatsApp.
    </p>
  </div>
)

export default function MasajesTerapeuticosPage() {
  return (
    <CategoryPageClient
      category="Terapéutico"
      slug="masajes-terapeuticos"
      h1="Masajes Terapéuticos en Buenos Aires"
      description="Encontrá perfiles de masajes terapéuticos en Buenos Aires y CABA. Explorá opciones por barrio, modalidad de atención y disponibilidad en Privé Relax."
      seoContent={seoContent}
      breadcrumbSchema={breadcrumbSchema}
    />
  )
}
