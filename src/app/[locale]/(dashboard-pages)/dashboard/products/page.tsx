import SkiButton from "@/components/shared/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucidePlusCircle } from "lucide-react";
import { TbShoppingBag } from "react-icons/tb";

import { OverViewCard } from "../../_components/overview-card";
import { PublishedProducts } from "./_views/published-products";
import { UnpublishedProducts } from "./_views/unpublished-products";

const Page = () => {
  return (
    <main>
      <section className="flex items-center justify-between">
        <h4 className="text-mid-grey-III text-[18px] lg:text-[30px]">Products</h4>
        <div>
          <SkiButton
            href={`/admin/products/new`}
            isLeftIconVisible
            icon={<LucidePlusCircle />}
            variant="primary"
            className="rounded-full"
          >
            Add New Product
          </SkiButton>
        </div>
      </section>
      <section className="my-[38px] grid grid-cols-1 gap-[31px] lg:grid-cols-3">
        <OverViewCard
          title={"Total Products"}
          value={"500"}
          icon={<TbShoppingBag />}
          iconClassName="bg-primary/10 text-primary text-[24px]"
        />
        <OverViewCard
          title={"Published Products"}
          value={"250"}
          icon={<TbShoppingBag />}
          iconClassName="bg-low-success text-mid-success text-[24px]"
        />
        <OverViewCard
          title={"Unplublished Prodcts"}
          value={"250"}
          icon={<TbShoppingBag />}
          iconClassName="bg-low-danger text-mid-danger text-[24px]"
        />
      </section>
      <section>
        <Tabs defaultValue="published" className="rounded-lg bg-white p-4">
          <TabsList className="bg-white p-0">
            <TabsTrigger
              value="published"
              className="data-[state=active]:border-primary data-[state=active]:text-primary text-high-grey-II relative h-13 rounded-none border-0 border-b-2 px-4 text-sm font-medium !shadow-none data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
            >
              Published Products
            </TabsTrigger>
            <TabsTrigger
              value="unpublished"
              className="data-[state=active]:border-primary data-[state=active]:text-primary text-mid-grey-II relative h-13 rounded-none border-0 border-b-2 px-4 text-sm font-medium !shadow-none data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
            >
              Unpublished Products
            </TabsTrigger>
          </TabsList>
          <Separator className="bg-muted mt-[-1px] mb-[26px]" />
          <TabsContent value="published">
            <PublishedProducts />
          </TabsContent>
          <TabsContent value="unpublished">
            <UnpublishedProducts />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default Page;
