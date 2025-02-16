import { useEffect } from 'react';

export const useAutoResizeTextarea = (selector: string, trigger: any) => {
  useEffect(() => {
    const textarea = document.querySelector(selector) as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [trigger]);
};
