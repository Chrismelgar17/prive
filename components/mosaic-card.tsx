'use client'

import Link from 'next/link'
import { Diamond, Star, Zap, ShieldCheck, User, Eye, Phone } from 'lucide-react'
import { Therapist, MembershipLevel } from '@/lib/mock-data'

const levelIcons: Record<MembershipLevel, React.ElementType> = {
  5: Diamond,
  4: Star,
  3: Zap,
  2: ShieldCheck,
  1: User,
}

const levelColors: Record<MembershipLevel, string> = {
  5: 'text-primary',
  4: 'text-red-500',
  3: 'text-blue-400',
  2: 'text-yellow-500',
  1: 'text-gray-400',
}

export function MosaicCard({ therapist }: { therapist: Therapist }) {
  const LevelIcon = levelIcons[therapist.level]
  const isDiamond = therapist.level === 5

  return (
    <Link
      href={`/therapists/${therapist.id}`}
      className={`group relative block aspect-[4/5] overflow-hidden rounded-md ${isDiamond ? 'ring-1 ring-primary/40' : ''}`}
    >
      <img
        src={therapist.photo_url}
        alt={therapist.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute left-1 top-1 z-10">
        <span
          className={`flex h-4 w-4 items-center justify-center rounded-full bg-black/70 ${levelColors[therapist.level]}`}
        >
          <LevelIcon className="h-2.5 w-2.5" />
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2 pt-10">
        <p className="truncate text-[11px] font-semibold text-white">
          {therapist.name}, {therapist.age}
        </p>
        <p className="truncate text-[9px] text-white/70">{therapist.neighborhood}</p>
        {therapist.priceRange && (
          <p className="truncate text-[9px] font-semibold text-[#D4AF37] mt-0.5">{therapist.priceRange}</p>
        )}
        {/* Micro metrics */}
        {(therapist.profileViews || therapist.whatsappClicks) ? (
          <div className="flex items-center gap-2 mt-1.5 pt-1.5 border-t border-white/10">
            {therapist.profileViews ? (
              <span className="flex items-center gap-0.5 text-[9px] text-blue-300/80">
                <Eye className="h-2.5 w-2.5" />{therapist.profileViews >= 1000 ? `${(therapist.profileViews / 1000).toFixed(1)}k` : therapist.profileViews}
              </span>
            ) : null}
            {therapist.whatsappClicks ? (
              <span className="flex items-center gap-0.5 text-[9px] text-[#25D366]/80">
                <Phone className="h-2.5 w-2.5" />{therapist.whatsappClicks}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
      {isDiamond && <div className="shimmer-gold pointer-events-none absolute inset-0 opacity-30" />}
    </Link>
  )
}
