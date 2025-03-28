'use client';

import { useState } from 'react';
import Glyph from '../components/Glyph';
import GlyphStatic from '../components/GlyphStatic';
import Image from 'next/image';

export default function GlyphExample() {
  const [lastCopied, setLastCopied] = useState<string | null>(null);
  const [npmCopied, setNpmCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
              href="https://github.com/yourusername/glyph" 
              className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-200 text-gray-900 rounded-md hover:bg-gray-50 flex items-center justify-center sm:justify-start gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.203 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2z" />
              </svg>
              Github
            </a>
          </div>
        </div>

        {/* Installation */}
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-medium">Installation</h3>
          <div className="bg-gray-50 p-3 sm:p-4 rounded-md flex items-center justify-between">
            <code className="text-xs sm:text-sm">npm install glyph-kit</code>
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
          <h3 className="text-base sm:text-lg font-medium">Usage</h3>
          <div className="bg-gray-50 p-3 sm:p-4 rounded-md overflow-x-auto">
            <pre className="text-xs sm:text-sm">
              <code>{`import { Glyph } from 'glyph-kit';

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
</div>`}</code>
            </pre>
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