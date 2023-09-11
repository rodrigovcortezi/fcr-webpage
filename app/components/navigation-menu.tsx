import {NavLink, useLocation} from '@remix-run/react'
import React, {useEffect, useState} from 'react'

type MenuLinkProps = {
  to: string
  spacingStyle: string
  children: React.ReactNode
}

const MenuLink = ({to, spacingStyle, children}: MenuLinkProps) => {
  const staticStyle = `inline-block ${spacingStyle} font-medium hover:text-black`
  return (
    <NavLink
      className={({isActive}) =>
        isActive ? staticStyle + ' text-black' : staticStyle
      }
      to={to}
      prefetch="viewport"
    >
      {children}
    </NavLink>
  )
}

type MenuProps = {
  device?: 'desktop' | 'mobile'
}

const Menu = ({device = 'desktop'}: MenuProps) => {
  const spacing = device === 'desktop' ? 'py-0.5' : 'py-2'
  return (
    <ul className="mt-[-2px]">
      <li>
        <MenuLink spacingStyle={spacing} to="/">
          Home
        </MenuLink>
      </li>
      <li>
        <MenuLink spacingStyle={spacing} to="/about">
          Sobre
        </MenuLink>
      </li>
      <li>
        <MenuLink spacingStyle={spacing} to="/consulting">
          Consultoria
        </MenuLink>
      </li>
      <li>
        <MenuLink spacingStyle={spacing} to="/blog">
          Blog
        </MenuLink>
      </li>
      <li>
        <MenuLink spacingStyle={spacing} to="/contact">
          Contato
        </MenuLink>
      </li>
    </ul>
  )
}

const MenuMobile = () => {
  const {pathname} = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <nav className="flex lg:hidden justify-end px-5 py-4 fixed z-10 w-screen bg-white">
      <div className="menu-toggle">
        <input
          onChange={event => setOpen(event.target.checked)}
          checked={open}
          type="checkbox"
        />
        <span className="relative z-10"></span>
        <span className="relative z-10 mt-2"></span>
        <span className="relative z-10 mt-2"></span>
        <div className="menu-mobile fixed right-[-200px] top-0 w-[200px] h-screen bg-white">
          <div className="pt-36 px-5 text-right">
            <Menu device="mobile" />
          </div>
        </div>
      </div>
    </nav>
  )
}

const NavigationMenu = () => {
  return (
    <div className="font-montserrat">
      <div className="hidden lg:flex flex-col justify-center bg-white border-r border-solid border-gray-20 h-screen w-[350px] px-[70px] fixed">
        <nav aria-label="Sidebar">
          <Menu />
        </nav>
        <p className="leading-6 mt-14 text-gray-300">
          © 2023 <br /> Created by
          <span className="font-medium text-gray-400"> Clarific</span>
        </p>
      </div>
      <MenuMobile />
    </div>
  )
}

export {NavigationMenu}
