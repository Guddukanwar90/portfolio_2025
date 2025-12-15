/**
 * Project modal component
 * Accessible modal for displaying detailed project information
 */
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Code2, Play, Pause } from 'lucide-react'
import { modalVariant } from '@/lib/motionVariants'
import { useEffect, useRef, useState } from 'react'

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)
  
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      
      // Auto-play video when modal opens
      if (videoRef.current && hasVideo) {
        setTimeout(() => {
          videoRef.current.play().catch(error => {
            console.error("Auto-play failed:", error)
          })
        }, 300)
      }
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
      
      // Pause video when modal closes
      if (videoRef.current) {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }, [isOpen, onClose])

  if (!project) return null

  const { title, description, tech, liveUrl, image, video } = project
  
  const hasVideo = Boolean(video && video.trim() !== '')
  const hasImage = Boolean(image && image.trim() !== '')

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play().catch(error => {
          console.error("Video play failed:", error)
          videoRef.current.muted = true
          videoRef.current.play()
        })
        setIsPlaying(true)
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[rgba(2,6,23,0.7)] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative glass-strong rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto card-shadow"
            variants={modalVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 glass rounded-lg hover:bg-white/20 transition-smooth z-10 text-text-light"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Project Media */}
            <div className="relative h-64 bg-gradient-to-br from-accent/20 to-neon/20 flex items-center justify-center rounded-t-2xl overflow-hidden">
              {hasVideo ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    src={video}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    controls
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  {!isPlaying && (
                    <button
                      onClick={handleVideoClick}
                      className="absolute inset-0 flex items-center justify-center bg-black/40"
                      aria-label="Play video"
                    >
                      <div className="p-4 glass-strong rounded-full">
                        <Play size={32} className="text-white" />
                      </div>
                    </button>
                  )}
                </div>
              ) : hasImage ? (
                <img
                  src={image}
                  alt={`${title} preview`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Code2 size={64} className="text-accent/50 mb-3" />
                  <p className="text-text-muted">Project Preview</p>
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className="p-8">
              <h2
                id="modal-title"
                className="text-3xl font-bold mb-4 gradient-text"
              >
                {title}
              </h2>

              <p className="text-text-muted text-lg mb-6 leading-relaxed">
                {description}
              </p>

              {/* Tech Stack */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-accent">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {tech.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 glass rounded-lg text-sm font-medium neon-border text-text-light"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Link */}
              {liveUrl && (
                <div className="pt-6 border-t border-white/10">
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/80 text-white font-semibold rounded-lg transition-smooth neon-glow"
                  >
                    <ExternalLink size={18} />
                    View Live Project
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
