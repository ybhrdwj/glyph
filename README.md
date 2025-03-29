# Glyph

A modern web application built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Geist
- **Code Highlighting**: Shiki
- **Development Tools**: ESLint, PostCSS, Autoprefixer

## Prerequisites

- Node.js (version specified in package.json)
- npm or yarn package manager

## Getting Started

1. Clone the repository:
```bash
git clone [your-repository-url]
cd glyph
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

Glyph is a brand asset management component that allows you to:
- Display and manage logo and brandmark assets
- Copy SVG code for both logo and brandmark
- Access brand kit resources
- Customize the appearance and behavior of the component

### Component Props

```typescript
interface GlyphProps {
  logoSvg: string;          // SVG code for the logo
  brandmarkSvg: string;     // SVG code for the brandmark
  brandKitUrl: string;      // URL to the brand kit
  onCopy?: (type: 'logo' | 'brandmark') => void;  // Callback when copying assets
  isOpen?: boolean;         // Control the open state of the component
  onOpenChange?: (open: boolean) => void;  // Callback when open state changes
}
```

### Example Usage

```tsx
import Glyph from './components/Glyph';

function App() {
  return (
    <Glyph
      logoSvg="<svg>...</svg>"
      brandmarkSvg="<svg>...</svg>"
      brandKitUrl="https://example.com/brand-kit"
      onCopy={(type) => console.log(`Copied ${type}`)}
    />
  );
}
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
glyph/
├── src/              # Source code
├── public/           # Static assets
├── .next/           # Next.js build output
└── node_modules/    # Dependencies
```

## Development

The project uses:
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code linting
- Shiki for code syntax highlighting
- Geist font for typography

## License

[Your chosen license]

## Contributing

[Your contribution guidelines]
