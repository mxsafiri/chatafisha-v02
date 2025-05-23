"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, updateProfile, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, setDoc, serverTimestamp, getFirestore } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Icons from "@/components/ui/icons"
import { toast } from "@/components/ui/use-toast"
import type { UserRole } from "@/types"

// Define the form schema with Zod for validation
const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { 
    message: "Password must be at least 8 characters" 
  }),
  role: z.enum(["submitter", "verifier", "funder", "admin"] as const, {
    required_error: "Please select a role",
  }),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)

  // Initialize react-hook-form with zod validation
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "submitter",
    },
  })

  // Handle form submission
  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true)

    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
      await updateProfile(userCredential.user, { displayName: data.name })
      const firestoreDb = getFirestore();
      if (!firestoreDb) {
        throw new Error("Firestore database is not available");
      }
      
      // Store comprehensive user data in Firestore with role
      await setDoc(doc(firestoreDb, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name: data.name,
        displayName: data.name, // For consistency with Firebase Auth
        email: data.email,
        role: data.role,
        isVerifier: data.role === "verifier",
        isSubmitter: data.role === "submitter", 
        isFunder: data.role === "funder",
        isAdmin: data.role === "admin",
        photoURL: userCredential.user.photoURL,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      })
      
      // Wait a moment for Firestore to update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect based on user role
      switch (data.role) {
        case "verifier":
          router.push("/verify");
          break;
        case "funder":
          router.push("/fund");
          break;
        case "submitter":
          router.push("/submit-project");
          break;
        case "admin":
          router.push("/admin");
          break;
        default:
          router.push("/dashboard");
      }
      
      router.refresh()
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Error",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Google sign-in
  async function onGoogleSignIn() {
    setIsGoogleLoading(true)

    try {
      // Get the selected role from the form
      const role = form.getValues("role") as UserRole
      
      // Implement Google sign-in with Firebase
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const firestoreDb = getFirestore();
      
      if (!firestoreDb) {
        throw new Error("Firestore database is not available");
      }
      
      // Store user data in Firestore with the selected role
      await setDoc(doc(firestoreDb, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name: userCredential.user.displayName || "",
        displayName: userCredential.user.displayName || "",
        email: userCredential.user.email || "",
        role: role,
        isVerifier: role === "verifier",
        isSubmitter: role === "submitter", 
        isFunder: role === "funder",
        isAdmin: role === "admin",
        photoURL: userCredential.user.photoURL,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }, { merge: true });
      
      toast({
        title: "Success",
        description: "You have been registered with Google successfully.",
      })
      
      // Wait a moment for Firestore to update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect based on user role
      switch (role) {
        case "verifier":
          router.push("/verify");
          break;
        case "funder":
          router.push("/fund");
          break;
        case "submitter":
          router.push("/submit-project");
          break;
        case "admin":
          router.push("/admin");
          break;
        default:
          router.push("/dashboard");
      }
      
      router.refresh()
    } catch (error) {
      console.error("Google sign-in error:", error)
      toast({
        title: "Error",
        description: "There was an error signing in with Google. Please try again.",
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    autoCapitalize="none"
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
                    autoComplete="new-password"
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading || isGoogleLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="submitter">Project Submitter</SelectItem>
                    <SelectItem value="verifier">Project Verifier</SelectItem>
                    <SelectItem value="funder">Impact Funder</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
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
        onClick={onGoogleSignIn}
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
          Already have an account?{" "}
          <a
            href="/login"
            className="text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </a>
        </span>
      </div>
    </div>
  )
}
