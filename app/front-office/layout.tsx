import "../globals.css";
import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Talent Management System",
  description: "A comprehensive talent management solution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navigation />
      <div className="pt-10">{children}</div>
    </div>
  );
}
