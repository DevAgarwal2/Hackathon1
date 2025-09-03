"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import { NavUser } from "./nav-user"

const navData = [
  {
    title: "Main",
    items: [
      { title: "Home", url: "/dashboard" },
      { title: "Create", url: "/dashboard/create" },
      { title: "AI Tools", url: "/dashboard/tools" },
    ],
  },
]

export function SidebarClient({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: { email: string; name: string; avatar: string }
}) {
  const pathname = usePathname()

  return (
    <Sidebar {...props}>
      <SidebarHeader>PhotoAI Hackathon</SidebarHeader>

      <SidebarContent>
        {navData.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                    >
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
