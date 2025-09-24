import { Input } from "@/components/ui/input";
import Image from "next/image";

import left1 from "~/images/left1.svg";
import right1 from "~/images/right1.svg";
import SkiButton from "../../button";

export const NewsLetter = () => {
  return (
    <main className="bg-primary relative flex h-[258px] items-center justify-center rounded-xl">
      <section className="absolute top-0 left-0">
        <Image src={left1} alt={""} className="w-[50px] md:w-[80px] xl:w-[100px]" />
      </section>

      <section className="mb-4">
        <p className="mb-4 text-center text-xl font-medium !text-white lg:!text-4xl">Subscribe to our newsletter</p>
        <div className="mt-3 lg:mt-7">
          <form action="" className="items-center justify-center gap-3 !p-0 px-4 xl:flex">
            <Input
              type="email"
              placeholder="Email Address"
              className="h-[48px] w-full max-w-full rounded-full text-xs outline-none placeholder:text-xs md:text-base md:placeholder:text-base xl:w-[456px]"
            />
            <div className="text-center">
              <SkiButton className="bg-accent text-background mt-3 w-[178px] rounded-full xl:mt-0">Subscribe</SkiButton>
            </div>
          </form>
        </div>
      </section>

      <section className="absolute right-0 bottom-0">
        <Image src={right1} alt={""} className="w-[50px] md:w-[80px] xl:w-[100px]" />
      </section>
    </main>
  );
};
