import {json} from '@remix-run/node'
import type {LoaderArgs} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {storyblokEditable, useStoryblokState} from '@storyblok/react'
import {HeroSection} from '~/components/hero-section'
import {storyblokClient} from '~/helpers/storyblok'

export const loader = async ({context}: LoaderArgs) => {
  const data = await storyblokClient.get('home', context)
  return json(data?.story)
}

const IndexRoute = () => {
  let story = useLoaderData<typeof loader>()
  story = useStoryblokState(story)
  const blok = story.content
  return (
    <div {...storyblokEditable(blok)}>
      <div className="w-full min-h-screen flex justify-center items-start py-32 sm:items-center">
        <HeroSection blok={blok.hero[0]} key={blok.hero[0]._uid} />
      </div>
    </div>
  )
}

export default IndexRoute
