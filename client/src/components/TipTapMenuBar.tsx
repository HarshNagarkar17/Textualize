import { Editor } from '@tiptap/react';
import { Bold, Italic } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

type Props = {
    editor: Editor;
};

const TipTapMenuBar = ({ editor }: Props) => {
    const editorRef = useRef<Editor>(editor); // Store the editor instance in a ref

    useEffect(() => {
        // Update the ref whenever the editor prop changes
        editorRef.current = editor;
    }, [editor]);

    // Define a function to toggle bold that safely handles the editor state
    const toggleBold = () => {
        if (!editorRef.current) return; // Early exit if editor is not initialized
        editorRef.current.chain().focus().toggleBold().run();
    };
    const toggleItalic = () => {
        if (!editorRef.current) return; // Early exit if editor is not initialized
        editorRef.current.chain().focus().toggleItalic().run();
    };

    return (
        <div className="flex flex-wrap gap-2">
            <button onClick={toggleBold} disabled={!editorRef.current?.can().chain().focus().toggleBold().run()}
                className={editorRef.current?.isActive("bold") ? "is-active" : ""}
            >
                <Bold className="w-6 h-6" />
            </button>
            <button onClick={toggleItalic} disabled={!editorRef.current?.can().chain().focus().toggleItalic().run()}
                className={editorRef.current?.isActive("italic") ? "is-active" : ""}
            >
                <Italic className="w-6 h-6" />
            </button>
        </div>
    );
};

export default TipTapMenuBar;
