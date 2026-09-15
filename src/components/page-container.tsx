import * as React from "react"
import { cn } from "@/lib/utils"

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "full"
}

export function PageContainer({
  children,
  variant = "default",
  className,
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto",
        variant === "default" && "max-w-4xl",
        variant === "full" && "w-full px-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
