import { useEffect, useState } from 'react';
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TipTapMenuBar from './TipTapMenuBar';
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
// import { NoteType } from '@/lib/db/schema';
import Text from "@tiptap/extension-text";
import Image from "@tiptap/extension-image";
import { useDebounce } from '@/lib/useDebounce';
import axiosInstance from '@/utils/axios';
import { blogService } from '@/api';

const TipTapEditor = ({ note }: {note:any}) => {
    const [editorState, setEditorState] = useState(note?.content);
    const [aiText, setAitext] = useState("");
    const [aiImage, setAiImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const customText = Text.extend({
        addKeyboardShortcuts() {
            return {
                'ctrl-q': () => {
                    const prompt = this.editor.getText().split(" ").slice(-30).join(" ");
                    axiosInstance.post("/api/completion", { prompt })
                        .then((response) => {
                            const generatedText = response.data.text[0].generated_text;
                            const promptWords = prompt.split(" ");
                            const generatedTextWords = generatedText.split(" ");
                            const startIndex = promptWords.length;
                            const cleanedText = generatedTextWords.slice(startIndex).join(" ");
                            console.log({ cleanedText });
                            setAitext(cleanedText);
                        })
                        .catch((error) => {
                            console.log({ error });
                        });
                    return true;
                },
                'ctrl-e': () => {
                    const prompt = `Create a captivating scene of a dense, tropical jungle at dawn. The jungle should be teeming with life and rich in detail. Towering trees with thick, gnarled trunks reach towards the sky, their lush green canopies forming a dense roof that filters the sunlight into golden rays piercing through the foliage. Vines hang and twist around the trees, adorned with vibrant flowers in hues of red, orange, and yellow.

                    The forest floor is a chaotic tapestry of undergrowth, with ferns, moss-covered rocks, and fallen leaves. A crystal-clear stream winds through the jungle, its waters sparkling as they cascade over smooth stones, creating a soothing sound. Exotic birds with colorful plumage flit between the branches, while monkeys swing from vine to vine.
                    
                    In the background, the faint silhouette of misty mountains can be seen, adding depth to the scene. The atmosphere is alive with the sounds of wildlife, the chirping of insects, and the distant calls of unseen creatures. The overall mood should evoke a sense of adventure, wonder, and the untamed beauty of nature.`;

                    setIsLoading(true);
                    axiosInstance.post("/api/generateImage", { prompt })
                        .then((response) => {
                            console.log(response.data);
                            setAiImage(response.data.image);
                        })
                        .finally(() => {
                            setIsLoading(false);
                        });
                    return true;
                }
            };
        },
    });

    const editor = useEditor({
        autofocus: true,
        extensions: [StarterKit, customText, Image.configure({ allowBase64: true })],
        content: editorState,
        onUpdate: ({ editor }) => {
            setEditorState(editor.getHTML());
        }
    });
    const saveNote = useMutation({
        mutationKey: ['saveBlog',note._id],
        mutationFn: () => blogService.saveBlog(note._id,editorState)
    });

    const debouncedContent = useDebounce(editorState, 1000);

    useEffect(() => {
        if (debouncedContent === '' || !debouncedContent || debouncedContent === note?.content) return;
        saveNote.mutate(undefined, {
            onSuccess: (data) => {
                console.log("success update!");
            },
            onError: (err) => {
                console.log("error in update", err);
            }
        });
    }, [debouncedContent]);

    useEffect(() => {
        if (!aiText || aiText === "") return;

        const insertTextTypewriter = async () => {
            const characters = aiText.split('');
            for (let i = 0; i < characters.length; i++) {
                await editor?.commands.insertContent(characters[i]);
                await new Promise(resolve => setTimeout(resolve, 30));
            }
        };

        insertTextTypewriter();

    }, [aiText]);

    useEffect(() => {
        if (!aiImage || aiImage === "") return;

        editor?.chain().focus().setImage({ src: aiImage }).run();
    }, [aiImage]);

    return (
        <>
            <div className='flex gap-4'>
                {editor && (
                    <TipTapMenuBar editor={editor} />
                )}
                <Button disabled variant={'outline'}>
                    {saveNote.isPending ? "Saving" : "Saved"}
                </Button>
            </div>
            <div className='prose prose-sm w-full mt-4 text-left editor-container'>
                <EditorContent editor={editor} />
                {isLoading && (
                    <div className="loading-overlay">
                        <div className="loading-spinner"></div>
                    </div>
                )}
            </div>
            <div className="h-4"></div>
            <span className='text-sm'>
                Tip: Press <kbd className='px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border-grey-200 rounded-lg'>Ctrl+Q</kbd>
                {" "}  for AI autocomplete
            </span>
        </>
    );
};

export default TipTapEditor;
