import { Inject, Injectable } from '@nestjs/common';
import { asc } from 'drizzle-orm';
import { DRIZZLE, type Database } from '../database/database.module.js';
import { venues } from '../database/schema/index.js';

@Injectable()
export class VenuesService {
  constructor(@Inject(DRIZZLE) private readonly db: Database) {}

  findAll() {
    return this.db.select().from(venues).orderBy(asc(venues.name));
  }
}
