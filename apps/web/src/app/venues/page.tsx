import { Suspense } from 'react';
import { getVenues } from '@/lib/api';

export const metadata = {
  title: 'Venues · Seatlock',
};

export default function VenuesPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Venues</h1>
      <Suspense fallback={<p className="text-neutral-500">Loading venues…</p>}>
        <VenueList />
      </Suspense>
    </main>
  );
}

async function VenueList() {
  const venues = await getVenues();

  if (venues.length === 0) {
    return <p className="text-neutral-500">No venues yet.</p>;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {venues.map((venue) => (
        <li key={venue.id} className="rounded-lg border border-neutral-200 p-4">
          <h2 className="text-lg font-semibold">{venue.name}</h2>
          <p className="text-sm text-neutral-500">{venue.city}</p>
          <p className="mt-2 text-sm">{venue.address}</p>
        </li>
      ))}
    </ul>
  );
}
