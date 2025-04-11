import { Loader2, LucideIcon } from "lucide-react"

interface LoadingStateProps {
  icon?: LucideIcon
  text?: string
  className?: string
}

export function LoadingState({
  icon: Icon = Loader2,
  text = "Loading...",
  className = "",
}: LoadingStateProps) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <Icon className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  )
}
