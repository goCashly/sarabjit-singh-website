'use client';
import { Fragment, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { brand } from '@/lib/brand';
import AnimatedButton from './AnimatedButton';

const CHAPTERS = brand.heroChapters;
const N = CHAPTERS.length;
const INTERVAL_MS = 5500;

export default function Hero() {
  const wrap = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const cue = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let reduced = false;
    try {
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {}
    if (reduced || N <= 1) return;

    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % N);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = cue.current;
    if (!el) return;
    const onScroll = () => {
      el.style.opacity = window.scrollY > 40 ? '0' : '1';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const v = video.current;
    const el = wrap.current;
    if (!v || !el) return;

    const FADE_BEFORE_END = 1.1;
    const fadingRef = { current: false };

    const onTimeUpdate = () => {
      if (!fadingRef.current && v.duration && v.currentTime >= v.duration - FADE_BEFORE_END) {
        fadingRef.current = true;
        gsap.to(v, { opacity: 0, duration: FADE_BEFORE_END, ease: 'power1.out' });
      }
    };

    const restart = () => {
      gsap.killTweensOf(v);
      fadingRef.current = false;
      v.style.opacity = '1';
      v.currentTime = 0;
      v.play().catch(() => {});
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) restart();
        });
      },
      { threshold: 0.15 }
    );

    // Chrome pauses muted, video-only autoplay elements "to save power" while a tab
    // is backgrounded (e.g. phone locked, app switched away). Nothing else resumes
    // it afterwards, so the hero would stay frozen on return without this.
    const onVisibility = () => {
      if (!document.hidden && v.paused) v.play().catch(() => {});
    };

    v.addEventListener('timeupdate', onTimeUpdate);
    v.addEventListener('ended', restart);
    document.addEventListener('visibilitychange', onVisibility);
    io.observe(el);

    return () => {
      v.removeEventListener('timeupdate', onTimeUpdate);
      v.removeEventListener('ended', restart);
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
    };
  }, []);

  return (
    <section
      ref={wrap}
      className="hero-stage"
      style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: 'var(--ink)' }}
    >
      <video
        ref={video}
        className="hero-video-bg"
        src="/video/hero-entrance.mp4"
        poster="/video/hero-entrance-poster.jpg"
        aria-label={`${brand.name}, ${brand.title}`}
        autoPlay
        muted
        playsInline
        preload="auto"
      />
      <div className="hero-media-shade" />

      <div className="hero-copy-col">
        <h1
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        >
          {brand.seoHeading}
        </h1>
        <div className="hero-copy-stack">
          {CHAPTERS.map((c, i) => (
            <div
              key={c.heading}
              className="hero-chapter"
              style={{
                opacity: i === current ? 1 : 0,
                transform: i === current ? 'translateY(0)' : 'translateY(18px)',
                pointerEvents: i === current ? 'auto' : 'none',
              }}
            >
              <p
                className="eyebrow"
                style={{
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textShadow: '0 2px 12px rgba(0,0,0,0.85), 0 1px 2px rgba(0,0,0,0.9)',
                }}
              >
                {c.eyebrow}
              </p>
              <p className={`hero-heading${c.heading.length > 18 ? ' hero-heading--compact' : ''}`}>{c.heading}</p>
              <p
                style={{
                  marginTop: 18,
                  maxWidth: 460,
                  color: 'var(--paper)',
                  fontWeight: 600,
                  fontSize: '1.0625rem',
                  lineHeight: 1.6,
                  textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 1px 20px rgba(0,0,0,0.7)',
                }}
              >
                {c.body.split('\n').map((line, idx) => (
                  <Fragment key={idx}>
                    {idx > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </p>
              {'cta' in c && c.cta && (
                <div style={{ marginTop: 28 }}>
                  <AnimatedButton href="/#contact">Book Appointment</AnimatedButton>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {N > 1 && (
        <div className="hero-dots" aria-label="Hero messages">
          {CHAPTERS.map((c, i) => (
            <button
              key={c.heading}
              type="button"
              aria-label={`Show message ${i + 1}: ${c.heading}`}
              aria-current={i === current}
              className={i === current ? 'active' : ''}
              onClick={() => setCurrent(i)}
            >
              {i === current && <span key={current} className="hero-dot-fill" style={{ animationDuration: `${INTERVAL_MS}ms` }} />}
            </button>
          ))}
        </div>
      )}

      <div ref={cue} className="hero-cue">
        Scroll
        <svg width="11" height="16" viewBox="0 0 11 16" fill="none" aria-hidden="true">
          <path d="M5.5 0v14.5M1 10l4.5 4.5L10 10" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </div>

      <style>{`
        .hero-video-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 38%;
          z-index: 1;
          animation: hero-kenburns 24s ease-in-out infinite alternate;
        }
        @keyframes hero-kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        .hero-media-shade {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(1, 12, 58, 0.55) 0%, rgba(1, 12, 58, 0.15) 22%, rgba(1, 12, 58, 0.2) 55%, rgba(1, 12, 58, 0.8) 100%);
        }
        .hero-copy-col {
          position: relative;
          z-index: 3;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          text-align: center;
          padding: 0 clamp(24px, 5vw, 72px) clamp(90px, 14vh, 150px);
        }
        .hero-copy-stack {
          position: relative;
          width: 100%;
          max-width: 560px;
          margin: 0;
          min-height: clamp(260px, 32vw, 360px);
        }
        .hero-chapter {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .hero-heading {
          margin-top: 14px;
          font-family: var(--font-editorial);
          font-style: italic;
          font-weight: 700;
          font-size: clamp(2.4rem, 3vw + 2vh, 4.75rem);
          line-height: 1;
          letter-spacing: 0.01em;
          background: linear-gradient(100deg, #fff 0%, #fff 35%, #fff6d8 46%, #ffffff 54%, #fff 65%, #fff 100%);
          background-size: 260% auto;
          background-position: 0% center;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.9)) drop-shadow(0 6px 34px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 46px rgba(255, 244, 214, 0.22));
          animation: hero-shine 5.5s ease-in-out infinite;
        }
        .hero-heading--compact {
          font-size: clamp(1.8rem, 2.1vw + 1.5vh, 3.25rem);
        }
        @keyframes hero-shine {
          0% { background-position: 0% center; }
          45% { background-position: 100% center; }
          100% { background-position: 100% center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-heading { animation: none; }
          .hero-video-bg { animation: none; }
        }
        .hero-cue {
          position: absolute;
          right: var(--edge);
          bottom: 36px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--paper-dim);
          font-size: 0.8125rem;
          z-index: 3;
          transition: opacity 0.4s ease;
        }
        .hero-dots {
          position: absolute;
          left: 50%;
          bottom: 36px;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hero-dots button {
          position: relative;
          width: 30px;
          height: 3px;
          border-radius: 999px;
          background: rgba(242, 239, 233, 0.28);
          border: none;
          padding: 0;
          cursor: pointer;
          overflow: hidden;
        }
        .hero-dots button.active { background: rgba(242, 239, 233, 0.28); }
        .hero-dot-fill {
          position: absolute;
          inset: 0;
          width: 0%;
          background: var(--gold);
          animation-name: hero-dot-fill;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
        @keyframes hero-dot-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-dot-fill { animation: none; width: 100%; }
        }

        @media (max-width: 880px) {
          .hero-video-bg {
            object-position: center 30%;
          }
          .hero-media-shade {
            background: linear-gradient(180deg, rgba(1, 12, 58, 0.5) 0%, rgba(1, 12, 58, 0.1) 20%, rgba(1, 12, 58, 0.35) 60%, rgba(1, 12, 58, 0.92) 100%);
          }
          .hero-copy-col {
            padding: 0 var(--edge);
            align-items: flex-end;
            justify-content: center;
            text-align: center;
            padding-bottom: 14vh;
          }
          .hero-copy-stack {
            max-width: none;
            min-height: clamp(220px, 40vh, 320px);
          }
          .hero-chapter {
            align-items: center;
          }
          .hero-dots { bottom: 24px; }
          .hero-cue { display: none; }
        }
      `}</style>
    </section>
  );
}
