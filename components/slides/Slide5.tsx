import { ArrowRight } from "lucide-react"
import { CodeSlide as CodeSlideType } from "./types"

interface Slide5Props {
  slide: CodeSlideType
}

export function Slide5({ slide }: Slide5Props) {
  return (
    <div className="grid grid-cols-2 gap-12 h-full animate-in fade-in duration-500">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Rules
          </h1>
          <p className="text-xl text-slate-600">{slide.subtitle}</p>
        </div>
      </div>
    </div>
  )
} 