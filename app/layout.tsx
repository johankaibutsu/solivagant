import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Manuscript of Nothing",
  description: "Manuscript of Nothing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="min-h-screen flex flex-col">
            <header className="border-b">
              <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                  Solivagant
                </Link>
                <ModeToggle />
              </div>
            </header>
            <div className="flex-1">{children}</div>
            <footer className="border-t py-6">
              <div className="container mx-auto px-4 text-center text-sm ">
                Without music, life would be a mistake.
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}



import './globals.css'