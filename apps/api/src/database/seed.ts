import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { venues, type NewVenue } from './schema/index.js';

try {
  process.loadEnvFile();
} catch {
  // No .env file: rely on variables from the environment.
}

if (process.env.NODE_ENV === 'production') {
  throw new Error('Refusing to seed a production database.');
}

const seedVenues: NewVenue[] = [
  { name: 'Zorlu PSM', city: 'İstanbul', address: 'Levazım, Koru Sk. No:2, Beşiktaş' },
  { name: 'Volkswagen Arena', city: 'İstanbul', address: 'Huzur, Uniq İstanbul, Sarıyer' },
  { name: 'CerModern', city: 'Ankara', address: 'Altınsoy Cd. No:3, Altındağ' },
  { name: 'İzmir Arena', city: 'İzmir', address: 'Kültürpark, Konak' },
];

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool });

await db.transaction(async (tx) => {
  await tx.delete(venues);
  await tx.insert(venues).values(seedVenues);
});

console.log(`Seeded ${seedVenues.length} venues.`);
await pool.end();
