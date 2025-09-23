import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import { cn } from "@/lib/utils";
import { FC, HtmlHTMLAttributes, ReactNode } from "react";

interface BannerProperties extends HtmlHTMLAttributes<HTMLDivElement> {
  tagTitle?: string;
  heading?: ReactNode;
  description?: string;
  action?: ReactNode;
  image?: string;
  asChild?: boolean;
  showSalesTag?: boolean;
}

export const BlackFridayReusableBanner: FC<BannerProperties> = ({
  heading,
  tagTitle,
  description,
  action,
  image,
  asChild = false,
  showSalesTag = false,
  children,
  className,
}) => {
  return (
    <section
      className={cn(
        `relative flex flex-col-reverse items-center justify-between overflow-hidden rounded-[12px] bg-black bg-[url(/images/black-friday-bg.svg)] bg-cover bg-right p-8 !text-white lg:min-h-[500px] lg:gap-20`,
        `md:px-8`,
        `lg:flex-row lg:px-15`,
        className,
      )}
    >
      {asChild ? (
        children
      ) : (
        <div className={`w-full max-w-[457px] flex-1`}>
          <p className={`!text-mid-grey-I !text-lg italic`}>{tagTitle}</p>
          {heading}
          <p className={`!text-mid-grey-I my-[22px] !text-lg font-[300] lg:!text-lg`}>{description}</p> {action}
        </div>
      )}

      <div className={cn(`mb-4 w-full flex-1 lg:block`, `lg:mb-0`)}>
        <BlurImage
          src={image || ""}
          alt="wheel"
          width={600}
          height={420}
          className="w-[600px] object-contain lg:h-[420px]"
        />
      </div>
      {showSalesTag && (
        <BlurImage
          src={"/images/big-sale-tag.svg"}
          alt="wheel"
          width={244}
          height={323}
          className="animate-swing absolute top-0 right-15 h-[80px] w-[80px] object-contain lg:h-[244px] lg:w-[323px]"
        />
      )}
    </section>
  );
};
