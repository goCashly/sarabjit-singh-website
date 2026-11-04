'use client';

import { useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Award,
  Gem,
  Diamond as DiamondIcon,
  PhoneCall,
  Handshake,
  ChartNoAxesCombined,
  CheckCheck,
  Zap,
  Megaphone,
  Crown,
  FlagTriangleRight,
  CalendarCheck,
} from 'lucide-react';
import { brand } from '@/lib/brand';
import Reveal from './Reveal';
import AnimatedButton from './AnimatedButton';

const TIER_ICON: Record<string, LucideIcon> = {
  Gold: Award,
  Silver: Gem,
  Diamond: DiamondIcon,
};

const PERK_ICONS: Record<string, LucideIcon[]> = {
  Gold: [PhoneCall, Handshake, ChartNoAxesCombined],
  Silver: [CheckCheck, Zap, Megaphone],
  Diamond: [CheckCheck, Crown, FlagTriangleRight, CalendarCheck],
};

const TIER_LABEL: Record<string, string> = {
  Gold: '01 / PARTNER',
  Silver: '02 / PREFERRED',
  Diamond: '03 / ELITE',
};

const TIER_ACCENT: Record<string, { accent: string; edge: string; bg1: string; bg2: string; glow: string }> = {
  Gold: { accent: '#e7c17a', edge: '#87652d', bg1: '#3b3021', bg2: '#14120f', glow: '#d6a34b30' },
  Silver: { accent: '#d8e1ed', edge: '#748294', bg1: '#394350', bg2: '#151b24', glow: '#b6c8df30' },
  Diamond: { accent: '#a9e3ff', edge: '#64b9ed', bg1: '#213d5b', bg2: '#091322', glow: '#62c8ff45' },
};

function TierCard({ children, accent }: { children: React.ReactNode; accent: (typeof TIER_ACCENT)[string] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedRef = useRef<boolean | null>(null);

  const prefersReduced = () => {
    if (reducedRef.current === null) {
      try {
        reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      } catch {
        reducedRef.current = false;
      }
    }
    return reducedRef.current;
  };

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || prefersReduced()) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateY(${x * 13}deg) rotateX(${-y * 13}deg) translateY(-8px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0px)';
  };

  return (
    <div
      ref={ref}
      className="pr-card"
      style={
        {
          '--pr-accent': accent.accent,
          '--pr-edge': accent.edge,
          '--pr-bg1': accent.bg1,
          '--pr-bg2': accent.bg2,
          '--pr-glow': accent.glow,
        } as React.CSSProperties
      }
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </div>
  );
}

export default function LoyaltyProgram() {
  return (
    <section className="pr-rewards">
      <Reveal>
        <div className="pr-head">
          <p className="eyebrow pr-eyebrow">{brand.loyaltyEyebrow}</p>
          <h2 className="pr-h2">{brand.loyaltyHeading}</h2>
          <p className="pr-intro">{brand.loyaltyIntro}</p>
        </div>
      </Reveal>

      <div className="pr-cards">
        {brand.loyaltyTiers.map((t) => {
          const accent = TIER_ACCENT[t.tier] ?? TIER_ACCENT.Gold;
          const TierIcon = TIER_ICON[t.tier] ?? Award;
          const perkIcons = PERK_ICONS[t.tier] ?? [];
          const featured = 'featured' in t && t.featured;
          return (
            <Reveal key={t.tier}>
              <TierCard accent={accent}>
                {featured && <span className="pr-top-tier">Top Tier</span>}
                <p className="pr-tier-label">{TIER_LABEL[t.tier] ?? t.tier}</p>

                <div className="pr-tier-icon">
                  <TierIcon aria-hidden="true" />
                </div>

                <h3 className="pr-tier-name">{t.tier}</h3>
                <p className="pr-requirement">{t.unlock}</p>

                <div className="pr-divider" />

                <ul className="pr-benefits">
                  {t.perks.map((perk, i) => {
                    const PerkIcon = perkIcons[i] ?? CheckCheck;
                    return (
                      <li key={perk}>
                        <PerkIcon aria-hidden="true" />
                        <span>{perk}</span>
                      </li>
                    );
                  })}
                </ul>

                <div className="pr-card-bottom">{t.tier.toUpperCase()} PARTNER</div>
              </TierCard>
            </Reveal>
          );
        })}
      </div>

      <p className="pr-footnote">No referral fees, commissions, or cash of any kind change hands — status is earned purely through referrals sent, nothing more.</p>

      <div className="pr-cta">
        <AnimatedButton href={`mailto:${brand.email}?subject=${encodeURIComponent("Let's discuss a deal")}`}>
          Discuss A Deal With Me
        </AnimatedButton>
      </div>

      <style>{`
        .pr-rewards {
          position: relative;
          padding: clamp(72px, 12vh, 140px) var(--edge);
          background:
            radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,162,74,0.1) 0%, rgba(201,162,74,0) 70%),
            var(--ink);
          border-top: 1px solid var(--line);
          overflow: hidden;
        }
        .pr-head { max-width: 640px; margin: 0 auto clamp(48px, 7vh, 88px); text-align: center; }
        .pr-eyebrow { display: block; letter-spacing: 0.2em; text-transform: uppercase; }
        .pr-h2 {
          font-family: var(--font-editorial); font-style: italic; font-weight: 400;
          font-size: clamp(2rem, 3.6vw, 3.5rem); line-height: 1.08; color: var(--paper); margin: 16px 0 0;
        }
        .pr-intro { margin: 18px auto 0; color: var(--paper-dim); font-size: 1.0625rem; line-height: 1.65; max-width: 560px; }

        .pr-cards {
          max-width: 1200px; margin: 0 auto; display: grid;
          grid-template-columns: repeat(3, 1fr); gap: 24px; perspective: 1400px;
        }

        .pr-card {
          position: relative; padding: 32px 26px; height: 100%; min-height: 520px; border-radius: 22px;
          background: linear-gradient(145deg, var(--pr-bg1), var(--pr-bg2));
          border: 1px solid var(--pr-edge);
          box-shadow: 0 24px 55px rgba(0,0,0,0.5);
          transform-style: preserve-3d;
          transition: transform 0.25s ease, box-shadow 0.3s ease;
          overflow: hidden;
        }
        .pr-card::before {
          content: ''; position: absolute; inset: -100%;
          background: linear-gradient(110deg, transparent 44%, rgba(255,255,255,0.12) 49%, rgba(255,255,255,0.27) 50%, transparent 56%);
          transform: translateX(-45%) rotate(12deg);
          transition: transform 0.8s;
          pointer-events: none;
        }
        .pr-card:hover::before { transform: translateX(45%) rotate(12deg); }
        .pr-card:hover { box-shadow: 0 35px 65px rgba(0,0,0,0.73), 0 0 40px var(--pr-glow); }

        .pr-top-tier {
          position: absolute; top: 23px; right: 20px; color: var(--pr-accent);
          border: 1px solid var(--pr-edge); padding: 7px 12px; border-radius: 30px;
          font-size: 0.625rem; letter-spacing: 0.08em; text-transform: uppercase;
        }
        .pr-tier-label { color: var(--pr-accent); font-size: 0.6875rem; letter-spacing: 0.18em; font-weight: 700; margin: 0; }
        .pr-tier-icon {
          width: 100px; height: 100px; margin: 28px auto 18px; display: flex; align-items: center;
          justify-content: center; color: var(--pr-accent);
          filter: drop-shadow(0 8px 12px var(--pr-glow));
          animation: pr-float 4s ease-in-out infinite;
          transform: translateZ(45px);
        }
        .pr-tier-icon svg { width: 72px; height: 72px; stroke-width: 1.2; }
        .pr-tier-name {
          text-align: center; font-family: var(--font-editorial); font-style: italic; font-weight: 400;
          font-size: 2.125rem; color: var(--pr-accent); margin: 0 0 12px; transform: translateZ(30px);
        }
        .pr-requirement { text-align: center; color: var(--paper-dim); font-size: 0.8125rem; min-height: 36px; margin: 0; }
        .pr-divider {
          height: 1px; background: linear-gradient(90deg, transparent, var(--pr-accent), transparent);
          opacity: 0.5; margin: 24px 0;
        }
        .pr-benefits { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 19px; }
        .pr-benefits li { display: flex; gap: 13px; align-items: flex-start; font-size: 0.8125rem; line-height: 1.6; color: var(--paper); }
        .pr-benefits li svg { flex-shrink: 0; width: 19px; height: 19px; color: var(--pr-accent); stroke-width: 1.7; margin-top: 1px; }
        .pr-card-bottom {
          position: absolute; bottom: 22px; left: 26px; right: 26px; font-size: 0.625rem;
          letter-spacing: 0.14em; color: var(--pr-accent); opacity: 0.65; text-align: right;
        }

        @keyframes pr-float { 0%, 100% { translate: 0 0; } 50% { translate: 0 -9px; } }

        .pr-footnote { margin: 44px auto 0; max-width: 640px; color: var(--paper-dim); font-size: 0.8125rem; opacity: 0.75; text-align: center; }
        .pr-cta { margin-top: 24px; display: flex; justify-content: center; }

        @media (max-width: 900px) {
          .pr-cards { grid-template-columns: 1fr; max-width: 460px; }
          .pr-card { height: auto; min-height: 0; padding-bottom: 60px; }
          .pr-card-bottom { bottom: 18px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pr-tier-icon { animation: none; }
          .pr-card { transition: none; }
        }
      `}</style>
    </section>
  );
}
