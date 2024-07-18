"use client";
import React, { useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TipTapMenuBar from "./TipTapMenuBar";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import Text from "@tiptap/extension-text";
import axios from "axios";
import { NoteType } from "@/lib/db/schema";
import { useCompletion } from "@ai-sdk/react";

type Props = { note: NoteType };

const TipTapEditor = ({ note }: Props) => {
  const [editorState, setEditorState] = React.useState(
    note.editorState || `<h1>${note.name}</h1>`
  );
  const { complete, completion, error } = useCompletion({
    api: "/api/completion",
    onError: (error) => {
      console.error("Error during completion:", error);
    },
  });
  const saveNote = useMutation({
    mutationFn: async ({ noteId, editorState}: { noteId: number | undefined; editorState: string}) => {
      const response = await axios.post("/api/saveNote", {
        noteId: note.id,
        editorState,
      });
      return response.data;
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, Text],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  const lastCompletion = React.useRef("");

  React.useEffect(() => {
    if (!completion || !editor) return;
    //console.log("Completion received:", completion);
    const diff = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;
    //console.log("Inserting diff:", diff);
    editor.commands.insertContent(diff);

    //console.log("Auto-complete sentence:", completion);
  }, [completion, editor]);

  // Function to handle manual saving
  const handleSave = useCallback(() => {
    saveNote.mutate({ noteId: note.id, editorState }, {
      onSuccess: (data) => {
        //console.log("success update!", data);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }, [note.id, editorState, saveNote]);

  // Auto-save functionality
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      handleSave();
    }, 30000); // Save every 30 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [handleSave]); // Dependency array can be adjusted based on when you want to trigger saves

  // Function to handle auto-completion
  const handleAutoComplete = () => {
    if (!editor) return;
    const cleanText = editor.getText().replace(/\n/g, ' ').trim();
    const prompt = cleanText.split(" ").slice(-30).join(" ");
    //console.log("Prompt sent for completion:", prompt);
    complete( prompt );
  };

  return (
    <>
      <div className="flex">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button onClick={handleSave} disabled={saveNote.isPending} variant={"outline"}>
          {saveNote.isPending ? "Saving..." : "Save"}
        </Button>
      </div>

      <div className="prose prose-sm w-full mt-4">
        <EditorContent editor={editor} />
      </div>
      <div className="h-4"></div>
      <Button onClick={handleAutoComplete} variant={"outline"}>
          Submit
        </Button>
      <span className="text-sm">
        Tip: Use the Submit button for AI autocomplete.
      </span>
    </>
  );
};

export default TipTapEditor;
