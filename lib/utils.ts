
export const parsePriceParam = (priceParam?: string) => {

  if (!priceParam) return { min: 0, max: Infinity };
  const [minS, maxS] = priceParam.split("-").map((s) => s.trim());
  const min = Number(minS ?? 0) || 0;
  const max = Number(maxS ?? Infinity) || Infinity;
  return { min, max };
};

export const buildQuery = (params: Record<string, string | undefined>) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") searchParams.set(k, v);
  });
  const s = searchParams.toString();
  return s ? "?" + s : "";
};
