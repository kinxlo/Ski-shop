import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import { PayrollLineChart } from "@/components/shared/chart/payrool-linechart";
import { Card, CardTitle } from "@/components/ui/card";

export function SectionTwo() {
  return (
    <section className="grid grid-cols-1 gap-5 py-5 md:grid-cols-12">
      <section className={`col-span-8`}>
        <PayrollLineChart />
      </section>
      <section className={`col-span-4`}>
        <BestSellerLayout />
      </section>
    </section>
  );
}

const BestSellerLayout = () => {
  return (
    <Card className={`h-full border-none p-6 shadow-none`}>
      <CardTitle className="text-lg font-semibold text-gray-800">Best Sellers</CardTitle>
      <section className={`h-[290px] space-y-4 overflow-auto`}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className={`flex items-center justify-between`}>
            <div className={`flex items-center gap-4`}>
              <div className={`flex size-[64px] items-center justify-center bg-black/30`}>
                <BlurImage
                  src={"/images/Apple.png"}
                  alt={"apple"}
                  width={64}
                  height={64}
                  className={`h-fit w-fit object-contain`}
                />
              </div>
              <div>
                <h6 className={`!text-sm font-black`}>Apple Iphone 11</h6>
                <p className={`text-sm text-gray-400`}>N234,000</p>
              </div>
            </div>
            <p className={`text-sm text-gray-600`}>999 sales</p>
          </div>
        ))}
      </section>
    </Card>
  );
};
