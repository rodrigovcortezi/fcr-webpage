import {storyblokEditable} from '@storyblok/react'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from '~/components/icons'
import {imageResolver, imageSrcSet} from '~/helpers/image'

type SocialLinkProps = {
  href: string
  label: string
  children: React.ReactNode
}

const SociaLink = ({href, label, children}: SocialLinkProps) => {
  return (
    <a
      className="block p-1"
      aria-label={label}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}

const HeroSection = ({blok}: {blok: any}) => {
  const {profile} = blok
  return (
    <div
      {...storyblokEditable(blok)}
      className="flex flex-col md:flex-row items-center font-montserrat"
    >
      <div className="mb-8 md:mb-0">
        <img
          className="h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] object-cover object-center rounded-full"
          src={imageResolver(profile.filename)}
          srcSet={imageSrcSet(profile.filename, [400, 500, 600, 800])}
          sizes="(max-width: 768px) 200px, 400px"
          alt="Profile"
        />
      </div>
      <div className="md:ml-20">
        <h3 className="text-center md:text-start font-extrabold text-black text-3xl sm:text-5xl mb-3 sm:mb-4">
          {blok.headline}
        </h3>
        <p className="text-center md:text-start font-medium mb-9">
          {blok.paragraph}
        </p>
        <div className="text-center md:text-start mb-[-0.25rem] ml-[-0.25rem]">
          <ul className="leading-[0] space-x-2">
            <li className="inline-block">
              <SociaLink
                label="linkedin"
                href="https://linkedin.com/in/fcrcortezi"
              >
                <LinkedinIcon size={20} />
              </SociaLink>
            </li>
            <li className="inline-block">
              <SociaLink label="twitter" href="https://twitter.com/FCRCortezi">
                <TwitterIcon size={20} />
              </SociaLink>
            </li>
            <li className="inline-block">
              <SociaLink label="facebook" href="https://fb.me/fcrcortezi">
                <FacebookIcon size={20} />
              </SociaLink>
            </li>
            <li className="inline-block">
              <SociaLink
                label="instagram"
                href="https://www.instagram.com/fcrcortezi/"
              >
                <InstagramIcon size={20} />
              </SociaLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export {HeroSection}
