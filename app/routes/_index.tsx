import {json} from '@remix-run/node'
import type {LoaderArgs} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {
  type ISbStoryData,
  storyblokEditable,
  useStoryblokState,
} from '@storyblok/react'
import {HeroSection} from '~/components/hero-section'
import {storyblokClient} from '~/helpers/storyblok'
import {type IndexPageData} from '~/types/storyblok'

export const loader = async ({context}: LoaderArgs) => {
  const data = await storyblokClient.get('home', context)
  return json(data?.story)
}

const IndexRoute = () => {
  const storyData = useLoaderData<
    typeof loader
  >() as ISbStoryData<IndexPageData>
  const story = useStoryblokState(storyData)
  if (story === null) {
    return null
  }

  const blok = story.content
  const [hero] = blok.hero

  return (
    <div {...storyblokEditable(blok)}>
      <div className="w-full min-h-screen flex justify-center items-start py-32 sm:items-center">
        <HeroSection blok={hero} />
      </div>
    </div>
  )
}

export default IndexRoute
