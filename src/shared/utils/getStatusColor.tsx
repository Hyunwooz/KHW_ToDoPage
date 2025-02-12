import { StatusColor } from '@/shared/types/status';

const getStatusColor = (color: StatusColor) => {
  const colorStyles: Record<
    StatusColor,
    {
      ring: string;
      bg: string;
      border: string;
      boardHover: string;
      listHover: string;
    }
  > = {
    green: {
      ring: 'bg-green-300',
      bg: 'bg-green-50',
      border: 'border-green-300',
      boardHover: 'hover:bg-green-50',
      listHover: 'hover:bg-green-200',
    },
    blue: {
      ring: 'bg-blue-300',
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      boardHover: 'hover:bg-blue-50',
      listHover: 'hover:bg-blue-200',
    },
    red: {
      ring: 'bg-red-300',
      bg: 'bg-red-50',
      border: 'border-red-300',
      boardHover: 'hover:bg-red-50',
      listHover: 'hover:bg-red-200',
    },
    yellow: {
      ring: 'bg-yellow-300',
      bg: 'bg-yellow-50',
      border: 'border-yellow-300',
      boardHover: 'hover:bg-yellow-50',
      listHover: 'hover:bg-yellow-200',
    },
  };

  return colorStyles[color] || colorStyles.blue; // 기본값 blue
};

export default getStatusColor;
