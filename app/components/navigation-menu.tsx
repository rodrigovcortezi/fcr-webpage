import {Link, useLocation} from '@remix-run/react'
import React from 'react'

type MenuLinkProps = {
  to: string
  children: React.ReactNode
}

const MenuLink = ({to, children}: MenuLinkProps) => {
  const location = useLocation()
  const activeClass = location.pathname === to ? 'text-black' : ''
  return (
    <Link
      className={`${activeClass} inline-block py-0.5 font-medium hover:text-black`}
      to={to}
    >
      {children}
    </Link>
  )
}

const Menu = () => {
  return (
    <ul className="mt-[-0.25px]">
      <li>
        <MenuLink to="/">Home</MenuLink>
      </li>
      <li>
        <MenuLink to="/about">Sobre</MenuLink>
      </li>
      <li>
        <MenuLink to=".">Consultoria</MenuLink>
      </li>
      <li>
        <MenuLink to=".">Blog</MenuLink>
      </li>
      <li>
        <MenuLink to=".">Contato</MenuLink>
      </li>
    </ul>
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
      <nav className="flex lg:hidden justify-end px-5 pt-4 fixed z-10 w-screen">
        <div className="menu-toggle">
          <input type="checkbox" />
          <span className="relative z-10"></span>
          <span className="relative z-10 mt-2"></span>
          <span className="relative z-10 mt-2"></span>
          <div className="menu-mobile fixed right-[-200px] top-0 w-[200px] h-screen bg-white">
            <div className="pt-36 px-5 text-right">
              <Menu />
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export {NavigationMenu}
