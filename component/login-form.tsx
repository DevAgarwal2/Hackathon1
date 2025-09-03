import { GalleryVerticalEnd } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import AuthButton from "./AuthButton"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center justify-center min-h-screen p-4", className)} {...props}>
      <Card className="w-full max-w-sm h-full">
        <CardHeader className="flex flex-col items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-md bg-primary/10">
            <GalleryVerticalEnd className="size-6 text-primary" />
          </div>
          <CardTitle className="text-xl">Welcome to PhotoAI.</CardTitle>
          <CardDescription className="text-center">
            Sign in with Google to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <AuthButton />
          <p className="text-muted-foreground text-center text-xs">
            By continuing, you agree to our{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  )
}