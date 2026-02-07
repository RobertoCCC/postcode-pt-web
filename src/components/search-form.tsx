"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { normalizePostalCode } from "@/lib/api";

export function SearchForm() {
  const router = useRouter();
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizePostalCode(value);
    if (!normalized) {
      setError("Formato inválido. Usa 7 dígitos (ex: 1100-038).");
      return;
    }
    setError(null);
    router.push(`/postal-codes/${normalized.cp4}-${normalized.cp3}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
      <div className="flex gap-2">
        <Input
          name="postal-code"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="1100-038"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Código postal"
          aria-invalid={error ? true : undefined}
          className="text-base"
        />
        <Button type="submit">
          <Search className="h-4 w-4" />
          Pesquisar
        </Button>
      </div>
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </form>
  );
}
