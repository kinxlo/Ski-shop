import { cn } from "@/lib/utils";
import { Inter, Nunito_Sans, Open_Sans, Poppins, Roboto } from "next/font/google";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fontRoboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

const fontOpenSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const fontNunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});

const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const fontVariables = cn(
  fontInter.variable,
  fontRoboto.variable,
  fontOpenSans.variable,
  fontNunitoSans.variable,
  fontPoppins.variable,
);
