'use client';

import { animate, stagger } from 'motion';
import { splitText } from 'motion-plus';
import { useEffect, useRef } from 'react';

interface SplitTextProps {
  /**
   * Text to animate, rendered inside an <h1> element.
   */
  text: string;
  /**
   * Additional Tailwind classes for the container.
   */
  className?: string;
}

export function SplitTitleText({ text, className = '' }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      const container = containerRef.current;
      if (!container) return;

      // Reveal container after fonts are loaded
      container.style.visibility = 'visible';

      // Split the <h1> text into word spans
      const heading = container.querySelector('h1')!;
      const { words } = splitText(heading);

      // Add Tailwind will-change utilities for performance
      words.forEach((word) => {
        word.classList.add('will-change-[transform,opacity]');
      });

      // Animate each word with a spring effect, staggered
      animate(
        words,
        { opacity: [0, 1], y: [10, 0] },
        {
          type: 'spring',
          duration: 0.5,
          bounce: 0,
          delay: stagger(0.05),
        }
      );
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`invisible flex justify-center items-center w-full max-w-[200px] text-left ${className}`}
    >
      <h1 className="text-[2rem] font-bold text-susimdal-text-basic leading-[150%] whitespace-pre-wrap">{text}</h1>
    </div>
  );
}
