"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface OGImagePreviewProps {
  assetId: string;
  alt?: string;
  className?: string;
}

export function OGImagePreview({ assetId, alt = "OG Image", className = "" }: OGImagePreviewProps) {
  const [imageError, setImageError] = useState(false);
  
  // Convert Sanity asset ID to CDN URL
  // Format: image-{hash}-{width}x{height}-{format}
  // Example: image-abc123-1200x630-png
  const getImageUrl = (id: string) => {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
    
    if (!projectId) {
      return null;
    }
    
    // Remove 'image-' prefix and extract parts
    const parts = id.replace("image-", "").split("-");
    if (parts.length < 3) {
      return null;
    }
    
    const hash = parts[0];
    const dimensions = parts[1];
    const format = parts[2];
    
    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${hash}-${dimensions}.${format}`;
  };

  const imageUrl = getImageUrl(assetId);

  if (!imageUrl || imageError) {
    return (
      <div className={`flex flex-col items-center gap-2 text-sm text-muted-foreground p-8 bg-muted rounded ${className}`}>
        <ImageIcon className="size-8" />
        <div className="text-center">
          <p className="font-medium">OG Image Generated</p>
          <p className="text-xs mt-1 font-mono">{assetId}</p>
          <p className="text-xs mt-1">Image will be visible in Sanity Studio</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={`w-full h-auto rounded shadow-sm ${className}`}
      onError={() => setImageError(true)}
    />
  );
}
