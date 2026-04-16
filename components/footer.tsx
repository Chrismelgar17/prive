import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/8 bg-[#1A0A24] mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        {/* Main columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="font-serif text-xl font-light tracking-[0.25em] text-white uppercase">
              Privé Relax
            </span>
            <p className="mt-3 text-xs text-white/40 leading-relaxed max-w-xs">
              Plataforma de difusión de servicios profesionales de masoterapia y bienestar en Buenos Aires.
              No intermediamos en pagos ni acuerdos entre partes.
            </p>
          </div>

          {/* Column 2 — Directorio */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-4">
              Directorio
            </h3>
            <nav className="flex flex-col gap-2.5">
              <Link href="/" className="text-xs text-white/55 hover:text-[#D4AF37] transition-colors">Inicio</Link>
              <Link href="/login" className="text-xs text-white/55 hover:text-[#D4AF37] transition-colors">Publicar anuncio</Link>
              <Link href="/dashboard" className="text-xs text-white/55 hover:text-[#D4AF37] transition-colors">Mi cuenta</Link>
            </nav>
          </div>

          {/* Column 3 — Legales */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-4">
              Legales
            </h3>
            <nav className="flex flex-col gap-2.5">
              <Link href="/terminos" className="text-xs text-white/55 hover:text-[#D4AF37] transition-colors">
                Términos y Condiciones
              </Link>
              <Link href="/privacidad" className="text-xs text-white/55 hover:text-[#D4AF37] transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/privacidad#cookies" className="text-xs text-white/55 hover:text-[#D4AF37] transition-colors">
                Política de Cookies
              </Link>
              <Link href="/privacidad#dmca" className="text-xs text-white/55 hover:text-[#D4AF37] transition-colors">
                DMCA / Derechos de imagen
              </Link>
              <Link href="/terminos#separacion" className="text-xs text-white/55 hover:text-[#D4AF37] transition-colors">
                Separación de Servicios
              </Link>
            </nav>
          </div>

          {/* Column 4 — Aviso legal */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-4">
              Aviso Legal
            </h3>
            <div className="space-y-2.5 text-[11px] text-white/30 leading-relaxed">
              <p>
                No se admiten publicaciones vinculadas a servicios sexuales, acompañamiento o actividades íntimas.
              </p>
              <p>
                Privé Relax es una <strong className="text-white/40">plataforma de difusión</strong>. No presta, contrata ni intermedia servicios.
              </p>
              <p>
                Los anunciantes operan de forma autónoma e independiente. Todo acuerdo es exclusivo entre las partes.
              </p>
              <p>
                Contenido generado por terceros. Privé Relax no verifica ni garantiza la exactitud de los anuncios publicados.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/5" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[11px] text-white/25 leading-relaxed">
            © {year} <span className="text-white/35 font-medium">Privé Relax</span>. Todos los derechos reservados.
            {' '}Marca y contenido protegidos. Prohibida su reproducción sin autorización.
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/terminos" className="text-[10px] text-white/25 hover:text-white/50 transition-colors uppercase tracking-wider">T&C</Link>
            <Link href="/privacidad" className="text-[10px] text-white/25 hover:text-white/50 transition-colors uppercase tracking-wider">Privacidad</Link>
            <Link href="/privacidad#dmca" className="text-[10px] text-white/25 hover:text-white/50 transition-colors uppercase tracking-wider">DMCA</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
