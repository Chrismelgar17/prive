import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/8 bg-[#1A0A24] mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <span className="font-serif text-xl font-light tracking-[0.25em] text-white uppercase">
              Privé Relax
            </span>
            <p className="mt-1.5 text-xs text-white/40 max-w-xs leading-relaxed">
              Catálogo publicitario de anunciantes independientes verificadas en Buenos Aires.
              No intermediamos en pagos ni acuerdos. Solo para mayores de 18 años.
            </p>
          </div>

          {/* Legal links */}
          <nav aria-label="Legal" className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2">
            <Link
              href="/terminos"
              className="text-xs text-white/50 hover:text-[#D4AF37] transition-colors"
            >
              Términos y Condiciones
            </Link>
            <Link
              href="/privacidad"
              className="text-xs text-white/50 hover:text-[#D4AF37] transition-colors"
            >
              Política de Privacidad
            </Link>
            <Link
              href="/privacidad#cookies"
              className="text-xs text-white/50 hover:text-[#D4AF37] transition-colors"
            >
              Cookies
            </Link>
            <Link
              href="/privacidad#dmca"
              className="text-xs text-white/50 hover:text-[#D4AF37] transition-colors"
            >
              DMCA
            </Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="my-7 border-t border-white/5" />

        {/* Age warning + copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[11px] text-white/30 max-w-md leading-relaxed">
            <span className="font-semibold text-white/40">+18</span>
            {' '}Contenido exclusivo para adultos. Al acceder confirmás tener 18 años o más.{' '}
            <span className="text-white/40">Privé Relax es un catálogo publicitario.</span>{' '}
            No interviene en pagos, acuerdos ni prestación de servicios. Cada anunciante es independiente y responsable de su propio contenido.
          </p>
          <p className="text-[11px] text-white/30 shrink-0">
            © {year} Privé Relax. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
