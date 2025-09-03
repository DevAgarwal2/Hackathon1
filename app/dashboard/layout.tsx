import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SidebarClient } from "@/component/sidebar-client"
import { requireAuth } from "../lib/session"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await requireAuth()
  return (
    <SidebarProvider>
      <SidebarClient
       user={{
        email: session.user.email,
        name: session.user.name,
        avatar: session.user.image ?? "/default-avatar.png",
      }}
      />
      <SidebarInset>
      <main className="p-6 space-y-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
