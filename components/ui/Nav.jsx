/**
 * Navigation component
 * Sticky glass header with logo, navigation links, social icons, and Resume button
 */
'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Linkedin, Github, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ]

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-primary/5 backdrop-blur-xl border-b border-white/10 py-4 shadow-lg' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-xl md:text-2xl font-bold gradient-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Guddu Kanwar
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-text-light hover:text-accent transition-colors duration-300"
                  aria-label={`Navigate to ${link.name}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-light hover:text-accent transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            {/* Resume Button */}
            <a
              href="https://drive.google.com/uc?export=download&id=1mLmGMVf12TwMo0zJaomJBdVkMNiDAFcV"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-accent hover:bg-accent/80 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-accent/20"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-light p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden mt-4 bg-primary/90 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-2xl"
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-text-light hover:text-accent transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                    aria-label={`Navigate to ${link.name}`}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="flex items-center gap-3 pt-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex justify-center items-center p-3 text-text-light hover:text-accent transition-colors duration-300 rounded-lg hover:bg-white/10"
                      aria-label={social.name}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
                <a
                  href="https://drive.google.com/uc?export=download&id=1mLmGMVf12TwMo0zJaomJBdVkMNiDAFcV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-accent hover:bg-accent/80 text-white font-semibold rounded-lg transition-all duration-300 text-center shadow-lg hover:shadow-accent/20"
                >
                  Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Nav