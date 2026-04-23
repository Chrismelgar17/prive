import type { Metadata } from 'next'
import { ZonePageClient } from '@/components/zone-page-client'

export const metadata: Metadata = {
  title: 'Masajistas en Belgrano',
  description: 'Explorá masajistas profesionales en Belgrano. Encontrá perfiles por tipo de masaje, modalidad de atención y disponibilidad en Privé Relax.',
  alternates: { canonical: '/belgrano' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 2, name: 'Zonas', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 3, name: 'Belgrano', item: 'https://priverelax.com/belgrano' },
  ],
}

const seoContent = (
  <div className="space-y-4">
    <h2 className="text-base font-semibold text-white">Masajistas profesionales en Belgrano</h2>
    <p>
      Belgrano es uno de los barrios más poblados y activos de Buenos Aires, con una amplia oferta de
      servicios de salud y bienestar. Si buscás una masajista en Belgrano, encontrarás profesionales
      independientes especializadas en distintas técnicas de masoterapia.
    </p>
    <p>
      Los masajes más solicitados en Belgrano incluyen el descontracturante, el relajante y la reflexología.
      Muchas profesionales ofrecen flexibilidad horaria y atención tanto en su espacio como a domicilio.
    </p>
    <p>
      Revisá los perfiles disponibles en Privé Relax, compará servicios y contactá directamente a la
      profesional de tu preferencia por WhatsApp.
    </p>
  </div>
)

export default function BelgranoPage() {
  return (
    <ZonePageClient
      neighborhood="Belgrano"
      h1="Masajistas en Belgrano"
      description="Encontrá masajistas profesionales en Belgrano. Explorá perfiles según el tipo de masaje, modalidad de atención y disponibilidad actual en Privé Relax."
      seoContent={seoContent}
      breadcrumbSchema={breadcrumbSchema}
    />
  )
}
