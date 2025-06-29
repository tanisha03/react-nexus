import { LucideIcon } from "lucide-react"

export interface BaseSlide {
  id: number
  type: string
  title: string
}

export interface TitleSlide extends BaseSlide {
  type: "title"
  subtitle: string
  author: string
  conference: string
}

export interface AgendaSlide extends BaseSlide {
  type: "agenda"
  items: string[]
}

export interface CodeSlide extends BaseSlide {
  type: "code"
  subtitle: string
  code: string
  points: string[]
}

export interface DemoSlide extends BaseSlide {
  type: "demo"
  subtitle: string
  component: string
}

export interface StatsSlide extends BaseSlide {
  type: "stats"
  subtitle: string
  stats: Array<{
    label: string
    value: string
    icon: LucideIcon
  }>
}

export interface ClosingSlide extends BaseSlide {
  type: "closing"
  subtitle: string
  contact: {
    twitter: string
    github: string
    email: string
  }
}

export type Slide = TitleSlide | AgendaSlide | CodeSlide | DemoSlide | StatsSlide | ClosingSlide 