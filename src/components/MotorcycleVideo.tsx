import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, AlertCircle } from 'lucide-react';

export interface MotorcycleVideoProps {
  src: string;
  poster?: string;
  fallbackImage?: string;
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  showControlsBar?: boolean;
  aspectRatio?: '16:9' | '9:16' | 'auto';
  className?: string;
  containerClassName?: string;
  brightness?: number;
  contrast?: number;
  saturation?: number;
  onError?: () => void;
}

/**
 * Universal Motorcycle Video Component for MotoVerse.
 * Standardises video playback across Hero, Brand Pages, Showroom Stages, and Modals.
 * Features:
 * - Subtle default brightness boost (1.16x) with rich contrast and paint saturation
 * - Resilient autoplay with muted fallback
 * - Integrated play/pause, volume, scrubber, and fullscreen controls
 * - Graceful fallback to motorcycle showroom photograph on load error
 */
export const MotorcycleVideo: React.FC<MotorcycleVideoProps> = ({
  src,
  poster,
  fallbackImage,
  title,
  subtitle,
  autoPlay = true,
  loop = true,
  muted: initialMuted = true,
  showControlsBar = true,
  aspectRatio = 'auto',
  className = '',
  containerClassName = '',
  brightness = 1.16,
  contrast = 1.05,
  saturation = 1.04,
  onError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset error state if src changes
  useEffect(() => {
    setHasError(false);
    setIsPlaying(autoPlay);
  }, [src, autoPlay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
        setCurrentTime(video.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      if (autoPlay) {
        video.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // If browser restricts unmuted autoplay, mute and retry
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        });
      }
    };

    const handleEnded = () => {
      if (!loop) {
        setIsPlaying(false);
        setHasEnded(true);
      }
    };

    const handleErrorEvent = () => {
      setHasError(true);
      if (onError) onError();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleErrorEvent);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleErrorEvent);
    };
  }, [loop, autoPlay, onError, src]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => {
        setIsPlaying(true);
        setHasEnded(false);
      }).catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().then(() => setIsPlaying(true));
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    const bar = e.currentTarget;
    if (!video || !bar) return;

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    video.currentTime = ratio * video.duration;
    setProgress(ratio * 100);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2500);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const aspectClass =
    aspectRatio === '16:9'
      ? 'aspect-video'
      : aspectRatio === '9:16'
      ? 'aspect-[9/16] max-w-sm mx-auto'
      : 'aspect-video sm:aspect-auto';

  // Fallback if video failed to load
  if (hasError) {
    const fallbackSrc = fallbackImage || poster;
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-[#090b0f] border border-[#222631] flex items-center justify-center p-6 ${aspectClass} ${containerClassName}`}
      >
        {fallbackSrc ? (
          <img
            src={fallbackSrc}
            alt={title || 'Motorcycle showcase'}
            className="w-full h-full object-contain filter brightness-105"
          />
        ) : (
          <div className="text-center p-8">
            <AlertCircle className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
              {title || 'Media Currently Unavailable'}
            </p>
          </div>
        )}
      </div>
    );
  }

  const filterStyle = {
    filter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturation})`
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onClick={togglePlay}
      className={`relative group overflow-hidden rounded-2xl bg-[#090b0f] border border-[#222631] cursor-pointer select-none ${aspectClass} ${containerClassName}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={isMuted}
        playsInline
        preload="metadata"
        style={filterStyle}
        className={`w-full h-full object-cover transition-all duration-500 ${className}`}
      />

      {/* Top Title Overlay */}
      {(title || subtitle) && (
        <div
          className={`absolute top-4 left-4 right-4 z-10 flex items-start justify-between pointer-events-none transition-opacity duration-300 ${
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div>
            {subtitle && (
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-red-500 font-bold block mb-0.5 drop-shadow">
                {subtitle}
              </span>
            )}
            {title && (
              <h4 className="text-xs sm:text-sm font-bold text-white font-mono tracking-wide drop-shadow-md">
                {title}
              </h4>
            )}
          </div>
          <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest bg-red-600/90 text-white font-bold shadow-md">
            HD REEL
          </span>
        </div>
      )}

      {/* Center Play / Pause Indicator */}
      <div
        className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-all duration-300 ${
          !isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-[0_0_35px_rgba(229,9,20,0.6)] backdrop-blur-sm border border-red-400/40">
          {hasEnded ? (
            <RotateCcw className="w-7 h-7 sm:w-8 sm:h-8" />
          ) : (
            <Play className="w-7 h-7 sm:w-8 sm:h-8 translate-x-0.5 fill-white" />
          )}
        </div>
      </div>

      {/* Bottom Control Bar */}
      {showControlsBar && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-20 flex flex-col gap-2 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/40 to-transparent ${
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Progress Bar */}
          <div
            onClick={handleSeek}
            className="relative h-1.5 w-full bg-white/20 hover:h-2.5 rounded-full cursor-pointer transition-all overflow-hidden group/bar"
          >
            <div
              className="absolute top-0 left-0 bottom-0 bg-red-600 transition-all rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Action Buttons & Time */}
          <div className="flex items-center justify-between text-xs text-neutral-300 font-mono">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="hover:text-white transition-colors p-1"
                title={isPlaying ? 'Pause' : 'Play'}
                type="button"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                onClick={toggleMute}
                className="hover:text-white transition-colors p-1"
                title={isMuted ? 'Unmute' : 'Mute'}
                type="button"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>

              <span className="text-[11px] text-neutral-400">
                {formatTime(currentTime)} / {formatTime(duration || 0)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                className="hover:text-white transition-colors p-1"
                title="Fullscreen"
                type="button"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
