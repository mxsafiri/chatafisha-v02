"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useUser, UserType } from "@/components/providers/user-provider"

const userProfiles = [
  {
    value: "submitter",
    label: "Project Owner",
    description: "Create and manage impact projects"
  },
  {
    value: "verifier",
    label: "Verifier",
    description: "Verify impact claims and project data"
  },
  {
    value: "funder",
    label: "Funder",
    description: "Browse and fund impact projects"
  },
  {
    value: "admin",
    label: "Admin",
    description: "Manage platform and users"
  },
]

export function UserProfileSwitcher() {
  const [open, setOpen] = useState(false)
  const [currentProfile, setCurrentProfile] = useState(userProfiles[0])
  
  // Get user context
  const userContext = useUser()
  
  // Debug output
  useEffect(() => {
    console.log("User Context:", userContext)
  }, [userContext])
  
  // Update current profile when userType changes
  useEffect(() => {
    if (userContext) {
      const profile = userProfiles.find(
        profile => profile.value === userContext.userType
      )
      if (profile) {
        setCurrentProfile(profile)
      }
    }
  }, [userContext])
  
  const handleProfileSelect = (value: string) => {
    if (userContext) {
      userContext.setUserType(value as UserType)
      
      const profile = userProfiles.find(p => p.value === value)
      if (profile) {
        setCurrentProfile(profile)
      }
      
      setOpen(false)
      
      // Force a refresh to ensure the dashboard updates
      window.location.reload()
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between md:w-[200px] lg:w-[250px]"
        >
          {currentProfile?.label || "Select profile..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 md:w-[200px] lg:w-[250px]">
        <Command>
          <CommandInput placeholder="Search profiles..." />
          <CommandEmpty>No profile found.</CommandEmpty>
          <CommandGroup>
            {userProfiles.map((profile) => (
              <CommandItem
                key={profile.value}
                value={profile.value}
                onSelect={handleProfileSelect}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentProfile.value === profile.value ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex flex-col">
                  <span>{profile.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {profile.description}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
