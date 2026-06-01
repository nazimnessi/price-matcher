import api from "@/shared/api/apiClient";

export async function fetchKozhikodeGoldRate() {
  const res = await api.get("/gold/kozhikode/");
  return res.data;
}
