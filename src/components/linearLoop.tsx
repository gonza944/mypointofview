"use client";
import {
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
  CSSProperties,
} from "react";

/**
 * Props interface for the LinearLoop component
 * This component creates a smooth, infinite scrolling marquee effect
 * that can contain any React children (text, images, components, etc.)
 */
interface LinearLoopProps {
  /** The content to be displayed in the marquee - can be any React element(s) */
  children: ReactNode;
  /** The speed of the animation in pixels per second (higher = faster) */
  speed?: number;
  /** Additional CSS classes for styling the container */
  className?: string;
  /** The direction of the marquee animation */
  direction?: "left" | "right";
  /** Whether to pause animation when user hovers over the component */
  pauseOnHover?: boolean;
  /** Gap between repeated items in pixels */
  gap?: number;
}

/**
 * LinearLoop Component
 * 
 * Creates a smooth, infinite scrolling marquee that can display any React content.
 * The component works by:
 * 1. Measuring the content width and container width
 * 2. Duplicating the content to create a seamless loop
 * 3. Using CSS animations to move the content continuously
 * 4. Automatically adjusting animation speed based on content size
 * 
 * Key features:
 * - Accepts any React children (not just text)
 * - Smooth CSS-based animations
 * - Responsive to container size changes
 * - Optional pause on hover
 * - Configurable speed, direction, and gap
 */
export const LinearLoop: FC<LinearLoopProps> = ({
  children,
  speed = 50, // Default speed of 50 pixels per second
  className = "",
  direction = "left",
  pauseOnHover = false,
  gap = 20, // Default 20px gap between items
}) => {
  // Refs to access DOM elements for measurements
  const containerRef = useRef<HTMLDivElement>(null); // The outer container
  const contentRef = useRef<HTMLDivElement>(null);   // The scrolling content

  // State to store measured dimensions
  const [contentWidth, setContentWidth] = useState(0);     // Width of the content
  const [isPaused, setIsPaused] = useState(false);         // Pause state for hover effect

  /**
   * Effect to measure content and container dimensions
   * This runs when:
   * - Component mounts
   * - Children change
   * - Window is resized
   * 
   * We need these measurements to:
   * - Calculate how long the animation should take
   * - Ensure the content fills the visible area properly
   */
  useEffect(() => {
    const measureDimensions = () => {
      if (contentRef.current && containerRef.current) {
        // scrollWidth gives us the full width of the content (including overflow)
        setContentWidth(contentRef.current.scrollWidth);
        // Note: containerWidth measurement removed as it's not currently used
        // but containerRef is kept for potential future enhancements
      }
    };

    // Measure immediately
    measureDimensions();
    
    // Re-measure on window resize to handle responsive layouts
    window.addEventListener('resize', measureDimensions);
    
    // Cleanup: remove event listener when component unmounts
    return () => window.removeEventListener('resize', measureDimensions);
  }, [children]); // Re-run when children change

  /**
   * Calculate animation duration based on content width and speed
   * 
   * Formula: duration = (content width + gap) / speed
   * - We add the gap to account for spacing between loops
   * - Higher speed = shorter duration = faster animation
   * - We only calculate when contentWidth is available (> 0)
   */
  const duration = contentWidth > 0 ? (contentWidth + gap) / speed : 0;

  /**
   * Animation styles object
   * This configures the CSS animation that moves the content
   */
  const animationStyle: CSSProperties = {
    // Set duration based on our calculation
    animationDuration: `${duration}s`,
    // Control direction: 'normal' moves left, 'reverse' moves right
    animationDirection: direction === 'left' ? 'normal' : 'reverse',
    // Pause animation when isPaused is true (for hover effect)
    animationPlayState: isPaused ? 'paused' : 'running',
  };

  /**
   * Mouse event handlers for pause-on-hover functionality
   * These only take effect when pauseOnHover prop is true
   */
  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 
        The animated content container
        - Uses inline-flex to arrange items horizontally
        - animate-marquee class applies our custom CSS animation
        - Gap is applied via inline styles for precise control
      */}
      <div
        ref={contentRef}
        className="inline-flex animate-marquee"
        style={{
          ...animationStyle,
          gap: `${gap}px`,
        }}
      >
        {/* 
          First set of content
          - Wrapped in a flex container to handle multiple children properly
          - Items are centered vertically with items-center
        */}
        <div className="flex items-center shrink-0" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        
        {/* 
          Duplicate content for seamless looping
          - This is the key to the infinite effect
          - As the first set scrolls out of view, this duplicate scrolls in
          - The animation moves both sets together, creating seamless continuity
        */}
        <div className="flex items-center shrink-0" style={{ gap: `${gap}px` }}>
          {children}
        </div>
      </div>
    </div>
  );
};
