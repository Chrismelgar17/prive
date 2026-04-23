import type { Metadata } from 'next'
import HomeClient from './home-client'

export const metadata: Metadata = {
  title: { absolute: 'Masajistas en Buenos Aires y CABA | Privé Relax' },
  description: 'Encontrá masajistas profesionales en Buenos Aires y CABA. Explorá perfiles por barrio, tipo de masaje y modalidad de atención en Privé Relax.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return <HomeClient />
}
