import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorStateProps {
  title?: string
  description?: string
  error?: Error
  reset?: () => void
}

export function ErrorState({
  title = "Something went wrong",
  description,
  error,
  reset,
}: ErrorStateProps) {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-6 w-6 text-destructive" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {description || error?.message || "An unexpected error occurred. Please try again."}
        </p>
      </CardContent>
      {reset && (
        <CardFooter>
          <Button onClick={reset}>Try again</Button>
        </CardFooter>
      )}
    </Card>
  )
}
