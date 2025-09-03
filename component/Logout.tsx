"use client"
import { signOut } from "@/app/lib/auth-client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  
  return (
    <Button 
      onClick={async () => {
        await signOut();
        router.push("/login");
      }}
      className="w-full flex items-center"
    >
      <LogOut className="mr-2 size-4" />
      Logout
    </Button>
  );
}