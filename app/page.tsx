'use client'
import { useState, useRef, useEffect, useMemo } from 'react'
import { MapPin, SlidersHorizontal, Check } from 'lucide-react'
import { Header } from '@/components/header'
import { MosaicCard } from '@/components/mosaic-card'
import { SidebarNavigation } from '@/components/sidebar-navigation'
import { searchTherapists, MembershipLevel, MEMBERSHIP_LEVELS, SERVICE_CATEGORIES, mockTherapists, Therapist } from '@/lib/mock-data'
import { getProfiles } from '@/lib/store'

const levelOrder: MembershipLevel[] = [5, 4, 3, 2, 1]
const FILTER_OPTIONS = [ { id: 'hotel', label: 'Atención en hotel' }, { id: 'depto', label: 'Lugar propio' }, { id: 'domicilio', label: 'A domicilio' } ]
const CATEGORY_OPTIONS = ['Todos', ...SERVICE_CATEGORIES]

export default function HomePage() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Todos')
  const [selectedLevel, setSelectedLevel] = useState(0)
  const [locationInput, setLocationInput] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [allProfiles, setAllProfiles] = useState<Therapist[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getProfiles().then(setAllProfiles)
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
              Masajes Profesionales y <span className="text-[#D4AF37]">Bienestar</span> en Buenos Aires
            </h1>
            <p className="mt-4 text-sm text-gray-400 md:text-base">
              Encontrá profesionales independientes de masoterapia, relajación y bienestar.
              Explorá perfiles por zona, especialidad y modalidad de atención.
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

        {/* Disclaimer */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 mb-8">
          <div className="flex items-start gap-3 bg-black/30 border border-white/10 rounded-xl px-5 py-4 text-xs text-white/50 leading-relaxed">
            <svg className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>
              <strong className="text-white/70">Privé Relax</strong> es una plataforma de difusión de servicios profesionales de{' '}
              <strong className="text-white/70">masoterapia, relajación y bienestar</strong>.
              No se permiten ni promocionan servicios sexuales, de acompañamiento ni actividades íntimas.
              Los profesionales operan de forma autónoma e independiente.
            </span>
          </div>
        </div>

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
      </main>
    </div>
  )
}
