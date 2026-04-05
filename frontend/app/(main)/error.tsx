'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function MainLayoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Main layout error:', error)
  }, [error])

  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <h1 className="mb-4 text-4xl font-bold">Oops! Something went wrong</h1>
          <p className="mb-6 text-muted-foreground">
            We encountered an error while loading this page. Please try again.
          </p>
          {error.digest && (
            <p className="mb-6 text-sm text-muted-foreground">
              Error ID: {error.digest}
            </p>
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={() => reset()}>
              Try again
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
