import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-12 sm:py-20">
      <header className="flex flex-col gap-3 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Códigos postais de Portugal
        </h1>
        <p className="text-muted-foreground">
          Pesquisa por CP4-CP3 ou explora a hierarquia distrito → concelho → localidade.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Pesquisar código postal</CardTitle>
          <CardDescription>Introduz 7 dígitos (com ou sem hífen).</CardDescription>
        </CardHeader>
        <CardContent>
          <SearchForm />
        </CardContent>
      </Card>

      <Link
        href="/districts"
        className="group flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
      >
        <div>
          <p className="font-medium">Explorar por distrito</p>
          <p className="text-sm text-muted-foreground">29 distritos portugueses</p>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
