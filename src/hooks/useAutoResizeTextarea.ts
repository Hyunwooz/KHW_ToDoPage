import { useEffect, useRef } from 'react';

export const useAutoResizeTextarea = (
  trigger: [string, boolean | number | null],
) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 새로운 높이 설정
    }
  }, [trigger]);

  return textareaRef;
};
