"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type MagneticMouseProps = {
  children: ReactNode;
  /** Duration for x/y movement animation (default: 0.6) */
  moveDuration?: number;
  /** Duration for scale animation (default: 0.4) */
  scaleDuration?: number;
  /** Easing function for animations (default: "power2.out") */
  ease?: string;
  /** Reference distance for calculating attraction strength (default: 800) */
  referenceDistance?: number;
  /** Minimum attraction strength at far distances (default: 0.08) */
  minStrength?: number;
  /** Movement intensity multiplier (default: 15) */
  moveMultiplier?: number;
  /** Maximum scale increase as decimal (default: 0.05 = 5%) */
  scaleMultiplier?: number;
};

export const MagneticMouse = ({
  children,
  moveDuration = 0.6,
  scaleDuration = 0.4,
  ease = "power2.out",
  referenceDistance = 800,
  minStrength = 0.08,
  moveMultiplier = 35,
  scaleMultiplier = 0.05,
}: MagneticMouseProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!containerRef.current || isMobile) return;

    const container = containerRef.current;
    const elementsToAnimate = container.querySelectorAll(
      ".magnetic-element"
    ) as NodeListOf<HTMLElement>;

    if (elementsToAnimate.length === 0) return;

    // Create quickTo functions for each element for optimal performance
    const quickToSetters = Array.from(elementsToAnimate).map((el) => ({
      x: gsap.quickTo(el, "x", { duration: moveDuration, ease }),
      y: gsap.quickTo(el, "y", { duration: moveDuration, ease }),
      scale: gsap.quickTo(el, "scale", { duration: scaleDuration, ease }),
    }));

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      elementsToAnimate.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;

        // Calculate distance from element center to mouse
        const distanceX = mouseX - elementCenterX;
        const distanceY = mouseY - elementCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // Calculate attraction strength (stronger when closer, but never zero)
        const strength = Math.max(minStrength, 1 - distance / referenceDistance);

        // Subtle movement away from cursor (negative values push away)
        const moveX = -distanceX * strength * 0.01 * moveMultiplier;
        const moveY = -distanceY * strength * 0.01 * moveMultiplier;

        // Scale based on proximity (closer = bigger)
        const scaleAmount = 1 + strength * scaleMultiplier;

        quickToSetters[index].x(moveX);
        quickToSetters[index].y(moveY);
        quickToSetters[index].scale(scaleAmount);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [
    children,
    moveDuration,
    scaleDuration,
    ease,
    referenceDistance,
    minStrength,
    moveMultiplier,
    scaleMultiplier,
    isMobile,
  ]);

  return <div ref={containerRef}>{children}</div>;
};

