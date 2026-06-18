import { useQuery } from "@tanstack/react-query";
import { Meme } from "../types";
import { fetchKayneQuote } from "../api";

export function useKanye() {
  return useQuery({
    queryKey: ["quote_kanye"],
    queryFn: fetchKayneQuote,
    select: (data: { quote: string }) => data,
  });
}
