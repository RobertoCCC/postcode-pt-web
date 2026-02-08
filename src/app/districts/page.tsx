import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { listDistricts } from "@/lib/api";

export const metadata = {
  title: "Distritos — postcode-pt",
  description: "Lista dos 29 distritos portugueses.",
};

export default async function DistrictsPage() {
  const districts = await listDistricts();
  const sorted = [...districts].sort((a, b) => a.name.localeCompare(b.name, "pt"));

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Distritos</h1>
        <p className="text-muted-foreground">
          {districts.length} distritos portugueses. Seleciona um para ver os concelhos.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {sorted.map((d) => (
          <li key={d.code}>
            <Link
              href={`/districts/${d.code}`}
              className="group flex items-center justify-between rounded-lg border px-4 py-3 transition-colors hover:bg-accent"
            >
              <span className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground">{d.code}</span>
                <span className="font-medium">{d.name}</span>
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
