import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getContrastColor(hex: string) {
  if (!hex) return "#000000";
  // Normalize hex
  const h = hex.replace('#', '');
  const r = parseInt(h.length === 3 ? h[0] + h[0] : h.substring(0,2), 16);
  const g = parseInt(h.length === 3 ? h[1] + h[1] : h.substring(2,4), 16);
  const b = parseInt(h.length === 3 ? h[2] + h[2] : h.substring(4,6), 16);

  // Calculate luminance (relative luminance in sRGB)
  const srgb = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  const lum = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];

  // Return black for light backgrounds, white for dark backgrounds
  return lum > 0.179 ? '#000000' : '#ffffff';
}
