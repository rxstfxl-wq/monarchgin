import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ButterflyMonogram } from './MonarchLogo';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

export const HeroParallax: React.FC = () => {
  const { setCurrentPage } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // User specified video: public/Media/Gin.mp4
  const [mediaType, setMediaType] = useState<'video' | 'ambient-canvas' | 'custom-image'>('video');
  const [customMediaUrl, setCustomMediaUrl] = useState<string>('/Media/Gin.mp4');
  const [showMediaSwitcher, setShowMediaSwitcher] = useState<boolean>(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    const container = containerRef.current;
    const media = mediaRef.current;
    const text = textRef.current;
    const indicator = scrollIndicatorRef.current;

    if (!container || !media || !text) return;

    const ctx = gsap.context(() => {
      // Pin the hero section briefly and animate background & text at different speeds
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      timeline
        // Scale and shift the 16:9 media layer
        .to(media, {
          scale: 1.08,
          y: '8%',
          ease: 'none',
        }, 0)
        // Move foreground text upward faster than the media
        .to(text, {
          y: '-25%',
          opacity: 0.85,
          ease: 'none',
        }, 0)
        // Fade out the scroll prompt quickly
        .to(indicator, {
          opacity: 0,
          y: -20,
          ease: 'power1.out',
        }, 0);
    }, container);

    return () => ctx.revert();
  }, []);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomMediaUrl(url);
      setMediaType(file.type.startsWith('video') ? 'video' : 'custom-image');
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#262621] flex items-center justify-center"
    >
      {/* 16:9 (1920x1080) Cinematic Media Container */}
      <div
        ref={mediaRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform pointer-events-none"
      >
        <div className="relative w-full h-full max-w-full aspect-[16/9] min-w-full min-h-full">
          {mediaType === 'video' ? (
            <video
              key={customMediaUrl || '/Media/Gin.mp4'}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={customMediaUrl || '/Media/Gin.mp4'} type="video/mp4" />
              <source src="/Media/Gin.mp4" type="video/mp4" />
              <source src="public/Media/Gin.mp4" type="video/mp4" />
            </video>
          ) : mediaType === 'custom-image' && customMediaUrl ? (
            <img
              src={customMediaUrl}
              alt="Monarch Gin Hero"
              className="w-full h-full object-cover"
            />
          ) : (
            /* Cinematic Atmospheric Ocean & Beach Water interaction stage */
            <div className="relative w-full h-full bg-[#1F1F1B] overflow-hidden">
              {/* Warm sand and wet travertine ground texture */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#262621] via-[#352F27] to-[#1F1F1B] opacity-95" />

              {/* Simulated slow-motion shallow water ripples and foam layers */}
              <div
                className="absolute inset-0 opacity-40 mix-blend-screen"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 60%, rgba(225, 201, 176, 0.35) 0%, rgba(173, 98, 48, 0.15) 45%, transparent 70%),
                    radial-gradient(circle at 20% 40%, rgba(225, 201, 176, 0.2) 0%, transparent 50%),
                    radial-gradient(circle at 80% 50%, rgba(100, 106, 66, 0.25) 0%, transparent 60%)`,
                }}
              />

              {/* Water surface glint & gentle wave texture */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/10 via-stone-900/40 to-stone-950/80" />

              {/* Product silhouettes and botanical shadows in the water */}
              <div className="absolute inset-0 flex items-center justify-center opacity-85">
                <div className="flex items-end justify-center gap-12 md:gap-24 translate-y-12 md:translate-y-16 scale-90 md:scale-100">
                  <div className="relative group">
                    <img
                      src="/assets/brand/cactus-gin.webp"
                      alt="Cactus Gin in shallow coastal tide"
                      className="h-[380px] md:h-[480px] w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] filter brightness-95 contrast-105"
                    />
                    {/* Water reflection */}
                    <div className="absolute -bottom-16 left-0 right-0 h-20 bg-gradient-to-t from-transparent to-[#262621]/80 backdrop-blur-xs opacity-60 transform scale-y-[-0.6]" />
                  </div>
                  <div className="relative group hidden sm:block">
                    <img
                      src="/assets/brand/lavender-gin.webp"
                      alt="Lavender & Mint Gin in shallow coastal tide"
                      className="h-[380px] md:h-[480px] w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] filter brightness-90 contrast-105"
                    />
                    {/* Water reflection */}
                    <div className="absolute -bottom-16 left-0 right-0 h-20 bg-gradient-to-t from-transparent to-[#262621]/80 backdrop-blur-xs opacity-60 transform scale-y-[-0.6]" />
                  </div>
                </div>
              </div>

              {/* Atmospheric subtle dust/pollen & light wash */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#262621]/60 via-transparent to-[#262621]/90" />
            </div>
          )}
        </div>
      </div>

      {/* Atmospheric Scrim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#262621]/40 via-transparent to-[#262621]/80 pointer-events-none" />

      {/* Foreground Editorial Typography Overlay */}
      <div
        ref={textRef}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center text-[#E1C9B0] will-change-transform flex flex-col items-center"
      >
        <div className="mb-4 inline-flex items-center gap-3">
          <span className="h-[1px] w-8 bg-[#E1C9B0]/40" />
          <img
            src="/logo/Monarch Logo Mark 2026 - White.svg"
            alt="MONARCH GIN"
            className="h-[50px] md:h-[60px] w-auto object-contain scale-125"
          />
          <span className="h-[1px] w-8 bg-[#E1C9B0]/40" />
        </div>

        <h1
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.16em] uppercase font-normal text-white mb-4 text-balance"
          style={{ color: '#ffffff' }}
        >
          MONARCH
        </h1>

        <p
          className="font-sans text-xs sm:text-sm md:text-base tracking-[0.32em] uppercase font-light text-white max-w-xl mx-auto mb-8"
          style={{ color: '#ffffff' }}
        >
          A SPIRIT FOR WHAT COMES NEXT.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
          <button
            onClick={() => setCurrentPage('shop')}
            style={{ color: '#ffffff', backgroundColor: '#646A48' }}
            className="px-8 py-3.5 bg-[#646A48] text-white text-xs font-sans tracking-[0.24em] uppercase font-medium hover:bg-[#52573B] transition-colors duration-200 border border-white/20"
          >
            Explore the Collection
          </button>
          <button
            onClick={() => setCurrentPage('about')}
            style={{ borderColor: '#ffffff', color: '#ffffff' }}
            className="px-8 py-3.5 border border-white text-white text-xs font-sans tracking-[0.24em] uppercase font-medium hover:bg-white/10 transition-colors duration-200"
          >
            The Brand Story
          </button>
        </div>
      </div>

      {/* Scroll indicator prompt */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center justify-center text-[#E1C9B0]/70 pointer-events-none"
      >
        <span className="text-[10px] font-sans tracking-[0.3em] uppercase mb-2">
          SCROLL TO DISCOVER
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#E1C9B0]/80 to-transparent animate-pulse" />
      </div>

      {/* Provisioned 16:9 Media Switcher (Discreet control in bottom-right corner) */}
      <div className="absolute bottom-4 right-4 z-30">
        <button
          onClick={() => setShowMediaSwitcher(!showMediaSwitcher)}
          className="text-[10px] font-sans tracking-wider uppercase px-2.5 py-1 bg-[#262621]/80 text-[#E1C9B0]/60 hover:text-[#E1C9B0] border border-[#E1C9B0]/20 backdrop-blur-sm transition-colors"
          title="Provision 16:9 Video/Image Media"
        >
          {showMediaSwitcher ? 'Close Media Slot' : '16:9 Media Slot'}
        </button>

        {showMediaSwitcher && (
          <div className="absolute bottom-9 right-0 w-72 bg-[#262621] border border-[#E1C9B0]/30 p-4 shadow-xl text-left text-xs text-[#E1C9B0]">
            <p className="font-serif text-sm mb-1 text-[#E1C9B0]">16:9 Landing Parallax Media</p>
            <p className="text-[10px] text-[#E1C9B0]/60 mb-3">
              Upload your 16:9 video or high-res image (1920×1080px) to preview seamlessly with the pinned parallax:
            </p>

            <label className="block mb-2 cursor-pointer bg-[#E1C9B0]/10 hover:bg-[#E1C9B0]/20 border border-[#E1C9B0]/30 p-2 text-center text-[11px] uppercase tracking-wider transition-colors">
              <span>Choose File (MP4 / WebM / JPG)</span>
              <input
                type="file"
                accept="video/*,image/*"
                onChange={handleMediaUpload}
                className="hidden"
              />
            </label>

            <div className="mt-2 flex items-center justify-between text-[10px]">
              <button
                onClick={() => {
                  setMediaType('ambient-canvas');
                  setCustomMediaUrl('');
                }}
                className="text-[#AD6230] hover:underline"
              >
                Reset to Default
              </button>
              <span className="text-[#E1C9B0]/40">1920×1080</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
