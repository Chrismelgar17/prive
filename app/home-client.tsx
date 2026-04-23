'use client'
import { useState, useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { MapPin, SlidersHorizontal, Check } from 'lucide-react'
import { Header } from '@/components/header'
import { MosaicCard } from '@/components/mosaic-card'
import { SidebarNavigation } from '@/components/sidebar-navigation'
import { searchTherapists, MembershipLevel, MEMBERSHIP_LEVELS, SERVICE_CATEGORIES, Therapist } from '@/lib/mock-data'
import { getProfiles } from '@/lib/store'

const levelOrder: MembershipLevel[] = [5, 4, 3, 2, 1]
const FILTER_OPTIONS = [ { id: 'hotel', label: 'Atención en hotel' }, { id: 'depto', label: 'Lugar propio' }, { id: 'domicilio', label: 'A domicilio' } ]
const CATEGORY_OPTIONS = ['Todos', ...SERVICE_CATEGORIES]

const ZONES = [
  { label: 'Masajistas en Palermo', href: '/palermo' },
  { label: 'Masajistas en Recoleta', href: '/recoleta' },
  { label: 'Masajistas en Belgrano', href: '/belgrano' },
  { label: 'Masajistas en Caballito', href: '/caballito' },
]

const CATEGORIES_LINKS = [
  { label: 'Masajes relajantes', href: '/masajes-relajantes' },
  { label: 'Masajes descontracturantes', href: '/masajes-descontracturantes' },
  { label: 'Masajes terapéuticos', href: '/masajes-terapeuticos' },
  { label: 'Reflexología', href: '/reflexologia' },
]

export default function HomeClient() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Todos')
  const [selectedLevel, setSelectedLevel] = useState(0)
  const [locationInput, setLocationInput] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [allProfiles, setAllProfiles] = useState<Therapist[]>([])
  const [loadingProfiles, setLoadingProfiles] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getProfiles().then(setAllProfiles).finally(() => setLoadingProfiles(false))
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setFiltersOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => prev.includes(filterId) ? prev.filter(f => f !== filterId) : [...prev, filterId])
  }

  const filteredTherapists = useMemo(() => {
    const active = allProfiles.filter(t => !t.isPaused)
    const byNeighborhood = selectedNeighborhood === 'Todos'
      ? active
      : active.filter(t => t.neighborhood === selectedNeighborhood)
    const byFilters = searchTherapists(byNeighborhood, locationInput, selectedFilters, selectedCategory)
    return selectedLevel === 0 ? byFilters : byFilters.filter(t => t.level === selectedLevel)
  }, [allProfiles, selectedNeighborhood, locationInput, selectedFilters, selectedCategory, selectedLevel])

  const groupedByLevel = levelOrder.reduce((acc, level) => {
    acc[level] = filteredTherapists.filter((t) => t.level === level)
    return acc
  }, {} as Record<MembershipLevel, typeof filteredTherapists>)

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Header />
      <SidebarNavigation
        selectedNeighborhood={selectedNeighborhood}
        onSelectNeighborhood={setSelectedNeighborhood}
        onScrollToSection={(level: number) => document.getElementById(`section-${level}`)?.scrollIntoView({ behavior: 'smooth' })}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat: string) => { setSelectedCategory(cat) }}
        selectedLevel={selectedLevel}
        onSelectLevel={setSelectedLevel}
      />

      <main>
        <section className="relative w-full px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Masajistas en <span className="text-[#D4AF37]">Buenos Aires y CABA</span>
            </h1>
            <p className="mt-4 text-sm text-gray-400 md:text-base">
              Encontrá masajistas profesionales en Buenos Aires y CABA. Explorá perfiles por barrio,
              tipo de masaje y modalidad de atención: relajante, terapéutico, descontracturante y reflexología.
            </p>

            {/* Category Pills */}
            <div className="mt-6 flex gap-2 overflow-x-auto w-full max-w-2xl pb-1" style={{ scrollbarWidth: 'none' }}>
              {CATEGORY_OPTIONS.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all border ${
                    selectedCategory === cat
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                      : 'bg-transparent text-white/70 border-white/20 hover:border-[#D4AF37]/50 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="mt-3 mb-4 flex w-full max-w-4xl flex-col items-center gap-2 rounded-lg border border-white/10 bg-black/40 p-2 backdrop-blur-sm sm:flex-row sm:gap-4">
              <div className="flex flex-1 items-center border-white/10 px-4 py-2 sm:border-r w-full">
                <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
                <input type="text" placeholder="Ubicación (ej. Palermo)" value={locationInput} onChange={(e) => setLocationInput(e.target.value)} className="ml-2 w-full border-none bg-transparent text-sm text-white outline-none" />
              </div>

              <div className="relative w-full sm:w-auto" ref={dropdownRef}>
                <button onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center justify-center gap-2 w-full sm:w-auto text-white font-medium px-6 py-2 hover:text-[#D4AF37] transition-colors">
                  <SlidersHorizontal className="h-4 w-4" /> + FILTROS
                  {(selectedFilters.length + (selectedCategory !== 'Todos' ? 1 : 0)) > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-black text-xs font-bold ml-1">
                      {selectedFilters.length + (selectedCategory !== 'Todos' ? 1 : 0)}
                    </span>
                  )}
                </button>

                {filtersOpen && (
                  <div className="absolute right-0 top-full mt-2 w-full sm:w-64 bg-[#1A1838] border border-white/10 rounded-lg p-2 shadow-xl z-50 text-left">
                    <p className="px-3 py-2 text-xs uppercase tracking-wider text-gray-400">Tipo de Cita</p>
                    {FILTER_OPTIONS.map((option) => (
                      <button key={option.id} onClick={() => toggleFilter(option.id)} className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-white hover:text-[#D4AF37] rounded-md transition-colors">
                        <span className={`flex h-4 w-4 items-center justify-center rounded border ${selectedFilters.includes(option.id) ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-white/30'}`}>
                          {selectedFilters.includes(option.id) && <Check className="h-3 w-3 text-black" />}
                        </span>
                        {option.label}
                      </button>
                    ))}
                    <div className="border-t border-white/10 mt-2 pt-2">
                      <p className="px-3 py-2 text-xs uppercase tracking-wider text-gray-400">Categoría</p>
                      {CATEGORY_OPTIONS.map(cat => (
                        <button
                          key={cat}
                          onClick={() => { setSelectedCategory(cat); setFiltersOpen(false) }}
                          className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-white hover:text-[#D4AF37] rounded-md transition-colors"
                        >
                          <span className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
                            selectedCategory === cat ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-white/30'
                          }`}>
                            {selectedCategory === cat && <Check className="h-2.5 w-2.5 text-black" />}
                          </span>
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>

        {loadingProfiles && (
          <section className="px-4 sm:px-6 mb-8">
            <div className="h-4 w-32 bg-white/5 rounded animate-pulse mb-4 ml-2" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] rounded-md bg-white/5 animate-pulse" />
              ))}
            </div>
          </section>
        )}

        {levelOrder.map((level) => {
          const therapists = groupedByLevel[level]
          if (therapists.length === 0) return null
          return (
            <section key={level} id={`section-${level}`} className="scroll-mt-16 px-4 sm:px-6 mb-8">
              <div className="flex justify-between items-baseline mb-4 px-2">
                <h2 className="text-base font-light uppercase tracking-[0.25em] text-white">
                  {MEMBERSHIP_LEVELS[level].name}
                </h2>
                <span className="text-[10px] uppercase tracking-wider text-white/50">{therapists.length} perfiles</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {therapists.map(t => <MosaicCard key={t.id} therapist={t} />)}
              </div>
            </section>
          )
        })}

        {/* Internal Links — Zonas y Categorías */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 py-10 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">Zonas destacadas</h2>
              <ul className="space-y-2.5">
                {ZONES.map(z => (
                  <li key={z.href}>
                    <Link href={z.href} className="text-sm text-white/65 hover:text-[#D4AF37] transition-colors">
                      {z.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">Categorías destacadas</h2>
              <ul className="space-y-2.5">
                {CATEGORIES_LINKS.map(c => (
                  <li key={c.href}>
                    <Link href={c.href} className="text-sm text-white/65 hover:text-[#D4AF37] transition-colors">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12 mt-4 border-t border-white/10">
          <div className="space-y-8 text-white/70 text-sm leading-relaxed">

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Masajes profesionales en Argentina: bienestar, relajación y alivio muscular</h2>
              <p>
                Los masajes profesionales son una de las mejores opciones para quienes buscan aliviar tensiones, reducir el estrés y mejorar el bienestar general. Hoy en día, muchas personas buscan términos como masajes descontracturantes, masajes relajantes, masajes terapéuticos, masajes a domicilio o masajistas profesionales, por lo que contar con un perfil bien estructurado y claro puede ayudarte a posicionarte mejor.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">¿Qué son los masajes profesionales?</h2>
              <p className="mb-3">
                Los masajes profesionales son técnicas manuales aplicadas sobre músculos y tejidos blandos con distintos objetivos: relajar el cuerpo, aliviar contracturas, mejorar la circulación, disminuir el estrés y favorecer el bienestar físico y mental.
              </p>
              <p className="mb-2">Dependiendo del tipo de servicio, un masaje puede estar orientado a:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-white/60">
                <li>Aliviar dolores musculares</li>
                <li>Reducir tensión acumulada</li>
                <li>Mejorar la movilidad</li>
                <li>Promover descanso y relajación</li>
                <li>Complementar rutinas de bienestar</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-4">¿Qué tipos de masajes existen?</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white/90 mb-1">Masajes descontracturantes</h3>
                  <p>Los masajes descontracturantes están orientados a disminuir la tensión muscular acumulada, especialmente en zonas como cuello, espalda, hombros y cintura. Son muy buscados por personas que trabajan muchas horas sentadas, entrenan intensamente o atraviesan períodos de estrés.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white/90 mb-1">Masajes relajantes</h3>
                  <p>Los masajes relajantes tienen como objetivo principal generar una sensación profunda de descanso, bienestar y desconexión. Suelen realizarse con movimientos suaves, continuos y armónicos, ideales para bajar el estrés cotidiano.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white/90 mb-1">Masajes terapéuticos</h3>
                  <p>Los masajes terapéuticos pueden enfocarse en molestias físicas concretas, tensión localizada o recuperación muscular. Muchas personas los eligen para complementar hábitos de salud y mejorar su calidad de vida.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white/90 mb-1">Reflexología podal</h3>
                  <p>La reflexología podal trabaja puntos específicos de los pies vinculados, desde una mirada de bienestar, con distintas zonas del cuerpo. Es una técnica muy elegida por quienes buscan relajación profunda y equilibrio general.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white/90 mb-1">Masajes a domicilio</h3>
                  <p>Los masajes a domicilio son una alternativa cada vez más demandada por comodidad, privacidad y ahorro de tiempo. Permiten recibir una sesión profesional sin necesidad de trasladarse.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Beneficios de los masajes</h2>
              <p className="mb-2">Los beneficios de recibir masajes profesionales pueden variar según la técnica aplicada y la necesidad de cada persona, pero entre los más valorados se encuentran:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-white/60">
                <li>Alivio de tensión muscular</li>
                <li>Reducción del estrés</li>
                <li>Sensación de descanso físico y mental</li>
                <li>Mejora del bienestar general</li>
                <li>Mayor conexión con el propio cuerpo</li>
                <li>Experiencia de relajación profunda</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">¿Por qué muchas personas buscan masajistas profesionales?</h2>
              <p className="mb-3">
                Quienes buscan masajistas profesionales en Argentina suelen valorar tres cosas principales: seriedad, higiene y buena atención. Una experiencia positiva no depende solo de la técnica, sino también del entorno, el trato y la confianza que transmite el servicio.
              </p>
              <p className="mb-2">Por eso, un perfil bien posicionado debe comunicar con claridad:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-white/60">
                <li>Qué tipo de masajes se ofrecen</li>
                <li>En qué zona se trabaja</li>
                <li>Cómo se reserva</li>
                <li>Qué días y horarios están disponibles</li>
                <li>Qué distingue al servicio frente a otros</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Diferencias entre masajes relajantes, descontracturantes y terapéuticos</h2>
              <p className="mb-3">Muchas personas buscan estas palabras como si fueran lo mismo, pero no lo son:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-white/60">
                <li><span className="text-white/80 font-medium">Masaje relajante:</span> orientado al descanso, la calma y la desconexión.</li>
                <li><span className="text-white/80 font-medium">Masaje descontracturante:</span> enfocado en reducir tensión muscular y contracturas.</li>
                <li><span className="text-white/80 font-medium">Masaje terapéutico:</span> apunta a necesidades físicas más específicas según cada caso.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Preguntas frecuentes sobre masajes</h2>
              <div className="space-y-4">
                {[
                  { q: '¿Qué masaje me conviene si tengo mucho estrés?', a: 'Generalmente, un masaje relajante suele ser una de las opciones más elegidas para bajar el estrés y recuperar sensación de bienestar.' },
                  { q: '¿Qué masaje se recomienda para contracturas?', a: 'El masaje descontracturante suele ser el más buscado cuando hay tensión muscular en espalda, cuello u hombros.' },
                  { q: '¿Cuánto dura una sesión de masaje?', a: 'Depende del profesional y del servicio, pero muchas sesiones duran entre 45 y 90 minutos.' },
                  { q: '¿Se puede pedir masaje a domicilio?', a: 'Sí, muchos profesionales ofrecen masajes a domicilio, especialmente en grandes ciudades.' },
                  { q: '¿Conviene reservar con anticipación?', a: 'Sí, especialmente en horarios pico o fines de semana.' },
                  { q: '¿Qué zonas del cuerpo suelen trabajarse más?', a: 'Espalda, hombros, cuello, piernas y pies suelen ser de las áreas más consultadas.' },
                ].map(({ q, a }) => (
                  <div key={q} className="border-t border-white/10 pt-4">
                    <h3 className="font-semibold text-white/90 mb-1">{q}</h3>
                    <p>{a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Legal disclaimer — bottom of page */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 pb-10">
          <div className="flex items-start gap-3 bg-black/20 border border-white/8 rounded-xl px-5 py-4 text-xs text-white/40 leading-relaxed">
            <svg className="h-4 w-4 text-white/30 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p>
              <strong className="text-white/50">Privé Relax</strong> es una plataforma de difusión de servicios profesionales de masoterapia, relajación y bienestar.
              {' '}No se admiten servicios íntimos ni de acompañamiento.
            </p>
          </div>
        </div>

      </main>
    </div>
  )
}
