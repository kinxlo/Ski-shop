/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ErrorState } from "@/components/shared/empty-state";
import { useUserService } from "@/services/externals/user/use-user-service";
import { useParams } from "next/navigation";

import UserDetailSkeleton from "./_components/user-detail-skeleton";
import BuyersView from "./views/buyers-view";
import RidersView from "./views/riders-view";
import VendorsView from "./views/vendors-view";

const UserDetailsPage = () => {
  const parameters = useParams();
  const id = parameters.id as string;

  const { useGetUserById } = useUserService();
  const { data, isLoading, isError } = useGetUserById(id, { staleTime: 0 });

  if (isLoading) {
    return <UserDetailSkeleton />;
  }
  if (isError) {
    return <ErrorState className={`!bg-background min-h-[calc(100vh-130px)]`} />;
  }

  const profile: any = data?.data ?? {};

  switch (profile.role) {
    case "customer": {
      return <BuyersView id={id} profile={profile} />;
    }
    case "vendor": {
      return <VendorsView id={id} profile={profile} />;
    }
    case "rider": {
      return <RidersView id={id} profile={profile} />;
    }
    default: {
      return <BuyersView id={id} profile={profile} />;
    }
  }
};

export default UserDetailsPage;
