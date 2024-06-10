import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TipTapMenuBar from "./TipTapMenuBar";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
// import { NoteType } from '@/lib/db/schema';
import Text from "@tiptap/extension-text";
import Image from "@tiptap/extension-image";
import { useDebounce } from "@/lib/useDebounce";
import { toast } from "react-hot-toast";
import { blogService } from "@/api";
import ImagePromptDialog from "./ImagePromptDialog";
import { formatter } from "@/lib/formatAiCompletedText";

const TipTapEditor = ({ note }: { note: any }) => {
  const [editorState, setEditorState] = useState(note?.content);
  const [aiText, setAitext] = useState("");
  const [aiImage, setAiImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openPromptDialog, setopenPromptDialog] = useState(false);
  const [prompt, setPrompt] = useState("");

  const saveNote = useMutation({
    mutationKey: ["saveBlog", note._id],
    mutationFn: () => blogService.saveBlog(note._id, editorState),
    onSuccess: () => {
      console.log("Successfully updated!");
    },
    onError: (err) => {
      console.log("Error in update", err);
    }
  });

  const createImage = useMutation({
    mutationKey: ["createImage", note._id],
    mutationFn: (prompt: string) => blogService.createImage(note._id, prompt),
    onSuccess: (response: any) => {
      console.log("Image created", { response });
      setAiImage(response.image);
      setIsLoading(false);
    },
    onError: (error: any) => {
      console.log("Error while fetching the image", { error });
      setIsLoading(false);
    }
  });

  const completeBlog = useMutation({
    mutationKey: ["completeBlog", note._id],
    mutationFn: (text: string) => blogService.completeBlog(text),
    onSuccess: (data) => {
      const generatedText = data.text[0].generated_text;
      const cleanedText = formatter(generatedText, prompt);
      setAitext(cleanedText);
      toast("Completed blog using AI");
    },
    onError: (error) => {
      console.log({ error });
    }
  });

  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "ctrl-q": () => {
          const prompt = this.editor.getText().split(" ").slice(-30).join(" ");

          completeBlog.mutate(prompt);
          return true;
        },
        "ctrl-e": () => {
          setopenPromptDialog(true);
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [
      StarterKit,
      customText,
      Image.configure({ allowBase64: true }),
    ],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  const debouncedContent = useDebounce(editorState, 1000);

  useEffect(() => {
    if (
      debouncedContent === "" ||
      !debouncedContent ||
      debouncedContent === note?.content
    )
      return;
    saveNote.mutate();
  }, [debouncedContent]);

  useEffect(() => {
    if (!aiText || aiText === "") return;

    const insertTextTypewriter = async () => {
      const characters = aiText.split("");
      for (let i = 0; i < characters.length; i++) {
        // mimicking typewriting effect
        await editor?.commands.insertContent(characters[i]);
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
    };

    insertTextTypewriter();
  }, [aiText]);

  const handleImageGeneration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setopenPromptDialog(false);

    createImage.mutate(prompt);
  };

  useEffect(() => {
    if (!aiImage || aiImage === "") return;

    editor?.chain().focus().setImage({ src: aiImage }).run();
  }, [aiImage]);

  return (
    <>
      <div className="flex gap-4">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button disabled variant={"outline"}>
          {saveNote.isPending ? "Saving" : "Saved"}
        </Button>
      </div>
      <div className="prose prose-sm w-full mt-4 text-left editor-container">
        <EditorContent editor={editor} />
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
      </div>
      <div className="h-4"></div>
      <span className="text-sm">
        Tip: Press{" "}
        <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border-grey-200 rounded-lg">
          Ctrl+Q
        </kbd>{" "}
        for AI autocomplete
      </span>

      <ImagePromptDialog
        open={openPromptDialog}
        onOpenChange={setopenPromptDialog}
        prompt={prompt}
        setPrompt={setPrompt}
        handleImageGeneration={handleImageGeneration}
      />
    </>
  );
};

export default TipTapEditor;
