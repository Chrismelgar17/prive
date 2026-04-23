import type { Metadata } from 'next'
import { ZonePageClient } from '@/components/zone-page-client'

export const metadata: Metadata = {
  title: 'Masajistas en Flores',
  description: 'Explorá masajistas profesionales en Flores. Encontrá perfiles por tipo de masaje, modalidad de atención y disponibilidad en Privé Relax.',
  alternates: { canonical: '/flores' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 2, name: 'Zonas', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 3, name: 'Flores', item: 'https://priverelax.com/flores' },
  ],
}

const seoContent = (
  <div className="space-y-4">
    <h2 className="text-base font-semibold text-white">Masajistas profesionales en Flores</h2>
    <p>
      Flores es un barrio accesible y con buena cobertura de transporte en Buenos Aires. Si buscás una
      masajista en Flores, encontrarás profesionales independientes con distintas especialidades
      en masoterapia y relajación.
    </p>
    <p>
      Los servicios disponibles en la zona incluyen masajes relajantes, descontracturantes, terapéuticos
      y reflexología. Podés elegir entre atención en el local de la profesional o a domicilio.
    </p>
    <p>
      Revisá los perfiles en Privé Relax, conocé los servicios de cada profesional y contactate
      directamente por WhatsApp para coordinar tu turno.
    </p>
  </div>
)

export default function FloresPage() {
  return (
    <ZonePageClient
      neighborhood="Flores"
      h1="Masajistas en Flores"
      description="Encontrá masajistas profesionales en Flores. Explorá perfiles según el tipo de masaje, modalidad de atención y disponibilidad actual en Privé Relax."
      seoContent={seoContent}
      breadcrumbSchema={breadcrumbSchema}
    />
  )
}
