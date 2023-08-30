import {json, type LoaderArgs} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {RichTextResolver, useStoryblokState} from '@storyblok/react'
import {imageResolver, imageSrcSet} from '~/helpers/image'
import {storyblokClient} from '~/helpers/storyblok'

export const loader = async ({context}: LoaderArgs) => {
  const data = await storyblokClient.get('about', context)
  return json(data?.story)
}

const AboutRoute = () => {
  let story = useLoaderData<typeof loader>()
  story = useStoryblokState(story)
  const blok = story.content
  const [presentation] = blok.presentation

  const html = new RichTextResolver().render(presentation.text)

  return (
    <div className="pt-[100px]">
      <div className="font-montserrat mb-16">
        <span className="inline-block px-[10px] py-1 mb-[11px] bg-black/[.04] leading-[30px] font-semibold text-xs text-[#333] uppercase">
          Sobre
        </span>
        <h2 className="font-extrabold text-3xl text-black leading-[42px]">
          Sobre Mim
        </h2>
      </div>
      <div className="bg-black mb-[35px]">
        <img
          className="w-full object-contain max-h-[515px]"
          alt="Cover"
          src={imageResolver(presentation.cover.filename)}
          srcSet={imageSrcSet(
            presentation.cover.filename,
            [600, 900, 1200, 1500, 1800, 2100],
          )}
          sizes="(max-width: 1200px) 100vw, 70vw"
        />
      </div>
      <div className="font-montserrat border-solid border-[#DFDFDF] border-b pb-[20px] mb-[30px]">
        <h3 className="text-[22px] text-black font-bold">
          {presentation.name}
        </h3>
        <span>{presentation.subtitle}</span>
      </div>
      <div className="border-solid border-[#DFDFDF] border-b pb-[31px] mb-[30px]">
        <article
          className="prose text-gray-500 text-base max-w-full"
          dangerouslySetInnerHTML={{__html: html}}
        ></article>
      </div>
    </div>
  )
}

export default AboutRoute
