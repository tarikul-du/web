import React, { useRef, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor && editor.innerHTML !== value) {
      editor.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const ToolbarButton: React.FC<{ onClick: () => void, children: React.ReactNode }> = ({ onClick, children }) => (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 rounded-md text-sm font-medium"
    >
      {children}
    </button>
  );

  return (
    <div className="w-full bg-white border border-slate-300 rounded-md focus-within:ring-1 focus-within:ring-fuchsia-600 focus-within:border-fuchsia-600">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-300 bg-slate-50 rounded-t-md">
        <ToolbarButton onClick={() => execCommand('bold')}><b>B</b></ToolbarButton>
        <ToolbarButton onClick={() => execCommand('italic')}><i>I</i></ToolbarButton>
        <ToolbarButton onClick={() => execCommand('formatBlock', '<h2>')}>H2</ToolbarButton>
        <ToolbarButton onClick={() => execCommand('formatBlock', '<p>')}>P</ToolbarButton>
        <ToolbarButton onClick={() => execCommand('insertUnorderedList')}>List</ToolbarButton>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="w-full min-h-[200px] p-3 text-slate-900 focus:outline-none prose max-w-none"
      />
    </div>
  );
};

export default RichTextEditor;