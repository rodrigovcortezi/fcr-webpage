import {json, type LoaderArgs} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {
  type ISbStoryData,
  storyblokEditable,
  useStoryblokState,
} from '@storyblok/react'
import {type ReactNode} from 'react'
import {PresentationSection} from '~/components/presentation-section'
import {TestimonialsSection} from '~/components/testimonials-section'
import {storyblokClient} from '~/helpers/storyblok'
import type {AboutPage} from '~/types/storyblok'

export const loader = async ({context}: LoaderArgs) => {
  const data = await storyblokClient.get('about', context)
  return json(data?.story)
}

type TimelineItemProps = {
  start: string
  end: string
  name: string
  description: string
}

const TimelineItem = ({start, end, name, description}: TimelineItemProps) => {
  return (
    <li className="timeline-item">
      <div className="flex">
        <div className="w-1/2 pr-[20px]">
          <span className="inline-block py-[5px] px-[25px] bg-[rgba(0,0,0,.05)] rounded-[50px] text-[14px]">
            {start} - {end}
          </span>
        </div>
        <div className="w-1/2 pl-[20px]">
          <h3 className="text-[16px] font-montserrat font-semibold text-black">
            {name}
          </h3>
          <span className="text-[14px]">{description}</span>
        </div>
      </div>
    </li>
  )
}

type BulletItemProps = {
  children: ReactNode
}

const BulletItem = ({children}: BulletItemProps) => {
  return (
    <li className="relative pl-[25px]">
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="null"
          x="0px"
          y="0px"
          viewBox="0 0 386.258 386.258"
          className="svg text-black w-[10px] h-[10px] absolute left-0 top-1/2 translate-y-[-50%] replaced-svg"
        >
          <polygon points="96.879,0 96.879,386.258 289.379,193.129"></polygon>
        </svg>
      </span>
      {children}
    </li>
  )
}

const AboutRoute = () => {
  const storyData = useLoaderData<typeof loader>() as ISbStoryData<AboutPage>
  const story = useStoryblokState(storyData)
  if (story === null) {
    return null
  }

  const blok = story.content
  const [presentation] = blok.presentation
  const [education] = blok.education
  const [knowledge] = blok.knowledge
  const [testimonials] = blok.testimonials

  console.log(presentation)

  return (
    <>
      <div className="container pt-[100px]">
        <div className="font-montserrat mb-16">
          <span className="inline-block px-[10px] py-1 mb-[11px] bg-black/[.04] leading-[30px] font-semibold text-xs text-[#333] uppercase">
            Sobre
          </span>
          <h2 className="font-extrabold text-3xl text-black leading-[42px]">
            Sobre Mim
          </h2>
        </div>
      </div>
      <PresentationSection blok={presentation} />
      {knowledge.active ? (
        <section
          {...storyblokEditable(knowledge)}
          className="py-[100px] bg-white"
        >
          <div className="container">
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-1/2 pr-0 sm:pr-[50px] pb-[60px] sm:pb-0">
                <div className="font-montserrat mb-[40px]">
                  <h3 className="text-black font-bold text-xl">
                    Conhecimentos
                  </h3>
                </div>
                <div>
                  <ul className="list-none">
                    {knowledge.experiences.map(e => (
                      <BulletItem key={e._uid}>{e.text}</BulletItem>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-full sm:w-1/2 pl-0 sm:pl-[50px]">
                <div className="font-montserrat mb-[40px]">
                  <h3 className="text-black font-bold text-xl">
                    Especialidades
                  </h3>
                </div>
                <div>
                  <ul className="list-none">
                    {knowledge.specialties.map(e => (
                      <BulletItem key={e._uid}>{e.text}</BulletItem>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
      {education.active ? (
        <section {...storyblokEditable(education)} className="py-[100px]">
          <div className="container">
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-1/2 pr-0 sm:pr-[50px] pb-[60px] sm:pb-0">
                <div className="font-montserrat mb-[40px]">
                  <h3 className="text-black font-bold text-xl">Educação</h3>
                </div>
                <div className="relative">
                  <ul className="pt-[10px] before:content-[''] before:absolute before:w-[1px] before:top-0 before:left-0 before:h-full before:bg-[rgba(0,0,0,.07)]">
                    {education.education_timeline.map(e => (
                      <TimelineItem
                        key={e._uid}
                        start={e.start}
                        end={e.end}
                        name={e.name}
                        description={e.description}
                      />
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-full sm:w-1/2 pl-0 sm:pl-[50px]">
                <div className="font-montserrat mb-[40px]">
                  <h3 className="text-black font-bold text-xl">Experiência</h3>
                </div>
                <div className="relative">
                  <ul className="pt-[10px] before:content-[''] before:absolute before:w-[1px] before:top-0 before:left-0 before:h-full before:bg-[rgba(0,0,0,.07)]">
                    {education.experiences_timeline.map(e => (
                      <TimelineItem
                        key={e._uid}
                        start={e.start}
                        end={e.end}
                        name={e.name}
                        description={e.description}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
      <TestimonialsSection blok={testimonials} />
    </>
  )
}

export default AboutRoute
