import type { Metadata } from 'next'
import { ZonePageClient } from '@/components/zone-page-client'

export const metadata: Metadata = {
  title: 'Masajistas en Almagro',
  description: 'Explorá masajistas profesionales en Almagro. Encontrá perfiles por tipo de masaje, modalidad de atención y disponibilidad en Privé Relax.',
  alternates: { canonical: '/almagro' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 2, name: 'Zonas', item: 'https://priverelax.com' },
    { '@type': 'ListItem', position: 3, name: 'Almagro', item: 'https://priverelax.com/almagro' },
  ],
}

const seoContent = (
  <div className="space-y-4">
    <h2 className="text-base font-semibold text-white">Masajistas profesionales en Almagro</h2>
    <p>
      Almagro es un barrio dinámico y bien ubicado de Buenos Aires, con fácil acceso desde distintas
      zonas de la ciudad. Si buscás una masajista en Almagro, encontrarás profesionales independientes
      especializadas en masoterapia y bienestar.
    </p>
    <p>
      En Almagro podés encontrar servicios de masajes relajantes, descontracturantes para aliviar contracturas
      y tensión muscular, masajes terapéuticos y reflexología podal.
    </p>
    <p>
      Todos los perfiles en Privé Relax son de profesionales autónomas. Podés contactarlas directamente
      por WhatsApp y acordar horario, modalidad y servicio.
    </p>
  </div>
)

export default function AlmagroPage() {
  return (
    <ZonePageClient
      neighborhood="Almagro"
      h1="Masajistas en Almagro"
      description="Encontrá masajistas profesionales en Almagro. Explorá perfiles según el tipo de masaje, modalidad de atención y disponibilidad actual en Privé Relax."
      seoContent={seoContent}
      breadcrumbSchema={breadcrumbSchema}
    />
  )
}
