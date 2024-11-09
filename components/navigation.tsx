"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Users,
  UserPlus,
  GraduationCap,
  Menu,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"

const routes = [
  {
    title: "Identification",
    href: "/talent/identification",
    icon: Users,
    submenu: [
      { title: "Profile Requirements", href: "/talent/identification/requirements" },
      { title: "Internal Search", href: "/talent/identification/search" },
    ],
  },
  {
    title: "Acquisition",
    href: "/talent/acquisition",
    icon: UserPlus,
    submenu: [
      { title: "Job Posting", href: "/talent/acquisition/posting" },
      { title: "Application Form", href: "/talent/acquisition/apply" },
    ],
  },
  {
    title: "Development",
    href: "/talent/development",
    icon: GraduationCap,
    submenu: [
      { title: "Evaluate", href: "/talent/development/evaluate" },
      { title: "Filter", href: "/talent/development/filter" },
      { title: "Contract", href: "/talent/development/contract" },
    ],
  },
]

export function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              TMS
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {routes.map((route) => (
              <div key={route.href} className="relative group">
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-center space-x-2",
                    pathname.startsWith(route.href) && "bg-accent"
                  )}
                  asChild
                >
                  <Link href={route.href}>
                    <route.icon className="h-4 w-4" />
                    <span>{route.title}</span>
                  </Link>
                </Button>
                <div className="absolute left-0 hidden pt-2 group-hover:block">
                  <div className="w-48 rounded-md border bg-popover p-2 shadow-md">
                    {route.submenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "block rounded-sm px-3 py-2 text-sm hover:bg-accent",
                          pathname === item.href && "bg-accent"
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col space-y-4">
                {routes.map((route) => (
                  <div key={route.href} className="space-y-2">
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start",
                        pathname.startsWith(route.href) && "bg-accent"
                      )}
                      asChild
                    >
                      <Link href={route.href} onClick={() => setOpen(false)}>
                        <route.icon className="mr-2 h-4 w-4" />
                        {route.title}
                      </Link>
                    </Button>
                    <div className="pl-6 space-y-1">
                      {route.submenu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "block rounded-sm px-3 py-2 text-sm hover:bg-accent",
                            pathname === item.href && "bg-accent"
                          )}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}