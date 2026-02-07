export type DistrictBrief = {
  code: string;
  name: string;
};

export type MunicipalityBrief = {
  code: string;
  name: string;
};

export type MunicipalityWithDistrict = MunicipalityBrief & {
  district: DistrictBrief;
};

export type LocalityBrief = {
  code: string;
  name: string;
};

export type Street = {
  type: string | null;
  name: string | null;
};

export type PostalCodeEntry = {
  code: string;
  designation: string;
  street: Street;
  locality: LocalityBrief;
  municipality: MunicipalityBrief;
  district: DistrictBrief;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://postcode-pt.onrender.com/v1";

async function request<T>(path: string, init?: RequestInit & { revalidate?: number }): Promise<T> {
  const { revalidate, ...rest } = init ?? {};
  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    next: revalidate !== undefined ? { revalidate } : undefined,
  });
  if (!res.ok) {
    throw new ApiError(`Request failed: ${res.status}`, res.status);
  }
  return res.json() as Promise<T>;
}

export function normalizePostalCode(raw: string): { cp4: string; cp3: string } | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length !== 7) return null;
  return { cp4: digits.slice(0, 4), cp3: digits.slice(4) };
}

export async function getPostalCode(cp4: string, cp3: string): Promise<PostalCodeEntry[]> {
  return request<PostalCodeEntry[]>(`/postal-codes/${cp4}-${cp3}`, { revalidate: 86400 });
}

export async function listDistricts(): Promise<DistrictBrief[]> {
  return request<DistrictBrief[]>("/districts", { revalidate: 86400 });
}

export async function listMunicipalities(districtCode: string): Promise<MunicipalityWithDistrict[]> {
  return request<MunicipalityWithDistrict[]>(`/districts/${districtCode}/municipalities`, {
    revalidate: 86400,
  });
}
