import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { VideoPlayer } from './VideoPlayer';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  poster?: string;
  title?: string;
  subtitle?: string;
  aspectRatio?: '16:9' | '9:16' | 'auto';
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoSrc,
  poster,
  title,
  subtitle,
  aspectRatio = 'auto',
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center justify-center animate-scaleUp"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 sm:right-0 p-2.5 rounded-full bg-white/10 hover:bg-red-600 text-white transition-all z-20"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player */}
        <div className="w-full">
          <VideoPlayer
            src={videoSrc}
            poster={poster}
            title={title}
            subtitle={subtitle}
            aspectRatio={aspectRatio}
            autoPlay={true}
            loop={true}
            muted={false}
            containerClassName="shadow-[0_20px_60px_rgba(0,0,0,0.9)] max-h-[82vh]"
          />
        </div>
      </div>
    </div>
  );
};
