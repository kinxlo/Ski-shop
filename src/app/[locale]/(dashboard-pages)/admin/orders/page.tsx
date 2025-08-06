import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiShoppingCartLine } from "react-icons/ri";

import { OverViewCard } from "../../_components/overview-card";
import { AllOrders } from "../../dashboard/orders/_views/all-orders";
import { DeliveredOrders } from "../../dashboard/orders/_views/delivered-orders";
import { PendingOrders } from "../../dashboard/orders/_views/pending-orders";

const Page = () => {
  return (
    <main>
      <section className="flex items-center justify-between">
        <h4 className="text-mid-grey-III text-[18px] lg:text-[30px]">Orders</h4>
      </section>
      <section className="my-[38px] grid grid-cols-1 gap-[31px] lg:grid-cols-3">
        <OverViewCard
          title={"All Order"}
          value={"500"}
          icon={<RiShoppingCartLine />}
          iconClassName="bg-primary/10 text-primary text-[24px]"
        />
        <OverViewCard
          title={"Pending Orders"}
          value={"250"}
          icon={<RiShoppingCartLine />}
          iconClassName="bg-low-warning/20 text-mid-warning text-[24px]"
        />
        <OverViewCard
          title={"Completed Orders"}
          value={"250"}
          icon={<RiShoppingCartLine />}
          iconClassName="bg-low-success text-mid-success text-[24px]"
        />
      </section>
      <section>
        <Tabs defaultValue="all" className="rounded-lg bg-white p-4">
          <TabsList className="bg-white p-0">
            <TabsTrigger
              value="all"
              className="data-[state=active]:border-primary data-[state=active]:text-primary text-high-grey-II relative h-13 rounded-none border-0 border-b-2 px-4 text-sm font-medium !shadow-none data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
            >
              All Orders
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="data-[state=active]:border-primary data-[state=active]:text-primary text-mid-grey-II relative h-13 rounded-none border-0 border-b-2 px-4 text-sm font-medium !shadow-none data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
            >
              Pending Orders
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:border-primary data-[state=active]:text-primary text-mid-grey-II relative h-13 rounded-none border-0 border-b-2 px-4 text-sm font-medium !shadow-none data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
            >
              Completed Orders
            </TabsTrigger>
          </TabsList>
          <Separator className="bg-muted mt-[-1px] mb-[26px]" />
          <TabsContent value="all">
            <AllOrders />
          </TabsContent>
          <TabsContent value="pending">
            <PendingOrders />
          </TabsContent>
          <TabsContent value="completed">
            <DeliveredOrders />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default Page;
