'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ShaderBackgroundProps {
  children: React.ReactNode;
}

const ShaderBackgroundComponent = ({ children }: ShaderBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true);
    const handleMouseLeave = () => setIsActive(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Load the MeshGradient component only on the client to avoid SSR issues
  const [MeshGradientCmp, setMeshGradientCmp] = useState<
    React.ComponentType<{
      className?: string;
      colors?: string[];
      speed?: number;
      wireframe?: boolean | string;
      style?: React.CSSProperties;
    }> | null
  >(null);

  useEffect(() => {
    let mounted = true;
    // Dynamically import to prevent module evaluation during SSR
    import('@paper-design/shaders-react')
      .then((mod) => {
        if (mounted) setMeshGradientCmp(() => mod.MeshGradient as any);
      })
      .catch(() => {
        // no-op on failure; we'll just show the solid gradient background
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    // Bleed the background up behind the sticky header (h-14)
    // while preserving the original layout with matching top padding
    <div ref={containerRef} className="relative overflow-hidden -mt-14 pt-14">
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Background Shaders (client only) */}
      {MeshGradientCmp ? (
        <>
          <MeshGradientCmp
            className="absolute inset-0 w-full h-full"
            // Original indigo/violet palette
            colors={["#000000", "#8b5cf6", "#ffffff", "#1e1b4b", "#4c1d95"]}
            speed={0.3}
            style={{ backgroundColor: '#000000' }}
          />
          <MeshGradientCmp
            className="absolute inset-0 w-full h-full opacity-60"
            colors={["#000000", "#ffffff", "#8b5cf6", "#000000"]}
            speed={0.2}
            wireframe={true}
            style={{ backgroundColor: 'transparent' }}
          />
        </>
      ) : (
        // SSR-safe fallback gradient background
        <div className="absolute inset-0 bg-gradient-to-br from-black via-violet-900/50 to-black" />
      )}

      {children}
    </div>
  );
};

// Memoize the component for better performance with expensive WebGL operations
export const ShaderBackground = React.memo(ShaderBackgroundComponent);
