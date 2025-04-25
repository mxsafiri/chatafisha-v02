"use client"

import React, { useState, useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface FirebaseErrorBoundaryProps {
  children: React.ReactNode
}

export function FirebaseErrorBoundary({ children }: FirebaseErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Check if Firebase environment variables are set
    const isMissingConfig = 
      !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 
      !process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 
      !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

    if (isMissingConfig) {
      setHasError(true)
      setError(new Error('Firebase configuration is missing. Please check your environment variables.'))
    }

    // Add global error handler for Firebase errors
    const handleError = (event: ErrorEvent) => {
      if (event.error?.message?.includes('Firebase') || 
          event.error?.message?.includes('firestore') ||
          event.error?.message?.includes('auth')) {
        setHasError(true)
        setError(event.error)
        event.preventDefault()
      }
    }

    window.addEventListener('error', handleError)
    
    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])

  if (hasError) {
    return (
      <div className="container flex h-screen w-screen items-center justify-center">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <CardTitle>Firebase Configuration Error</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {error?.message || "There was an error initializing Firebase. This is likely due to missing environment variables."}
            </p>
            <div className="bg-muted p-4 rounded-md text-sm">
              <p className="font-medium mb-2">Possible solutions:</p>
              <ol className="list-decimal pl-4 space-y-2">
                <li>Make sure your environment variables are correctly set in Netlify.</li>
                <li>Check that all required Firebase configuration variables are present.</li>
                <li>Verify that your Firebase project is properly set up and accessible.</li>
              </ol>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button onClick={() => window.location.reload()} variant="default">
              Reload Page
            </Button>
            <Button variant="outline" onClick={() => setHasError(false)}>
              Try to continue anyway
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
