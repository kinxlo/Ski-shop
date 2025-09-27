"use server";

import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

declare global {
  // eslint-disable-next-line no-var
  var __blurCache: Map<string, string> | undefined;
}

const blurCache = (globalThis.__blurCache ??= new Map<string, string>());

const DEFAULT_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/vAA=";

export async function generateBlurDataURL(source: string): Promise<string> {
  try {
    if (!source) return DEFAULT_PLACEHOLDER;

    // Avoid processing SVGs (no blur needed and sharp may be unnecessary)
    if (source.endsWith(".svg")) return DEFAULT_PLACEHOLDER;

    // Return from in-memory cache if available
    const cached = blurCache.get(source);
    if (cached) return cached;

    let imageBuffer: Buffer;

    if (source.startsWith("/")) {
      // Read local assets directly from /public to avoid an HTTP roundtrip
      const filePath = path.join(process.cwd(), "public", source.replace(/^\/+/, ""));
      imageBuffer = await readFile(filePath);
    } else {
      // Remote images: let Next.js cache the response on the server
      const init: RequestInit & { next?: { revalidate: number } } = {
        cache: "force-cache",
        // Revalidate weekly; adjust as needed
        next: { revalidate: 60 * 60 * 24 * 7 },
      };
      const response = await fetch(source, init);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`);
      }
      const array = await response.arrayBuffer();
      imageBuffer = Buffer.from(array);
    }

    const blurredBuffer = await sharp(imageBuffer)
      .resize(12, 12, { withoutEnlargement: true, fit: "inside" })
      .blur(2)
      .jpeg({ quality: 20 })
      .toBuffer();

    const base64 = blurredBuffer.toString("base64");
    const result = `data:image/jpeg;base64,${base64}`;

    blurCache.set(source, result);
    return result;
  } catch {
    // Small gray placeholder on failure
    return DEFAULT_PLACEHOLDER;
  }
}
