import RevenueBySource from "@/components/shared/chart/revenue-by-source";
import { RevenueTrendOveriew } from "@/components/shared/chart/revenue-trend";

export function SectionTwo() {
  return (
    <section className="grid grid-cols-1 gap-5 py-5 md:grid-cols-12">
      <section className={`col-span-12 lg:col-span-8`}>
        <RevenueTrendOveriew />
      </section>
      <section className={`col-span-12 lg:col-span-4`}>
        <RevenueBySource />
      </section>
    </section>
  );
}
