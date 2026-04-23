import type { Metadata } from 'next'
import { ZonePageClient } from '@/components/zone-page-client'

export const metadata: Metadata = {
  title: 'Masajistas en Palermo',
  description: 'Explorá masajistas profesionales en Palermo. Encontrá perfiles por tipo de masaje, modalidad de atención y disponibilidad en Privé Relax.',
  alternates: { canonical: '/palermo' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 2, name: 'Zonas', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 3, name: 'Palermo', item: 'https://priverelax.com/palermo' },
  ],
}

const seoContent = (
  <div className="space-y-4">
    <h2 className="text-base font-semibold text-white">Masajistas profesionales en Palermo</h2>
    <p>
      Palermo es uno de los barrios más activos de Buenos Aires en cuanto a servicios de bienestar y masoterapia.
      Con una amplia oferta de masajistas profesionales, el barrio concentra perfiles con distintas especialidades:
      masajes relajantes, descontracturantes, terapéuticos, reflexología y más.
    </p>
    <p>
      Si buscás una masajista en Palermo, podés encontrar profesionales que atienden en lugar propio, a domicilio
      o en hotel. Muchos ofrecen turnos en horarios flexibles, incluyendo fines de semana.
    </p>
    <p>
      Explorá los perfiles disponibles, revisá sus servicios y zona de atención, y contactá directamente
      por WhatsApp. En Privé Relax todos los perfiles son de profesionales independientes de masoterapia y bienestar.
    </p>
    <p>
      Palermo incluye zonas como Palermo Soho, Palermo Hollywood y Palermo Chico, con fácil acceso en transporte
      público y múltiples opciones de estacionamiento.
    </p>
  </div>
)

export default function PalermoPage() {
  return (
    <ZonePageClient
      neighborhood="Palermo"
      h1="Masajistas en Palermo"
      description="Encontrá masajistas profesionales en Palermo. Explorá perfiles según el tipo de masaje, modalidad de atención y disponibilidad actual en Privé Relax."
      seoContent={seoContent}
      breadcrumbSchema={breadcrumbSchema}
    />
  )
}
