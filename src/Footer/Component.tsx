import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import {
  IoCallOutline,
  IoMailOutline,
  IoLocationOutline,
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoYoutube,
  IoLogoLinkedin,
  IoPaperPlaneOutline,
  IoLogoWhatsapp,
  IoLogoVk,
} from 'react-icons/io5'

const iconMap: Record<string, React.ElementType> = {
  phone: IoCallOutline,
  mail: IoMailOutline,
  'map-pin': IoLocationOutline,
  instagram: IoLogoInstagram,
  facebook: IoLogoFacebook,
  twitter: IoLogoTwitter,
  youtube: IoLogoYoutube,
  linkedin: IoLogoLinkedin,
  send: IoPaperPlaneOutline,
  whatsapp: IoLogoWhatsapp,
  vk: IoLogoVk,
}

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const contacts = footerData?.contacts || []
  const socialLinks = footerData?.socialLinks || []

  const logoData = footerData?.logo && typeof footerData.logo === 'object' ? footerData.logo : null

  return (
    <footer className="mt-auto bg-background/50 backdrop-blur-md">
      <div className="mx-auto max-w-[95%] border-t border-foreground py-12 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* Logo & Social */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="h-24 flex items-center">
              <Link href="/" className="block">
                <Logo logoData={logoData} className="h-24 w-auto max-h-none" />
              </Link>
            </div>
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
                {socialLinks.map(({ icon, link }, i) => {
                  const IconComponent = icon ? iconMap[icon] : null
                  return (
                    <CMSLink
                      key={i}
                      {...link}
                      className="hover:text-accent transition-colors flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 p-2 rounded-full w-10 h-10"
                    >
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                    </CMSLink>
                  )
                })}
              </div>
            )}
          </div>

          {/* Nav */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="font-bold text-lg">Навигация</h3>
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

          {/* Contacts */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="font-bold text-lg">Контакты</h3>
            <div className="flex flex-col items-center md:items-start space-y-3 font-semibold">
              {contacts &&
                contacts.map(({ icon, link }, i) => {
                  const IconComponent = icon ? iconMap[icon] : null
                  return (
                    <div key={i} className="flex items-center gap-3">
                      {IconComponent && <IconComponent className="w-5 h-5 shrink-0 text-accent" />}
                      <CMSLink
                        {...link}
                        className="hover:underline hover:text-accent transition-colors"
                      />
                    </div>
                  )
                })}
            </div>
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
