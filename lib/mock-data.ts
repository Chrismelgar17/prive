export type MembershipLevel = 1 | 2 | 3 | 4 | 5

export const MEMBERSHIP_LEVELS = {
  5: { name: 'Black Diamond', icon: 'Diamond', color: 'text-primary' },
  4: { name: 'Ruby Select', icon: 'Star', color: 'text-red-500' },
  3: { name: 'Sapphire Club', icon: 'Zap', color: 'text-blue-400' },
  2: { name: 'Golden Experience', icon: 'ShieldCheck', color: 'text-yellow-500' },
  1: { name: 'Silver Touch', icon: 'User', color: 'text-gray-400' },
} as const

export interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

export interface Therapist {
  id: string
  name: string
  age: number
  neighborhood: string
  location?: string
  photo_url: string
  level: MembershipLevel
  verified: boolean
  isOnline?: boolean
  description?: string
  services?: string[]
  gallery?: string[]
  whatsapp?: string
  reviews?: Review[]
}

export const mockTherapists: Therapist[] = [
  {
    id: '1',
    name: 'Valentina',
    age: 25,
    neighborhood: 'Palermo',
    location: 'Palermo Soho, Buenos Aires',
    photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=750&fit=crop',
    level: 5,
    verified: true,
    isOnline: true,
    description: 'Especialista en masajes relajantes y descontracturantes. Ambiente exclusivo y atención personalizada para tu bienestar.',
    services: ['Masaje Relajante', 'Descontracturante', 'Aromaterapia', 'Piedras Calientes'],
    gallery: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
    ],
    whatsapp: '+5491123456789',
    reviews: [
      { id: 'r1', author: 'Carlos M.', rating: 5, comment: 'Excelente atención, muy profesional.', date: '2024-01-15' },
      { id: 'r2', author: 'Juan P.', rating: 5, comment: 'La mejor experiencia, totalmente recomendada.', date: '2024-01-10' },
      { id: 'r3', author: 'Diego R.', rating: 4, comment: 'Muy buen servicio, ambiente agradable.', date: '2024-01-05' },
    ],
  },
  {
    id: '2',
    name: 'Camila',
    age: 28,
    neighborhood: 'Recoleta',
    location: 'Recoleta, Buenos Aires',
    photo_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=750&fit=crop',
    level: 4,
    verified: true,
    isOnline: true,
    description: 'Técnicas orientales y occidentales para un relax profundo. Discreción y elegancia garantizada.',
    services: ['Masaje Tailandés', 'Shiatsu', 'Reflexología', 'Masaje Deportivo'],
    gallery: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
    ],
    whatsapp: '+5491198765432',
    reviews: [
      { id: 'r4', author: 'Martín L.', rating: 5, comment: 'Increíble técnica, muy relajante.', date: '2024-01-12' },
      { id: 'r5', author: 'Fernando G.', rating: 4, comment: 'Buena atención y puntualidad.', date: '2024-01-08' },
    ],
  },
  {
    id: '3',
    name: 'Isabella',
    age: 24,
    neighborhood: 'Belgrano',
    location: 'Belgrano C, Buenos Aires',
    photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=750&fit=crop',
    level: 3,
    verified: true,
    isOnline: false,
    description: 'Joven profesional con experiencia en técnicas de relajación. Atención cálida y personalizada.',
    services: ['Masaje Relajante', 'Lomi Lomi', 'Masaje con Aceites'],
    gallery: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
    ],
    whatsapp: '+5491156781234',
    reviews: [
      { id: 'r6', author: 'Pablo S.', rating: 4, comment: 'Muy buena onda, recomendable.', date: '2024-01-06' },
    ],
  },
  {
    id: '4',
    name: 'Sofía',
    age: 27,
    neighborhood: 'Puerto Madero',
    location: 'Puerto Madero, Buenos Aires',
    photo_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=750&fit=crop',
    level: 2,
    verified: true,
    isOnline: true,
    description: 'Masajes exclusivos en zona premium. Relax total en un ambiente de lujo.',
    services: ['Masaje Sueco', 'Descontracturante', 'Spa Completo'],
    gallery: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
    ],
    whatsapp: '+5491143219876',
    reviews: [
      { id: 'r7', author: 'Alejandro B.', rating: 5, comment: 'Excelente ubicación y servicio.', date: '2024-01-14' },
      { id: 'r8', author: 'Roberto C.', rating: 4, comment: 'Muy profesional.', date: '2024-01-09' },
    ],
  },
]

export function filterByNeighborhood(neighborhood: string): Therapist[] {
  if (neighborhood === 'Todos') return mockTherapists
  return mockTherapists.filter((t) => t.neighborhood === neighborhood)
}

export function getTherapistById(id: string): Therapist | undefined {
  return mockTherapists.find((t) => t.id === id)
}
