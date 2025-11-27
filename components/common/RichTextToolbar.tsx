
import React from 'react';

interface RichTextToolbarProps {
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    onContentChange: (newContent: string) => void;
}

export const RichTextToolbar: React.FC<RichTextToolbarProps> = ({ textareaRef, onContentChange }) => {
    const applyFormat = (format: 'bold' | 'italic' | 'list' | 'h2' | 'h3' | 'link') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        const before = textarea.value.substring(0, start);
        const after = textarea.value.substring(end);

        let newText;
        if (format === 'list') {
            const lines = selectedText.split('\n');
            const formattedLines = lines.map(line => line.trim() === '' ? '' : `- ${line}`);
            newText = formattedLines.join('\n');
        } else if (format === 'h2') {
             newText = `\n## ${selectedText}\n`;
        } else if (format === 'h3') {
             newText = `\n### ${selectedText}\n`;
        } else if (format === 'link') {
             newText = `[${selectedText || 'link text'}](url)`;
        } else {
            const wrapper = format === 'bold' ? '**' : '_';
            newText = `${wrapper}${selectedText}${wrapper}`;
        }
        
        // Notify parent of change (simulating user input)
        const fullText = before + newText + after;
        
        // This native setter and event dispatch ensures React state updates correctly if using controlled inputs
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
        if (nativeInputValueSetter) {
             nativeInputValueSetter.call(textarea, fullText);
        }
        
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        
        // Fallback call if not using event listener in parent
        onContentChange(fullText);
        
        // Restore focus and selection
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + newText.length, start + newText.length);
        }, 0);
    };

    return (
        <div className="flex items-center gap-1 p-1 rounded-md bg-secondary-light dark:bg-secondary-dark border border-border-light dark:border-border-dark mb-1">
            <button type="button" title="Bold" onClick={() => applyFormat('bold')} className="p-1.5 rounded hover:bg-border-light dark:hover:bg-border-dark text-text-light dark:text-text-dark"><span className="material-symbols-outlined !text-lg">format_bold</span></button>
            <button type="button" title="Italic" onClick={() => applyFormat('italic')} className="p-1.5 rounded hover:bg-border-light dark:hover:bg-border-dark text-text-light dark:text-text-dark"><span className="material-symbols-outlined !text-lg">format_italic</span></button>
            <button type="button" title="List" onClick={() => applyFormat('list')} className="p-1.5 rounded hover:bg-border-light dark:hover:bg-border-dark text-text-light dark:text-text-dark"><span className="material-symbols-outlined !text-lg">format_list_bulleted</span></button>
            <div className="w-px h-5 bg-border-light dark:border-border-dark mx-1"></div>
            <button type="button" title="Heading 2" onClick={() => applyFormat('h2')} className="p-1.5 rounded hover:bg-border-light dark:hover:bg-border-dark text-text-light dark:text-text-dark font-bold text-sm">H2</button>
             <button type="button" title="Heading 3" onClick={() => applyFormat('h3')} className="p-1.5 rounded hover:bg-border-light dark:hover:bg-border-dark text-text-light dark:text-text-dark font-bold text-xs">H3</button>
             <button type="button" title="Link" onClick={() => applyFormat('link')} className="p-1.5 rounded hover:bg-border-light dark:hover:bg-border-dark text-text-light dark:text-text-dark"><span className="material-symbols-outlined !text-lg">link</span></button>
        </div>
    );
};
