'use client'
import React from 'react';

// The main App component that renders our ShimmerButton
export default function ShimmerButton({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {
  const customCss = `
    /* This is the key to the seamless animation.
      The @property rule tells the browser that '--angle' is a custom property
      of type <angle>. This allows the browser to smoothly interpolate it
      during animations, preventing the "jump" at the end of the loop.
    */
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    /* The keyframe animation simply transitions the --angle property
      from its start (0deg) to its end (360deg).
    */
    @keyframes shimmer-spin {
      to {
        --angle: 360deg;
      }
    }
  `;

  return (
    // Main container to center the button on the page
    <div className="flex items-center justify-center font-sans">
      <style>{customCss}</style>
      <button className="relative inline-flex items-center justify-center p-[4px] bg-muted-foreground rounded-full overflow-hidden group" onClick={onClick}>
        <div 
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from var(--angle), transparent 70%, var(--primary), transparent 100%)',
            animation: 'shimmer-spin 2.5s linear infinite',
          }}
        />
        <span className="relative z-10 inline-flex items-center justify-center w-full h-full text-muted bg-muted-foreground rounded-full group-hover:bg-muted transition-colors duration-300">
          {children}
        </span>
      </button>
    </div>
  );
}
