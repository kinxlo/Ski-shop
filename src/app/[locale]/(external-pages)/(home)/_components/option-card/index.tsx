import { ReactNode } from "react";

export const OptioinCard = ({ title, description, icon }: { title: string; description: string; icon: ReactNode }) => {
  return (
    <section className={`flex flex-col items-center justify-center gap-4 text-center`}>
      <div className={`bg-mid-grey-II flex h-20 w-20 items-center justify-center rounded-full`}>{icon}</div>
      <div className={`space-y-2`}>
        <p className={`text-xl font-semibold`}>{title}</p>
        <p className={`text-sm`}>{description}</p>
      </div>
    </section>
  );
};
