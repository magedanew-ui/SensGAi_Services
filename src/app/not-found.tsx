import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-20">
      <h1 className="text-3xl font-semibold">Seite nicht gefunden</h1>
      <p className="mt-4">الصفحة غير موجودة</p>
      <p className="mt-6">
        <Link href="/de">Zur Startseite</Link>
      </p>
    </main>
  );
}
