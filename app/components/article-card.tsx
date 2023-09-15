import {imageResolver} from '~/helpers/image'
import {type ArticleData} from '~/types/storyblok'

type ArticleCardProps = {
  blok: ArticleData
}

const ArticleCard = ({blok}: ArticleCardProps) => {
  const resolvedImage = imageResolver(blok.cover.filename, {width: 800})
  const date = new Date(blok.date)
  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
  return (
    <div className="shadow-[0_0_20px_rgba(0,0,0,.07)]">
      <div className="w-full h-[262px]">
        <img
          width={resolvedImage.dimensions.width}
          height={resolvedImage.dimensions.height}
          alt="article cover"
          src={resolvedImage.url}
          className="w-full h-full object-cover grayscale"
        />
      </div>
      <div className="px-10 py-7 font-montserrat">
        <div className="relative mb-6">
          <div className="before:content-[''] before:absolute before:h-[1px] before:w-full before:bottom-[-7px] before:bg-[rgba(0,0,0,.1)]">
            <p className="text-[13px] text-gray-500">
              {blok.author}
              <span className="mx-2">/</span>
              {formattedDate}
            </p>
          </div>
        </div>
        <h3 className="font-semibold text-black text-lg leading-[22.5px] line-clamp-2 min-h-[45px] mb-[10px]">
          {blok.title}
        </h3>
        <button className="uppercase font-medium text-black text-xs">
          leia mais
        </button>
      </div>
    </div>
  )
}

export {ArticleCard}
