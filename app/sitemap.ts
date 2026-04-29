import type { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blog-posts'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.priverelax.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE}/masajistas-buenos-aires`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Zonas
    {
      url: `${BASE}/palermo`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE}/recoleta`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE}/belgrano`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE}/caballito`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE}/almagro`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE}/flores`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Categorías
    {
      url: `${BASE}/masajes-relajantes`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE}/masajes-descontracturantes`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE}/masajes-terapeuticos`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE}/reflexologia`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Páginas legales
    {
      url: `${BASE}/terminos`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE}/privacidad`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    // Landing page Google Ads (noindex — no incluir en sitemap público)
    // /masajes-profesionales-caba es noindex, no va en sitemap

    // Página SEO CABA
    {
      url: `${BASE}/masajes-caba`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Blog
    {
      url: `${BASE}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...BLOG_POSTS.map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
