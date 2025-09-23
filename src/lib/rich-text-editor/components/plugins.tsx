/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContentEditable } from "@/lib/rich-text-editor/components/content-editable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useState } from "react";

import { Toolbar } from "./toolbar";

export function Plugins() {
  const [_, setFloatingAnchorElement] = useState<HTMLDivElement | null>(null);

  const onReference = (_floatingAnchorElement: HTMLDivElement) => {
    if (_floatingAnchorElement !== null) {
      setFloatingAnchorElement(_floatingAnchorElement);
    }
  };

  return (
    <div className="relative">
      {/* Toolbar */}
      <Toolbar />

      {/* Editor Content */}
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="min-h-[300px]">
              <div className="" ref={onReference}>
                <ContentEditable placeholder={"Start typing your content here..."} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        {/* Additional Plugins */}
        <HistoryPlugin />
        <ListPlugin />
      </div>
    </div>
  );
}
