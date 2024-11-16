"use client"

import * as React from "react"
import { BookUser } from "lucide-react"

import {
  DropdownMenu,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function LogoApp({
}) {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <Link href="/back-office/">
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <BookUser className="size-5" />
              </div>
              <div className="grid flex-1 text-left ml-5 text-sm leading-tight">
                <span className="truncate font-semibold">
                RH-APP
                </span>
              </div>
            </SidebarMenuButton>
          </Link>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
