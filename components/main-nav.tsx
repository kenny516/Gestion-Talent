"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Talent Identification",
    href: "/talent/identification",
    children: [
      { title: "Profile Requirements", href: "/talent/identification/requirements" },
      { title: "Internal Search", href: "/talent/identification/search" },
    ],
  },
  {
    title: "Talent Acquisition",
    href: "/talent/acquisition",
    children: [
      { title: "Job Posting", href: "/talent/acquisition/posting" },
      { title: "Application", href: "/talent/acquisition/apply" },
    ],
  },
  {
    title: "Talent Development",
    href: "/talent/development",
    children: [
      /*{ title: "Evaluation", href: "/talent/development/evaluation" },
      { title: "Filtering", href: "/talent/development/filtering" },
      { title: "Interviews", href: "/talent/development/interviews" },*/
      { title: "Contract", href: "/talent/development/contract" },
    ],
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-6">
      {navItems.map((item) => (
        <div key={item.href} className="relative group">
          <Link
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href ? "text-primary" : "text-muted-foreground"
            )}
          >
            {item.title}
          </Link>
          <div className="absolute left-0 top-full hidden group-hover:block z-50">
            <div className="pt-2">
              <div className="bg-slate-400 rounded-md shadow-lg border p-2 space-y-2">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "block px-4 py-2 text-sm rounded-md hover:bg-muted",
                      pathname === child.href ? "bg-muted" : ""
                    )}
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </nav>
  )
}