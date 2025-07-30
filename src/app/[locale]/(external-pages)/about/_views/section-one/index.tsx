import Image from "next/image";

export const SectionOne = () => {
  return (
    <section
      className={`my-[78px] flex max-w-[1240px] flex-col-reverse items-center justify-between gap-20 rounded-lg bg-[#FFF9F2] p-8 lg:flex-row lg:px-[62px] lg:py-[64px]`}
    >
      <div className={`flex-1`}>
        <span className={`text-primary font-semibold`}>About Ski-Shop</span>
        <h1 className={`text-high-grey-II`}>The New Face of Digital Commerce in Africa</h1>
        <p className={`my-[22px] text-2xl`}>
          Our mission is to power African commerce by creating a digital marketplace where every seller — from a
          neighborhood vendor to a global brand — can thrive. We provide the tools, visibility, and infrastructure
          needed to make commerce seamless, secure, and scalable.
        </p>
      </div>
      <div className={``}>
        <Image src="/images/about/woman.svg" alt="wheel" height={440} width={455} />
      </div>
    </section>
  );
};
