import {RichTextResolver, storyblokEditable} from '@storyblok/react'
import {imageResolver, imageSrcSet} from '~/helpers/image'
import {type PresentationData} from '~/types/storyblok'

type PresentationSectionProps = {
  blok: PresentationData
}

const PresentationSection = ({blok}: PresentationSectionProps) => {
  const resolvedImage = imageResolver(blok.cover.filename)
  const html = new RichTextResolver().render(blok.text)
  return blok.active ? (
    <section {...storyblokEditable(blok)} className="pb-[100px]">
      <div className="container">
        <div className="w-full bg-[#090909] mb-[35px]">
          <img
            className="object-contain max-h-[515px]"
            alt="Cover"
            width={resolvedImage.dimensions.width}
            height={resolvedImage.dimensions.height}
            src={resolvedImage.url}
            srcSet={imageSrcSet(
              blok.cover.filename,
              [600, 900, 1200, 1500, 1800, 2100],
            )}
            sizes="(max-width: 1200px) 100vw, 70vw"
          />
        </div>
        <div className="font-montserrat border-solid border-[#DFDFDF] border-b pb-[20px] mb-[30px]">
          <h3 className="text-[22px] text-black font-bold">{blok.name}</h3>
          <span>{blok.subtitle}</span>
        </div>
        <article
          className="prose text-gray-500 text-base max-w-full"
          dangerouslySetInnerHTML={{__html: html}}
        ></article>
      </div>
    </section>
  ) : null
}

export {PresentationSection}
