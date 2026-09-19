import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  aspectRatio?: '16:9' | '9:16' | 'auto';
  className?: string;
  containerClassName?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  title,
  subtitle,
  autoPlay = false,
  loop = true,
  muted: initialMuted = true,
  aspectRatio = 'auto',
  className = '',
  containerClassName = '',
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
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    };

    const handleEnded = () => {
      if (!loop) {
        setIsPlaying(false);
        setHasEnded(true);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [loop]);

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
        // Fallback if browser blocks unmuted autoplay
        video.muted = true;
        setIsMuted(true);
        video.play();
        setIsPlaying(true);
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
        style={{ filter: 'brightness(1.28) contrast(1.06) saturate(1.06)' }}
        className={`w-full h-full object-cover filter brightness-[1.28] contrast-[1.06] saturate-[1.06] transition-all duration-500 ${className}`}
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
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-red-500 font-bold block mb-0.5">
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

      {/* Center Big Play / Pause Overlay */}
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
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-20 flex flex-col gap-2 transition-opacity duration-300 ${
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
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={toggleMute}
              className="hover:text-white transition-colors p-1"
              title={isMuted ? 'Unmute' : 'Mute'}
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
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MotorcycleVideo } from './MotorcycleVideo';
