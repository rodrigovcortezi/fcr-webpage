import {Response, json} from '@remix-run/node'
import {storyblokClient} from '~/helpers/storyblok'

export const action = async () => {
  // updates cache version in storyblok client
  await storyblokClient.refresh()

  return json({}, {status: 204})
}

export const loader = async () => {
  throw new Response(null, {status: 404, statusText: 'Not Found'})
}
