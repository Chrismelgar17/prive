import type { Metadata } from 'next'
import { CategoryPageClient } from '@/components/category-page-client'

export const metadata: Metadata = {
  title: 'Masajes Descontracturantes en Buenos Aires',
  description: 'Explorá perfiles de masajes descontracturantes en Buenos Aires y CABA. Encontrá opciones por zona y modalidad de atención en Privé Relax.',
  alternates: { canonical: '/masajes-descontracturantes' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 2, name: 'Categorías', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 3, name: 'Masajes Descontracturantes', item: 'https://priverelax.com/masajes-descontracturantes' },
  ],
}

const seoContent = (
  <div className="space-y-4">
    <h2 className="text-base font-semibold text-white">¿Qué son los masajes descontracturantes?</h2>
    <p>
      El masaje descontracturante es una técnica orientada a liberar la tensión muscular acumulada en zonas
      específicas del cuerpo. Es uno de los más buscados en Buenos Aires, especialmente por personas que
      trabajan frente a una computadora, realizan actividad física intensa o acumulan estrés corporal.
    </p>
    <p>
      Se trabaja principalmente sobre espalda, cuello, hombros y lumbares, con presión sostenida y movimientos
      profundos que buscan desactivar los puntos de tensión y mejorar la circulación local.
    </p>
    <h3 className="font-semibold text-white/80 mt-4">¿Cuándo conviene un masaje descontracturante?</h3>
    <ul className="list-disc list-inside space-y-1 pl-2">
      <li>Cuando tenés contracturas en cuello o espalda</li>
      <li>Si pasás muchas horas sentado o con postura fija</li>
      <li>Después de entrenar o practicar deporte</li>
      <li>Cuando la tensión muscular genera dolor persistente</li>
    </ul>
    <p>
      Explorá los perfiles en Privé Relax y encontrá una masajista especializada en técnicas descontracturantes
      cerca tuyo en Buenos Aires.
    </p>
  </div>
)

export default function MasajesDescontracturantesPage() {
  return (
    <CategoryPageClient
      category="Descontracturante"
      slug="masajes-descontracturantes"
      h1="Masajes Descontracturantes en Buenos Aires"
      description="Encontrá perfiles de masajes descontracturantes en Buenos Aires y CABA. Explorá opciones por barrio, modalidad de atención y disponibilidad en Privé Relax."
      seoContent={seoContent}
      breadcrumbSchema={breadcrumbSchema}
    />
  )
}
