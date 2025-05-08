"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types";

// Dynamically import ThirdWeb components to prevent build errors
let ConnectEmbed: any;
let InAppWallet: any;
let CoinbaseWallet: any;
let MetaMaskWallet: any;
let WalletConnect: any;
let client: any;
let hasThirdwebConfig: boolean = false;
let hasAuthConfig: boolean = false;
let login: any;
let logout: any;

// Check if we're in the browser environment
if (typeof window !== "undefined") {
  // Import ThirdWeb components on the client side only
  import("@thirdweb-dev/react").then(mod => { ConnectEmbed = mod.ConnectEmbed })
    .catch(err => console.error("Failed to load ThirdWeb ConnectEmbed:", err));
    
  import("@thirdweb-dev/wallets").then(mod => { 
    InAppWallet = mod.InAppWallet;
    CoinbaseWallet = mod.CoinbaseWallet;
    MetaMaskWallet = mod.MetaMaskWallet;
    WalletConnect = mod.WalletConnect;
  }).catch(err => console.error("Failed to load ThirdWeb wallets:", err));
    
  import("@/lib/thirdweb/client").then(mod => { 
    client = mod.client; 
    hasThirdwebConfig = mod.hasThirdwebConfig;
  }).catch(err => console.error("Failed to load ThirdWeb client:", err));
    
  import("@/actions/auth").then(mod => { 
    login = mod.login; 
    logout = mod.logout;
    hasAuthConfig = mod.hasAuthConfig;
  }).catch(err => console.error("Failed to load auth actions:", err));
}

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
  const [isLoading, setIsLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(false);

  // Check if ThirdWeb is configured when component mounts on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Short timeout to allow dynamic imports to complete
      const timer = setTimeout(() => {
        setIsConfigured(hasThirdwebConfig && hasAuthConfig && Boolean(client));
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  // Configure wallets to display in the ConnectEmbed component
  const getWallets = () => {
    if (!InAppWallet || !MetaMaskWallet || !CoinbaseWallet || !WalletConnect) {
      return [];
    }

    return [
      // Email/social login wallet
      new InAppWallet({
        auth: {
          options: ["email", "google", "apple", "facebook"],
        },
      }),
      // Popular crypto wallets
      new MetaMaskWallet(),
      new CoinbaseWallet(),
      new WalletConnect(),
    ];
  };

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

  // Placeholder UI when configuration is missing
  if (!isConfigured && !isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Authentication is currently unavailable</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6 text-center">
            <p className="text-yellow-600 dark:text-yellow-400">ThirdWeb authentication configuration is missing or incomplete.</p>
            <div className="flex flex-col gap-4">
              <Button onClick={() => router.push('/')} variant="outline">Return to Home</Button>
              <Button onClick={() => router.push('/impact-explorer')} variant="default">Browse Projects</Button>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          You can still browse all projects without signing in
        </CardFooter>
      </Card>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Loading authentication system...</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex justify-center items-center py-8">
            <div className="h-8 w-8 rounded-full border-4 border-t-transparent border-primary animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Main authentication UI when configured properly
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
          
          {ConnectEmbed && client && (
            <ConnectEmbed
              client={client}
              wallets={getWallets()}
              modalTitle="Connect to Chatafisha"
              modalTitleIconUrl="/images/logo.png"
              onLogin={async (token: string) => {
                if (!login) return;
                console.log("Logging in with token:", token);
                const success = await login({ token }, selectedRole);
                if (success) {
                  await handleSuccess();
                }
              }}
              onLogout={async () => {
                if (!logout) return;
                console.log("Logging out...");
                await logout();
                router.push("/");
                router.refresh();
              }}
              theme={{
                modalBg: "#ffffff",
                primaryText: "#000000",
                secondaryText: "#064e3b",
                accentText: "#34d399",
                danger: "#ef4444",
                success: "#10b981",
                modalOverlayBg: "rgba(0, 0, 0, 0.5)",
                accentButtonBg: "#34d399",
                accentButtonText: "#ffffff",
                primaryButtonBg: "#10b981",
                primaryButtonText: "#ffffff",
                secondaryButtonBg: "#f3f4f6",
                secondaryButtonText: "#374151",
                connectedButtonBg: "#f3f4f6",
                connectedButtonText: "#374151",
                borderColor: "#e5e7eb",
                separatorLine: "#e5e7eb",
                secondaryButtonHoverBg: "#e5e7eb",
                modalBorder: "#e5e7eb",
                walletSelectorButtonHoverBg: "#f3f4f6",
                connectedButtonBgHover: "#e5e7eb"
              }}
            />
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        By connecting, you agree to our Terms of Service and Privacy Policy
      </CardFooter>
    </Card>
  );
}
