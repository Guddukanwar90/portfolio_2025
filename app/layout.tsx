/**
 * Root layout component
 * Sets up HTML structure, metadata, fonts, and global styles
 */
import './globals.css'

export const metadata = {
  title: 'Guddu Kanwar - AI Automation Developer | Web & Android Developer',
  description: 'Motivated AI Automation & Full-Stack developer experienced building responsive web apps and Android apps. I create practical automations (n8n, Make.com) and developer-friendly MVPs using Next.js and Tailwind.',
  keywords: 'AI Automation, Web Developer, Android Developer, Next.js, React, n8n, Make.com, Retell AI',
  authors: [{ name: 'Guddu Kanwar' }],
  openGraph: {
    title: 'Guddu Kanwar - AI Automation Developer',
    description: 'Full-Stack developer specializing in AI Automation and modern web applications',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-primary text-text-light antialiased">
        {children}
      </body>
    </html>
  )
}