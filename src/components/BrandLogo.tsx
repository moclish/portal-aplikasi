import React, { useState } from 'react';
import { School } from 'lucide-react';
import { getGoogleDriveDirectImageUrl } from '../utils/driveHelper.ts';

interface BrandLogoProps {
  customLogoUrl?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  customLogoUrl,
  className = '',
  size = 'md',
}) => {
  const [imageError, setImageError] = useState(false);
  const directUrl = customLogoUrl ? getGoogleDriveDirectImageUrl(customLogoUrl) : '';

  const sizeClasses = {
    sm: 'w-9 h-9 sm:w-10 sm:h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  if (directUrl && !imageError) {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        <img
          src={directUrl}
          alt="Logo Al-Furqan"
          className={`${sizeClasses[size]} object-contain transition-transform duration-300 hover:scale-105`}
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  // Clean emblem fallback with soft blue gradient (no green dot, transparent frame)
  return (
    <div
      className={`relative group flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 text-white shadow-sm shadow-sky-500/20 ring-1 ring-white/60 dark:ring-sky-400/20 transition-all duration-300 group-hover:scale-105 shrink-0 ${sizeClasses[size]} ${className}`}
    >
      <div className="flex items-center justify-center">
        <School className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-xs" />
      </div>
    </div>
  );
};
