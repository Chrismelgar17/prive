'use client'
import { use } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, MessageCircle } from 'lucide-react'
import { Header } from '@/components/header'
import { StarRating } from '@/components/star-rating'
import { getTherapistById, MEMBERSHIP_LEVELS } from '@/lib/mock-data'

export default function TherapistProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const therapist = getTherapistById(id)

  if (!therapist) return <div className="text-white text-center py-20">Perfil no encontrado</div>

  const levelInfo = MEMBERSHIP_LEVELS[therapist.level]
  const whatsappUrl = `https://wa.me/${therapist.whatsapp?.replace(/[^0-9]/g, '')}`
  
  // Calculate average rating safely
  const averageRating = therapist.reviews && therapist.reviews.length > 0 
    ? Math.round((therapist.reviews.reduce((acc, r) => acc + r.rating, 0) / therapist.reviews.length) * 10) / 10 
    : 0

  return (
    <div className="min-h-screen bg-[#2A153D]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#D4AF37] mb-6">
          <ArrowLeft className="h-4 w-4" /> Volver al directorio
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Photos Section */}
          <div className="flex-1">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden ring-1 ring-[#D4AF37]/40 mb-4 shadow-xl">
              <img src={therapist.photo_url} alt={therapist.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-md border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                {levelInfo.name}
              </div>
            </div>
            
            {/* Small Gallery */}
            {therapist.gallery && therapist.gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {therapist.gallery.slice(0, 4).map((photo, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden ring-1 ring-white/10">
                    <img src={photo} alt="Gallery" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="lg:w-80 flex flex-col gap-6 text-white">
            <div>
              <div className="flex justify-between items-baseline">
                <h1 className="text-3xl font-bold">{therapist.name}</h1>
                <span className="text-xl text-[#D4AF37] font-semibold">{therapist.age} años</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/60 mt-2">
                <MapPin className="h-4 w-4 text-[#D4AF37]" />
                <span className="text-sm">{therapist.location || therapist.neighborhood}</span>
              </div>
              <div className="flex items-center gap-2 mt-4 bg-black/30 p-3 rounded-lg border border-white/5">
                <StarRating rating={averageRating} size="md" />
                <span className="font-medium text-[#D4AF37]">{averageRating.toFixed(1)}</span>
                <span className="text-xs text-white/50">({therapist.reviews?.length || 0} reseñas)</span>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-2">Sobre mí</h2>
              <p className="text-sm text-white/70 leading-relaxed">{therapist.description || 'Especialista en masajes exclusivos.'}</p>
            </div>

            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">Servicios</h2>
              <div className="flex flex-wrap gap-2">
                {therapist.services?.map(service => (
                  <span key={service} className="bg-[#3D1F54] text-white/90 text-xs px-3 py-1.5 rounded-md border border-[#4A2866]">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3 px-4 rounded-md transition-colors shadow-lg">
              <MessageCircle className="h-5 w-5" /> Contactar por WhatsApp
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
