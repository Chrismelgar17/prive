import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { getBlogPost, getAllSlugs } from '@/lib/blog-posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.priverelax.com'

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${post.title} | Privé Relax`,
      description: post.description,
      url: `/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: '/logo.jpeg', width: 400, height: 400, alt: 'Privé Relax' }],
    },
    other: {
      'article:published_time': post.date,
    },
  }
}

function renderContent(markdown: string) {
  const lines = markdown.trim().split('\n')
  const elements: React.ReactNode[] = []
  let key = 0

  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-xl font-semibold text-white mt-8 mb-3">
          {line.replace('## ', '')}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-base font-semibold text-white/90 mt-5 mb-2">
          {line.replace('### ', '')}
        </h3>
      )
    } else if (line.startsWith('- ')) {
      const listItems: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].replace('- ', ''))
        i++
      }
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1 text-white/60 pl-2 my-3">
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white/80">$1</strong>') }} />
          ))}
        </ul>
      )
      continue
    } else if (/^\d+\./.test(line)) {
      const listItems: string[] = []
      while (i < lines.length && /^\d+\./.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\.\s/, ''))
        i++
      }
      elements.push(
        <ol key={key++} className="list-decimal list-inside space-y-1 text-white/60 pl-2 my-3">
          {listItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      )
      continue
    } else if (line.trim() === '') {
      // skip blank lines
    } else {
      elements.push(
        <p key={key++} className="text-white/65 leading-relaxed my-3"
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white/85">$1</strong>') }}
        />
      )
    }
    i++
  }

  return elements
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Privé Relax' },
    publisher: {
      '@type': 'Organization',
      name: 'Privé Relax',
      logo: { '@type': 'ImageObject', url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.priverelax.com'}/logo.jpeg` },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-white/40 mb-8">
          <Link href="/" className="hover:text-white/60 transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-white/60 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-white/60">{post.category}</span>
        </nav>

        {/* Article header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] uppercase tracking-wider text-[#D4AF37]/80 font-medium">
              {post.category}
            </span>
            <span className="text-white/20">·</span>
            <time dateTime={post.date} className="text-[11px] text-white/40">
              {new Date(post.date).toLocaleDateString('es-AR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="text-white/20">·</span>
            <span className="text-[11px] text-white/40">{post.readingTime} min de lectura</span>
          </div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl leading-snug mb-4">
            {post.title}
          </h1>
          <p className="text-sm text-white/55 leading-relaxed border-l-2 border-[#D4AF37]/40 pl-4">
            {post.description}
          </p>
        </header>

        {/* Article body */}
        <article className="text-sm leading-relaxed">
          {renderContent(post.content)}
        </article>

        {/* CTA */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-sm text-white/50 mb-4">
            ¿Buscás un masajista profesional en Buenos Aires?
          </p>
          <Link
            href="/"
            className="inline-block bg-[#D4AF37] hover:bg-[#b8962e] text-black px-6 py-2.5 text-xs font-bold uppercase tracking-wide rounded-md transition-colors"
          >
            Ver perfiles disponibles
          </Link>
        </div>

        {/* Back to blog */}
        <div className="mt-8">
          <Link
            href="/blog"
            className="text-xs text-white/40 hover:text-white/60 transition-colors"
          >
            ← Volver al blog
          </Link>
        </div>
      </main>
    </div>
  )
}
