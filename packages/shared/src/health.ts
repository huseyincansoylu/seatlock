import { z } from 'zod';

export const dependencyStatusSchema = z.enum(['up', 'down']);

export const healthResponseSchema = z.object({
  status: z.enum(['ok', 'error']),
  timestamp: z.iso.datetime(),
  checks: z.object({
    database: dependencyStatusSchema,
    redis: dependencyStatusSchema,
  }),
});

export type DependencyStatus = z.infer<typeof dependencyStatusSchema>;
export type HealthResponse = z.infer<typeof healthResponseSchema>;
