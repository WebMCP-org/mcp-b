'use client'

import { useEffect, useState } from 'react'
import { ZoomIn, X } from 'lucide-react'

interface BlogImageProps {
  src: string
  alt: string
  caption?: string
  variant?: 'default' | 'light-bg'
  className?: string
}

/**
 * Custom image component for blog posts
 * Provides consistent styling, lazy loading, captions, variants, and lightbox functionality
 */
export function BlogImage({
  src,
  alt,
  caption,
  variant = 'default',
  className = ''
}: BlogImageProps) {
  const [error, setError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isSvg = src?.trim().toLowerCase().endsWith('.svg') || false

  // Validate src to prevent empty string errors
  const validSrc = src && src.trim() !== '' ? src : null

  useEffect(() => {
    if (!isModalOpen || typeof document === 'undefined') {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isModalOpen])

  if (!validSrc) {
    return (
      <div className="bg-muted p-8 rounded-lg text-center my-8">
        <p className="text-muted-foreground">
          Image missing src attribute: {alt || 'No alt text provided'}
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-muted p-8 rounded-lg text-center my-8">
        <p className="text-muted-foreground">
          Failed to load image: {alt}
        </p>
      </div>
    )
  }

  const variantClasses = {
    default: '',
    'light-bg': 'bg-white dark:bg-white p-4' // Always white even in dark mode
  }

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <figure className="my-8">
        <div className="relative group cursor-pointer" onClick={handleModalOpen}>
          <img
            src={validSrc}
            alt={alt}
            className={`w-full h-auto rounded-lg shadow-lg ${variantClasses[variant]} ${className}`}
            loading="lazy"
            decoding="async"
            onError={() => setError(true)}
          />
          {/* Magnifying glass icon - appears on hover */}
          <button
            type="button"
            onClick={handleModalOpen}
            className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
            aria-label="View full size"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>
        {caption && (
          <figcaption className="text-center text-sm text-muted-foreground mt-3">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Modal - Full size image viewer */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={handleModalClose}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={handleModalClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors z-50"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Full size image */}
          <div
            className="relative flex items-center justify-center"
            style={{
              maxWidth: '95vw',
              maxHeight: '90vh',
              width: isSvg ? 'min(95vw, 1200px)' : undefined
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={validSrc}
              alt={alt}
              className={`block rounded-lg ${variantClasses[variant]} ${isSvg ? 'w-full' : ''}`}
              style={isSvg ? {
                maxWidth: '100%',
                maxHeight: '85vh',
                width: '100%',
                height: 'auto'
              } : {
                maxWidth: '100%',
                maxHeight: '85vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
            {caption && (
              <p className="absolute bottom-0 left-0 right-0 text-center text-sm text-white/80 mt-4 px-4 py-2 bg-black/50 rounded-b-lg">
                {caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
