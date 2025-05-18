import SkiButton from "@/components/shared/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const PlayToWinBanner = () => {
  return (
    <section
      className={`my-[78px] flex flex-col-reverse items-center justify-between gap-4 rounded-lg bg-[#FFF9F2] px-[62px] py-[64px] lg:flex-row`}
    >
      <div className={`max-w-[456px]`}>
        <Badge variant={`default`} className={`bg-accent rounded-md px-[12px] py-[6px]`}>
          Win Big
        </Badge>
        <h1>Play-2-Win</h1>
        <p className={`my-[22px] text-2xl`}>Enjoy freebies when you participate in our play-2-win</p>
        <SkiButton size={`xl`} variant={`default`} className={`bg-black text-white`}>
          Get The App
        </SkiButton>
      </div>
      <div>
        <Image src="/images/wheel.svg" alt="wheel" height={419} width={479} />
      </div>
    </section>
  );
};

export default PlayToWinBanner;
