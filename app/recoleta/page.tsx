import type { Metadata } from 'next'
import { ZonePageClient } from '@/components/zone-page-client'

export const metadata: Metadata = {
  title: 'Masajistas en Recoleta',
  description: 'Explorá masajistas profesionales en Recoleta. Encontrá perfiles por tipo de masaje, modalidad de atención y disponibilidad en Privé Relax.',
  alternates: { canonical: '/recoleta' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 2, name: 'Zonas', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 3, name: 'Recoleta', item: 'https://priverelax.com/recoleta' },
  ],
}

const seoContent = (
  <div className="space-y-4">
    <h2 className="text-base font-semibold text-white">Masajistas profesionales en Recoleta</h2>
    <p>
      Recoleta es un barrio de Buenos Aires reconocido por su ambiente tranquilo y su oferta de servicios
      de bienestar. Si buscás una masajista en Recoleta, encontrarás profesionales con atención personalizada
      y distintas especialidades en masoterapia.
    </p>
    <p>
      Los servicios más buscados en la zona incluyen masajes relajantes, descontracturantes, terapéuticos
      y reflexología. Muchas profesionales ofrecen atención en su propio espacio, a domicilio o en hotel.
    </p>
    <p>
      En Privé Relax podés explorar perfiles por zona, revisar los servicios que ofrece cada profesional
      y contactarlas directamente por WhatsApp sin intermediarios.
    </p>
  </div>
)

export default function RecoletaPage() {
  return (
    <ZonePageClient
      neighborhood="Recoleta"
      h1="Masajistas en Recoleta"
      description="Encontrá masajistas profesionales en Recoleta. Explorá perfiles según el tipo de masaje, modalidad de atención y disponibilidad actual en Privé Relax."
      seoContent={seoContent}
      breadcrumbSchema={breadcrumbSchema}
    />
  )
}
