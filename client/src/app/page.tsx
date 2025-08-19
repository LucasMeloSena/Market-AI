"use client"

import { useQuery } from "@tanstack/react-query";
import { getCatalog } from "./api/product/get-catalog";

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-catalog"],
    queryFn: () => getCatalog(""),
  });

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Ocorreu um erro ao carregar os dados.</p>;

  return (
    <main className="">
      
    </main>
  );
}
