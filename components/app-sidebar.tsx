"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Save,
  Settings2,
  User,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { LogoApp } from "@/components/logo-app";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Humain",
      url: "/back-office/talent/identification",
      icon: User,
      isActive: true,
      items: [
        { title: "Internal Search", url: "/back-office/talent/identification/search" },
        { title: "candidat", url: "/back-office/talent/identification/candidats" },
        { title: "employe", url: "/back-office/talent/identification/employees" },
        { title: "poste", url: "/back-office/talent/identification/postes" },
      ],
    },
    {
      title: "Acquisition",
      url: "/back-office/talent/acquisition",
      icon: Save,
      items: [
        { title: "Job Posting", url: "/back-office/talent/acquisition/posting" },
        { title: "Application Form", url: "/back-office/talent/acquisition/apply" },
        { title: "Offre Embauche", url: "/back-office/talent/acquisition/offreEmbauche" },
      ],
    },
    {
      title: "Development",
      url: "/back-office/talent/development",
      icon: BookOpen,
      items: [
        { title: "Evaluate", url: "/back-office/talent/development/evaluate" },
        { title: "Filter", url: "/back-office/talent/development/filter" },
        { title: "Contract", url: "/back-office/talent/development/contract" },
        { title: "note", url: "/back-office/talent/development/note" },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoApp />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
