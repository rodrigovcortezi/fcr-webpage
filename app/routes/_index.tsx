import {json} from '@remix-run/node'
import type {LoaderArgs} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {
  getStoryblokApi,
  storyblokEditable,
  useStoryblokState,
} from '@storyblok/react'
import {HeroSection} from '~/components/hero-section'

export const loader = async ({context}: LoaderArgs) => {
  const {data} = await getStoryblokApi().get(`cdn/stories/home`, {
    version: context.preview ? 'draft' : 'published',
    cv: context.preview ? +new Date() : undefined,
  })

  return json(data?.story)
}

const IndexRoute = () => {
  let story = useLoaderData<typeof loader>()
  story = useStoryblokState(story)
  const blok = story.content
  return (
    <div {...storyblokEditable(blok)}>
      <main className="w-full min-h-screen lg:pl-[350px] flex justify-center items-start py-32 sm:items-center">
        <HeroSection blok={blok.hero[0]} key={blok.hero[0]._uid} />
      </main>
    </div>
  )
}

export default IndexRoute
