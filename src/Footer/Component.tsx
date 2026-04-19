import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  const logoData = footerData?.logo && typeof footerData.logo === 'object' ? footerData.logo : null

  return (
    <footer className="mt-auto bg-background/50 backdrop-blur-md">
      <div className="mx-auto max-w-[95%] border-t border-foreground py-12 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="h-24 flex items-center">
            <Link href="/" className="block">
              <Logo logoData={logoData} className="h-24 w-auto max-h-none" />
            </Link>
          </div>

          {/* Nav */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-16">
            <nav className="flex flex-col items-center md:items-start space-y-2 font-semibold">
              {navItems.map(({ link }, i) => {
                return (
                  <CMSLink
                    key={i}
                    {...link}
                    className="hover:underline hover:text-accent transition-colors"
                  />
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center font-semibold pb-8 text-sm opacity-80">
        &copy; {new Date().getFullYear()} kapti. Все права защищены.
      </p>
    </footer>
  )
}
