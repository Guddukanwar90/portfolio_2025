/**
 * Hero section component
 * Two-column layout with intro, tech showcase, and CTA buttons
 */
'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download, Code2, Sparkles } from 'lucide-react'
import { fadeInUp } from '@/lib/motionVariants'
import { useState, useEffect } from 'react'

const AnimatedHero = () => {
  const [typedText, setTypedText] = useState('')
  const technologies = ['Next.js', 'n8n', 'Twilio', 'Make.com', 'React.js']
  const [techIndex, setTechIndex] = useState(0)

  useEffect(() => {
    let charIndex = 0
    const currentTech = technologies[techIndex]
    const typingInterval = setInterval(() => {
      if (charIndex <= currentTech.length) {
        setTypedText(currentTech.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typingInterval)
        setTimeout(() => {
          setTechIndex((prev) => (prev + 1) % technologies.length)
        }, 2000)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [techIndex])

  const techBadges = [
    'AI Automation',
    'Next.js',
    'React',
    'Kotlin',
    'Make.com',
    'n8n',
    'Retell AI',
    'Tailwind CSS',
  ]

  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column - Intro */}
          <motion.div
            className="glass rounded-2xl p-6 md:p-8 lg:p-12 card-shadow h-full lg:w-1/2"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 glass-strong rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles size={16} className="text-accent" />
              <span className="text-sm text-accent font-medium">Available for projects</span>
            </motion.div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-text-light">
              Hi, I'm{' '}
              <span className="gradient-text">
                Guddu Kanwar
              </span>
            </h1>

            <h2 className="text-xl md:text-2xl lg:text-3xl text-accent mb-6">
              AI Automation Developer | Web & Android Developer
            </h2>

            <div className="mb-6 h-8">
              <p className="text-base md:text-lg text-text-muted">
                I build with{' '}
                <span className="text-accent font-semibold">{typedText}</span>
                <span className="animate-pulse">|</span>
              </p>
            </div>

            <p className="text-base md:text-lg text-text-muted mb-4 leading-relaxed">
              Motivated AI Automation & Full-Stack developer experienced building responsive web apps and Android apps.
            </p>
            <p className="text-base md:text-lg text-text-muted mb-8 leading-relaxed">
              I create practical automations (n8n, Make.com) and developer-friendly MVPs using Next.js and Tailwind.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accent/80 text-white font-semibold rounded-lg transition-smooth neon-glow"
              >
                See Projects
                <ArrowRight size={18} />
              </a>
              <a
                href="https://drive.google.com/uc?export=download&id=1mLmGMVf12TwMo0zJaomJBdVkMNiDAFcV"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 glass-strong hover:bg-white/10 text-text-light font-semibold rounded-lg transition-smooth border border-accent/30"
              >
                <Download size={18} />
                Resume
              </a>
            </div>
          </motion.div>

          {/* Right Column - Tech Showcase */}
          <motion.div
            className="glass rounded-2xl p-6 md:p-8 lg:p-12 card-shadow h-full lg:w-1/2"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Code2 className="text-accent" size={28} />
              <h3 className="text-2xl font-bold text-text-light">Tech Stack</h3>
            </div>
            <p className="text-text-muted mb-8">
              Technologies I work with to build modern, scalable applications
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {techBadges.map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-3 py-2 glass-strong rounded-lg text-sm font-medium hover:neon-glow hover:border-accent/50 transition-smooth cursor-default border border-transparent text-text-light"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-accent">6+</p>
                  <p className="text-xs md:text-sm text-text-muted mt-1">Projects</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-accent">2+</p>
                  <p className="text-xs md:text-sm text-text-muted mt-1">Years Exp.</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-accent">10+</p>
                  <p className="text-xs md:text-sm text-text-muted mt-1">Technologies</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AnimatedHero
