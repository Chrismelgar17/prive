'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { MosaicCard } from '@/components/mosaic-card'
import { getProfiles } from '@/lib/store'
import type { Therapist } from '@/lib/mock-data'

const ZONE_LINKS = [
  { label: 'Masajistas en Palermo', href: '/palermo' },
  { label: 'Masajistas en Recoleta', href: '/recoleta' },
  { label: 'Masajistas en Belgrano', href: '/belgrano' },
  { label: 'Masajistas en Caballito', href: '/caballito' },
  { label: 'Masajistas en Almagro', href: '/almagro' },
  { label: 'Masajistas en Flores', href: '/flores' },
]

const ALL_CATEGORIES = [
  { label: 'Masajes relajantes', href: '/masajes-relajantes' },
  { label: 'Masajes descontracturantes', href: '/masajes-descontracturantes' },
  { label: 'Masajes terapéuticos', href: '/masajes-terapeuticos' },
  { label: 'Reflexología', href: '/reflexologia' },
]

interface Props {
  /** Nombre de la categoría tal como aparece en t.categories (ej: 'Relajante') */
  category: string
  /** Slug de la URL (ej: 'masajes-relajantes') — usado para excluir la página actual */
  slug: string
  h1: string
  description: string
  seoContent: React.ReactNode
  breadcrumbSchema: object
}

export function CategoryPageClient({ category, slug, h1, description, seoContent, breadcrumbSchema }: Props) {
  const [profiles, setProfiles] = useState<Therapist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProfiles().then(all => {
      const term = category.toLowerCase()
      setProfiles(
        all.filter(t =>
          !t.isPaused &&
          (t.categories?.some(c => c.toLowerCase() === term) ||
           t.services?.some(s => s.toLowerCase().includes(term)))
        )
      )
      setLoading(false)
    })
  }, [category])

  const otherCategories = ALL_CATEGORIES.filter(c => !c.href.includes(slug))

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-white/40 mb-6">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">Inicio</Link></li>
            <li className="text-white/20">/</li>
            <li className="text-white/60">Categorías</li>
            <li className="text-white/20">/</li>
            <li className="text-[#D4AF37]">{h1}</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-white mb-3">{h1}</h1>
        <p className="text-white/55 text-sm mb-8 max-w-2xl">{description}</p>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] rounded-md bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : profiles.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {profiles.map(t => <MosaicCard key={t.id} therapist={t} />)}
          </div>
        ) : (
          <p className="text-white/40 text-center py-12 border border-white/5 rounded-xl">
            No hay perfiles disponibles en esta categoría por el momento.{' '}
            <Link href="/" className="text-[#D4AF37] hover:underline">Ver todo el directorio</Link>
          </p>
        )}

        {/* Internal links */}
        <section className="mt-12 border-t border-white/10 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">Otras categorías</h2>
            <ul className="space-y-2.5">
              {otherCategories.map(c => (
                <li key={c.href}>
                  <Link href={c.href} className="text-sm text-white/60 hover:text-[#D4AF37] transition-colors">{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">Zonas de Buenos Aires</h2>
            <ul className="space-y-2.5">
              {ZONE_LINKS.map(z => (
                <li key={z.href}>
                  <Link href={z.href} className="text-sm text-white/60 hover:text-[#D4AF37] transition-colors">{z.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SEO Content */}
        <section className="mt-10 border-t border-white/10 pt-8 text-white/60 text-sm leading-relaxed">
          {seoContent}
        </section>

      </main>
    </div>
  )
}
