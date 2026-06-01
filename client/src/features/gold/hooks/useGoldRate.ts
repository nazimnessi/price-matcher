import { useQuery } from "@tanstack/react-query";
import { fetchKozhikodeGoldRate } from "../api";

export const useGoldRate = () => {
  return useQuery({
    queryKey: ["gold", "kozhikode"],
    queryFn: fetchKozhikodeGoldRate,
    refetchInterval: false,
    retry: 1,
  });
};
