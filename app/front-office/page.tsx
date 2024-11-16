import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden pt-16 pb-32">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Trouvez les meilleurs talents tech
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Une plateforme innovante qui combine évaluations techniques, simulations de projets et recrutement intelligent pour connecter les meilleurs talents avec les entreprises visionnaires.
              </p>
              <div className="mt-10 flex gap-4">
                <Button size="lg" asChild>
                  <Link href="/auth/register">Commencer</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/jobs">Explorer les offres</Link>
                </Button>
              </div>
            </div>
            <div >
              <Image
                src="/img/front-image.jpg"
                alt="Team collaboration"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}