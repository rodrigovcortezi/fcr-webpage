import {HeroSection} from '~/components/hero-section'
import {NavigationMenu} from '~/components/navigation-menu'

const IndexRoute = () => {
  return (
    <>
      <NavigationMenu />
      <main className="w-full h-screen lg:pl-[350px] flex justify-center items-center">
        <HeroSection />
      </main>
    </>
  )
}

export default IndexRoute
