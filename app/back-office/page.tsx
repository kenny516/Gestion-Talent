// app/(backoffice)/page.tsx
import { Card } from "@/components/ui/card";
import {
  CircleUserRound,
  FileText,
  PieChart,
  Settings,
  Users,
  Briefcase,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function BackofficeHome() {
  const menuItems = [
    {
      title: "Employees",
      description: "Manage employee profiles and information",
      icon: <Users className="w-8 h-8" />,
      href: "/employees",
    },
    {
      title: "Attendance",
      description: "Track attendance and time-off requests",
      icon: <Calendar className="w-8 h-8" />,
      href: "/attendance",
    },
    {
      title: "Documents",
      description: "Handle employee documents and contracts",
      icon: <FileText className="w-8 h-8" />,
      href: "/documents",
    },
    {
      title: "Analytics",
      description: "View HR metrics and reports",
      icon: <PieChart className="w-8 h-8" />,
      href: "/analytics",
    },
    {
      title: "Recruitment",
      description: "Manage job postings and applications",
      icon: <Briefcase className="w-8 h-8" />,
      href: "/recruitment",
    },
    {
      title: "Settings",
      description: "Configure system preferences",
      icon: <Settings className="w-8 h-8" />,
      href: "/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <CircleUserRound className="w-12 h-12 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">HR Dashboard</h1>
            <p className="text-gray-500">Bienvenue, Admin</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link href={item.href} key={item.title}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {item.title}
                    </h2>
                    <p className="text-gray-500 mt-1">{item.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}