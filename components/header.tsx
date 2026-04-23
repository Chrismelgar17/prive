'use client'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur h-16">
      <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Left spacer — mirrors button width so logo stays centered */}
        <div className="w-[90px] sm:w-[110px] shrink-0" />

        {/* Centered Logo */}
        <Link href="/" className="flex-1 flex justify-center items-center">
          <img
            src="/logo.jpeg"
            alt="Privé Relax"
            width={44}
            height={44}
            className="h-10 w-10 sm:h-11 sm:w-11 object-contain rounded-full"
            fetchPriority="high"
            loading="eager"
          />
        </Link>

        {/* Right CTA Button — fixed width matches left spacer */}
        <div className="w-[90px] sm:w-[110px] shrink-0 flex justify-end">
          <Link
            href="/login"
            className="bg-[#D4AF37] hover:bg-[#b8962e] text-black px-3 sm:px-5 py-2 text-xs font-bold uppercase tracking-wide rounded-md transition-colors shadow-lg whitespace-nowrap"
          >
            Publicar
          </Link>
        </div>
      </div>
    </header>
  )
}
