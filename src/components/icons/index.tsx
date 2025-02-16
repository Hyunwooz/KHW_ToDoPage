interface IconProps {
  className?: string;
}

export function ArchiveIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M4 8h16M4 8l2 10h12l2-10M4 8l4-4h8l4 4M9 12v4M15 12v4' />
    </svg>
  );
}

export function ActiveIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M4 8h16M4 8l2 10h12l2-10M4 8l4-4h8l4 4' />
    </svg>
  );
}
