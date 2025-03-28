'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GlyphStaticProps {
  logoSvg: string;
  brandmarkSvg: string;
  brandKitUrl: string;
  onCopy?: (type: 'logo' | 'brandmark') => void;
}

export default function GlyphStatic({ logoSvg, brandmarkSvg, brandKitUrl, onCopy }: GlyphStaticProps) {
  const [copiedItem, setCopiedItem] = useState<'logo' | 'brandmark' | null>(null);

  const copyToClipboard = async (svg: string, type: 'logo' | 'brandmark') => {
    try {
      await navigator.clipboard.writeText(svg);
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
    <div className="min-w-fit bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="p-0.5">
        {/* Copy logo as SVG */}
        <button
          onClick={() => copyToClipboard(logoSvg, 'logo')}
          className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap relative"
        >
          <div className="w-6 h-6 flex items-center justify-center mr-2.5">
            <Image 
              src="/code.svg" 
              alt="Code icon" 
              width={18} 
              height={18}
            />
          </div>
          <span className="text-gray-600 text-sm font-medium min-w-[120px]">
            {copiedItem === 'logo' ? (
              <span className="flex items-center gap-1.5 absolute inset-0 px-3 py-2 bg-white dark:bg-gray-900 animate-fade-in-up">
                <Image 
                  src="/check.svg" 
                  alt="Check icon" 
                  width={18} 
                  height={18}
                />
                Copied!
              </span>
            ) : (
              'Copy logo as SVG'
            )}
          </span>
        </button>

        {/* Copy brandmark as SVG */}
        <button
          onClick={() => copyToClipboard(brandmarkSvg, 'brandmark')}
          className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap relative"
        >
          <div className="w-6 h-6 flex items-center justify-center mr-2.5">
            <Image 
              src="/hexagon.svg" 
              alt="Hexagon icon" 
              width={18} 
              height={18}
            />
          </div>
          <span className="text-gray-600 text-sm font-medium min-w-[140px]">
            {copiedItem === 'brandmark' ? (
              <span className="flex items-center gap-1.5 absolute inset-0 px-3 py-2 bg-white dark:bg-gray-900 animate-fade-in-up">
                <Image 
                  src="/check.svg" 
                  alt="Check icon" 
                  width={18} 
                  height={18}
                />
                Copied!
              </span>
            ) : (
              'Copy brandmark as SVG'
            )}
          </span>
        </button>

        <div className="h-px bg-gray-200 dark:bg-gray-700 -mx-0.5" />

        {/* Download BrandKit */}
        <button
          onClick={downloadBrandKit}
          className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
        >
          <div className="w-6 h-6 flex items-center justify-center mr-2.5">
            <Image 
              src="/download.svg" 
              alt="Download icon" 
              width={18} 
              height={18}
            />
          </div>
          <span className="text-gray-600 text-sm font-medium">Download BrandKit</span>
        </button>
      </div>
    </div>
  );
} 