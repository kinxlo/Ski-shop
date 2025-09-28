"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { SpinToWinModal } from "../spin-to-win-modal";

const PlayToWinBanner = () => {
  const t = useTranslations("home.playToWin");

  return (
    <section
      className={`bg-accent/20 my-[78px] flex flex-col-reverse items-center justify-between gap-4 rounded-lg p-8 lg:flex-row lg:px-[62px] lg:py-[64px]`}
    >
      <div className={`max-w-[456px]`}>
        <Badge variant={`default`} className={`bg-accent mb-4 rounded-md px-[12px] py-[6px]`}>
          {t("badge")}
        </Badge>
        <h1 className={`!text-foreground !mb-0 text-2xl lg:!text-5xl`}>{t("title")}</h1>
        <p className={`my-[22px] !font-medium md:!text-xl`}>{t("description")}</p>

        <SpinToWinModal autoOpen={false}>
          <Button size={`xl`} variant={`default`} className={`bg-black text-white`}>
            {t("action")}
          </Button>
        </SpinToWinModal>
      </div>
      <div>
        <Image
          priority
          src="https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758671591/skicom/aucizgph1fg1dj4m2nw4.png"
          alt="wheel"
          height={419}
          width={479}
        />
      </div>
    </section>
  );
};

export default PlayToWinBanner;
