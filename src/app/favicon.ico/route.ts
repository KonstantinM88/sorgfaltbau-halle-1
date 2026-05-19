import { NextResponse } from 'next/server';

const SIZE = 32;
const HEADER_SIZE = 6;
const ENTRY_SIZE = 16;
const BMP_INFO_HEADER_SIZE = 40;
const MASK_ROW_BYTES = Math.ceil(SIZE / 32) * 4;
const MASK_SIZE = MASK_ROW_BYTES * SIZE;
const PIXEL_SIZE = SIZE * SIZE * 4;
const IMAGE_SIZE = BMP_INFO_HEADER_SIZE + PIXEL_SIZE + MASK_SIZE;
const FILE_SIZE = HEADER_SIZE + ENTRY_SIZE + IMAGE_SIZE;
const ICON_OFFSET = HEADER_SIZE + ENTRY_SIZE;

type Point = [number, number];
type Rgba = [number, number, number, number];

let cachedIcon: Buffer | null = null;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function sdRoundRect(px: number, py: number, cx: number, cy: number, halfW: number, halfH: number, radius: number) {
  const dx = Math.abs(px - cx) - (halfW - radius);
  const dy = Math.abs(py - cy) - (halfH - radius);
  const ox = Math.max(dx, 0);
  const oy = Math.max(dy, 0);
  return Math.hypot(ox, oy) + Math.min(Math.max(dx, dy), 0) - radius;
}

function blendPixel(pixels: Uint8ClampedArray, x: number, y: number, color: Rgba) {
  const [r, g, b, a] = color;
  if (x < 0 || y < 0 || x >= SIZE || y >= SIZE || a <= 0) return;

  const idx = (y * SIZE + x) * 4;
  const srcA = clamp(a);
  const dstA = pixels[idx + 3] / 255;
  const outA = srcA + dstA * (1 - srcA);
  if (outA <= 0) return;

  pixels[idx] = Math.round((r * srcA + pixels[idx] * dstA * (1 - srcA)) / outA);
  pixels[idx + 1] = Math.round((g * srcA + pixels[idx + 1] * dstA * (1 - srcA)) / outA);
  pixels[idx + 2] = Math.round((b * srcA + pixels[idx + 2] * dstA * (1 - srcA)) / outA);
  pixels[idx + 3] = Math.round(outA * 255);
}

function pointInPolygon(px: number, py: number, polygon: Point[]) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersects = yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

function drawPolygon(pixels: Uint8ClampedArray, polygon: Point[], color: Rgba) {
  const minX = Math.max(0, Math.floor(Math.min(...polygon.map(([x]) => x)) - 1));
  const maxX = Math.min(SIZE - 1, Math.ceil(Math.max(...polygon.map(([x]) => x)) + 1));
  const minY = Math.max(0, Math.floor(Math.min(...polygon.map(([, y]) => y)) - 1));
  const maxY = Math.min(SIZE - 1, Math.ceil(Math.max(...polygon.map(([, y]) => y)) + 1));

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      let coverage = 0;
      for (const [ox, oy] of [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]] as Point[]) {
        if (pointInPolygon(x + ox, y + oy, polygon)) coverage += 0.25;
      }
      if (coverage > 0) blendPixel(pixels, x, y, [color[0], color[1], color[2], color[3] * coverage]);
    }
  }
}

function drawRect(pixels: Uint8ClampedArray, x0: number, y0: number, x1: number, y1: number, color: Rgba) {
  drawPolygon(pixels, [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], color);
}

function drawBackground(pixels: Uint8ClampedArray) {
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const px = x + 0.5;
      const py = y + 0.5;
      const d = sdRoundRect(px, py, 16, 16, 15, 15, 7);
      const fill = 1 - smoothstep(-0.7, 0.8, d);
      if (fill <= 0) continue;

      const t = (x + y) / (2 * (SIZE - 1));
      const glow = Math.exp(-((px - 8) ** 2 + (py - 8) ** 2) / 65);
      blendPixel(pixels, x, y, [
        mix(4, 14, t) + glow * 18,
        mix(22, 42, t) + glow * 14,
        mix(39, 67, t) + glow * 10,
        fill,
      ]);

      const border = clamp((1 - smoothstep(-1.5, 0.7, d)) - (1 - smoothstep(-3.4, -1.0, d)));
      if (border > 0) blendPixel(pixels, x, y, [242, 100, 34, border * 0.9]);
    }
  }
}

function drawLogo(pixels: Uint8ClampedArray) {
  const white: Rgba = [248, 250, 252, 0.98];
  const grey: Rgba = [154, 162, 164, 0.95];
  const sand: Rgba = [217, 188, 162, 0.96];
  const orange: Rgba = [242, 100, 34, 0.98];

  drawPolygon(pixels, [[7, 24], [7, 12], [16, 5], [16, 9], [10.5, 13.2], [10.5, 24]], white);
  drawPolygon(pixels, [[14.2, 5.8], [28, 14], [28, 18.6], [16, 11.5], [16, 24], [12.2, 24], [12.2, 9.3]], white);

  drawPolygon(pixels, [[5.2, 24], [5.2, 16.2], [9, 14.2], [9, 24]], grey);
  drawPolygon(pixels, [[15.2, 24], [15.2, 13.2], [19.2, 15.6], [19.2, 24]], sand);

  drawRect(pixels, 22.0, 17.0, 23.2, 24.0, orange);
  drawRect(pixels, 24.0, 17.9, 25.2, 24.0, orange);
  drawRect(pixels, 26.0, 18.8, 27.2, 24.0, orange);
}

function createRgbaPixels() {
  const pixels = new Uint8ClampedArray(SIZE * SIZE * 4);
  drawBackground(pixels);
  drawLogo(pixels);
  return pixels;
}

function encodeIco(rgba: Uint8ClampedArray) {
  const out = Buffer.alloc(FILE_SIZE);

  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2);
  out.writeUInt16LE(1, 4);
  out[6] = SIZE;
  out[7] = SIZE;
  out[8] = 0;
  out[9] = 0;
  out.writeUInt16LE(1, 10);
  out.writeUInt16LE(32, 12);
  out.writeUInt32LE(IMAGE_SIZE, 14);
  out.writeUInt32LE(ICON_OFFSET, 18);

  out.writeUInt32LE(BMP_INFO_HEADER_SIZE, ICON_OFFSET);
  out.writeInt32LE(SIZE, ICON_OFFSET + 4);
  out.writeInt32LE(SIZE * 2, ICON_OFFSET + 8);
  out.writeUInt16LE(1, ICON_OFFSET + 12);
  out.writeUInt16LE(32, ICON_OFFSET + 14);
  out.writeUInt32LE(0, ICON_OFFSET + 16);
  out.writeUInt32LE(PIXEL_SIZE, ICON_OFFSET + 20);
  out.writeInt32LE(0, ICON_OFFSET + 24);
  out.writeInt32LE(0, ICON_OFFSET + 28);
  out.writeUInt32LE(0, ICON_OFFSET + 32);
  out.writeUInt32LE(0, ICON_OFFSET + 36);

  const pixelOffset = ICON_OFFSET + BMP_INFO_HEADER_SIZE;
  for (let y = 0; y < SIZE; y++) {
    const srcY = SIZE - 1 - y;
    for (let x = 0; x < SIZE; x++) {
      const src = (srcY * SIZE + x) * 4;
      const dst = pixelOffset + (y * SIZE + x) * 4;
      out[dst] = rgba[src + 2];
      out[dst + 1] = rgba[src + 1];
      out[dst + 2] = rgba[src];
      out[dst + 3] = rgba[src + 3];
    }
  }

  return out;
}

function getIconBuffer() {
  if (cachedIcon) return cachedIcon;
  cachedIcon = encodeIco(createRgbaPixels());
  return cachedIcon;
}

export function GET() {
  return new NextResponse(new Uint8Array(getIconBuffer()), {
    headers: {
      'Content-Type': 'image/x-icon',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
