import { useQuery } from "@tanstack/react-query";
import { fetchExperiences, fetchRandomMeme } from "../api";
import { Experience } from "../types/types";
import { Meme } from "../types";

export function useMeme() {
  return useQuery({
    queryKey: ["meme"],
    queryFn: fetchRandomMeme,
    select: (data: Meme) => data,
  });
}
