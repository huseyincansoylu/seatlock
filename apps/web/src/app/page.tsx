import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-5xl font-bold tracking-tight">Seatlock</h1>
      <p className="text-lg text-neutral-500">Find your event. Lock your seat.</p>
      <Link href="/venues" className="mt-4 rounded-md bg-black px-4 py-2 text-white">
        Browse venues
      </Link>
    </main>
  );
}
