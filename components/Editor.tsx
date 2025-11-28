import React from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  return (
    <textarea
      className="w-full h-full p-6 resize-none focus:outline-none bg-gray-50 text-gray-700 font-mono text-sm leading-relaxed"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="# Start typing your markdown here..."
      spellCheck={false}
    />
  );
};

export default Editor;
