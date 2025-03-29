'use client';

import { useState } from 'react';
import Glyph from '../components/Glyph';
import GlyphStatic from '../components/GlyphStatic';
import Image from 'next/image';
import * as shiki from 'shiki';
import { useEffect, useRef } from 'react';

// Component code from Glyph.tsx
const componentCode = `'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface GlyphProps {
  logoSvg: string;
  brandmarkSvg: string;
  brandKitUrl: string;
  onCopy?: (type: 'logo' | 'brandmark') => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function Glyph({ 
  logoSvg, 
  brandmarkSvg, 
  brandKitUrl, 
  onCopy,
  isOpen: controlledIsOpen,
  onOpenChange 
}: GlyphProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [copiedItem, setCopiedItem] = useState<'logo' | 'brandmark' | null>(null);
  const previousCopiedItem = useRef<'logo' | 'brandmark' | null>(null);
  const hasPerformedCopy = useRef(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Use controlled or uncontrolled isOpen state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (open: boolean) => {
    if (controlledIsOpen !== undefined) {
      onOpenChange?.(open);
    } else {
      setInternalIsOpen(open);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
    // Reset animation state
    hasPerformedCopy.current = false;
    previousCopiedItem.current = null;
  };

  const copyToClipboard = async (svgUrl: string, type: 'logo' | 'brandmark') => {
    try {
      const response = await fetch(svgUrl);
      const svgText = await response.text();
      await navigator.clipboard.writeText(svgText);
      previousCopiedItem.current = type;
      hasPerformedCopy.current = true;
      setCopiedItem(type);
      onCopy?.(type);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (error) {
      console.error('Failed to copy SVG to clipboard:', error);
    }
  };

  const downloadBrandKit = () => {
    // Create an anchor element and trigger download
    const link = document.createElement('a');
    link.href = brandKitUrl;
    link.download = 'brand-kit.zip'; // Suggested filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div 
        className="absolute inset-0" 
        onContextMenu={handleContextMenu}
      />

      {isOpen && (
        <div 
          ref={menuRef}
          className="fixed z-50"
          style={{ 
            left: \`\${position.x}px\`, 
            top: \`\${position.y}px\`,
          }}
        >
          <div className="w-[240px] bg-white rounded-lg shadow-xl overflow-hidden z-10 border border-gray-200/50">
            <div className="p-0.5">
              {/* Copy logo as SVG */}
              <button
                onClick={() => copyToClipboard(logoSvg, 'logo')}
                className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-100 transition-colors whitespace-nowrap relative overflow-hidden group rounded-t-[calc(0.5rem-2px)]"
              >
                <div className="relative h-5 flex-1">
                  <div className={\`flex items-center absolute inset-0 \${copiedItem === 'logo' ? 'animate-slide-up-out' : copiedItem === null && previousCopiedItem.current === 'logo' && hasPerformedCopy.current ? 'animate-slide-down-in' : ''}\`}>
                    <div className="w-6 h-6 flex items-center justify-center mr-2.5">
                      <Image 
                        src="/code.svg" 
                        alt="Code icon" 
                        width={18} 
                        height={18}
                        className="text-gray-600 group-hover:text-gray-900 transition-colors"
                      />
                    </div>
                    <span className="text-gray-600 group-hover:text-gray-900 text-sm font-medium transition-colors">
                      Copy logo as SVG
                    </span>
                  </div>
                  {copiedItem === 'logo' && (
                    <div className={\`flex items-center absolute inset-0 \${copiedItem === null ? 'animate-slide-up-out-exit' : 'animate-slide-up-in'}\`}>
                      <div className="w-6 h-6 flex items-center justify-center mr-2.5">
                        <Image 
                          src="/check.svg" 
                          alt="Check icon" 
                          width={18} 
                          height={18}
                          className="text-gray-600 group-hover:text-gray-900 transition-colors"
                        />
                      </div>
                      <span className="text-gray-600 group-hover:text-gray-900 text-sm font-medium transition-colors">
                        Copied!
                      </span>
                    </div>
                  )}
                </div>
              </button>

              {/* Copy brandmark as SVG */}
              <button
                onClick={() => copyToClipboard(brandmarkSvg, 'brandmark')}
                className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-100 transition-colors whitespace-nowrap relative overflow-hidden group"
              >
                <div className="relative h-5 flex-1">
                  <div className={\`flex items-center absolute inset-0 \${copiedItem === 'brandmark' ? 'animate-slide-up-out' : copiedItem === null && previousCopiedItem.current === 'brandmark' && hasPerformedCopy.current ? 'animate-slide-down-in' : ''}\`}>
                    <div className="w-6 h-6 flex items-center justify-center mr-2.5">
                      <Image 
                        src="/hexagon.svg" 
                        alt="Hexagon icon" 
                        width={18} 
                        height={18}
                        className="text-gray-600 group-hover:text-gray-900 transition-colors"
                      />
                    </div>
                    <span className="text-gray-600 group-hover:text-gray-900 text-sm font-medium transition-colors">
                      Copy brandmark as SVG
                    </span>
                  </div>
                  {copiedItem === 'brandmark' && (
                    <div className={\`flex items-center absolute inset-0 \${copiedItem === null ? 'animate-slide-up-out-exit' : 'animate-slide-up-in'}\`}>
                      <div className="w-6 h-6 flex items-center justify-center mr-2.5">
                        <Image 
                          src="/check.svg" 
                          alt="Check icon" 
                          width={18} 
                          height={18}
                          className="text-gray-600 group-hover:text-gray-900 transition-colors"
                        />
                      </div>
                      <span className="text-gray-600 group-hover:text-gray-900 text-sm font-medium transition-colors">
                        Copied!
                      </span>
                    </div>
                  )}
                </div>
              </button>

              <div className="h-px bg-gray-200 -mx-0.5" />

              {/* Download BrandKit */}
              <button
                onClick={downloadBrandKit}
                className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-100 transition-colors whitespace-nowrap group rounded-b-[calc(0.5rem-2px)]"
              >
                <div className="w-6 h-6 flex items-center justify-center mr-2.5">
                  <Image 
                    src="/download.svg" 
                    alt="Download icon" 
                    width={18} 
                    height={18}
                    className="text-gray-600 group-hover:text-gray-900 transition-colors"
                  />
                </div>
                <span className="text-gray-600 group-hover:text-gray-900 text-sm font-medium transition-colors">Download BrandKit</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}`;

// Usage code example
const usageCode = `import { Glyph } from 'glyph-kit';

const [isOpen, setIsOpen] = useState(false);

<div className="relative">
  <img src="/logo.svg" alt="Logo" />
  <div className="absolute inset-0">
    <Glyph
      logoSvg="/logo.svg"
      brandmarkSvg="/brandmark.svg"
      brandKitUrl="/brand-kit.zip"
      onCopy={(type) => console.log(\`\${type} copied!\`)}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    />
  </div>
</div>`;

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [highlightedCode, setHighlightedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    async function highlight() {
      const highlighter = await shiki.createHighlighter({
        themes: ['poimandres'],
        langs: ['typescript', 'tsx'],
      });
      const highlighted = highlighter.codeToHtml(code, {
        lang: language,
        theme: 'poimandres',
      });
      // Add padding and word wrap to the pre element that Shiki generates
      const styledHighlighted = highlighted
        .replace('<pre class="', '<pre class="p-4 sm:p-6 whitespace-pre-wrap break-words ')
        .replace('<code>', '<code class="whitespace-pre-wrap">');
      setHighlightedCode(styledHighlighted);
    }
    highlight();
  }, [code, language]);

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
        ref={containerRef}
        className="relative rounded-lg overflow-hidden"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
}

export default function GlyphExample() {
  const [lastCopied, setLastCopied] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'component' | 'usage'>('component');
  const componentRef = useRef<HTMLSpanElement>(null);
  const usageRef = useRef<HTMLSpanElement>(null);

  // SVG files from public directory
  const logoSvg = '/glyph-logo.svg';
  const brandmarkSvg = '/glyph.svg';

  // A fake URL for the brand kit download
  const brandKitUrl = '/brand-kit.zip';

  // Get the current active element's position and width
  const getActiveStyles = () => {
    const activeRef = activeTab === 'component' ? componentRef : usageRef;
    if (!activeRef.current) return { left: 0, width: 0 };
    
    const rect = activeRef.current.getBoundingClientRect();
    const parentRect = activeRef.current.parentElement?.getBoundingClientRect();
    return {
      left: rect.left - (parentRect?.left || 0),
      width: rect.width
    };
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      <div className="w-full max-w-2xl space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <img src={brandmarkSvg} alt="Glyph" className="h-3.5 sm:h-4" />
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
        <div className="bg-gray-50 rounded-lg p-6 sm:p-8 md:p-12 flex justify-center">
          <GlyphStatic 
            logoSvg={logoSvg}
            brandmarkSvg={brandmarkSvg}
            brandKitUrl={brandKitUrl}
            onCopy={setLastCopied}
          />
        </div>

        {/* Description */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold">Getting your company&apos;s logo shouldn&apos;t be hard.</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            You have a great logo but god help those who are trying to find it.
          </p>
          
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            People need to &apos;inspect element&apos; and dig through your code, download an ultra huge zip file that has your entire brandbook and yet most people end up using the 2016 version from Google Images that&apos;s probably a PNG.
          </p>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            This needs to stop, it&apos;s literally hurting your brand, that&apos;s why I made — Glyph a simple way to give people your logo, in one click. Originally first seen on{' '}
            <a href="https://linear.app" target="_blank" rel="noopener noreferrer" className="text-gray-900 underline">Linear</a>, recently on{' '}
            <a href="https://perplexity.ai" target="_blank" rel="noopener noreferrer" className="text-gray-900 underline">Perplexity</a> and{' '}
            <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-gray-900 underline">Supabase</a>, but soon everywhere on the web.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <button 
                className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                onClick={() => setIsOpen(true)}
              >
                Demo
              </button>
              <div className="absolute inset-0">
                <Glyph 
                  logoSvg={logoSvg}
                  brandmarkSvg={brandmarkSvg}
                  brandKitUrl={brandKitUrl}
                  onCopy={setLastCopied}
                  isOpen={isOpen}
                  onOpenChange={setIsOpen}
                />
              </div>
            </div>
            <a 
              href="https://github.com/ybhrdwj/glyph" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-200 text-gray-900 rounded-md hover:bg-gray-50 flex items-center justify-center sm:justify-start gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.203 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2z" />
              </svg>
              Github
            </a>
          </div>
        </div>

        {/* Code Tabs */}
        <div className="space-y-4">
          <div className="flex border-b border-gray-200 relative">
            <button
              onClick={() => setActiveTab('component')}
              className={`px-4 py-2 text-sm font-medium relative ${
                activeTab === 'component' ? 'text-black' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Component
            </button>
            <button
              onClick={() => setActiveTab('usage')}
              className={`px-4 py-2 text-sm font-medium relative ${
                activeTab === 'usage' ? 'text-black' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Usage
            </button>
            <div 
              className="absolute bottom-0 h-0.5 bg-black transition-all duration-200 ease-out"
              style={{ 
                left: activeTab === 'component' ? '16px' : '120px',
                width: activeTab === 'component' ? '88px' : '52px'
              }}
            />
          </div>
          
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            {activeTab === 'component' ? (
              <div className="max-h-[32rem] overflow-y-auto">
                <CodeBlock code={componentCode} language="tsx" />
              </div>
            ) : (
              <CodeBlock code={usageCode} language="tsx" />
            )}
          </div>
        </div>

        {/* Props Table */}
        <div className="mt-6 sm:mt-8">
          <h4 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3">Props</h4>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full inline-block align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prop</th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                    <th className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-900">logoSvg</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">string</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">Yes</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">URL to the full logo SVG file</td>
                  </tr>
                  <tr>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-900">brandmarkSvg</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">string</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">Yes</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">URL to the brandmark/icon SVG file</td>
                  </tr>
                  <tr>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-900">brandKitUrl</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">string</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">Yes</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">URL to download the brand kit zip file</td>
                  </tr>
                  <tr>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-900">onCopy</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">(type: &apos;logo&apos; | &apos;brandmark&apos;) =&gt; void</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">No</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">Callback when an SVG is copied to clipboard</td>
                  </tr>
                  <tr>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-900">isOpen</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">boolean</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">No</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">Control the open state of the menu</td>
                  </tr>
                  <tr>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-900">onOpenChange</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">(open: boolean) =&gt; void</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">No</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">Callback when the menu open state changes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200" />

        {/* Footer */}
        <div className="text-xs sm:text-sm text-gray-500 flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:justify-between">
          <div className="flex items-center gap-2"> by
            <a 
              href="https://yashbhardwaj.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              <Image
                src="/pfp.png"
                alt="Yash Bhardwaj"
                width={18}
                height={18}
                className="rounded-full"
              />
              <span className="font-medium text-gray-900">Yash Bhardwaj</span>
            </a>
          </div>
          <a 
            href="https://x.com/ybhrdwj" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-900 hover:text-gray-600 hover:underline transition-colors"
          >
            @ybhrdwj
          </a>
        </div>
      </div>
    </div>
  );
} 