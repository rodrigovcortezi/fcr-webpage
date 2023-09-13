import {type SbBlokData, type ISbRichtext} from '@storyblok/react'

export interface HeroData extends SbBlokData {
  headline: string
  paragraph: string
  profile: {filename: string}
}

export interface IndexPageData extends SbBlokData {
  hero: [HeroData]
}

export interface PresentationData extends SbBlokData {
  active: boolean
  name: string
  subtitle: string
  text: ISbRichtext
  cover: {filename: string}
}

export interface TimelineItemData extends SbBlokData {
  start: string
  end: string
  name: string
  description: string
}

export interface EducationData extends SbBlokData {
  active: boolean
  education_timeline: TimelineItemData[]
  experiences_timeline: TimelineItemData[]
}

export interface TextData extends SbBlokData {
  text: string
}

export interface KnowledgeData extends SbBlokData {
  active: boolean
  experiences: TextData[]
  specialties: TextData[]
}

export interface TestimonialItemData extends SbBlokData {
  name: string
  image: {filename: string}
  profession: string
  text: string
}

export interface TestimonialsData extends SbBlokData {
  active: boolean
  testimonials: TestimonialItemData[]
}

export interface AboutPage extends SbBlokData {
  presentation: [PresentationData]
  education: [EducationData]
  knowledge: [KnowledgeData]
  testimonials: [TestimonialsData]
}
