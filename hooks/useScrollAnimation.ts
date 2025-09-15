'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce && !hasTriggered) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return { elementRef, isVisible };
}

// Hook for staggered animations (useful for lists or multiple elements)
export function useStaggeredAnimation(count: number, delay: number = 100, triggerOnce: boolean = true) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(count).fill(false));
  const [hasTriggered, setHasTriggered] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset items if re-triggering is allowed
          if (!triggerOnce || !hasTriggered) {
            // First reset all items to false
            setVisibleItems(new Array(count).fill(false));
            
            // Then stagger the animations
            for (let i = 0; i < count; i++) {
              setTimeout(() => {
                setVisibleItems(prev => {
                  const newState = [...prev];
                  newState[i] = true;
                  return newState;
                });
              }, i * delay);
            }
            
            if (triggerOnce) {
              setHasTriggered(true);
            }
          }
        } else if (!triggerOnce && !hasTriggered) {
          // Reset items when leaving the viewport (only if re-triggering is allowed)
          setVisibleItems(new Array(count).fill(false));
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, [count, delay, triggerOnce, hasTriggered]);

  return { containerRef, visibleItems };
}