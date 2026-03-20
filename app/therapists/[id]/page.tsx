'use client'
import { use, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, MessageCircle, Home, Building, Check, Star, ShieldCheck } from 'lucide-react'
import { Header } from '@/components/header'
import { StarRating } from '@/components/star-rating'
import { getTherapistById, MEMBERSHIP_LEVELS } from '@/lib/mock-data'

export default function TherapistProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const therapist = getTherapistById(id)
  const [activePhoto, setActivePhoto] = useState(0)

  if (!therapist) return <div className="text-white text-center py-20">Perfil no encontrado</div>

  const levelInfo = MEMBERSHIP_LEVELS[therapist.level]
  const whatsappUrl = `https://wa.me/${therapist.whatsapp?.replace(/[^0-9]/g, '')}`
  const allPhotos = (therapist.gallery && therapist.gallery.length > 0) ? therapist.gallery : [therapist.photo_url]

  const averageRating = therapist.reviews && therapist.reviews.length > 0
    ? Math.round((therapist.reviews.reduce((acc, r) => acc + r.rating, 0) / therapist.reviews.length) * 10) / 10
    : 0

  const modalityIcon = (m: string) => {
    if (m === 'Lugar propio') return <Home className="h-3.5 w-3.5 text-[#D4AF37]" />
    if (m === 'Hotel') return <Building className="h-3.5 w-3.5 text-[#D4AF37]" />
    return <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
  }

  return (
    <div className="min-h-screen bg-[#2A153D]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8 pb-24 lg:pb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#D4AF37] mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Volver al directorio
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Photos Column ── */}
          <div className="flex-1">
            {/* Main Photo */}
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden ring-1 ring-[#D4AF37]/40 mb-3 shadow-xl">
              <img
                src={allPhotos[activePhoto]}
                alt={therapist.name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-md border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                {levelInfo.name}
              </div>
              {therapist.verified && (
                <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-[10px] font-semibold uppercase">Verificada</span>
                </div>
              )}
            </div>

            {/* Scrollable Thumbnails */}
            {allPhotos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                {allPhotos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className={`relative flex-shrink-0 w-20 aspect-square rounded-lg overflow-hidden ring-2 transition-all ${
                      i === activePhoto ? 'ring-[#D4AF37] opacity-100' : 'ring-white/10 opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img src={photo} alt={`Foto ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info Column ── */}
          <div className="lg:w-80 flex flex-col gap-5 text-white">
            {/* Name + Age + Location + Rating */}
            <div>
              <div className="flex justify-between items-baseline">
                <h1 className="text-3xl font-bold">{therapist.name}</h1>
                <span className="text-xl text-[#D4AF37] font-semibold">{therapist.age} años</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/60 mt-1.5">
                <MapPin className="h-4 w-4 text-[#D4AF37]" />
                <span className="text-sm">{therapist.location || therapist.neighborhood}</span>
              </div>
              {averageRating > 0 && (
                <div className="flex items-center gap-2 mt-3 bg-black/30 p-3 rounded-lg border border-white/5">
                  <StarRating rating={averageRating} size="md" />
                  <span className="font-medium text-[#D4AF37]">{averageRating.toFixed(1)}</span>
                  <span className="text-xs text-white/50">({therapist.reviews?.length || 0} reseñas)</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-2">Sobre mí</h2>
              <p className="text-sm text-white/70 leading-relaxed">{therapist.description || 'Especialista en masajes exclusivos.'}</p>
            </div>

            {/* Services */}
            {therapist.services && therapist.services.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">Servicios</h2>
                <div className="flex flex-wrap gap-2">
                  {therapist.services.map(service => (
                    <span key={service} className="bg-[#3D1F54] text-white/90 text-xs px-3 py-1.5 rounded-md border border-[#4A2866]">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modality */}
            {therapist.modality && therapist.modality.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">Modalidad</h2>
                <div className="flex flex-wrap gap-2">
                  {therapist.modality.map(m => (
                    <span key={m} className="flex items-center gap-1.5 bg-black/30 text-white/80 text-xs px-3 py-1.5 rounded-md border border-white/10">
                      {modalityIcon(m)}
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {therapist.amenities && therapist.amenities.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">Comodidades</h2>
                <div className="flex flex-wrap gap-2">
                  {therapist.amenities.map(a => (
                    <span key={a} className="flex items-center gap-1 bg-[#3D1F54]/60 text-white/70 text-xs px-2.5 py-1 rounded-md border border-[#4A2866]/50">
                      <Check className="h-3 w-3 text-[#D4AF37] shrink-0" /> {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Map – approximate location */}
            {(therapist.location || therapist.neighborhood) && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">Ubicación aproximada</h2>
                <div className="rounded-xl overflow-hidden ring-1 ring-white/10">
                  <iframe
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent((therapist.neighborhood ?? '') + ', Buenos Aires, Argentina')}&z=14&output=embed`}
                    title={`Ubicación en ${therapist.neighborhood}`}
                  />
                </div>
                <p className="text-[10px] text-white/40 mt-1.5 text-center">Zona aproximada — no se muestra dirección exacta</p>
              </div>
            )}

            {/* WhatsApp Button (desktop) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex mt-auto items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3 px-4 rounded-md transition-colors shadow-lg"
            >
              <MessageCircle className="h-5 w-5" /> Contactar por WhatsApp
            </a>
          </div>
        </div>

        {/* Reviews */}
        {therapist.reviews && therapist.reviews.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-4">Reseñas</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {therapist.reviews.map(review => (
                <div key={review.id} className="bg-black/20 border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{review.author}</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">{review.comment}</p>
                  <p className="text-[10px] text-white/30 mt-2">{new Date(review.date).toLocaleDateString('es-AR')}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Sticky WhatsApp button — mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden p-4 bg-gradient-to-t from-[#1F0F2E] to-transparent">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3.5 px-4 rounded-xl shadow-2xl transition-colors text-sm"
        >
          <MessageCircle className="h-5 w-5" /> Contactar por WhatsApp
        </a>
      </div>
    </div>
  )
}
