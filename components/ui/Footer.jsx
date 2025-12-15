/**
 * Footer component
 * Enhanced footer with three-column layout matching the reference design
 */
'use client'

import { Linkedin, Github, ExternalLink, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/guddu-kanwar-30a6922a4/',
      icon: Linkedin,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Guddukanwar90',
      icon: Github,
    },
    {
      name: 'Fiverr',
      href: 'https://www.fiverr.com/s/xXg0jE1',
      icon: ExternalLink,
    },
  ]

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="glass mt-20 border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        {/* Three Column Layout */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Brand & Social */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-2">
              Guddu Kanwar
            </h3>
            <p className="text-text-muted mb-4 text-sm">
              AI Automation Developer | Web & Android Developer
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass-strong rounded-lg hover:bg-accent/20 hover:text-accent transition-smooth text-text-light"
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Center Column - Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-text-muted hover:text-accent transition-smooth text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <Mail size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:rathoreguddu425@gmail.com"
                  className="text-text-muted hover:text-accent transition-smooth break-all"
                >
                  rathoreguddu425@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Phone size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="text-text-muted">+91 90797 51504</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="text-text-muted">Jaipur, Rajasthan, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          {/* Copyright */}
          <p className="text-center text-text-muted text-sm">
            © {currentYear} Guddu Kanwar
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer