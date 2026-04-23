'use client'
import { use, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, Home, Building, Check, Star, ShieldCheck, ChevronLeft, ChevronRight, Clock, CalendarDays } from 'lucide-react'
import { track } from '@vercel/analytics'
import { Header } from '@/components/header'
import { StarRating } from '@/components/star-rating'
import { MEMBERSHIP_LEVELS, Therapist } from '@/lib/mock-data'
import { getProfiles } from '@/lib/store'

export default function TherapistProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [therapist, setTherapist] = useState<Therapist | undefined>(undefined)
  const [activePhoto, setActivePhoto] = useState(0)

  useEffect(() => {
    getProfiles().then(profiles => {
      const found = profiles.find(t => t.id === id || id.startsWith(t.id + '-'))
      setTherapist(found)
      if (found) track('view_profile', { therapist_id: found.id, neighborhood: found.neighborhood })
    })
  }, [id])

  if (therapist === undefined) return (
    <div className="min-h-screen bg-[#2A153D] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
    </div>
  )
  if (!therapist) return <div className="text-white text-center py-20">Perfil no encontrado</div>

  const levelInfo = MEMBERSHIP_LEVELS[therapist.level]
  const waMessage = encodeURIComponent(`Hola ${therapist.name}, vi tu aviso en Privé Relax`)
  const whatsappUrl = `https://wa.me/${therapist.whatsapp?.replace(/[^0-9]/g, '')}?text=${waMessage}`
  const allPhotos = [
    therapist.photo_url,
    ...(therapist.gallery ?? []).filter(g => g && g !== therapist.photo_url),
  ].filter(Boolean) as string[]

  const averageRating = therapist.reviews && therapist.reviews.length > 0
    ? Math.round((therapist.reviews.reduce((acc, r) => acc + r.rating, 0) / therapist.reviews.length) * 10) / 10
    : 0

  const handleWhatsAppClick = useCallback(() => {
    track('click_whatsapp', { therapist_id: therapist.id, neighborhood: therapist.neighborhood })
  }, [therapist.id, therapist.neighborhood])

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
                alt={`${therapist.name} — masajista en ${therapist.neighborhood}`}
                width={600}
                height={750}
                loading="eager"
                fetchPriority="high"
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
              {allPhotos.length > 1 && (
                <>
                  <button
                    onClick={() => setActivePhoto(i => (i - 1 + allPhotos.length) % allPhotos.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setActivePhoto(i => (i + 1) % allPhotos.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {allPhotos.map((_, i) => (
                      <button key={i} onClick={() => setActivePhoto(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === activePhoto ? 'bg-[#D4AF37] scale-125' : 'bg-white/40'}`}
                      />
                    ))}
                  </div>
                </>
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
                    <img src={photo} alt={`Foto ${i + 1} de ${therapist.name}`} width={80} height={80} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
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

            {/* Hours & Days */}
            {(therapist.workingHours || (therapist.availableDays && therapist.availableDays.length > 0)) && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">Disponibilidad</h2>
                <div className="bg-black/20 border border-white/5 rounded-xl p-4 space-y-3">
                  {therapist.workingHours && (
                    <div className="flex items-center gap-2.5">
                      <Clock className="h-4 w-4 text-[#D4AF37] shrink-0" />
                      <span className="text-sm text-white/80">{therapist.workingHours}</span>
                    </div>
                  )}
                  {therapist.availableDays && therapist.availableDays.length > 0 && (
                    <div className="flex items-start gap-2.5">
                      <CalendarDays className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div className="flex flex-wrap gap-1.5">
                        {therapist.availableDays.map(day => (
                          <span key={day} className="bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-medium px-2 py-0.5 rounded-full border border-[#D4AF37]/20">
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
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

            {/* Stats bar — visible to admin/owner only, hidden from public */}

            {/* WhatsApp Button (desktop) */}
            <div className="hidden lg:block mt-auto space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="relative flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#1db954] text-white font-bold py-4 px-5 rounded-xl shadow-[0_0_24px_0_rgba(37,211,102,0.35)] hover:shadow-[0_0_32px_0_rgba(37,211,102,0.55)] transition-all duration-300 text-base group overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Contactar por WhatsApp</span>
              </a>
              {therapist.whatsapp && (
                <p className="text-center text-xs text-white/30">
                  {therapist.whatsapp.replace(/(.{6}).*(.{4})$/, '$1••••$2')}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Reviews */}
        {therapist.reviewsEnabled !== false && therapist.reviews && therapist.reviews.length > 0 && (
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
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden px-4 pb-5 pt-10 bg-gradient-to-t from-[#1A0A24] via-[#1A0A24]/90 to-transparent">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="relative flex items-center justify-between w-full bg-[#25D366] hover:bg-[#1db954] text-white font-bold py-4 px-5 rounded-2xl shadow-[0_0_28px_0_rgba(37,211,102,0.45)] transition-all duration-300 overflow-hidden group"
        >
          <div className="absolute inset-0 -translate-x-full group-active:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-1.5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <p className="text-base font-bold leading-tight">Contactar por WhatsApp</p>
              {therapist.whatsapp && (
                <p className="text-[11px] text-white/70 leading-none mt-0.5">
                  {therapist.whatsapp.replace(/(.{6}).*(.{4})$/, '$1••••$2')}
                </p>
              )}
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}
