import {type LoaderArgs, json} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'
import {type ISbStoryData} from '@storyblok/react'
import {ArticleCard} from '~/components/article-card'
import {storyblokClient} from '~/helpers/storyblok'
import {type ArticleData} from '~/types/storyblok'

export const loader = async ({context}: LoaderArgs) => {
  const data = await storyblokClient.getFolder('articles', context)
  return json(data?.stories)
}

const BlogRoute = () => {
  const storiesData = useLoaderData<
    typeof loader
  >() as ISbStoryData<ArticleData>[]
  if (storiesData === null) {
    return null
  }

  return (
    <>
      <div className="container pt-[100px]">
        <div className="font-montserrat mb-16">
          <span className="inline-block px-[10px] py-1 mb-[11px] bg-black/[.04] leading-[30px] font-semibold text-xs text-[#333] uppercase">
            Blog
          </span>
          <h2 className="font-extrabold text-3xl text-black leading-[42px]">
            Meus Artigos
          </h2>
        </div>
      </div>
      <div className="container pb-[100px]">
        <div className="flex flex-wrap ml-[-50px]">
          {storiesData.map(story => (
            <div
              key={story.content._uid}
              className="flex-[0_0_100%] sm:flex-[0_0_50%] mb-[50px] pl-[50px]"
            >
              <Link to={`/blog/${story.slug}`}>
                <ArticleCard blok={story.content} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BlogRoute
