/**
 * Skills grid component
 * Displays technical skills organized by category
 */
'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motionVariants'
import {
  Workflow,
  Globe,
  Smartphone,
  Code,
  Database,
} from 'lucide-react'

const SkillsGrid = () => {
  const skillCategories = [
    {
      title: 'AI Automation',
      icon: Workflow,
      skills: ['Make.com', 'n8n', 'Retell AI', 'Airtable', 'Twilio', 'APIs & Webhooks'],
      color: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Web Development',
      icon: Globe,
      skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Next.js', 'Tailwind CSS'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Mobile Development',
      icon: Smartphone,
      skills: ['Kotlin', 'Android Studio'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Programming',
      icon: Code,
      skills: ['Python (basic)', 'C (basic)', 'DSA'],
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Databases',
      icon: Database,
      skills: ['DBMS', 'MongoDB'],
      color: 'from-teal-500 to-cyan-500',
    },
  ]

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="glass rounded-xl p-6 card-shadow hover:neon-glow transition-smooth group"
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-20`}
                >
                  <category.icon className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-bold group-hover:text-accent transition-smooth">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 glass-strong rounded-lg text-sm text-text-light/90 hover:text-accent hover:border-accent/50 transition-smooth border border-transparent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsGrid
