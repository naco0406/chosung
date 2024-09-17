import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'antd/dist/reset.css';

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: '초성 맞추기 게임',
//   description: '매일 새로운 초성으로 단어를 맞춰보세요!',
// }

export const metadata: Metadata = {
  title: 'AI 번역기',
  description: '나는 통역 전문가 이다',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}