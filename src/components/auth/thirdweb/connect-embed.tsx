"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConnectEmbed } from "thirdweb/react";
import { createWallet, inAppWallet, coinbaseWallet, metamaskWallet, walletConnect } from "thirdweb/wallets";
import { client } from "@/lib/thirdweb/client";
import { generatePayload, isLoggedIn, login, logout } from "@/actions/auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { UserRole } from "@/types";

interface ThirdwebConnectProps {
  title?: string;
  description?: string;
  redirectUrl?: string;
}

export default function ThirdwebConnect({
  title = "Sign in to Chatafisha",
  description = "Connect your wallet or use your email to sign in",
  redirectUrl = "/dashboard",
}: ThirdwebConnectProps) {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>("submitter");

  // Configure wallets to display in the ConnectEmbed component
  const wallets = [
    // Email/social login wallet
    inAppWallet({
      auth: {
        options: ["email", "google", "apple", "facebook"],
      },
    }),
    // Popular crypto wallets
    metamaskWallet(),
    coinbaseWallet(),
    walletConnect(),
    // Add more wallets as needed
    createWallet("io.rainbow"),
    createWallet("com.zerion"),
    createWallet("me.trustwallet"),
  ];

  const handleSuccess = async () => {
    toast({
      title: "Success",
      description: "You have been logged in successfully.",
    });
    
    // Redirect based on role
    switch (selectedRole) {
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
        router.push(redirectUrl);
    }
    
    router.refresh();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="role">Select your role</Label>
            <Select 
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value as UserRole)}
            >
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="submitter">Project Submitter</SelectItem>
                <SelectItem value="verifier">Project Verifier</SelectItem>
                <SelectItem value="funder">Project Funder</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <ConnectEmbed
            client={client}
            wallets={wallets}
            modalTitle="Connect to Chatafisha"
            modalTitleIconUrl="/images/logo.png"
            auth={{
              isLoggedIn: async (address) => {
                console.log("Checking if logged in:", { address });
                return await isLoggedIn();
              },
              doLogin: async (params) => {
                console.log("Logging in...");
                const success = await login(params, selectedRole);
                if (success) {
                  await handleSuccess();
                }
              },
              getLoginPayload: async ({ address }) =>
                generatePayload({ address }),
              doLogout: async () => {
                console.log("Logging out...");
                await logout();
                router.push("/");
                router.refresh();
              },
            }}
            theme={{
              colors: {
                primary: "#10b981", // Emerald-500 from Tailwind
                secondary: "#064e3b", // Emerald-900 from Tailwind
                accent: "#34d399", // Emerald-400 from Tailwind
                success: "#10b981", // Emerald-500 from Tailwind
                error: "#ef4444", // Red-500 from Tailwind
              },
              borderRadius: {
                md: "0.375rem", // Match Tailwind's rounded-md
                lg: "0.5rem", // Match Tailwind's rounded-lg
              },
            }}
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        By connecting, you agree to our Terms of Service and Privacy Policy
      </CardFooter>
    </Card>
  );
}
