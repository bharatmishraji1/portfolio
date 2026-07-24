import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bharat Mishra — AI Engineer | ML Engineer | Data Scientist',
  description: 'Portfolio of Bharat Mishra — AI Engineer specializing in LLMs, RAG, Agentic AI, Deep Learning, and production ML pipelines. Top 2% National Finalist, India AI Impact Buildathon 2026.',
  keywords: 'AI Engineer, Machine Learning, Deep Learning, LLMs, RAG, Bharat Mishra, Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
