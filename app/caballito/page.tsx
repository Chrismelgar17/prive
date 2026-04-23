import type { Metadata } from 'next'
import { ZonePageClient } from '@/components/zone-page-client'

export const metadata: Metadata = {
  title: 'Masajistas en Caballito',
  description: 'Encontrá masajistas profesionales en Caballito, Buenos Aires. Servicios de masajes relajantes, descontracturantes, terapéuticos y reflexología en CABA.',
  alternates: { canonical: '/caballito' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 2, name: 'Zonas', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 3, name: 'Caballito', item: 'https://priverelax.com/caballito' },
  ],
}

const seoContent = (
  <div className="space-y-4">
    <h2 className="text-base font-semibold text-white">Masajistas profesionales en Caballito</h2>
    <p>
      Caballito es el barrio más céntrico de Buenos Aires, con excelente conectividad en transporte público.
      Si buscás una masajista en Caballito, encontrarás profesionales independientes con distintas
      especialidades en masoterapia y bienestar.
    </p>
    <p>
      Los servicios más demandados en la zona incluyen masajes relajantes para aliviar el estrés,
      descontracturantes para liberar tensión muscular, y reflexología podal.
    </p>
    <p>
      Explorá los perfiles en Privé Relax y contactá directamente a la profesional de tu preferencia.
      Sin intermediarios, sin comisiones.
    </p>
  </div>
)

export default function CaballitoPage() {
  return (
    <ZonePageClient
      neighborhood="Caballito"
      h1="Masajistas en Caballito"
      description="Encontrá masajistas profesionales en Caballito, Buenos Aires. Servicios de masajes relajantes, descontracturantes, terapéuticos y reflexología."
      seoContent={seoContent}
      breadcrumbSchema={breadcrumbSchema}
    />
  )
}
