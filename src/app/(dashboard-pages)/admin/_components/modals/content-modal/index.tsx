import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-select";
import { FC, ReactNode } from "react";

interface ModalProperties {
  children: ReactNode;
  title: string;
  description?: string;
  triggerStructure: ReactNode;
  width?: string;
}

export const Modal: FC<ModalProperties> = ({ children, title, description, triggerStructure, width = `max-w-2xl` }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerStructure}</DialogTrigger>
      <DialogContent className={cn(`h-screen overflow-auto md:h-auto md:max-h-[90vh]`, width)}>
        <DialogHeader>
          <DialogTitle className="text-high-grey-III text-[18px] font-[700] lg:text-[26px]">{title}</DialogTitle>
          <Separator />
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="flex flex-col gap-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
