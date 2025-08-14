// "use client";

// import { FC } from "react";
// import { LuBell } from "react-icons/lu";

// import CustomButton from "~/components/common/common-button/common-button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
// import { Switch } from "~/components/ui/switch";
// import { cn } from "~/utils/utils";

// interface NotificationPreview {
//   header: string;
//   time: string;
// }

// interface CardProperties extends React.ComponentProps<typeof Card> {
//   notificationsPreview: NotificationPreview[];
//   unreadCount: number;
// }

// export const UnreadNotificationCard: FC<CardProperties> = ({
//   className,
//   notificationsPreview = [],
//   unreadCount = 0,
//   ...properties
// }) => {
//   return (
//     <Card data-testid="cardContainer" className={cn("h-fit w-fit sm:w-[380px]", className)} {...properties}>
//       <CardHeader className="px-4 sm:p-6">
//         <CardTitle>Notifications</CardTitle>
//         <CardDescription data-testid="unreadMessageCount">
//           You have {unreadCount === 0 ? 0 : unreadCount} unread message
//           {unreadCount === 1 ? "" : "s"}.
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="grid gap-4 p-4 pt-0 sm:p-6 sm:pt-0">
//         <div className="flex items-center space-x-4 rounded-md border p-2 sm:p-4">
//           <LuBell size={16} />
//           <div className="flex-1 space-y-1">
//             <p className="text-sm leading-none font-medium">Push Notifications</p>
//             <p className="text-muted-foreground text-sm">Send notifications to device.</p>
//           </div>
//           <Switch name="mobile_push_notifications" />
//         </div>
//         <div data-testid="previewBody">
//           {notificationsPreview.map((preview, index) => (
//             <div key={index} className="mb-2 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 sm:mb-4">
//               <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
//               <div className="space-y-1">
//                 <p data-testid={`previewHeader${index}`} className="text-sm leading-none font-medium">
//                   {preview.header}
//                 </p>
//                 <p data-testid={`previewTime${index}`} className="text-muted-foreground text-sm">
//                   {preview.time}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//       <CardFooter className="px-4 sm:px-6">
//         <div className="item-center flex w-full">
//           <CustomButton
//             variant="primary"
//             isDisabled={unreadCount === 0}
//             className="bg-primary w-full"
//             onClick={() => {
//               // MARK ALL NOTIFICATION LOGIC
//             }}
//           >
//             Mark all as read
//           </CustomButton>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

const index = () => {
  return <div>Notification feature</div>;
};

export default index;
