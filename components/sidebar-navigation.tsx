'use client'
import { useState } from 'react'
import { Menu, X, Search, Sparkles } from 'lucide-react'
import { SERVICE_CATEGORIES } from '@/lib/mock-data'

// Complete list of all 48 CABA neighborhoods sorted A-Z
export const CABA_NEIGHBORHOODS = [
  'Agronomía', 'Almagro', 'Balvanera', 'Barracas', 'Belgrano', 'Boedo',
  'Caballito', 'Chacarita', 'Coghlan', 'Colegiales', 'Constitución', 'Flores',
  'Floresta', 'La Boca', 'La Paternal', 'Liniers', 'Mataderos', 'Monserrat',
  'Monte Castro', 'Nueva Pompeya', 'Núñez', 'Palermo', 'Parque Avellaneda',
  'Parque Chacabuco', 'Parque Chas', 'Parque Patricios', 'Puerto Madero',
  'Recoleta', 'Retiro', 'Saavedra', 'San Cristóbal', 'San Nicolás', 'San Telmo',
  'Versalles', 'Vélez Sársfield', 'Villa Crespo', 'Villa del Parque', 'Villa Devoto',
  'Villa General Mitre', 'Villa Lugano', 'Villa Luro', 'Villa Ortúzar',
  'Villa Pueyrredón', 'Villa Real', 'Villa Riachuelo', 'Villa Santa Rita',
  'Villa Soldati', 'Villa Urquiza'
]

interface SidebarProps {
  selectedNeighborhood: string
  onSelectNeighborhood: (n: string) => void
  onScrollToSection: (level: number) => void
  selectedCategory?: string
  onSelectCategory?: (cat: string) => void
}

export function SidebarNavigation({ selectedNeighborhood, onSelectNeighborhood, onScrollToSection, selectedCategory = 'Todos', onSelectCategory }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const filtered = CABA_NEIGHBORHOODS.filter(n => n.toLowerCase().includes(search.toLowerCase()))

  const handleSelectCategory = (cat: string) => {
    onSelectCategory?.(cat)
    setIsOpen(false)
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="fixed left-4 top-20 z-40 rounded-full bg-white/10 p-2.5 backdrop-blur-sm hover:bg-white/20 transition-colors">
        <Menu className="h-5 w-5 text-white" />
      </button>

      {isOpen && <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />}

      <aside className={`fixed left-0 top-0 z-50 h-full w-72 bg-[#1F0F2E] border-r border-[#4A2866] transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-5 border-b border-white/10 h-16">
          <h2 className="text-white font-serif text-sm uppercase tracking-[0.2em] font-light">Directorio</h2>
          <button onClick={() => setIsOpen(false)}><X className="h-5 w-5 text-white/60 hover:text-white" /></button>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100vh-64px)]">

          {/* ── Categorías ── */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Categorías
            </p>
            <div className="grid gap-1">
              <button
                onClick={() => handleSelectCategory('Todos')}
                className={`text-left px-3 py-2.5 rounded-md text-sm transition-colors ${selectedCategory === 'Todos' ? 'bg-[#D4AF37]/20 text-[#D4AF37] font-medium' : 'text-white/80 hover:bg-[#3D1F54] hover:text-white'}`}
              >
                Todas las categorías
              </button>
              {SERVICE_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleSelectCategory(cat)}
                  className={`text-left px-3 py-2.5 rounded-md text-sm transition-colors ${selectedCategory === cat ? 'bg-[#D4AF37]/20 text-[#D4AF37] font-medium' : 'text-white/80 hover:bg-[#3D1F54] hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">Filtrar por Zona</p>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/50" />
              <input
                type="text"
                placeholder="Buscar barrio..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-[#3D1F54] rounded-lg py-2 pl-10 pr-4 text-sm text-white outline-none border border-transparent focus:border-[#D4AF37]/50 transition-colors"
              />
            </div>

            <div className="grid gap-1">
              <button
                onClick={() => { onSelectNeighborhood('Todos'); setIsOpen(false) }}
                className={`text-left px-3 py-2.5 rounded-md text-sm transition-colors ${selectedNeighborhood === 'Todos' ? 'bg-[#D4AF37]/20 text-[#D4AF37] font-medium' : 'text-white/80 hover:bg-[#3D1F54] hover:text-white'}`}
              >
                Todos los barrios
              </button>

              {filtered.map(n => (
                <button
                  key={n}
                  onClick={() => { onSelectNeighborhood(n); setIsOpen(false) }}
                  className={`text-left px-3 py-2.5 rounded-md text-sm transition-colors ${selectedNeighborhood === n ? 'bg-[#D4AF37]/20 text-[#D4AF37] font-medium' : 'text-white/80 hover:bg-[#3D1F54] hover:text-white'}`}
                >
                  {n}
                </button>
              ))}

              {filtered.length === 0 && (
                <p className="text-sm text-white/40 px-3 py-2">No se encontraron barrios.</p>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
