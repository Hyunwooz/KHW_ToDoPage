import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '@/styles/global.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'ToDo Page',
  description: '업무의 효율을 증진시키기 위한 칸반형태의 To-Do List 입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.className} px-32 antialiased`}>
        {children}
      </body>
    </html>
  );
}
