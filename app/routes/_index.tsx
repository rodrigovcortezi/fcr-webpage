import {json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {
  getStoryblokApi,
  storyblokEditable,
  useStoryblokState,
} from '@storyblok/react'
import {HeroSection} from '~/components/hero-section'
import {NavigationMenu} from '~/components/navigation-menu'

export const loader = async () => {
  const {data} = await getStoryblokApi().get(`cdn/stories/home`, {
    version: 'published',
    cv: +new Date(),
  })

  return json(data?.story)
}

const IndexRoute = () => {
  let story = useLoaderData<typeof loader>()
  story = useStoryblokState(story)
  const blok = story.content
  return (
    <div {...storyblokEditable(blok)}>
      <NavigationMenu />
      <main className="w-full min-h-screen lg:pl-[350px] flex justify-center items-start py-32 sm:items-center">
        <HeroSection blok={blok.hero[0]} key={blok.hero[0]._uid} />
      </main>
    </div>
  )
}

export default IndexRoute
