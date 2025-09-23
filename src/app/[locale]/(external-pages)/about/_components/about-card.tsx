import { BlurImage } from "@/components/core/miscellaneous/blur-image";

interface StrengthProperties {
  title: string;
  description: string;
  image: string;
}

export const AboutCard = ({ strength }: { strength: StrengthProperties }) => {
  return (
    <section className={`bg-mid-grey-I rounded-xl dark:bg-[#111111]`}>
      <div className={`space-y-4 p-9`}>
        <h3>{strength.title}</h3>
        <p className={`text-mid-grey-II text-lg`}>{strength.description}</p>
      </div>
      <div className={`relative`}>
        <BlurImage src={strength.image} alt={strength.title} className={`w-full`} width={532} height={213} />
      </div>
    </section>
  );
};
