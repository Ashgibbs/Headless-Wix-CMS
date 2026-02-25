import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWixImageUrl(wixUrl: string | undefined): string | undefined {
  if (!wixUrl) return undefined;
  if (wixUrl.startsWith("http")) return wixUrl;
  if (wixUrl.startsWith("wix:image://v1/")) {
    const parts = wixUrl.split("/");
    if (parts.length >= 4) {
      const uri = parts[3];
      return `https://static.wixstatic.com/media/${uri}`;
    }
  }
  return wixUrl;
}
