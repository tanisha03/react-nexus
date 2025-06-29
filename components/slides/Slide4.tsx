import { DemoSlide as DemoSlideType } from "./types"

interface Slide4Props {
  slide: DemoSlideType
}

export function Slide4({ slide }: Slide4Props) {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold">Demo</h1>
      </div>
    </div>
  )
} 