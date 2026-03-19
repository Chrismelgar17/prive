import { Star } from 'lucide-react'

export function StarRating({ rating, size = "md" }: { rating: number, size?: "sm" | "md" | "lg" }) {
  const starSize = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-6 w-6' : 'h-4 w-4'
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star} 
          className={`${starSize} ${star <= rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-white/20'}`} 
        />
      ))}
    </div>
  )
}
