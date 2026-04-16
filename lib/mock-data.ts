export type MembershipLevel = 1 | 2 | 3 | 4 | 5

export const MEMBERSHIP_LEVELS = {
  5: { name: 'Destacada', icon: 'Diamond', color: 'text-primary' },
  4: { name: 'Preferida', icon: 'Star', color: 'text-red-500' },
  3: { name: 'Recomendada', icon: 'Zap', color: 'text-blue-400' },
  2: { name: 'Certificada', icon: 'ShieldCheck', color: 'text-yellow-500' },
  1: { name: 'Activa', icon: 'User', color: 'text-gray-400' },
} as const

export const SERVICE_CATEGORIES = ['Relajante', 'Terapéutico', 'Descontracturante', 'Deportivo', 'Reflexología', 'Drenaje linfático', 'Bienestar integral'] as const
export type ServiceCategory = typeof SERVICE_CATEGORIES[number]

export const DAYS_OF_WEEK = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'] as const

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
  modality?: string[]     // 'Lugar propio' | 'Domicilio' | 'Hotel'
  amenities?: string[]    // 'Ducha' | 'Camilla profesional' | 'Toallas' | ...
  categories?: string[]   // 'VIP' | 'Premium' | 'Relajante' | 'Terapéutico' | 'Especial' | 'Nueva'
  priceRange?: string
  gallery?: string[]
  whatsapp?: string
  reviews?: Review[]
  profileViews?: number
  whatsappClicks?: number
  docVerified?: boolean
  contentVerified?: boolean
  isPaused?: boolean
  workingHours?: string      // e.g. '10:00 - 22:00'
  availableDays?: string[]   // ['Lunes', 'Martes', ...]
  reviewsEnabled?: boolean
  sortOrder?: number
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
    description: 'Especialista en masajes relajantes y descontracturantes. Ambiente exclusivo y atención personalizada para tu bienestar total. Técnicas orientales y occidentales combinadas.',
    services: ['Masaje Relajante', 'Descontracturante', 'Aromaterapia', 'Piedras Calientes'],
    modality: ['Lugar propio', 'Hotel'],
    amenities: ['Ducha', 'Camilla profesional', 'Toallas incluidas', 'Aceites premium', 'Música ambiental'],
    categories: ['VIP', 'Relajante'],
    priceRange: '$8.000 - $15.000',
    gallery: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
    ],
    whatsapp: '+5491123456789',
    profileViews: 1248,
    whatsappClicks: 87,
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
    description: 'Técnicas orientales y occidentales para un relax profundo. Discreción y elegancia garantizada en cada sesión. Especialista en masaje terapéutico y deportivo.',
    services: ['Masaje Tailandés', 'Shiatsu', 'Reflexología', 'Masaje Deportivo'],
    modality: ['Lugar propio', 'Domicilio'],
    amenities: ['Camilla profesional', 'Toallas incluidas', 'Aceites esenciales', 'Música relajante'],
    categories: ['Premium', 'Terapéutico'],
    priceRange: '$6.000 - $10.000',
    gallery: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
    ],
    whatsapp: '+5491198765432',
    profileViews: 863,
    whatsappClicks: 54,
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
    description: 'Joven profesional con experiencia en técnicas de relajación. Atención cálida y personalizada en un espacio íntimo y elegante. Especialista en Lomi Lomi y masajes con aceites.',
    services: ['Masaje Relajante', 'Lomi Lomi', 'Masaje con Aceites'],
    modality: ['Lugar propio'],
    amenities: ['Camilla profesional', 'Toallas incluidas', 'Aromaterapia', 'Velas'],
    categories: ['Relajante', 'Especial'],
    priceRange: '$4.500 - $7.000',
    gallery: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
    ],
    whatsapp: '+5491156781234',
    profileViews: 542,
    whatsappClicks: 31,
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
    description: 'Masajes exclusivos en zona premium. Relax total en un ambiente de lujo con técnicas especializadas para tu cuerpo y mente.',
    services: ['Masaje Sueco', 'Descontracturante', 'Spa Completo'],
    modality: ['Lugar propio', 'Hotel'],
    amenities: ['Ducha', 'Jacuzzi', 'Camilla profesional', 'Toallas incluidas'],
    categories: ['VIP', 'Especial'],
    priceRange: '$5.500 - $9.000',
    gallery: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
    ],
    whatsapp: '+5491143219876',
    profileViews: 421,
    whatsappClicks: 28,
    reviews: [
      { id: 'r7', author: 'Alejandro B.', rating: 5, comment: 'Excelente ubicación y servicio.', date: '2024-01-14' },
      { id: 'r8', author: 'Roberto C.', rating: 4, comment: 'Muy profesional.', date: '2024-01-09' },
    ],
  },
  {
    id: '5',
    name: 'Renata',
    age: 30,
    neighborhood: 'Recoleta',
    location: 'Recoleta Alta, Buenos Aires',
    photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=750&fit=crop',
    level: 5,
    verified: true,
    isOnline: true,
    description: 'Masajista VIP con más de 8 años de experiencia. Especialista en técnicas anti-stress y terapias holísticas. Atención exclusiva con total confidencialidad garantizada.',
    services: ['Terapia Anti-stress', 'Masaje Holístico', 'Reflexología', 'Masaje Sueco'],
    modality: ['Lugar propio', 'Hotel', 'Domicilio'],
    amenities: ['Ducha', 'Camilla profesional', 'Toallas incluidas', 'Aceites premium', 'Sahumerios', 'Estacionamiento'],
    categories: ['VIP', 'Terapéutico'],
    priceRange: '$10.000 - $20.000',
    gallery: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
    ],
    whatsapp: '+5491187654321',
    profileViews: 2105,
    whatsappClicks: 143,
    reviews: [
      { id: 'r9', author: 'Sebastián K.', rating: 5, comment: 'La mejor masajista de Buenos Aires, sin dudas.', date: '2024-01-18' },
      { id: 'r10', author: 'Andrés M.', rating: 5, comment: 'Profesionalismo total. Resultado increíble.', date: '2024-01-16' },
    ],
  },
  {
    id: '6',
    name: 'Luciana',
    age: 26,
    neighborhood: 'Palermo',
    location: 'Palermo Hollywood, Buenos Aires',
    photo_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=750&fit=crop',
    level: 4,
    verified: true,
    isOnline: false,
    description: 'Masajes relajantes con un toque especial. Uso de aromas exclusivos y técnicas de bienestar para liberarte del estrés diario.',
    services: ['Masaje Relajante', 'Aromaterapia', 'Masaje con Velas', 'Tratamiento Facial'],
    modality: ['Lugar propio'],
    amenities: ['Camilla profesional', 'Velas aromáticas', 'Toallas incluidas', 'Té de cortesía'],
    categories: ['Relajante', 'Especial'],
    priceRange: '$5.000 - $8.500',
    gallery: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop',
    ],
    whatsapp: '+5491165432109',
    profileViews: 698,
    whatsappClicks: 47,
    reviews: [
      { id: 'r11', author: 'Marco T.', rating: 5, comment: 'El ambiente es increíble, totalmente relajante.', date: '2024-01-11' },
    ],
  },
  {
    id: '7',
    name: 'Marina',
    age: 32,
    neighborhood: 'San Telmo',
    location: 'San Telmo, Buenos Aires',
    photo_url: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=600&h=750&fit=crop',
    level: 3,
    verified: true,
    isOnline: true,
    description: 'Terapeuta certificada en masaje terapéutico y deportivo. Ideal para aliviar tensiones musculares y recuperación post-entrenamiento.',
    services: ['Masaje Terapéutico', 'Deportivo', 'Descontracturante', 'Vendaje Neuromuscular'],
    modality: ['Domicilio', 'Lugar propio'],
    amenities: ['Camilla portátil', 'Aceites terapéuticos', 'Bolsa de frío/calor'],
    categories: ['Terapéutico'],
    priceRange: '$4.000 - $7.500',
    gallery: [
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&h=500&fit=crop',
    ],
    whatsapp: '+5491176543210',
    profileViews: 389,
    whatsappClicks: 22,
    reviews: [
      { id: 'r12', author: 'Facundo A.', rating: 4, comment: 'Muy efectivo para el dolor de espalda.', date: '2024-01-07' },
      { id: 'r13', author: 'Nicolás P.', rating: 5, comment: 'La mejor para masaje deportivo.', date: '2024-01-03' },
    ],
  },
  {
    id: '8',
    name: 'Natalia',
    age: 29,
    neighborhood: 'Caballito',
    location: 'Caballito, Buenos Aires',
    photo_url: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=750&fit=crop',
    level: 2,
    verified: false,
    isOnline: true,
    description: 'Masajes relajantes con técnica personalizada. Ambiente tranquilo y cálido en el corazón de Caballito. Atención de lunes a sábado.',
    services: ['Masaje Relajante', 'Masaje con Aceites', 'Masaje Sueco'],
    modality: ['Lugar propio'],
    amenities: ['Camilla profesional', 'Toallas incluidas', 'Música relajante'],
    categories: ['Relajante'],
    priceRange: '$3.500 - $6.000',
    gallery: [
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop',
    ],
    whatsapp: '+5491154321098',
    profileViews: 234,
    whatsappClicks: 18,
    reviews: [
      { id: 'r14', author: 'Ezequiel V.', rating: 4, comment: 'Muy agradable la atención.', date: '2024-01-04' },
    ],
  },
  {
    id: '9',
    name: 'Agustina',
    age: 23,
    neighborhood: 'Villa Crespo',
    location: 'Villa Crespo, Buenos Aires',
    photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=750&fit=crop',
    level: 1,
    verified: false,
    isOnline: false,
    description: 'Recién incorporada al directorio. Masajes relajantes con mucho amor y dedicación. Atención personalizada en un espacio íntimo y tranquilo.',
    services: ['Masaje Relajante', 'Masaje con Aceites'],
    modality: ['Lugar propio'],
    amenities: ['Camilla profesional', 'Aromaterapia básica'],
    categories: ['Nuevas', 'Relajante'],
    priceRange: '$3.000 - $4.500',
    gallery: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
    ],
    whatsapp: '+5491143210987',
    profileViews: 87,
    whatsappClicks: 6,
    reviews: [],
  },
  {
    id: '10',
    name: 'Carolina',
    age: 31,
    neighborhood: 'Núñez',
    location: 'Núñez, Buenos Aires',
    photo_url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&h=750&fit=crop',
    level: 1,
    verified: false,
    isOnline: true,
    description: 'Masajista nueva en el directorio con formación en técnicas de relajación profunda. Disponible toda la semana con previa coordinación.',
    services: ['Masaje Relajante', 'Reflexología básica'],
    modality: ['Domicilio'],
    amenities: ['Camilla portátil', 'Aceites incluidos'],
    categories: ['Nuevas'],
    priceRange: '$2.500 - $4.000',
    gallery: [
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=500&fit=crop',
    ],
    whatsapp: '+5491132109876',
    profileViews: 62,
    whatsappClicks: 3,
    reviews: [],
  },
]

export function filterByNeighborhood(neighborhood: string): Therapist[] {
  if (neighborhood === 'Todos') return mockTherapists
  return mockTherapists.filter((t) => t.neighborhood === neighborhood)
}

export function getTherapistById(id: string): Therapist | undefined {
  return mockTherapists.find((t) => t.id === id)
}

export function searchTherapists(
  therapists: Therapist[],
  query: string,
  selectedFilters: string[],
  selectedCategory: string
): Therapist[] {
  let result = therapists

  if (query.trim()) {
    const q = query.toLowerCase()
    result = result.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.neighborhood.toLowerCase().includes(q) ||
      (t.location?.toLowerCase().includes(q) ?? false) ||
      (t.services?.some(s => s.toLowerCase().includes(q)) ?? false) ||
      (t.description?.toLowerCase().includes(q) ?? false)
    )
  }

  if (selectedFilters.length > 0) {
    result = result.filter(t =>
      selectedFilters.every(filter => {
        if (filter === 'hotel') return t.modality?.includes('Hotel') ?? false
        if (filter === 'depto') return t.modality?.includes('Lugar propio') ?? false
        if (filter === 'domicilio') return t.modality?.includes('Domicilio') ?? false
        return true
      })
    )
  }

  if (selectedCategory && selectedCategory !== 'Todos') {
    const term = selectedCategory.toLowerCase()
    result = result.filter(t =>
      t.categories?.some(c => c.toLowerCase() === term) ?? false
    )
  }

  return result
}
