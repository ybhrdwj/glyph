'use client';

import { useState } from 'react';
import Glyph from '../../components/Glyph';
import GlyphStatic from '../../components/GlyphStatic';

export default function GlyphExample() {
  const [lastCopied, setLastCopied] = useState<string | null>(null);

  // Example SVG strings - normally these would come from your design system
  const logoSvg = `<svg width="100" height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4L18 12L10 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M30 6H60" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M30 12H80" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M30 18H70" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`;

  const brandmarkSvg = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L30 16L16 30L2 16L16 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="16" cy="16" r="6" stroke="currentColor" stroke-width="2"/>
  </svg>`;

  // A fake URL for the brand kit download
  const brandKitUrl = '/example-brand-kit.zip';

  const handleCopy = (type: 'logo' | 'brandmark') => {
    setLastCopied(type);
    setTimeout(() => setLastCopied(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-6">Glyph Component Demo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Dropdown Version</h2>
            <p className="text-gray-500 mb-4">
              Click the button to open a dropdown menu with brand assets.
            </p>
            
            <div className="flex justify-end">
              <Glyph 
                logoSvg={logoSvg}
                brandmarkSvg={brandmarkSvg}
                brandKitUrl={brandKitUrl}
                onCopy={handleCopy}
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Static Version</h2>
            <p className="text-gray-500 mb-4">
              Always visible menu for brand assets.
            </p>
            
            <GlyphStatic 
              logoSvg={logoSvg}
              brandmarkSvg={brandmarkSvg}
              brandKitUrl={brandKitUrl}
              onCopy={handleCopy}
            />
          </div>
        </div>
        
        {lastCopied && (
          <div className="bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 p-3 rounded-lg text-sm mb-8">
            Successfully copied {lastCopied === 'logo' ? 'logo' : 'brandmark'} to clipboard!
          </div>
        )}
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-3">How to use</h2>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
            {`// Dropdown version
<Glyph
  logoSvg={logoSvg}
  brandmarkSvg={brandmarkSvg}
  brandKitUrl={brandKitUrl}
  onCopy={(type) => console.log(\`\${type} copied!\`)}
/>

// Static version
<GlyphStatic
  logoSvg={logoSvg}
  brandmarkSvg={brandmarkSvg}
  brandKitUrl={brandKitUrl}
  onCopy={(type) => console.log(\`\${type} copied!\`)}
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
} 