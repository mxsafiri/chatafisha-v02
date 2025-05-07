"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConnectWallet } from "@thirdweb-dev/react";
import { login, logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { UserRole } from "@/types";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Settings, 
  LogOut, 
  ClipboardList, 
  CheckSquare, 
  BarChartHorizontal,
  PlusCircle,
  Users,
  ChevronDown
} from "lucide-react";

interface ThirdwebConnectButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  showRoleSelector?: boolean;
}

export default function ThirdwebConnectButton({
  variant = "default",
  size = "default",
  className = "",
  showRoleSelector = true,
}: ThirdwebConnectButtonProps) {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>("submitter");
  const [showingRoleSelector, setShowingRoleSelector] = useState(false);

  // Get role badge color
  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case "verifier":
        return "secondary";
      case "admin":
        return "destructive";
      case "funder":
        return "purple";
      case "submitter":
      default:
        return "default";
    }
  };

  // Configure wallets to display in the ConnectButton component
  const wallets = [
    // Email/social login wallet
    inAppWallet({
      auth: {
        options: ["email", "google", "apple", "facebook"],
      },
    }),
    // Popular crypto wallets
    createWallet("io.metamask", { recommended: true }),
    createWallet("com.coinbase.wallet"),
    createWallet("com.walletconnect"),
    // Add more wallets as needed
    createWallet("me.rainbow"),
    createWallet("me.zerion"),
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
        router.push("/dashboard");
    }
    
    router.refresh();
  };

  // Role selection component
  const RoleSelector = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
        >
          <Badge variant={getRoleBadgeVariant(selectedRole)}>
            {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
          </Badge>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select Your Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup 
          value={selectedRole} 
          onValueChange={(value) => setSelectedRole(value as UserRole)}
        >
          <DropdownMenuRadioItem value="submitter">
            <ClipboardList className="mr-2 h-4 w-4" />
            <span>Project Submitter</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="verifier">
            <CheckSquare className="mr-2 h-4 w-4" />
            <span>Project Verifier</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="funder">
            <BarChartHorizontal className="mr-2 h-4 w-4" />
            <span>Project Funder</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="admin">
            <Users className="mr-2 h-4 w-4" />
            <span>Administrator</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="flex items-center gap-2">
      {showRoleSelector && !showingRoleSelector && <RoleSelector />}
      
      <ConnectWallet
        theme="dark"
        modalTitle="Connect to Chatafisha"
        modalTitleIconUrl="/images/logo.png"
        btnTitle="Connect"
        onModalOpen={() => setShowingRoleSelector(true)}
        onModalClose={() => setShowingRoleSelector(false)}
        auth={{
          loginOptional: false,
          onLogin: async (token) => {
            console.log("Logging in with token", { token });
            await login(token);
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
            accentText: "#10b981", // Emerald-500 from Tailwind
            accentButtonBg: "#064e3b", // Emerald-900 from Tailwind
            primaryButtonBg: "#34d399", // Emerald-400 from Tailwind
            success: "#10b981", // Emerald-500 from Tailwind
            danger: "#ef4444", // Red-500 from Tailwind
          },
          borderRadius: {
            md: "0.375rem", // Match Tailwind's rounded-md
            lg: "0.5rem", // Match Tailwind's rounded-lg
          },
        }}
        // Render a custom button
        renderButton={({ 
          openModal, 
          isOpen, 
          isConnected, 
          address, 
          isConnecting, 
          isDisconnecting 
        }: {
          openModal: () => void;
          isOpen: boolean;
          isConnected: boolean;
          address?: string;
          isConnecting: boolean;
          isDisconnecting: boolean;
        }) => {
          if (isConnected && address) {
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={variant} size={size} className={`${className} flex items-center gap-1`}>
                    <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    <BarChartHorizontal className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={async () => {
                      await logout();
                      router.push("/");
                      router.refresh();
                      toast({
                        title: "Logged out",
                        description: "You have been logged out successfully.",
                      });
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }
          
          return (
            <Button 
              variant={variant} 
              size={size} 
              className={className}
              onClick={openModal}
              disabled={isConnecting || isDisconnecting}
            >
              {isConnecting ? "Connecting..." : "Connect"}
            </Button>
          );
        }}
      />
    </div>
  );
}
