import Image from "next/image";

export const Success = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <section className="flex flex-col items-center justify-center gap-[20px] text-center">
      <div>
        <Image src="/icons/dashboard/success.png" width={102} height={102} alt="error" />
      </div>
      <div>
        <h3 className="text-high-grey-III text-[20px] lg:text-[26px]">{title}</h3>
        <p className="text-[14px] lg:text-[16px]">{desc}</p>
      </div>
    </section>
  );
};
