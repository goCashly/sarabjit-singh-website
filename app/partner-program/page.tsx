import type { Metadata } from 'next';
import { brand } from '@/lib/brand';
import LoyaltyProgram from '@/components/LoyaltyProgram';
import BookCta from '@/components/BookCta';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: `Partner Program — ${brand.name}`,
  description: brand.loyaltyIntro,
};

export default function PartnerProgramPage() {
  return (
    <main>
      <LoyaltyProgram />
      <BookCta />
      <SiteFooter />
    </main>
  );
}
