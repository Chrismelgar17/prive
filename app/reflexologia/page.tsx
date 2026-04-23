import type { Metadata } from 'next'
import { CategoryPageClient } from '@/components/category-page-client'

export const metadata: Metadata = {
  title: 'Reflexología en Buenos Aires',
  description: 'Encontrá especialistas en reflexología podal en Buenos Aires y CABA. Técnica de bienestar basada en puntos reflejos de los pies. Perfiles con atención personalizada.',
  alternates: { canonical: '/reflexologia' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 2, name: 'Categorías', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 3, name: 'Reflexología', item: 'https://priverelax.com/reflexologia' },
  ],
}

const seoContent = (
  <div className="space-y-4">
    <h2 className="text-base font-semibold text-white">¿Qué es la reflexología podal?</h2>
    <p>
      La reflexología podal es una técnica de bienestar que trabaja sobre puntos específicos de los pies,
      basada en la idea de que cada zona del pie corresponde a una parte del cuerpo. Es una de las
      prácticas más elegidas en Buenos Aires por quienes buscan relajación profunda y equilibrio general.
    </p>
    <p>
      La sesión de reflexología se realiza con la persona recostada o sentada, y puede durar entre 45
      y 60 minutos. No requiere ninguna preparación especial y suele generar una sensación inmediata
      de alivio y calma.
    </p>
    <h3 className="font-semibold text-white/80 mt-4">¿Por qué elegir reflexología?</h3>
    <ul className="list-disc list-inside space-y-1 pl-2">
      <li>Genera relajación profunda</li>
      <li>Ideal si no se toleran bien los masajes de presión en la espalda</li>
      <li>No requiere desvestirse</li>
      <li>Puede realizarse en combinación con otros masajes</li>
      <li>Muy recomendada para aliviar el cansancio acumulado</li>
    </ul>
    <p>
      Encontrá especialistas en reflexología en distintos barrios de Buenos Aires en Privé Relax.
      Revisá los perfiles, conocé los servicios y contactate directamente por WhatsApp.
    </p>
  </div>
)

export default function ReflexologiaPage() {
  return (
    <CategoryPageClient
      category="Reflexología"
      slug="reflexologia"
      h1="Reflexología en Buenos Aires"
      description="Encontrá especialistas en reflexología podal en Buenos Aires y CABA. Técnica de bienestar con atención personalizada en distintos barrios de la ciudad."
      seoContent={seoContent}
      breadcrumbSchema={breadcrumbSchema}
    />
  )
}
