import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const dimensions = pathParts[pathParts.length - 1]; // e.g., "600/400"
  
  // Create a simple SVG placeholder
  const [width, height] = dimensions.split('/').map(Number);
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f5f5f5" stroke="#e0e0e0" stroke-width="2"/>
      <text x="50%" y="50%" text-anchor="middle" dy="0.35em" font-family="JetBrains Mono, monospace" font-size="16" fill="#666">
        PROJECT IMAGE
      </text>
      <text x="50%" y="60%" text-anchor="middle" dy="0.35em" font-family="JetBrains Mono, monospace" font-size="12" fill="#999">
        ${width} × ${height}
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}