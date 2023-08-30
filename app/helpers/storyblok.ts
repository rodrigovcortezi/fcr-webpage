import type {AppLoadContext} from '@remix-run/node'
import {getStoryblokApi} from '@storyblok/react'

const storyblokClient = {
  get: async (slug: string, context: AppLoadContext) => {
    const {data} = await getStoryblokApi().get(`cdn/stories/${slug}`, {
      version: context.preview ? 'draft' : 'published',
      cv: context.preview ? new Date().getTime() : undefined,
    })

    return data
  },
}

export {storyblokClient}
