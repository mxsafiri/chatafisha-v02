"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth"
import { doc, getDoc, getFirestore, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Icons from "@/components/ui/icons"
import { toast } from "@/components/ui/use-toast"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"

// Define the form schema with Zod for validation
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)

  // Initialize react-hook-form with zod validation
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Handle form submission
  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)

    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
      
      // Get user role from Firestore
      const firestoreDb = getFirestore()
      const userDoc = await getDoc(doc(firestoreDb, "users", userCredential.user.uid))
      
      toast({
        title: "Success",
        description: "You have been logged in successfully.",
      })
      
      // Redirect based on user role
      if (userDoc.exists()) {
        const userData = userDoc.data()
        
        // Redirect based on role
        switch (userData.role) {
          case "verifier":
            router.push("/verify")
            break
          case "funder":
            // Fallback to dashboard if fund page doesn't exist yet
            router.push("/dashboard")
            break
          case "submitter":
            router.push("/submit-project")
            break
          case "admin":
            router.push("/dashboard")
            break
          default:
            router.push("/dashboard")
        }
      } else {
        // Fallback to dashboard if user data doesn't exist
        router.push("/dashboard")
      }
      
      router.refresh()
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Error",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Google sign-in
  async function handleGoogleSignIn() {
    setIsGoogleLoading(true)

    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      
      // Get user role from Firestore
      const firestoreDb = getFirestore()
      const userDoc = await getDoc(doc(firestoreDb, "users", userCredential.user.uid))
      
      // If user doesn't exist in Firestore yet, create a new document with default role
      if (!userDoc.exists()) {
        await setDoc(doc(firestoreDb, "users", userCredential.user.uid), {
          uid: userCredential.user.uid,
          name: userCredential.user.displayName || "",
          displayName: userCredential.user.displayName || "",
          email: userCredential.user.email || "",
          role: "submitter", // Default role
          isVerifier: false,
          isSubmitter: true,
          isFunder: false,
          isAdmin: false,
          photoURL: userCredential.user.photoURL,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        
        toast({
          title: "Success",
          description: "You have been logged in with Google successfully. Default role: Submitter",
        })
        
        // New users are redirected to the submit-project page
        router.push("/submit-project")
      } else {
        // Existing user - get their role and redirect accordingly
        const userData = userDoc.data()
        
        toast({
          title: "Success",
          description: "You have been logged in with Google successfully.",
        })
        
        // Redirect based on role
        switch (userData.role) {
          case "verifier":
            router.push("/verify")
            break
          case "funder":
            // Fallback to dashboard if fund page doesn't exist yet
            router.push("/dashboard")
            break
          case "submitter":
            router.push("/submit-project")
            break
          case "admin":
            router.push("/dashboard")
            break
          default:
            router.push("/dashboard")
        }
      }
      
      router.refresh()
    } catch (error) {
      console.error("Google login error:", error)
      toast({
        title: "Error",
        description: "Failed to login with Google. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading || isGoogleLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    autoCorrect="off"
                    disabled={isLoading || isGoogleLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <a
                href="/reset-password"
                className="text-sm text-primary underline-offset-4 hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading || isGoogleLoading}
        onClick={handleGoogleSignIn}
        className="w-full"
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
      <div className="text-center">
        <span className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </a>
        </span>
      </div>
    </div>
  )
}

export default LoginForm
