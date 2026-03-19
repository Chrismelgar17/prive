'use client'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur h-16">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 relative">
        {/* Left spacer to balance the flexbox */}
        <div className="flex-1"></div>
        
        {/* Perfectly Centered Logo */}
        <Link 
          href="/" 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-2xl font-light tracking-[0.25em] text-white uppercase whitespace-nowrap"
        >
          Privé Relax
        </Link>
        
        {/* Right CTA Button */}
        <div className="flex-1 flex justify-end">
          <Link 
            href="/login" 
            className="bg-[#D4AF37] hover:bg-[#b8962e] text-black px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow-lg"
          >
            Publicar
          </Link>
        </div>
      </div>
    </header>
  )
}
