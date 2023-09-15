import type {AppLoadContext} from '@remix-run/node'
import {getStoryblokApi} from '@storyblok/react'

const client = getStoryblokApi()

const storyblokClient = {
  getStory: async (slug: string, context: AppLoadContext) => {
    const {data} = await client.get(`cdn/stories/${slug}`, {
      version: context.preview ? 'draft' : 'published',
      cv: context.preview ? new Date().getTime() : undefined,
    })

    return data
  },
  getFolder: async (slug: string, context: AppLoadContext) => {
    const {data} = await client.get(`cdn/stories`, {
      starts_with: slug,
      version: context.preview ? 'draft' : 'published',
      cv: context.preview ? new Date().getTime() : undefined,
    })

    return data
  },
  refresh: async () => {
    await client.get('cdn/stories', {
      version: 'published',
      cv: new Date().getTime(),
    })
  },
}

export {storyblokClient}
