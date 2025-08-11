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
      className={`my-[78px] flex flex-col-reverse items-center justify-between gap-4 rounded-lg bg-[#FFF9F2] p-8 lg:flex-row lg:px-[62px] lg:py-[64px]`}
    >
      <div className={`max-w-[456px]`}>
        <Badge variant={`default`} className={`bg-accent rounded-md px-[12px] py-[6px]`}>
          {t("badge")}
        </Badge>
        <h1>{t("title")}</h1>
        <p className={`my-[22px] text-2xl`}>{t("description")}</p>

        <SpinToWinModal>
          <Button size={`xl`} variant={`default`} className={`bg-black text-white`}>
            {t("action")}
          </Button>
        </SpinToWinModal>
      </div>
      <div>
        <Image src="/images/wheel.svg" alt="wheel" height={419} width={479} />
      </div>
    </section>
  );
};

export default PlayToWinBanner;
