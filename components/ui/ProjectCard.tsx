/**
 * Project card component
 * Displays individual project with hover effects and animations
 */
'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Code2, Play, Pause } from 'lucide-react'
import { hoverLift } from '@/lib/motionVariants'
import { useState, useRef, useEffect } from 'react'

/* ---------- TYPES ---------- */

export type Project = {
  id: string | number
  title: string
  description: string
  tech: string[]
  liveUrl?: string
  image?: string
  video?: string
}

type ProjectCardProps = {
  project: Project
  onClick: () => void
}

/* ---------- COMPONENT ---------- */

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const { title, description, tech, liveUrl, image = '', video = '' } = project

  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Checks
  const hasVideo = Boolean(video.trim())
  const hasImage = Boolean(image.trim())

  /* ---------- HANDLERS ---------- */

  const handleVideoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          videoRef.current!.muted = true
          videoRef.current!.play()
          setIsPlaying(true)
        })
    }
  }

  /* ---------- EFFECTS ---------- */

  // Auto-play on hover
  useEffect(() => {
    if (!videoRef.current || !hasVideo) return

    if (isHovering) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          videoRef.current!.muted = true
          videoRef.current!.play()
          setIsPlaying(true)
        })
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [isHovering, hasVideo])

  // Try autoplay on mount (muted)
  useEffect(() => {
    if (!videoRef.current || !hasVideo) return

    videoRef.current.muted = true
    videoRef.current.play().catch(() => {
      // autoplay blocked — hover will handle it
    })
  }, [hasVideo])

  /* ---------- JSX ---------- */

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
      {/* Media */}
      <div className="relative h-48 bg-gradient-to-br from-accent/20 to-neon/20 overflow-hidden">
        {hasVideo ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src={video}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="auto"
              poster={hasImage ? image : undefined}
            />

            {/* Controls */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <button
                onClick={handleVideoClick}
                className="p-3 glass-strong rounded-full hover:scale-110 transition"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? (
                  <Pause size={24} className="text-white" />
                ) : (
                  <Play size={24} className="text-white" />
                )}
              </button>
            </div>

            <div className="absolute top-2 right-2 px-2 py-1 glass-strong rounded text-xs text-text-light flex items-center gap-1">
              <Play size={10} />
              Video
            </div>
          </div>
        ) : hasImage ? (
          <img
            src={image}
            alt={`${title} preview`}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <Code2 size={48} className="text-accent/50 mb-2" />
            <p className="text-text-muted text-sm">Project Preview</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-text-light">
          {title}
        </h3>

        <p className="text-text-muted text-sm mb-4 line-clamp-2">
          {description}
        </p>

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

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 text-sm"
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
