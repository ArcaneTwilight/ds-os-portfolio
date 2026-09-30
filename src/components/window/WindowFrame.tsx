import React, { useRef, useState, useEffect } from 'react';
import { Minus, Square, Copy, X, LucideIcon } from 'lucide-react';
import { AppId, BlurLevel } from '../../types/os';
import { soundManager } from '../../utils/audio';

interface WindowFrameProps {
  id: AppId;
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minSize: { width: number; height: number };
  glassBlur: BlurLevel;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximizeToggle: () => void;
  onUpdatePosition: (pos: { x: number; y: number }) => void;
  onUpdateSize: (size: { width: number; height: number }) => void;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  id,
  title,
  icon: Icon,
  iconColor = 'text-sky-400',
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  position,
  size,
  minSize,
  glassBlur,
  onFocus,
  onClose,
  onMinimize,
  onMaximizeToggle,
  onUpdatePosition,
  onUpdateSize,
  children
}) => {
  const windowRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const isVisible = isOpen && !isMinimized;
  const [shouldRender, setShouldRender] = useState(isVisible);

  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isSmallViewport, setIsSmallViewport] = useState(() => window.innerWidth <= 1024);
  const viewportMaximized = isMaximized || isSmallViewport;

  useEffect(() => {
    const updateViewport = () => setIsSmallViewport(window.innerWidth <= 1024);
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      return;
    }
    if (!shouldRender) return;

    const timeoutId = window.setTimeout(() => setShouldRender(false), isMinimized ? 260 : 220);
    return () => window.clearTimeout(timeoutId);
  }, [isVisible, isMinimized, shouldRender]);

  // Blur class mapping
  const getBlurClass = () => {
    switch (glassBlur) {
      case 'low':
        return 'backdrop-blur-md bg-black/60';
      case 'ultra':
        return 'backdrop-blur-3xl bg-black/45';
      case 'medium':
      default:
        return 'backdrop-blur-2xl bg-black/55';
    }
  };

  // Dragging handlers
  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (viewportMaximized) return;
    if ((e.target as HTMLElement).closest('button')) return; // Ignore clicks on window control buttons

    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    e.preventDefault();
  };

  // Resizing handlers
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (viewportMaximized) return;
    e.stopPropagation();
    e.preventDefault();
    onFocus();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const topBarHeight = 40;
        const margin = 10;
        const newX = Math.max(margin, Math.min(window.innerWidth - size.width - margin, e.clientX - dragOffset.x));
        const newY = Math.max(topBarHeight + 5, Math.min(window.innerHeight - 80, e.clientY - dragOffset.y));
        onUpdatePosition({ x: newX, y: newY });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        const newWidth = Math.max(minSize.width, Math.min(window.innerWidth - position.x - 10, resizeStart.width + deltaX));
        const newHeight = Math.max(minSize.height, Math.min(window.innerHeight - position.y - 70, resizeStart.height + deltaY));
        onUpdateSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
      if (isResizing) setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeStart, position, size, minSize, onUpdatePosition, onUpdateSize]);

  if (!shouldRender && !isVisible) return null;

  const style: React.CSSProperties = viewportMaximized
    ? {
        position: 'fixed',
        top: isSmallViewport ? 40 : 44,
        left: isSmallViewport ? 0 : 8,
        right: isSmallViewport ? 0 : 8,
        bottom: isSmallViewport ? 76 : undefined,
        zIndex,
        width: isSmallViewport ? '100vw' : 'calc(100vw - 16px)',
        height: isSmallViewport ? 'calc(100dvh - 132px)' : 'calc(100vh - 132px)'
      }
    : {
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex
      };

  return (
    <div
      ref={windowRef}
      style={style}
      onMouseDown={() => {
        onFocus();
        soundManager.playClick(900, 0.015);
      }}
      className={`window-frame flex flex-col rounded-2xl border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] ${getBlurClass()} overflow-hidden select-text ${
        isVisible ? 'window-frame-visible' : 'window-frame-exit'
      } ${
        isDragging || isResizing ? '' : 'transition-[top,left,right,width,height,box-shadow,border-color] duration-200 ease-out'
      } ${
        isDragging ? 'opacity-95 ring-1 ring-sky-400/40' : ''
      } ${isMinimized ? 'window-frame-minimized' : ''}`}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleTitleMouseDown}
        onDoubleClick={onMaximizeToggle}
        className="h-10 px-3.5 bg-white/5 border-b border-white/10 flex items-center justify-between select-none cursor-grab active:cursor-grabbing shrink-0"
      >
        {/* Left: Window Controls (Minimal elegant circles/buttons) */}
        <div className="flex items-center gap-2">
          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClick(440, 0.03);
              onClose();
            }}
            title="Close"
            className="w-3.5 h-3.5 rounded-full bg-rose-500/80 hover:bg-rose-500 flex items-center justify-center text-rose-950 transition-colors group/btn shadow-xs"
            aria-label="Close Window"
          >
            <X className="w-2.5 h-2.5 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
          </button>

          {/* Minimize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClick(500, 0.03);
              onMinimize();
            }}
            title="Minimize"
            className="w-3.5 h-3.5 rounded-full bg-amber-500/80 hover:bg-amber-500 flex items-center justify-center text-amber-950 transition-colors group/btn shadow-xs"
            aria-label="Minimize Window"
          >
            <Minus className="w-2.5 h-2.5 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClick(600, 0.03);
              onMaximizeToggle();
            }}
            title={viewportMaximized ? 'Restore' : 'Maximize'}
            className="window-maximize-control w-3.5 h-3.5 rounded-full bg-emerald-500/80 hover:bg-emerald-500 flex items-center justify-center text-emerald-950 transition-colors group/btn shadow-xs"
            aria-label={viewportMaximized ? 'Restore Window' : 'Maximize Window'}
          >
            {viewportMaximized ? (
              <Copy className="w-2 h-2 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            ) : (
              <Square className="w-2 h-2 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            )}
          </button>
        </div>

        {/* Center: Title & Icon */}
        <div className="flex items-center gap-2 max-w-[60%] min-w-0">
          <Icon className={`w-4 h-4 shrink-0 ${iconColor}`} />
          <span className="text-xs font-semibold text-slate-200 truncate tracking-wide">
            {title}
          </span>
        </div>

        {/* Right: Window Status Indicator */}
        <div className="w-12 flex justify-end items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>
      </div>

      {/* Window Content */}
      <div className="window-content-surface flex-1 overflow-auto bg-black/25 flex flex-col min-h-0 text-slate-200">
        {children}
      </div>

      {/* Corner Resize Handle */}
      {!viewportMaximized && (
        <div
          onMouseDown={handleResizeMouseDown}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-0.5 select-none opacity-40 hover:opacity-100 transition-opacity"
          title="Resize window"
        >
          <svg className="w-2.5 h-2.5 text-white/50" viewBox="0 0 10 10" fill="currentColor">
            <path d="M8 8H10V10H8V8ZM5 8H7V10H5V8ZM8 5H10V7H8V5ZM2 8H4V10H2V8ZM5 5H7V7H5V5ZM8 2H10V4H8V2Z" />
          </svg>
        </div>
      )}
    </div>
  );
};
