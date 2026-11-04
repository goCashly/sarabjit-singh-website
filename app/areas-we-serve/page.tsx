import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { serviceAreas } from '@/lib/serviceAreas';
import BookCta from '@/components/BookCta';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';

const title = `Areas We Serve — ${brand.name}`;
const description = `Licensed mortgage broker serving ${serviceAreas.map((a) => a.city).join(', ')} and the wider Greater Toronto Area.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${brand.siteUrl}/areas-we-serve` },
  openGraph: { title, description, url: `${brand.siteUrl}/areas-we-serve` },
};

export default function AreasWeServePage() {
  return (
    <main>
      <section
        style={{
          background: 'var(--ink)',
          padding: 'clamp(96px, 16vh, 160px) var(--edge) clamp(56px, 8vh, 96px)',
        }}
      >
        <Reveal>
          <p className="eyebrow">Areas We Serve</p>
          <h1
            style={{
              marginTop: 20,
              fontFamily: 'var(--font-editorial)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4.2vw, 3.5rem)',
              lineHeight: 1.06,
              color: 'var(--paper)',
              maxWidth: 820,
            }}
          >
            Mortgage advice across the Greater Toronto Area.
          </h1>
          <p style={{ marginTop: 18, maxWidth: 580, color: 'var(--paper-dim)', fontSize: '1.0625rem', lineHeight: 1.65 }}>
            From Mississauga to Markham, I compare banks, credit unions and alternative lenders for buyers and owners across {serviceAreas.length} communities in the GTA and beyond.
          </p>
        </Reveal>
      </section>

      <section
        style={{
          borderTop: '1px solid var(--line)',
          padding: 'clamp(48px, 8vh, 88px) var(--edge)',
        }}
      >
        <div className="areas-grid">
          {serviceAreas.map((area) => (
            <Reveal key={area.slug}>
              <Link href={`/areas-we-serve/${area.slug}`} className="area-card">
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--paper)' }}>
                  {area.city}
                </p>
                <p style={{ marginTop: 10, color: 'var(--paper-dim)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  {area.tagline}
                </p>
                <span style={{ marginTop: 16, display: 'inline-block', color: 'var(--gold)', fontSize: '0.8125rem', fontWeight: 600 }}>
                  View {area.city} mortgage page →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <BookCta />
      <SiteFooter />

      <style>{`
        .areas-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .area-card {
          display: block;
          height: 100%;
          background: var(--panel);
          border: 1px solid var(--line-strong);
          border-radius: 14px;
          padding: clamp(24px, 2.6vw, 28px);
          text-decoration: none;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .area-card:hover {
          border-color: var(--gold);
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .areas-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
