'use client';

import { useState } from 'react';
import Glyph from '../components/Glyph';
import GlyphStatic from '../components/GlyphStatic';
import Image from 'next/image';

export default function GlyphExample() {
  const [lastCopied, setLastCopied] = useState<string | null>(null);
  const [npmCopied, setNpmCopied] = useState(false);

  // SVG files from public directory
  const logoSvg = '/glyph-logo.svg';
  const brandmarkSvg = '/glyph.svg';

  // A fake URL for the brand kit download
  const brandKitUrl = '/example-brand-kit.zip';

  const handleNpmCopy = () => {
    navigator.clipboard.writeText('npm install glyph-kit');
    setNpmCopied(true);
    setTimeout(() => setNpmCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={brandmarkSvg} alt="Glyph" className="h-4" />
            <div className="absolute inset-0">
              <Glyph 
                logoSvg={logoSvg}
                brandmarkSvg={brandmarkSvg}
                brandKitUrl={brandKitUrl}
                onCopy={setLastCopied}
              />
            </div>
          </div>
          <span className="text-sm text-gray-600">A simple right click component for your logo</span>
        </div>

        {/* Main Demo Area */}
        <div className="bg-gray-50 rounded-lg p-12 flex justify-center">
          <GlyphStatic 
            logoSvg={logoSvg}
            brandmarkSvg={brandmarkSvg}
            brandKitUrl={brandKitUrl}
            onCopy={setLastCopied}
          />
        </div>

        {/* Description */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Getting a company&apos;s logo shouldn&apos;t be hard.</h2>
          <p className="text-gray-600 max-w-2xl">
            Why do you need to inspect element, hunt for the image only to realise it&apos;s not an SVG. 
            Even after getting the right file, you have to drag and drop it to figma. 
            That&apos;s why I made Glyph — A simple way to let people access your logo.
          </p>
          
          <p className="text-gray-600">
            Originally thought of by the stellar team at Linear and later popularized by{' '}
            <a href="https://supabase.com" className="text-gray-900 underline">Supabase</a> &{' '}
            <a href="https://perplexity.ai" className="text-gray-900 underline">Perplexity</a>
          </p>

          <div className="flex gap-3">
            <a 
              href="https://github.com/yourusername/glyph" 
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Github
            </a>
            <div className="relative">
              <Glyph 
                logoSvg={logoSvg}
                brandmarkSvg={brandmarkSvg}
                brandKitUrl={brandKitUrl}
                onCopy={setLastCopied}
              />
            </div>
          </div>
        </div>

        {/* Installation */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Installation</h3>
          <div className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
            <code className="text-sm">npm install glyph-kit</code>
            <button 
              className="text-gray-400 hover:text-gray-600 transition-colors"
              onClick={handleNpmCopy}
            >
              <div className="relative w-5 h-5">
                <div className={`absolute inset-0 transition-transform ${npmCopied ? 'scale-0' : 'scale-100'}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.912 4.895 3 6 3h8c1.105 0 2 .912 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.088 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"/>
                  </svg>
                </div>
                <div className={`absolute inset-0 transition-transform ${npmCopied ? 'scale-100' : 'scale-0'}`}>
                  <Image 
                    src="/check.svg" 
                    alt="Check icon" 
                    width={20} 
                    height={20}
                    className="text-gray-600"
                  />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Usage */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Usage</h3>
          <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
            <pre className="text-sm">
              <code>{`// Add right-click menu to your logo
<div className="relative">
  <img src="/logo.svg" alt="Logo" />
  <div className="absolute inset-0">
    <Glyph
      logoSvg="/logo.svg"
      brandmarkSvg="/brandmark.svg"
      brandKitUrl="/brand-kit.zip"
      onCopy={(type) => console.log(\`\${type} copied!\`)}
    />
  </div>
</div>`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
} 