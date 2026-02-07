import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function PostalCodeNotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">Código postal não encontrado</h1>
      <p className="text-muted-foreground">
        O código postal pesquisado não existe ou tem um formato inválido.
      </p>
      <Button render={<Link href="/" />}>Voltar à pesquisa</Button>
    </div>
  );
}
