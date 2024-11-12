"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
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
      url: "/talent/identification",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "Internal Search", url: "/talent/identification/search" },
        { title: "candidat", url: "/talent/identification/candidats" },
        { title: "employe", url: "/talent/identification/employees" },
        { title: "poste", url: "/talent/identification/postes" },
      ],
    },
    {
      title: "Acquisition",
      url: "/talent/acquisition",
      icon: Bot,
      items: [
        { title: "Job Posting", url: "/talent/acquisition/posting" },
        { title: "Application Form", url: "/talent/acquisition/apply" },
        { title: "Offre Embauche", url: "/talent/acquisition/offreEmbauche" },
      ],
    },
    {
      title: "Development",
      url: "/talent/development",
      icon: BookOpen,
      items: [
        { title: "Evaluate", url: "/talent/development/evaluate" },
        { title: "Filter", url: "/talent/development/filter" },
        { title: "Contract", url: "/talent/development/contract" },
        { title: "note", url: "/talent/development/note" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
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
