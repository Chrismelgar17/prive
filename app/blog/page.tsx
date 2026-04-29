import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { BLOG_POSTS } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Blog de masajes y bienestar',
  description: 'Artículos sobre masajes, bienestar y relajación en Buenos Aires. Consejos de profesionales, tipos de masajes y guías para mejorar tu salud.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog de masajes y bienestar | Privé Relax',
    description: 'Artículos sobre masajes, bienestar y relajación en Buenos Aires.',
    url: '/blog',
    type: 'website',
  },
}

export default function BlogPage() {
  const sorted = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Blog de masajes y bienestar
          </h1>
          <p className="mt-3 text-sm text-gray-400 max-w-2xl">
            Artículos sobre masajes profesionales, técnicas de relajación y bienestar en Buenos Aires y CABA.
          </p>
        </div>

        <div className="space-y-6">
          {sorted.map((post) => (
            <article
              key={post.slug}
              className="border border-white/10 rounded-xl p-6 bg-black/20 hover:border-[#D4AF37]/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] uppercase tracking-wider text-[#D4AF37]/80 font-medium">
                  {post.category}
                </span>
                <span className="text-white/20">·</span>
                <span className="text-[11px] text-white/40">
                  {new Date(post.date).toLocaleDateString('es-AR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="text-white/20">·</span>
                <span className="text-[11px] text-white/40">{post.readingTime} min de lectura</span>
              </div>
              <h2 className="text-lg font-semibold text-white mb-2 leading-snug">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-white/55 leading-relaxed mb-4">{post.description}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#b8962e] transition-colors"
              >
                Leer artículo →
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
