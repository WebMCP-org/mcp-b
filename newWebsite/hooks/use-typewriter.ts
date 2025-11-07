import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
}

// Overload signatures
export function useTypewriter(text: string, speed?: number): { displayText: string; isComplete: boolean };
export function useTypewriter(options: UseTypewriterOptions): { displayText: string; isComplete: boolean };

// Implementation
export function useTypewriter(
  textOrOptions: string | UseTypewriterOptions,
  speedArg?: number
): { displayText: string; isComplete: boolean } {
  const text = typeof textOrOptions === 'string' ? textOrOptions : textOrOptions.text;
  const speed = typeof textOrOptions === 'string' ? (speedArg ?? 50) : (textOrOptions.speed ?? 50);
  const delay = typeof textOrOptions === 'string' ? 0 : (textOrOptions.delay ?? 0);

  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let index = 0;

    const startTyping = () => {
      if (index < text.length) {
        setDisplayText(text.substring(0, index + 1));
        index++;
        timeout = setTimeout(startTyping, speed);
      } else {
        setIsComplete(true);
      }
    };

    // Start after initial delay
    timeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [text, speed, delay]);

  return { displayText, isComplete };
}
