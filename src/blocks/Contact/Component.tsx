import React from 'react'
import type { ContactBlock as ContactBlockProps } from '@/payload-types'
import { ContactForm } from './ContactForm'
import { CMSLink } from '@/components/Link'
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

export const ContactBlock: React.FC<ContactBlockProps> = ({
  title,
  contacts,
  socialLinks,
  recipientEmail,
}) => {
  return (
    <section className="container flex flex-col items-center justify-center gap-8 lg:gap-16 py-8 lg:py-16">
      {title && <h1 id="products">{title}</h1>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 w-full md:w-2/3">
        <div className="flex flex-col space-y-8">
          {contacts && contacts.length > 0 && (
            <div className="flex flex-col space-y-4">
              {contacts.map(({ icon, link }, i) => {
                const IconComponent = icon ? iconMap[icon] : null
                return (
                  <div key={i} className="flex items-center gap-3 text-lg font-medium">
                    {IconComponent && <IconComponent className="w-6 h-6 shrink-0 text-accent" />}
                    <CMSLink {...link} className="hover:text-accent transition-colors" />
                  </div>
                )
              })}
            </div>
          )}

          {socialLinks && socialLinks.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-4">
              {socialLinks.map(({ icon, link }, i) => {
                const IconComponent = icon ? iconMap[icon] : null
                return (
                  <CMSLink
                    key={i}
                    {...link}
                    className="hover:text-accent transition-colors flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 p-3 rounded-full w-12 h-12"
                  >
                    {IconComponent && <IconComponent className="w-6 h-6" />}
                  </CMSLink>
                )
              })}
            </div>
          )}
        </div>

        <div className="bg-white/30 p-8 rounded-2xl border">
          <ContactForm recipientEmail={recipientEmail} />
        </div>
      </div>
    </section>
  )
}
