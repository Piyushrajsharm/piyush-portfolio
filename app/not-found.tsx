import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center px-6 py-20">
      <div className="noise-layer" aria-hidden="true" />
      <section className="glass-panel max-w-2xl p-8 text-center">
        <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-[8px] border border-white/15 bg-white/10">
          <Compass className="h-6 w-6 text-cyan-200" aria-hidden="true" />
        </div>
        <p className="text-sm uppercase text-cyan-200">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-balance md:text-5xl">
          This part of the portfolio has not launched yet.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
          The main experience is still available. Head back to the introduction and keep exploring.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
        </Button>
      </section>
    </main>
  );
}
