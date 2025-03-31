'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface GlyphStaticProps {
  logoSvg: string;
  brandmarkSvg: string;
  brandKitUrl: string;
  onCopy?: (type: 'logo' | 'brandmark') => void;
}

export default function GlyphStatic({ logoSvg, brandmarkSvg, brandKitUrl, onCopy }: GlyphStaticProps) {
  const [copiedItem, setCopiedItem] = useState<'logo' | 'brandmark' | null>(null);
  const previousCopiedItem = useRef<'logo' | 'brandmark' | null>(null);
  const hasPerformedCopy = useRef(false);

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
    <div className="w-[240px] bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200/50">
      <div className="p-0.5">
        {/* Copy logo as SVG */}
        <button
          onClick={() => copyToClipboard(logoSvg, 'logo')}
          className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-100 transition-colors whitespace-nowrap relative overflow-hidden group rounded-t-[calc(0.5rem-2px)]"
        >
          <div className="relative h-5 flex-1">
            <div className={`flex items-center absolute inset-0 ${copiedItem === 'logo' ? 'animate-slide-up-out' : copiedItem === null && previousCopiedItem.current === 'logo' && hasPerformedCopy.current ? 'animate-slide-down-in' : ''}`}>
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
              <div className={`flex items-center absolute inset-0 ${copiedItem === null ? 'animate-slide-up-out-exit' : 'animate-slide-up-in'}`}>
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
            <div className={`flex items-center absolute inset-0 ${copiedItem === 'brandmark' ? 'animate-slide-up-out' : copiedItem === null && previousCopiedItem.current === 'brandmark' && hasPerformedCopy.current ? 'animate-slide-down-in' : ''}`}>
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
              <div className={`flex items-center absolute inset-0 ${copiedItem === null ? 'animate-slide-up-out-exit' : 'animate-slide-up-in'}`}>
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
  );
} 