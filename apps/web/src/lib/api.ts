import { venueSchema, type Venue } from '@seatlock/shared';
import { z } from 'zod';

const API_URL = process.env.API_URL;

async function apiGet<T>(path: string, schema: z.ZodType<T>): Promise<T> {
  if (!API_URL) {
    throw new Error('API_URL environment variable is not set.');
  }
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`GET ${path} failed with status ${res.status}`);
  }
  return schema.parse(await res.json());
}

export function getVenues(): Promise<Venue[]> {
  return apiGet('/venues', z.array(venueSchema));
}
