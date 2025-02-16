import { StatusColor } from '@/shared/types/status';

const getStatusColor = (color: StatusColor) => {
  const colorStyles: Record<
    StatusColor,
    {
      ring: string;
      bg: string;
      border: string;
      ringText: string;
      ringHover: string;
      titleHover: string;
    }
  > = {
    green: {
      ring: 'bg-green-300',
      bg: 'bg-green-50',
      border: 'border-green-300',
      ringText: 'text-green-700',
      ringHover: 'hover:bg-green-200',
      titleHover: 'hover:text-green-700',
    },
    blue: {
      ring: 'bg-blue-300',
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      ringText: 'text-blue-700',
      ringHover: 'hover:bg-blue-200',
      titleHover: 'hover:text-blue-700',
    },
    red: {
      ring: 'bg-red-300',
      bg: 'bg-red-50',
      border: 'border-red-300',
      ringText: 'text-red-700',
      ringHover: 'hover:bg-red-200',
      titleHover: 'hover:text-red-700',
    },
    gray: {
      ring: 'bg-gray-300',
      bg: 'bg-gray-50',
      border: 'border-gray-300',
      ringText: 'text-gray-700',
      ringHover: 'hover:bg-gray-200',
      titleHover: 'hover:text-gray-700',
    },
  };

  return colorStyles[color] || colorStyles.blue; // 기본값 blue
};

export default getStatusColor;
