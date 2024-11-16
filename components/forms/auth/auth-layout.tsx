"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/theme/toggel";


interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl w-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative hidden lg:block"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl" />
        <Image
          src="/img/imageAuth.jpg"
          alt="Office workspace"
          width={800}
          height={1000}
          className="rounded-3xl object-cover h-[600px]"
        />
        <div className="absolute inset-0 flex items-end p-8">
          <blockquote className="space-y-2">
            <p className="text-lg font-medium text-white">
              "Trouvez votre prochain défi professionnel et rejoignez une équipe
              passionnée."
            </p>
            <footer className="text-sm text-white/80">
              Notre plateforme de recrutement
            </footer>
          </blockquote>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-2xl">{children}</Card>
      </motion.div>
      <div className="absolute bottom-4 right-4">
        <ModeToggle/>
      </div>
    </div>
  );
}
