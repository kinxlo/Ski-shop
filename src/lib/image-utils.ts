"use server";

import sharp from "sharp";

export async function generateBlurDataURL(source: string): Promise<string> {
  try {
    // For local images, source might be relative, so construct full URL
    const isRelative = source.startsWith("/");
    const fullUrl = isRelative ? `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}${source}` : source;

    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();

    const blurredBuffer = await sharp(Buffer.from(buffer))
      .resize(10, 10, { withoutEnlargement: true })
      .blur(2)
      .jpeg({ quality: 20 })
      .toBuffer();

    const base64 = blurredBuffer.toString("base64");
    return `data:image/jpeg;base64,${base64}`;
  } catch {
    // Return a default small gray placeholder
    return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/vAA=";
  }
}
