import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface LogoProperties extends HTMLAttributes<HTMLImageElement> {
  width?: number;
  height?: number;
  className?: string;
  link?: string;
}

export const Logo = ({ width, height, className, link = "/seller" }: LogoProperties) => {
  return (
    <Link href={link} className="" data-testid="logo">
      <div className={cn(`mt-1 flex w-full items-center justify-end`)}></div>
      <Image priority src={""} alt="hris" width={width} height={height} className={cn("object-contain", className)} />
    </Link>
  );
};
