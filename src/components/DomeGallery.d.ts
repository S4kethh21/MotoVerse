import React from 'react';

export interface DomeImageItem {
  src: string;
  alt?: string;
  bikeId?: string;
  bikeUrl?: string;
}

export interface DomeGalleryProps {
  images?: (string | DomeImageItem)[];
  fit?: number;
  fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
  onSelectBike?: (bikeId: string, url: string) => void;
}

declare const DomeGallery: React.FC<DomeGalleryProps>;
export default DomeGallery;
