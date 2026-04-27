'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import type { Header, Media } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { CMSLink } from '@/components/Link'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const burgerRef = useRef<HTMLDivElement>(null)

  const navItems = data?.navItems || []
  const logo = data?.logo && typeof data.logo === 'object' ? (data.logo as Media) : null

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        menuOpen &&
        menuRef.current &&
        burgerRef.current &&
        !menuRef.current.contains(target) &&
        !burgerRef.current.contains(target)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 bg-background/50 backdrop-blur-md transition-all duration-300 overflow-hidden">
      <div className="mx-auto max-w-[95%] flex flex-col transition-all duration-300">
        {/* Верхняя строка */}
        <div className="relative py-3 md:py-7 flex items-center justify-between min-h-[60px]">
          {/* Logo Container */}
          <div
            className={cn(
              'absolute transition-all duration-700 ease-in-out z-10',
              isScrolled ? 'left-1/2 -translate-x-1/2' : 'left-0 translate-x-0',
            )}
          >
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <Logo logoData={logo} loading="eager" priority="high" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center gap-8 ml-auto">
            {navItems.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                className="font-semibold hover:underline hover:text-accent"
              />
            ))}
          </nav>

          {/* Burger Button */}
          <div
            ref={burgerRef}
            className="lg:hidden ml-auto z-50 cursor-pointer w-8 h-8 flex flex-col justify-center items-center space-y-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={cn(
                'w-6 h-0.5 bg-foreground transition-transform duration-300',
                menuOpen ? 'rotate-45 translate-y-1.5' : '',
              )}
            />
            <span
              className={cn(
                'w-6 h-0.5 bg-foreground transition-opacity duration-300',
                menuOpen ? 'opacity-0' : 'opacity-100',
              )}
            />
            <span
              className={cn(
                'w-6 h-0.5 bg-foreground transition-transform duration-300',
                menuOpen ? '-rotate-45 -translate-y-1.5' : '',
              )}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={cn(
            'lg:hidden grid transition-all duration-300 ease-in-out',
            menuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="overflow-hidden flex flex-col items-center justify-center">
            <div className="py-8 flex flex-col gap-6 items-center">
              {navItems.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  className="font-semibold text-lg"
                  onClick={() => setMenuOpen(false)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="border-b border-foreground" />
      </div>
    </header>
  )
}
