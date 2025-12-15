/**
 * Home page component
 * Main entry point that assembles all portfolio sections
 */
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'
import AnimatedHero from '../components/AnimatedHero'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import SkillsGrid from '../components/SkillsGrid'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import projects from './data/projects'
import { staggerContainer, fadeInUp } from '../lib/motionVariants'

const App = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <div className="min-h-screen">
      <Nav />
      
      <main>
        {/* Hero Section */}
        <AnimatedHero />

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-text-muted text-lg max-w-2xl mx-auto">
                A selection of projects showcasing my skills in web development, Android apps, and AI automation
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {projects.map((project) => (
                <motion.div key={project.id} variants={fadeInUp}>
                  <ProjectCard
                    project={project}
                    onClick={() => openModal(project)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <SkillsGrid />

        {/* Contact Section */}
        <ContactForm />
      </main>

      <Footer />

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  )
}

export default App