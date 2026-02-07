import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

import { ApiError, getPostalCode, type PostalCodeEntry } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Params = { code: string };

function parseCode(code: string): { cp4: string; cp3: string } | null {
  const match = /^(\d{4})-(\d{3})$/.exec(code);
  if (!match) return null;
  return { cp4: match[1], cp3: match[2] };
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { code } = await params;
  return {
    title: `${code} — postcode-pt`,
    description: `Detalhes do código postal ${code} em Portugal.`,
  };
}

export default async function PostalCodePage({ params }: { params: Promise<Params> }) {
  const { code } = await params;
  const parsed = parseCode(code);
  if (!parsed) {
    notFound();
  }

  let entries: PostalCodeEntry[];
  try {
    entries = await getPostalCode(parsed.cp4, parsed.cp3);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      notFound();
    }
    throw err;
  }

  const first = entries[0];

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar à pesquisa
      </Link>

      <header className="flex flex-col gap-2">
        <h1 className="font-mono text-3xl font-semibold tracking-tight">{code}</h1>
        <p className="text-muted-foreground">
          <Link
            href={`/districts/${first.district.code}`}
            className="hover:text-foreground"
          >
            {first.district.name}
          </Link>
          {" · "}
          {first.municipality.name}
          {" · "}
          {first.locality.name}
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">
          {entries.length === 1 ? "1 entrada" : `${entries.length} entradas`}
        </h2>
        {entries.map((entry, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {entry.designation}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-[8rem_1fr]">
                {entry.street.name ? (
                  <>
                    <dt className="text-muted-foreground">Arruamento</dt>
                    <dd>
                      {[entry.street.type, entry.street.name].filter(Boolean).join(" ")}
                    </dd>
                  </>
                ) : null}
                <dt className="text-muted-foreground">Localidade</dt>
                <dd>{entry.locality.name}</dd>
                <dt className="text-muted-foreground">Concelho</dt>
                <dd>{entry.municipality.name}</dd>
                <dt className="text-muted-foreground">Distrito</dt>
                <dd>
                  <Link
                    href={`/districts/${entry.district.code}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {entry.district.name}
                  </Link>
                </dd>
              </dl>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
