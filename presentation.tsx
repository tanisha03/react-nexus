"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  slides, 
  Slide1, 
  Slide2, 
  Slide3, 
  Slide4, 
  Slide5, 
  TitleSlide,
  AgendaSlide,
  CodeSlide,
  DemoSlide,
  StatsSlide,
  ClosingSlide
} from "@/components/slides"

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        prevSlide() 
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentSlide])

  const nextSlide = () => {
    setCurrentSlide((prev: number) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev: number) => (prev - 1 + slides.length) % slides.length)
  }

  const slide = slides[currentSlide]

  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return <Slide1 slide={slide as TitleSlide} />
      case 1:
        return <Slide2 slide={slide as AgendaSlide} />
      case 2:
        return <Slide3 slide={slide as CodeSlide} />
      case 3:
        return <Slide4 slide={slide as DemoSlide} />
      case 4:
        return <Slide5 slide={slide as CodeSlide} />
      default:
        return <div>Slide not found</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex flex-col font-inter tracking-tight transition-all duration-500">
      {/* Main slide content */}
      <main className="flex-1 flex items-center justify-center p-12">
        <div key={currentSlide} className="w-full max-w-6xl">
          {renderSlide()}
        </div>
      </main>

      {/* Navigation and controls */}
      <footer className="flex items-center justify-between p-6 border-t border-slate-200/50 bg-gradient-to-r from-white to-slate-50/30">
        <Button variant="ghost" size="sm" onClick={prevSlide} disabled={currentSlide === 0}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {/* Slide indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {currentSlide + 1} / {slides.length}
          </span>
          <Button variant="ghost" size="sm" onClick={nextSlide} disabled={currentSlide === slides.length - 1}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </footer>

      {/* Keyboard shortcuts hint */}
      <div className="fixed bottom-4 right-4 text-xs text-muted-foreground bg-muted px-3 py-2 rounded">
        Use ← → to navigate
      </div>
    </div>
  )
}
