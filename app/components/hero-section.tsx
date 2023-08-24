import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from '~/components/icons'

type SocialLinkProps = {
  href: string
  children: React.ReactNode
}

const SociaLink = ({href, children}: SocialLinkProps) => {
  return (
    <a className="block p-1" href={href} rel="noreferrer" target="_blank">
      {children}
    </a>
  )
}

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="mb-8 md:mb-0 h-[200px] w-[200px] sm:h-[250px] sm:w-[250px]">
        <img className="rounded-full" src="/profile.png" alt="Profile" />
      </div>
      <div className="md:ml-20">
        <h3 className="text-center md:text-start font-extrabold text-black text-3xl sm:text-5xl mb-3 sm:mb-4">
          Fernando Cortezi
        </h3>
        <p className="text-center md:text-start font-medium mb-9">
          Sou professor e pesquisador na área de <br /> gestão empresarial.
        </p>
        <div className="text-center md:text-start mb-[-0.25rem] ml-[-0.25rem]">
          <ul className="leading-[0] space-x-2">
            <li className="inline-block">
              <SociaLink href="https://linkedin.com/in/fcrcortezi">
                <LinkedinIcon size={20} />
              </SociaLink>
            </li>
            <li className="inline-block">
              <SociaLink href="https://twitter.com/FCRCortezi">
                <TwitterIcon size={20} />
              </SociaLink>
            </li>
            <li className="inline-block">
              <SociaLink href="https://fb.me/fcrcortezi">
                <FacebookIcon size={20} />
              </SociaLink>
            </li>
            <li className="inline-block">
              <SociaLink href="https://www.instagram.com/fcrcortezi/">
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
