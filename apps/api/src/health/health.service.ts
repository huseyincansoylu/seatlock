import { Inject, Injectable } from '@nestjs/common';
import type { DependencyStatus, HealthResponse } from '@seatlock/shared';
import { Redis } from 'ioredis';
import { Pool } from 'pg';
import { PG_POOL } from '../database/database.module.js';
import { REDIS } from '../redis/redis.module.js';

const CHECK_TIMEOUT_MS = 2_000;

@Injectable()
export class HealthService {
  constructor(
    @Inject(PG_POOL) private readonly pool: Pool,
    @Inject(REDIS) private readonly redis: Redis,
  ) {}

  async check(): Promise<HealthResponse> {
    const [database, redis] = await Promise.all([
      this.probe(() => this.pool.query('SELECT 1')),
      this.probe(() => this.redis.ping()),
    ]);

    return {
      status: database === 'up' && redis === 'up' ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      checks: { database, redis },
    };
  }

  private async probe(fn: () => Promise<unknown>): Promise<DependencyStatus> {
    try {
      await Promise.race([
        fn(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Health check timed out')), CHECK_TIMEOUT_MS),
        ),
      ]);
      return 'up';
    } catch {
      return 'down';
    }
  }
}
