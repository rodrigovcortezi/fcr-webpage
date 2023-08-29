import {json} from '@remix-run/node'
import {getStoryblokApi} from '@storyblok/react'

export const action = async () => {
  // updates cache version in storyblok client
  await getStoryblokApi().get('cdn/spaces/me', {
    version: 'published',
    cv: +new Date(),
  })
  return json({}, {status: 204})
}
