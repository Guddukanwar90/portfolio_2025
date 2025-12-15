/**
 * Project card component
 * Displays individual project with hover effects and animations
 */
'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Code2, Play, Pause } from 'lucide-react'
import { hoverLift } from '@/lib/motionVariants'
import { useState, useRef, useEffect } from 'react'

const ProjectCard = ({ project, onClick }) => {
  const { title, description, tech, liveUrl, image, video } = project
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const videoRef = useRef(null)
  
  // Automatic check: agar video hai to video show करो, nahi to image
  const hasVideo = Boolean(video && video.trim() !== '')
  const hasImage = Boolean(image && image.trim() !== '')

  const handleVideoClick = (e) => {
    e.stopPropagation()
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play().catch(error => {
          console.error("Video play failed:", error)
          // Fallback: Try playing with sound muted
          videoRef.current.muted = true
          videoRef.current.play()
        })
        setIsPlaying(true)
      }
    }
  }

  // Auto-play video on hover, pause on leave
  useEffect(() => {
    if (videoRef.current && hasVideo) {
      if (isHovering) {
        videoRef.current.play().catch(error => {
          console.error("Auto-play failed:", error)
          // Fallback with muted video
          videoRef.current.muted = true
          videoRef.current.play()
        })
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }, [isHovering, hasVideo])

  // Auto-play video when component mounts (if you want videos to play immediately)
  useEffect(() => {
    if (videoRef.current && hasVideo) {
      // Try to play immediately with muted audio (browser restrictions)
      videoRef.current.muted = true
      const playPromise = videoRef.current.play()
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay prevented:", error)
          // Play will be triggered on hover instead
        })
      }
    }
  }, [hasVideo])

  return (
    <motion.div
      className="glass rounded-xl overflow-hidden card-shadow cursor-pointer group"
      variants={hoverLift}
      initial="rest"
      whileHover="hover"
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Project Media - Automatic selection */}
      <div className="relative h-48 bg-gradient-to-br from-accent/20 to-neon/20 flex items-center justify-center overflow-hidden">
        {hasVideo ? (
          // Video display with auto-play
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src={video}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="auto"
              poster={hasImage ? image : ""}
              autoPlay // Add autoPlay attribute
            />
            
            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button
                onClick={handleVideoClick}
                className="p-3 glass-strong rounded-full hover:scale-110 transition-transform"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (
                  <Pause size={24} className="text-white" />
                ) : (
                  <Play size={24} className="text-white" />
                )}
              </button>
            </div>
            
            {/* Video Badge */}
            <div className="absolute top-2 right-2 px-2 py-1 glass-strong rounded text-xs text-text-light flex items-center gap-1">
              <Play size={10} />
              <span>Video</span>
            </div>
          </div>
        ) : hasImage ? (
          // Image display
          <>
            <img
              src={image}
              alt={`${title} preview`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentNode.querySelector('.fallback').style.display = 'flex'
              }}
            />
            <div className="fallback absolute inset-0 hidden flex-col items-center justify-center">
              <Code2 size={48} className="text-accent/50 mb-2" />
              <p className="text-text-muted text-sm">Image not found</p>
            </div>
          </>
        ) : (
          // Placeholder 
          <div className="flex flex-col items-center justify-center">
            <Code2 size={48} className="text-accent/50 mb-2" />
            <p className="text-text-muted text-sm">Project Preview</p>
          </div>
        )}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300" />
      </div>

      {/* Project Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold group-hover:text-accent transition-smooth text-text-light">
            {title}
          </h3>
          {hasVideo && (
            <span className="text-xs px-2 py-1 glass-strong rounded text-accent flex items-center gap-1">
              <Play size={10} />
              Video Demo
            </span>
          )}
        </div>
        <p className="text-text-muted text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item) => (
            <span
              key={item}
              className="px-3 py-1 text-xs glass-strong rounded-md text-accent"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Live Link */}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-smooth text-sm font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={16} />
            View Live
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default ProjectCard