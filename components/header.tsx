'use client'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur h-16">
      <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Left spacer — fixed width mirrors the button width so logo stays centered */}
        <div className="w-[90px] sm:w-[110px] shrink-0" />

        {/* Centered Logo */}
        <Link
          href="/"
          className="flex-1 text-center font-serif text-xl sm:text-2xl font-light tracking-[0.15em] sm:tracking-[0.25em] text-white uppercase whitespace-nowrap"
        >
          Privé Relax
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
