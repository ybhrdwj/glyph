'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GlyphProps {
  logoSvg: string;
  brandmarkSvg: string;
  brandKitUrl: string;
  onCopy?: (type: 'logo' | 'brandmark') => void;
}

export default function Glyph({ logoSvg, brandmarkSvg, brandKitUrl, onCopy }: GlyphProps) {
  const [isOpen, setIsOpen] = useState(false);

  const copyToClipboard = async (svg: string, type: 'logo' | 'brandmark') => {
    try {
      await navigator.clipboard.writeText(svg);
      onCopy?.(type);
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
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {/* Button content - can be customized */}
        <span className="text-sm font-medium">Brand Assets</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 min-w-fit bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden z-10 border border-gray-100 dark:border-gray-800">
          <div className="p-0.5">
            {/* Copy logo as SVG */}
            <button
              onClick={() => copyToClipboard(logoSvg, 'logo')}
              className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              <div className="w-6 h-6 flex items-center justify-center mr-2.5">
                <Image 
                  src="/code.svg" 
                  alt="Code icon" 
                  width={18} 
                  height={18}
                />
              </div>
              <span className="text-gray-500 text-sm font-medium">Copy logo as SVG</span>
            </button>

            {/* Copy brandmark as SVG */}
            <button
              onClick={() => copyToClipboard(brandmarkSvg, 'brandmark')}
              className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              <div className="w-6 h-6 flex items-center justify-center mr-2.5">
                <Image 
                  src="/hexagon.svg" 
                  alt="Hexagon icon" 
                  width={18} 
                  height={18}
                />
              </div>
              <span className="text-gray-500 text-sm font-medium">Copy brandmark as SVG</span>
            </button>

            <div className="h-px bg-gray-100 dark:bg-gray-800 -mx-0.5" />

            {/* Download BrandKit */}
            <button
              onClick={downloadBrandKit}
              className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              <div className="w-6 h-6 flex items-center justify-center mr-2.5">
                <Image 
                  src="/download.svg" 
                  alt="Download icon" 
                  width={18} 
                  height={18}
                />
              </div>
              <span className="text-gray-500 text-sm font-medium">Download BrandKit</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 