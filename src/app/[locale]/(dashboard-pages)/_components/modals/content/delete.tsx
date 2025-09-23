import SkiButton from "@/components/shared/button";
import Image from "next/image";

export const Delete = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <section className="flex flex-col items-center justify-center gap-[20px] text-center">
      <div>
        <Image src="/icons/dashboard/error.png" width={102} height={102} alt="error" />
      </div>
      <div>
        <h3 className="text-high-grey-III text-[20px] lg:text-[26px]">{title}</h3>
        <p className="text-[14px] lg:text-[16px]">{desc}</p>
      </div>
      {/* CTA */}
      <section className="mt-[30px] flex w-full items-center justify-center gap-[20px]">
        <SkiButton size="lg" className="border-mid-danger text-mid-danger w-full rounded-full" variant="outline">
          Cancel
        </SkiButton>
        <SkiButton size="lg" className="w-full rounded-full" variant="primary">
          Delete
        </SkiButton>
      </section>
    </section>
  );
};
