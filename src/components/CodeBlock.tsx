'use client';

import React from 'react';
import Image from 'next/image';

interface CodeBlockProps {
  code: string;
  highlightedHtml: string;
}

const CodeBlock = React.memo(function CodeBlock({ code, highlightedHtml }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      <button
        onClick={handleCopy}
        className="absolute right-4 top-4 z-10 rounded-md p-2 hover:bg-white/10 transition-colors"
      >
        <div className="relative h-5 w-5">
          <div className={`absolute inset-0 transition-transform ${copied ? 'scale-0' : 'scale-100'}`}>
            <Image 
              src="/copy.svg" 
              alt="Copy code" 
              width={20} 
              height={20}
              className="text-white/70 group-hover:text-white transition-colors brightness-[10] opacity-70 group-hover:opacity-100"
            />
          </div>
          <div className={`absolute inset-0 transition-transform ${copied ? 'scale-100' : 'scale-0'}`}>
            <Image 
              src="/check1.svg" 
              alt="Copied" 
              width={20} 
              height={20}
              className="text-white/70 group-hover:text-white transition-colors brightness-[10] opacity-70 group-hover:opacity-100"
            />
          </div>
        </div>
      </button>
      <div 
        className="relative rounded-lg overflow-hidden"
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </div>
  );
});

export default CodeBlock; 