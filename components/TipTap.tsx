"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Strikethrough } from "lucide-react";
import { useEffect } from "react";
import Placeholder from "@tiptap/extension-placeholder";

const Tiptap = ({ newDish, setNewDish, dish }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },

        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
      Placeholder.configure({
        placeholder: "Write your instructions here...", // 👈 Add your placeholder text
      }),
    ],
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setNewDish({
        ...newDish,
        instructions: content,
      });
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] w-full rounded-lg border border-input border-neutral-600 bg-white px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    content: dish,
  });

  useEffect(() => {
    if (editor?.isEmpty) editor.commands.setContent(dish);
  }, [newDish]);

  // For some reason the toggles arent showing visually
  return (
    <div>
      {editor && (
        <div className="border border-neutral-600 rounded-md bg-white">
          <Toggle
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            size={"sm"}
            className={`${
              editor.isActive("bold") ? "!bg-gray-200" : ""
            } transition-all duration-200 ease-in-out  hover:bg-gray-200 text-black`}
          >
            <Bold className="w-4 h-4" />
          </Toggle>

          <Toggle
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            size={"sm"}
            className={`${
              editor.isActive("italic") ? "!bg-gray-200" : ""
            } transition-all duration-200 ease-in-out  hover:bg-gray-200 text-black`}
          >
            <Italic className="w-4 h-4" />
          </Toggle>

          <Toggle
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            size={"sm"}
            className={`${
              editor.isActive("strike") ? "!bg-gray-200" : ""
            } transition-all duration-200 ease-in-out  hover:bg-gray-200 text-black`}
          >
            <Strikethrough className="w-4 h-4" />
          </Toggle>

          <Toggle
            pressed={editor.isActive("orderedList")}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
            size={"sm"}
            className={`${
              editor.isActive("orderedList") ? "!bg-gray-200" : ""
            } transition-all duration-200 ease-in-out  hover:bg-gray-200 text-black`}
          >
            <ListOrdered className="w-4 h-4" />
          </Toggle>

          <Toggle
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
            size={"sm"}
            className={`${
              editor.isActive("bulletList") ? "!bg-gray-200" : ""
            } transition-all duration-200 ease-in-out  hover:bg-gray-200 text-black`}
          >
            <List className="w-4 h-4" />
          </Toggle>
        </div>
      )}
      <EditorContent editor={editor} required className="mt-2" />
    </div>
  );
};

export default Tiptap;
