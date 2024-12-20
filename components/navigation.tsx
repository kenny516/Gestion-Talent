"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, Bot, HandCoins, UserCircle2, Bell, BookPlus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { ModeToggle } from "./theme/toggel";

const routes = [
  {
    title: "Assistant",
    href: "/front-office/chat",
    icon: Bot,
    submenu: [
      {
        title: "Chat assistant",
        href: "/front-office/chat",
      },
    ],
  },
  {
    title: "Postuler",
    href: "/front-office/postuler",
    icon: BookPlus,
    submenu: [], // Sous-menu vide
  },
  {
    title: "Notification",
    href: "/front-office/notification",
    icon: Bell,
    submenu: [], // Sous-menu vide
  },
];

export function Navigation() {
    
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b w-full bg-background z-30">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/front-office/" className="text-xl font-bold flex gap-4 justify-center items-center">
              <UserCircle2 className="h-8 w-8" />
              RH-FRONT
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
                {route.submenu.length > 0 && (
                  <div className="absolute z-50 left-0 hidden pt-2 group-hover:block">
                    <div className="w-48 rounded-md border bg-popover p-2 shadow-md flex justify-center">
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
                )}
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
                    {route.submenu.length > 0 && (
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
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
