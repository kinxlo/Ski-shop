"use client";

import { cn } from "@/lib/utils";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FC,
  type ReactNode,
} from "react";

interface UseWaveAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
  duration?: number;
}

export const useWaveAnimation = (options: UseWaveAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = "50px", staggerDelay = 50, duration = 500 } = options;

  const [isVisible, setIsVisible] = useState(false);
  const containerReference = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin },
    );

    if (containerReference.current) {
      const checkVisibility = () => {
        if (!containerReference.current) return;

        const rect = containerReference.current.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;

        if (inView) {
          window.setTimeout(() => setIsVisible(true), 150);
        } else {
          observer.observe(containerReference.current);
        }
      };

      const id = window.setTimeout(checkVisibility, 50);
      return () => {
        window.clearTimeout(id);
        observer.disconnect();
      };
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const getItemStyle = useMemo(
    () =>
      (index: number): CSSProperties => ({
        transitionDelay: `${index * staggerDelay}ms`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        willChange: "transform, opacity",
      }),
    [staggerDelay, duration],
  );

  const getItemClassName = (baseClasses = "") =>
    cn(
      baseClasses,
      "transition-all transform",
      isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95",
    );

  return {
    isVisible,
    containerReference,
    getItemStyle,
    getItemClassName,
  };
};

// =========================================================

interface AnimationContextType {
  getItemStyle: (index: number) => CSSProperties;
  getItemClassName: (baseClasses?: string) => string;
}

const AnimationContext = createContext<AnimationContextType | null>(null);

interface PageWrapperProperties extends UseWaveAnimationOptions {
  children: ReactNode;
  className?: string;
}

export const PageWrapper: FC<PageWrapperProperties> = ({
  children,
  className,
  staggerDelay = 50,
  duration = 600,
  threshold,
  rootMargin,
}) => {
  const { containerReference, getItemStyle, getItemClassName } = useWaveAnimation({
    staggerDelay,
    duration,
    threshold,
    rootMargin,
  });

  return (
    <AnimationContext.Provider value={{ getItemStyle, getItemClassName }}>
      <div ref={containerReference} className={cn(className)}>
        {children}
      </div>
    </AnimationContext.Provider>
  );
};

interface PageSectionProperties {
  children: ReactNode;
  index: number;
  className?: string;
}

export const PageSection: FC<PageSectionProperties> = ({ children, index, className }) => {
  const context = useContext(AnimationContext);

  if (!context) {
    throw new Error("PageSection must be used within a PageWrapper");
  }

  const { getItemStyle, getItemClassName } = context;

  return (
    <div style={getItemStyle(index)} className={getItemClassName(className)}>
      {children}
    </div>
  );
};
