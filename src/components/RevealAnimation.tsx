"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Noise from './Noise';

interface RevealAnimationProps {
  children: React.ReactNode;
  /** Duration of the counter animation in seconds */
  counterDuration?: number;
  /** Duration the "Hello" text stays visible before de-materializing in seconds */
  helloDuration?: number;
  /** Duration of the de-materialization effect in seconds */
  dematerializeDuration?: number;
  /** Duration of the screen split animation in seconds */
  splitDuration?: number;
  /** Easing function for counter animation */
  counterEase?: string;
  /** Easing function for split animation */
  splitEase?: string;
  /** Callback when animation completes */
  onComplete?: () => void;
}

export const RevealAnimation: React.FC<RevealAnimationProps> = ({
  children,
  counterDuration = 2.5,
  helloDuration = 0.8,
  dematerializeDuration = 0.6,
  splitDuration = 1.2,
  counterEase = "power1.out",
  splitEase = "power3.inOut",
  onComplete,
}) => {
  const [isComplete, setIsComplete] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const helloRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial state - counter is invisible
    if (counterRef.current) {
      gsap.set(counterRef.current, {
        opacity: 0,
        scale: 1.3,
        filter: "blur(20px)"
      });
    }

    // Create GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        onComplete?.();
      }
    });

    // Small delay to let noise render
    tl.to({}, { duration: 0.1 });

    // 1. Materialize the counter (0)
    tl.to(counterRef.current, {
      duration: 0.5,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      ease: "power2.out"
    });

    // Counter object for animation
    const counter = { value: 0 };

    // 2. Animate counter from 0 to 100
    tl.to(counter, {
      value: 100,
      duration: counterDuration,
      ease: counterEase,
      onUpdate: function() {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(counter.value).toString();
        }
      }
    });

    // 3. Fade out "100"
    tl.to(counterRef.current, {
      duration: 0.3,
      opacity: 0,
      scale: 0.9,
      ease: "power2.in",
    });

    // 4. Switch to "Hello" and materialize it
    tl.call(() => {
      if (counterRef.current && helloRef.current) {
        counterRef.current.style.display = "none";
        helloRef.current.style.display = "block";
        // Set initial materialization state
        gsap.set(helloRef.current, {
          opacity: 0,
          scale: 1.3,
          filter: "blur(20px)"
        });
      }
    });

    // Materialize "Hello" - from blurred/scaled to clear
    tl.to(helloRef.current, {
      duration: 0.6,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      ease: "power2.out"
    });

    // 5. Wait for helloDuration
    tl.to({}, { duration: helloDuration });

    // 6. De-materialize "Hello" and start panel split simultaneously
    tl.addLabel("dematerialize");
    
    // De-materialize Hello - fast and dramatic
    tl.to(helloRef.current, {
      duration: dematerializeDuration,
      opacity: 0,
      scale: 1.5,
      filter: "blur(30px)",
      ease: "power2.in"
    }, "dematerialize");

    // Move panels - slower, starts at same time as de-materialization
    tl.to(leftPanelRef.current, {
      duration: splitDuration,
      x: "-100%",
      ease: splitEase
    }, "dematerialize");

    tl.to(rightPanelRef.current, {
      duration: splitDuration,
      x: "100%",
      ease: splitEase
    }, "dematerialize");

    // Fade out the entire overlay container
    tl.to(overlayRef.current, {
      duration: 0.3,
      opacity: 0,
      ease: "power2.inOut",
      onComplete: () => {
        if (overlayRef.current) {
          overlayRef.current.style.pointerEvents = "none";
        }
      }
    }, "-=0.3");

    return () => {
      tl.kill();
    };
  }, [
    counterDuration,
    helloDuration,
    dematerializeDuration,
    splitDuration,
    counterEase,
    splitEase,
    onComplete
  ]);

  return (
    <>
      {/* Main content */}
      <div ref={contentRef} className="relative">
        {children}
      </div>

      {/* Reveal overlay */}
      {!isComplete && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 pointer-events-auto"
          style={{ opacity: 1 }}
        >
          {/* Left panel */}
          <div
            ref={leftPanelRef}
            className="absolute top-0 left-0 w-1/2 h-full bg-foreground flex items-center justify-end pr-0.5"
          >
            <Noise patternAlpha={15} patternRefreshInterval={2} />
          </div>

          {/* Right panel */}
          <div
            ref={rightPanelRef}
            className="absolute top-0 right-0 w-1/2 h-full bg-foreground flex items-center justify-start pl-0.5"
          >
            <Noise patternAlpha={15} patternRefreshInterval={2} />
          </div>

          {/* Counter text - centered on screen, initially invisible */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              ref={counterRef}
              className="font-header font-extrabold text-primary text-[20vh] md:text-[25vh] lg:text-[30vh] tracking-tighter leading-none"
              style={{ 
                opacity: 0,
                textShadow: "0 1px 0 rgba(0,0,0,0.1), 0 2px 0 rgba(0,0,0,0.1), 0 3px 0 rgba(0,0,0,0.1), 0 4px 0 rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.2), 0 0 40px rgba(0,0,0,0.15)"
              }}
            >
              0
            </div>
          </div>

          {/* Hello text - centered on screen, initially hidden */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              ref={helloRef}
              className="font-header font-extrabold text-primary text-[15vh] md:text-[18vh] lg:text-[22vh] tracking-tighter leading-none"
              style={{ 
                opacity: 0, 
                display: "none",
                textShadow: "0 1px 0 rgba(0,0,0,0.1), 0 2px 0 rgba(0,0,0,0.1), 0 3px 0 rgba(0,0,0,0.1), 0 4px 0 rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.2), 0 0 40px rgba(0,0,0,0.15)"
              }}
            >
              Hello
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RevealAnimation;

