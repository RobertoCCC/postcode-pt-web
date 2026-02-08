import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ApiError, listDistricts, listMunicipalities } from "@/lib/api";

type Params = { code: string };

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { code } = await params;
  const districts = await listDistricts();
  const district = districts.find((d) => d.code === code);
  if (!district) return { title: "Distrito não encontrado — postcode-pt" };
  return {
    title: `${district.name} — postcode-pt`,
    description: `Concelhos do distrito de ${district.name}.`,
  };
}

export default async function DistrictPage({ params }: { params: Promise<Params> }) {
  const { code } = await params;
  if (!/^\d{2}$/.test(code)) notFound();

  const districts = await listDistricts();
  const district = districts.find((d) => d.code === code);
  if (!district) notFound();

  let municipalities;
  try {
    municipalities = await listMunicipalities(code);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  const sorted = [...municipalities].sort((a, b) => a.name.localeCompare(b.name, "pt"));

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12">
      <Link
        href="/districts"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Todos os distritos
      </Link>

      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">{district.name}</h1>
        <p className="text-muted-foreground">
          {municipalities.length} {municipalities.length === 1 ? "concelho" : "concelhos"}
          {" · código "}
          <span className="font-mono">{district.code}</span>
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {sorted.map((m) => (
          <li
            key={m.code}
            className="flex items-center justify-between rounded-lg border px-4 py-3"
          >
            <span className="font-medium">{m.name}</span>
            <span className="font-mono text-xs text-muted-foreground">{m.code}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
