import { useState } from 'react'

export default function LazyImage({ src, alt, className = '', wrapperClass = '' }) {
  const [loaded, setLoaded] = useState(false)
  const [error,  setError]  = useState(false)

  return (
    <div className={`relative w-full h-full overflow-hidden ${wrapperClass}`}>
      {/* Skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-brand-100 animate-pulse" />
      )}
      <img
        src={error ? 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80' : src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); setLoaded(true) }}
        className={`w-full h-full object-cover ${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
      />
    </div>
  )
}