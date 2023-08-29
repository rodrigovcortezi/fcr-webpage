import {Response, json} from '@remix-run/node'
import {getStoryblokApi} from '@storyblok/react'

export const action = async () => {
  // flush memory cache
  const client = await getStoryblokApi().flushCache()
  // updates cache version in storyblok client
  await client.get('cdn/spaces/me', {
    version: 'published',
    cv: +new Date(),
  })

  return json({}, {status: 204})
}

export const loader = async () => {
  throw new Response(null, {status: 404, statusText: 'Not Found'})
}
