import Image from "next/image";

interface StrengthProperties {
  title: string;
  description: string;
  image: string;
}

export const ServiceCard = ({ strength }: { strength: StrengthProperties }) => {
  return (
    <section className={`dark:bg-high-grey-II flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-9`}>
      <div className={`relative`}>
        <Image src={strength.image} alt={strength.title} className={``} width={62} height={62} />
      </div>
      <div className={`space-y-4 text-center`}>
        <p className={`text-3xl font-semibold`}>{strength.title}</p>
        <p className={``}>{strength.description}</p>
      </div>
    </section>
  );
};
