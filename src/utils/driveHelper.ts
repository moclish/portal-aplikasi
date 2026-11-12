/**
 * Helper utility to convert Google Drive share links into direct embeddable image URLs.
 * Preserves PNG transparency without transcoding to JPEG or adding black background.
 */

export function extractGoogleDriveId(urlOrId: string): string | null {
  if (!urlOrId) return null;
  const trimmed = urlOrId.trim();

  // If it's already an ID (alphanumeric with hyphens/underscores, typical length 25-50)
  if (/^[a-zA-Z0-9_-]{25,50}$/.test(trimmed)) {
    return trimmed;
  }

  // Regex patterns for Google Drive URL formats:
  // 1. /file/d/FILE_ID/...
  const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch && fileDMatch[1]) {
    return fileDMatch[1];
  }

  // 2. id=FILE_ID
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) {
    return idParamMatch[1];
  }

  // 3. lh3.googleusercontent.com/d/FILE_ID
  const lh3Match = trimmed.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
  if (lh3Match && lh3Match[1]) {
    return lh3Match[1];
  }

  return null;
}

/**
 * Returns a fast direct preview URL for images hosted on Google Drive.
 * Uses `https://lh3.googleusercontent.com/d/{id}` directly, which preserves
 * full PNG alpha transparency without converting transparent pixels to black.
 */
export function getGoogleDriveDirectImageUrl(urlOrId: string): string {
  if (!urlOrId) return '';
  const fileId = extractGoogleDriveId(urlOrId);

  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return urlOrId.trim();
}

/**
 * Check if a URL is a Google Drive link
 */
export function isGoogleDriveUrl(url: string): boolean {
  if (!url) return false;
  return /drive\.google\.com|googleusercontent\.com/.test(url);
}
