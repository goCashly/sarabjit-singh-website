import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { brand } from '@/lib/brand';
import { serviceAreas, getServiceAreaBySlug } from '@/lib/serviceAreas';
import BookCta from '@/components/BookCta';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);
  if (!area) return { title: `Areas We Serve — ${brand.name}` };
  const title = `Mortgage Broker in ${area.city}, ${area.province} — ${brand.name}`;
  const description = `${area.tagline} Licensed mortgage broker serving ${area.city} with access to banks, credit unions and alternative lenders. ${brand.license}.`;
  const url = `${brand.siteUrl}/areas-we-serve/${area.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function ServiceAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);
  if (!area) notFound();

  const url = `${brand.siteUrl}/areas-we-serve/${area.slug}`;
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: `${brand.fullName} — Mortgage Broker in ${area.city}`,
    description: area.tagline,
    provider: { '@type': 'Person', name: brand.name },
    areaServed: { '@type': 'City', name: area.city },
    url,
    telephone: brand.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: brand.officeAddress,
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: area.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: brand.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Areas We Serve', item: `${brand.siteUrl}/areas-we-serve` },
      { '@type': 'ListItem', position: 3, name: area.city, item: url },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section
        style={{
          background: 'var(--ink)',
          padding: 'clamp(96px, 16vh, 160px) var(--edge) clamp(56px, 8vh, 96px)',
        }}
      >
        <Reveal>
          <Link
            href="/areas-we-serve"
            style={{ color: 'var(--steel)', fontSize: '0.875rem', textDecoration: 'none' }}
          >
            ← All areas we serve
          </Link>

          <p className="eyebrow" style={{ marginTop: 24 }}>Mortgage Broker · {area.city}, {area.province}</p>

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
            {area.city}, {area.province}
          </h1>
          <p style={{ marginTop: 18, maxWidth: 580, color: 'var(--paper-dim)', fontSize: '1.0625rem', lineHeight: 1.65 }}>
            {area.tagline}
          </p>
        </Reveal>
      </section>

      <section
        style={{
          borderTop: '1px solid var(--line)',
          padding: 'clamp(48px, 8vh, 88px) var(--edge)',
        }}
      >
        <Reveal>
          <div style={{ display: 'grid', gap: 22, maxWidth: 680 }}>
            <p style={{ color: 'var(--paper-dim)', fontSize: '1.0625rem', lineHeight: 1.7 }}>{area.intro}</p>

            <div style={{ marginTop: 8 }}>
              <p className="eyebrow">Neighbourhoods served</p>
              <p style={{ marginTop: 12, color: 'var(--paper-dim)', fontSize: '0.9375rem', lineHeight: 1.8 }}>
                {area.neighbourhoods.join(' · ')}
              </p>
            </div>

            <div style={{ marginTop: 16 }}>
              <p className="eyebrow">How I can help in {area.city}</p>
              <ul style={{ marginTop: 18, display: 'grid', gap: 14, listStyle: 'none', padding: 0 }}>
                {area.highlights.map((point) => (
                  <li key={point} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', marginTop: 9 }} />
                    <span style={{ color: 'var(--paper-dim)', fontSize: '1rem', lineHeight: 1.6 }}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 56, maxWidth: 680, borderTop: '1px solid var(--line)', paddingTop: 40 }}>
            <p className="eyebrow">Mortgage services available in {area.city}</p>
            <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Link
                href="/mortgage-services"
                style={{
                  padding: '9px 16px',
                  borderRadius: 999,
                  border: '1px solid var(--gold)',
                  color: 'var(--gold)',
                  fontSize: '0.8125rem',
                  textDecoration: 'none',
                }}
              >
                View all mortgage services
              </Link>
            </div>
          </div>

          <div style={{ marginTop: 56, maxWidth: 680, borderTop: '1px solid var(--line)', paddingTop: 40 }}>
            <p className="eyebrow">Other areas we serve</p>
            <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {serviceAreas
                .filter((a) => a.slug !== area.slug)
                .map((a) => (
                  <Link
                    key={a.slug}
                    href={`/areas-we-serve/${a.slug}`}
                    style={{
                      padding: '9px 16px',
                      borderRadius: 999,
                      border: '1px solid var(--line-strong)',
                      color: 'var(--paper-dim)',
                      fontSize: '0.8125rem',
                      textDecoration: 'none',
                    }}
                  >
                    {a.city}
                  </Link>
                ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section
        style={{
          borderTop: '1px solid var(--line)',
          padding: 'clamp(48px, 8vh, 88px) var(--edge)',
          background: 'var(--panel)',
        }}
      >
        <Reveal>
          <p className="eyebrow">{area.city} Mortgage FAQ</p>
          <div style={{ marginTop: 24, display: 'grid', gap: 24, maxWidth: 680 }}>
            {area.faq.map((item) => (
              <div key={item.question}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 600, color: 'var(--paper)' }}>
                  {item.question}
                </p>
                <p style={{ marginTop: 8, color: 'var(--paper-dim)', fontSize: '0.9375rem', lineHeight: 1.65 }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <BookCta />
      <SiteFooter />
    </main>
  );
}
