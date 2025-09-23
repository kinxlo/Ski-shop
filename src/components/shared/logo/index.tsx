"use client";

import { LocaleLink } from "@/components/shared/locale-link";
import Image from "next/image";
import { FC } from "react";

type LogoProperties = {
  logo?: string;
  width?: number;
  height?: number;
  className?: string;
};

export const Logo: FC<LogoProperties> = ({ logo = "/images/skicom.svg", width = 89, height = 60, className }) => {
  return (
    <LocaleLink href="/" data-testid="logo" className="">
      {logo ? (
        <Image src={logo} alt="Logo" width={width} height={height} className={className} />
      ) : (
        <p className="text-xl font-bold">LOGO</p>
      )}
    </LocaleLink>
  );
};
