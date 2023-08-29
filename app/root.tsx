import {json} from '@remix-run/node'
import type {LoaderArgs, LinksFunction, V2_MetaFunction} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'

import tailwindStyles from '~/styles/tailwind.css'
import appStyles from '~/styles/app.css'

import {storyblokInit, apiPlugin} from '@storyblok/react'

storyblokInit({
  accessToken:
    typeof window !== 'undefined'
      ? (window as any).ENV.STORYBLOK_TOKEN
      : process.env.STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: 'us',
  },
})

const checkPreviewMode = (request: Request) => {
  const url = new URL(request.url)
  const queryParams = new URLSearchParams(url.search)
  return Boolean(queryParams.get('_storyblok'))
}

export const loader = async ({request, context}: LoaderArgs) => {
  context.preview = checkPreviewMode(request)
  return json({
    ENV: {
      STORYBLOK_TOKEN: process.env.STORYBLOK_TOKEN,
    },
  })
}

export const meta: V2_MetaFunction = () => {
  return [{title: 'Fernando Cortezi'}]
}

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    as: 'font',
    href: '/fonts/Montserrat/Montserrat-Regular.woff2',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    as: 'font',
    href: '/fonts/Montserrat/Montserrat-Medium.woff2',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    as: 'font',
    href: '/fonts/Montserrat/Montserrat-ExtraBold.woff2',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {rel: 'stylesheet', href: tailwindStyles},
  {rel: 'stylesheet', href: appStyles},
]

export default function App() {
  const data = useLoaderData<typeof loader>()
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100 text-gray-500 text-base">
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
