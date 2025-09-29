"use client";

import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";
import { LuLoader } from "react-icons/lu";

export default function Loading({
  showLogo = false,
  text,
  className,
}: {
  showLogo?: boolean;
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center bg-white dark:bg-[#000000]", className)}>
      <div className="flex flex-col items-center gap-2">
        {showLogo && <Logo width={50} height={27} />}
        <div className="flex items-center gap-1">
          <LuLoader className="text-primary animate-spin text-xl" />
          {<p className="text-sm font-medium">{text || "Loading..."}</p>}
        </div>
      </div>
    </div>
  );
}
