import { Global, Inject, Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import type { Env } from '../config/env.js';

export const REDIS = Symbol('REDIS');

const logger = new Logger('Redis');

@Global()
@Module({
  providers: [
    {
      provide: REDIS,
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>) => {
        const redis = new Redis(config.get('REDIS_URL', { infer: true }), {
          connectTimeout: 2_000,
          maxRetriesPerRequest: 1,
        });
        redis.on('error', (err: NodeJS.ErrnoException) =>
          logger.error(`Redis connection error: ${err.message || err.code}`),
        );
        return redis;
      },
    },
  ],
  exports: [REDIS],
})
export class RedisModule implements OnApplicationShutdown {
  constructor(@Inject(REDIS) private readonly redis: Redis) {}

  async onApplicationShutdown() {
    await this.redis.quit();
  }
}
