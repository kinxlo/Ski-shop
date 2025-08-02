"use client";

import { useLocalePersistence } from "@/hooks/use-locale-persistence";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export default function TestLocalePage() {
  const locale = useLocale();
  const pathname = usePathname();
  const { currentLocale, changeLocale } = useLocalePersistence();

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Locale Test Page</h1>

      <div className="space-y-4">
        <div>
          <strong>Current Locale (useLocale):</strong> {locale}
        </div>
        <div>
          <strong>Current Locale (hook):</strong> {currentLocale}
        </div>
        <div>
          <strong>Current Pathname:</strong> {pathname}
        </div>

        <div className="mt-6">
          <h2 className="mb-2 text-lg font-semibold">Test Locale Changes:</h2>
          <div className="space-x-2">
            <button onClick={() => changeLocale("en")} className="rounded bg-blue-500 px-4 py-2 text-white">
              Switch to English
            </button>
            <button onClick={() => changeLocale("fr")} className="rounded bg-blue-500 px-4 py-2 text-white">
              Switch to French
            </button>
            <button onClick={() => changeLocale("es")} className="rounded bg-blue-500 px-4 py-2 text-white">
              Switch to Spanish
            </button>
            <button onClick={() => changeLocale("ar")} className="rounded bg-blue-500 px-4 py-2 text-white">
              Switch to Arabic
            </button>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="mb-2 text-lg font-semibold">Navigation Test:</h2>
          <div className="space-x-2">
            <a href="/en/shop" className="inline-block rounded bg-green-500 px-4 py-2 text-white">
              Go to Shop (EN)
            </a>
            <a href="/fr/shop" className="inline-block rounded bg-green-500 px-4 py-2 text-white">
              Go to Shop (FR)
            </a>
            <a href="/es/shop" className="inline-block rounded bg-green-500 px-4 py-2 text-white">
              Go to Shop (ES)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
