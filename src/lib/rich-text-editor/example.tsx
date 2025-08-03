"use client";

import { Editor } from "@/lib/rich-text-editor";
import { SerializedEditorState } from "lexical";
import { useState } from "react";

export const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Welcome to the Rich Text Editor! 🚀\n\nThis is a fully functional editor with formatting options. Try using the toolbar above to format your text.",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;

export default function EditorPage() {
  const [editorState, setEditorState] = useState<SerializedEditorState>(initialValue);

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold">Rich Text Editor</h1>
        <p className="text-muted-foreground">A fully functional rich text editor built with Lexical and React.</p>
      </div>

      <div className="space-y-6">
        <Editor editorSerializedState={editorState} onSerializedChange={(value) => setEditorState(value)} />
        <div className="bg-muted rounded-lg p-4">
          <h3 className="mb-2 text-sm font-semibold">Editor State (JSON)</h3>
          <pre className="hide-scrollbar max-h-96 overflow-auto text-xs">{JSON.stringify(editorState, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
