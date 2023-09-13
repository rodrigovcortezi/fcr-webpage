import {storyblokEditable} from '@storyblok/react'
import {Carousel} from './carousel'
import {TestimonialCard} from './testimonial-card'
import type {TestimonialsData} from '~/types/storyblok'

type TestimonialsSectionProps = {
  blok: TestimonialsData
}

const TestimonialsSection = ({blok}: TestimonialsSectionProps) => {
  const {testimonials} = blok

  return blok.active ? (
    <section {...storyblokEditable(blok)} className="py-[100px] bg-white">
      <div className="container">
        <div className="font-montserrat mb-[40px]">
          <h3 className="text-black font-bold text-xl">Recomendações</h3>
        </div>
        <Carousel interval={6}>
          {testimonials.map(t => (
            <TestimonialCard
              key={t._uid}
              name={t.name}
              image={t.image.filename}
              profession={t.profession}
              text={t.text}
            />
          ))}
        </Carousel>
      </div>
    </section>
  ) : null
}

export {TestimonialsSection}
