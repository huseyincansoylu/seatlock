import { z } from 'zod';

export const venueSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  city: z.string(),
  address: z.string(),
  createdAt: z.iso.datetime(),
});

export type Venue = z.infer<typeof venueSchema>;
