"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { $createListItemNode, $createListNode } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { Bold, Heading1, Heading2, Italic, List, ListOrdered, Quote, Strikethrough, Underline } from "lucide-react";

export function Toolbar() {
  const [editor] = useLexicalComposerContext();

  const formatText = (format: "bold" | "italic" | "underline" | "strikethrough") => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const insertHeading = (level: 1 | 2) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const headingNode = $createHeadingNode(`h${level}`);
        selection.insertNodes([headingNode]);
      }
    });
  };

  const insertQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const quoteNode = $createQuoteNode();
        selection.insertNodes([quoteNode]);
      }
    });
  };

  const insertList = (ordered: boolean) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const listNode = $createListNode(ordered ? "number" : "bullet");
        const listItemNode = $createListItemNode();
        listNode.append(listItemNode);
        selection.insertNodes([listNode]);
      }
    });
  };

  return (
    <TooltipProvider>
      <div className="bg-muted/50 flex items-center gap-1 border-b p-2">
        {/* Text Formatting */}
        <div className="flex items-center gap-1">
          <Tooltip content="Bold">
            <Button variant="ghost" size="sm" onClick={() => formatText("bold")} className="h-8 w-8 p-0">
              <Bold className="h-4 w-4" />
            </Button>
          </Tooltip>

          <Tooltip content="Italic">
            <Button variant="ghost" size="sm" onClick={() => formatText("italic")} className="h-8 w-8 p-0">
              <Italic className="h-4 w-4" />
            </Button>
          </Tooltip>

          <Tooltip content="Underline">
            <Button variant="ghost" size="sm" onClick={() => formatText("underline")} className="h-8 w-8 p-0">
              <Underline className="h-4 w-4" />
            </Button>
          </Tooltip>

          <Tooltip content="Strikethrough">
            <Button variant="ghost" size="sm" onClick={() => formatText("strikethrough")} className="h-8 w-8 p-0">
              <Strikethrough className="h-4 w-4" />
            </Button>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Headings */}
        <div className="flex items-center gap-1">
          <Tooltip content="Heading 1">
            <Button variant="ghost" size="sm" onClick={() => insertHeading(1)} className="h-8 w-8 p-0">
              <Heading1 className="h-4 w-4" />
            </Button>
          </Tooltip>

          <Tooltip content="Heading 2">
            <Button variant="ghost" size="sm" onClick={() => insertHeading(2)} className="h-8 w-8 p-0">
              <Heading2 className="h-4 w-4" />
            </Button>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Lists and Quotes */}
        <div className="flex items-center gap-1">
          <Tooltip content="Bullet List">
            <Button variant="ghost" size="sm" onClick={() => insertList(false)} className="h-8 w-8 p-0">
              <List className="h-4 w-4" />
            </Button>
          </Tooltip>

          <Tooltip content="Numbered List">
            <Button variant="ghost" size="sm" onClick={() => insertList(true)} className="h-8 w-8 p-0">
              <ListOrdered className="h-4 w-4" />
            </Button>
          </Tooltip>

          <Tooltip content="Quote">
            <Button variant="ghost" size="sm" onClick={insertQuote} className="h-8 w-8 p-0">
              <Quote className="h-4 w-4" />
            </Button>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
