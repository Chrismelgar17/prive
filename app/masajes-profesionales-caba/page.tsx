import type { Metadata } from 'next'
import LandingClient from './landing-client'

export const metadata: Metadata = {
  title: 'Masajes Profesionales en CABA | Masajes Relajantes y Descontracturantes',
  description: 'Encontrá masajistas profesionales en CABA. Masajes relajantes, descontracturantes, terapéuticos y reflexología. Contacto directo, sin intermediarios.',
  alternates: { canonical: '/masajes-profesionales-caba' },
  robots: { index: false, follow: false },
}

export default function MasajesProfesionalesCaba() {
  return <LandingClient />
}
