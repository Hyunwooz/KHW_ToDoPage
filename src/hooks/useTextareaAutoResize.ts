import { useEffect } from 'react';

export const useTextareaAutoResize = (
  ref: React.RefObject<HTMLTextAreaElement>,
) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [ref.current?.value]);
};
