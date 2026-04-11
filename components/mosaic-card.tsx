'use client'

import Link from 'next/link'
import { Diamond, Star, Zap, ShieldCheck, User } from 'lucide-react'
import { Therapist, MembershipLevel } from '@/lib/mock-data'
import { therapistUrl } from '@/lib/utils'

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

const CATEGORY_RING: Record<string, string> = {
  'VIP': 'ring-[#D4AF37]/60',
  'Premium': 'ring-rose-500/50',
  'Relajante': 'ring-teal-400/50',
  'Terapéutico': 'ring-blue-400/50',
  'Especial': 'ring-purple-400/50',
  'Nuevas': 'ring-emerald-400/50',
}

export function MosaicCard({ therapist }: { therapist: Therapist }) {
  const LevelIcon = levelIcons[therapist.level]
  const isDiamond = therapist.level === 5
  const firstCategory = therapist.categories?.[0]
  const ringClass = isDiamond
    ? 'ring-2 ring-[#D4AF37]/80 shadow-[0_0_14px_2px_rgba(212,175,55,0.35)]'
    : firstCategory && CATEGORY_RING[firstCategory]
      ? `ring-1 ${CATEGORY_RING[firstCategory]}`
      : ''

  return (
    <Link
      href={therapistUrl(therapist.id, therapist.name)}
      className={`group relative block aspect-[4/5] overflow-hidden rounded-md ${ringClass}`}
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
        {therapist.categories && therapist.categories.length > 0 && (
          <p className="truncate text-[8px] font-medium text-[#D4AF37]/80 uppercase tracking-wide mt-0.5">
            {therapist.categories.slice(0, 2).join(' · ')}
          </p>
        )}
        {therapist.priceRange && (
          <p className="truncate text-[9px] font-semibold text-[#D4AF37] mt-0.5">{therapist.priceRange}</p>
        )}
      </div>
      {isDiamond && (
        <div className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-inset ring-[#D4AF37]/30" />
      )}
    </Link>
  )
}
