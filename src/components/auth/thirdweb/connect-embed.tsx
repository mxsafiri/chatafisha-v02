"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConnectEmbed } from "@thirdweb-dev/react";
import { InAppWallet, CoinbaseWallet, MetaMaskWallet, WalletConnect } from "@thirdweb-dev/wallets";
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
            onLogin={async (token: string) => {
              console.log("Logging in with token:", token);
              const success = await login({ token }, selectedRole);
              if (success) {
                await handleSuccess();
              }
            }}
            onLogout={async () => {
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
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        By connecting, you agree to our Terms of Service and Privacy Policy
      </CardFooter>
    </Card>
  );
}
