import {json, type LoaderArgs} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {
  useStoryblokState,
  type ISbStoryData,
  RichTextResolver,
} from '@storyblok/react'
import {imageResolver} from '~/helpers/image'
import {storyblokClient} from '~/helpers/storyblok'
import {type ArticleData} from '~/types/storyblok'

export const loader = async ({context, params}: LoaderArgs) => {
  const data = await storyblokClient.getStory(
    `articles/${params.slug}`,
    context,
  )
  return json(data?.story)
}

const ArticleRoute = () => {
  const storyData = useLoaderData<typeof loader>() as ISbStoryData<ArticleData>
  const story = useStoryblokState(storyData)
  if (story === null) {
    return null
  }

  const blok = story.content

  const html = new RichTextResolver().render(blok.text)
  const resolvedImage = imageResolver(blok.cover.filename, {width: 800})
  const date = new Date(blok.date)
  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="container py-[100px]">
      <div className="mb-[40px]">
        <img
          alt="article cover"
          width={resolvedImage.dimensions.width}
          height={resolvedImage.dimensions.height}
          src={resolvedImage.url}
          className="w-full h-[550px] object-cover grayscale"
        />
      </div>
      <div className="font-montserrat mb-7">
        <div className="relative mb-6">
          <div className="before:content-[''] before:absolute before:h-[1px] before:w-full before:bottom-[-7px] before:bg-[rgba(0,0,0,.1)]">
            <p className="text-[13px] text-gray-500">
              {blok.author}
              <span className="mx-2">/</span>
              {formattedDate}
            </p>
          </div>
        </div>
        <h1 className="font-semibold text-black text-3xl">{blok.title}</h1>
      </div>
      <article
        className="prose text-[16px] leading-8 text-black max-w-full"
        dangerouslySetInnerHTML={{__html: html}}
      ></article>
    </div>
  )
}

export default ArticleRoute
