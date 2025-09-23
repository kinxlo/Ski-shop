import { ContentEditable as LexicalContentEditable } from "@lexical/react/LexicalContentEditable";
import { JSX } from "react";

type Properties = {
  placeholder: string;
  className?: string;
  placeholderClassName?: string;
};

export function ContentEditable({ placeholder, className, placeholderClassName }: Properties): JSX.Element {
  return (
    <LexicalContentEditable
      className={
        className ??
        `ContentEditable__root focus:ring-ring relative block min-h-72 w-full overflow-auto rounded-b-lg px-6 py-4 transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none`
      }
      aria-placeholder={placeholder}
      placeholder={
        <div
          className={
            placeholderClassName ??
            `text-muted-foreground pointer-events-none absolute top-0 left-0 overflow-hidden px-6 py-[18px] text-ellipsis select-none`
          }
        >
          {placeholder}
        </div>
      }
    />
  );
}
