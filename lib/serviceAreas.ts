export type ServiceArea = {
  slug: string;
  city: string;
  province: string;
  tagline: string;
  intro: string;
  neighbourhoods: string[];
  highlights: string[];
  faq: { question: string; answer: string }[];
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: 'mississauga',
    city: 'Mississauga',
    province: 'ON',
    tagline: 'From Square One to Port Credit, a mortgage plan built around your numbers.',
    intro:
      "Mississauga runs from high-rise condos around Square One to family homes in Streetsville and Meadowvale, which means the right mortgage structure looks different block to block. I work with buyers and owners across the city to compare banks, credit unions and alternative lenders, then hold a rate while you shop with confidence.",
    neighbourhoods: ['Square One', 'Port Credit', 'Streetsville', 'Meadowvale', 'Erin Mills'],
    highlights: [
      'Condo and freehold financing for first-time buyers near Square One and Port Credit',
      'Move-up and investment mortgages for growing families in Streetsville and Meadowvale',
      'Renewal and refinance reviews before your Mississauga mortgage term is up',
      'Self-employed and newcomer programs for the city\'s diverse workforce',
    ],
    faq: [
      {
        question: 'Do you work with first-time buyers in Mississauga?',
        answer:
          "Yes — Mississauga's condo market around Square One and City Centre is a common entry point for first-time buyers. I'll walk you through down payment sources, FHSA and RRSP Home Buyers' Plan strategy, and get you a verified pre-approval before you start viewing units.",
      },
      {
        question: 'Can you help with a mortgage renewal in Mississauga?',
        answer:
          "Absolutely. I compare your current lender's renewal offer against the wider market before you sign anything, so you know whether staying or switching actually saves you money.",
      },
      {
        question: 'Do you handle investment properties in Mississauga?',
        answer:
          'Yes, including multi-unit rentals and condo investments. Investment financing qualifies differently than an owner-occupied purchase, and I\'ll walk you through what lenders will want to see.',
      },
    ],
  },
  {
    slug: 'oakville',
    city: 'Oakville',
    province: 'ON',
    tagline: 'Serving Old Oakville, Bronte and Glen Abbey from an office right here in town.',
    intro:
      "I'm based in Oakville, so this is home turf — from the lakefront character homes of Old Oakville to the newer builds around Glen Abbey and Bronte. Whether you're purchasing your first home, moving up, or pulling equity for a renovation, I'll walk the numbers with you before you commit to anything.",
    neighbourhoods: ['Old Oakville', 'Bronte', 'Glen Abbey', 'Kerr Village', 'River Oaks'],
    highlights: [
      'Local, in-person support from an Oakville-based mortgage office',
      'Pre-approvals for move-up buyers across Glen Abbey, Bronte and River Oaks',
      'Equity takeout and renovation financing for Old Oakville\'s established homes',
      'Switch and refinance options reviewed before your term renews',
    ],
    faq: [
      {
        question: 'Are you actually based in Oakville?',
        answer:
          'Yes — my office is in Oakville, and most of my client meetings happen right here in town. If you prefer to sit down in person rather than handle everything by phone or email, that\'s always an option.',
      },
      {
        question: 'What does a home in Oakville typically require for financing?',
        answer:
          "It depends heavily on the neighbourhood and property type — Old Oakville and Glen Abbey purchases often involve larger mortgage amounts than condos near Kerr Village. I'll run your specific numbers rather than quote a generic range.",
      },
      {
        question: 'Can you help with a renovation or equity takeout in Oakville?',
        answer:
          'Yes. Many Oakville homeowners refinance or use a HELOC to fund renovations on older properties. I\'ll compare the break-even cost against the value of the work before you commit.',
      },
    ],
  },
  {
    slug: 'burlington',
    city: 'Burlington',
    province: 'ON',
    tagline: 'From Spencer Smith Park to Headon Forest, financing built around how you actually live.',
    intro:
      "Burlington blends downtown walkability near Spencer Smith Park with family-oriented communities like Headon Forest and Aldershot. I help buyers and owners across the city compare mortgage options honestly, so the plan fits the property and the life you're building around it.",
    neighbourhoods: ['Downtown Burlington', 'Aldershot', 'Headon Forest', 'Alton Village', 'Tyandaga'],
    highlights: [
      'Purchase financing for downtown condos and lakefront properties',
      'Family-home mortgages for Headon Forest, Alton Village and Tyandaga',
      'Refinance and debt consolidation reviews for Burlington homeowners',
      'Pre-approvals held while you shop across competing lenders',
    ],
    faq: [
      {
        question: 'Do you help with both condos and houses in Burlington?',
        answer:
          'Yes — downtown Burlington condos and larger Headon Forest or Tyandaga homes qualify differently, and I\'ll structure the financing around the specific property type you\'re buying.',
      },
      {
        question: 'Is it worth refinancing my Burlington home?',
        answer:
          'Sometimes, sometimes not. I\'ll run the break-fee against the savings or the equity you need before recommending anything — a straight answer either way.',
      },
      {
        question: 'How fast can I get pre-approved in Burlington?',
        answer:
          'Once I have your income, credit and debt details, a verified pre-approval typically comes together within a few days, held for 60–120 days depending on the lender.',
      },
    ],
  },
  {
    slug: 'milton',
    city: 'Milton',
    province: 'ON',
    tagline: 'Financing for one of the GTA\'s fastest-growing communities.',
    intro:
      "Milton has grown quickly, and new-build purchases near the Escarpment sit alongside established homes in Old Milton. I help buyers navigate builder financing, closing timelines and the mortgage programs most first-time buyers in Milton have never had to think about before.",
    neighbourhoods: ['Old Milton', 'Escarpment View', 'Hawthorne Village', 'Willmont', 'Ford'],
    highlights: [
      'New-build and builder-financing coordination for Milton\'s growing subdivisions',
      'First-time buyer programs for FHSA, RRSP Home Buyers\' Plan and land transfer rebates',
      'Pre-approvals that account for Milton\'s fast-moving resale market',
      'Refinance and renewal reviews as your Milton mortgage term approaches',
    ],
    faq: [
      {
        question: 'Do you handle new-build purchases in Milton?',
        answer:
          'Yes — new-build closings come with their own financing timeline and documentation, and I\'ll coordinate with your builder so your mortgage is ready when the closing date is set.',
      },
      {
        question: 'Is Milton a good fit for first-time buyers?',
        answer:
          'Many first-time buyers choose Milton for the newer housing stock. I\'ll confirm what you actually qualify for, including FHSA and RRSP Home Buyers\' Plan withdrawals, before you start shopping.',
      },
      {
        question: 'Can you help if I\'m renewing a mortgage on a Milton property?',
        answer:
          'Yes. I\'ll compare your lender\'s renewal offer against the broader market before your term is up, so you\'re not defaulting into a rate you never had to accept.',
      },
    ],
  },
  {
    slug: 'brampton',
    city: 'Brampton',
    province: 'ON',
    tagline: 'Mortgage options for one of Ontario\'s most diverse communities.',
    intro:
      "Brampton's neighbourhoods, from Mount Pleasant to Springdale, are home to a wide mix of first-time buyers, multi-generational households and self-employed business owners. I compare lenders across all of it, including programs built for newcomers and business-for-self income.",
    neighbourhoods: ['Downtown Brampton', 'Mount Pleasant', 'Springdale', 'Bram East', 'Credit Valley'],
    highlights: [
      'Newcomer and work-permit mortgage programs for Brampton\'s diverse community',
      'Self-employed and business-for-self income solutions',
      'Multi-generational and larger household financing structures',
      'First-time buyer pre-approvals across Mount Pleasant and Springdale',
    ],
    faq: [
      {
        question: 'Do you work with newcomers to Canada in Brampton?',
        answer:
          'Yes — Brampton has a large newcomer community, and several lenders offer programs built specifically for permanent residents and work-permit holders with limited Canadian credit history.',
      },
      {
        question: 'I\'m self-employed. Can I still get a mortgage in Brampton?',
        answer:
          'In most cases, yes. Self-employed and business-for-self applicants qualify through a different documentation path, and I\'ll walk you through exactly what lenders will ask for.',
      },
      {
        question: 'Can multiple family members go on one Brampton mortgage?',
        answer:
          'Yes, co-signing and multi-generational applications are common in Brampton. I\'ll structure the application so everyone\'s income and credit are used to your advantage.',
      },
    ],
  },
  {
    slug: 'hamilton',
    city: 'Hamilton',
    province: 'ON',
    tagline: 'From the waterfront to Ancaster and Waterdown, financing that fits the Hammer.',
    intro:
      "Hamilton's housing stock is genuinely varied — century homes in Westdale, newer builds in Waterdown, and everything in between near the downtown core and the waterfront. I help buyers and investors compare lenders across all of it, including commercial and multi-unit financing.",
    neighbourhoods: ['Downtown Hamilton', 'Westdale', 'Ancaster', 'Waterdown', 'Stoney Creek'],
    highlights: [
      'Purchase and renewal mortgages for Westdale, Ancaster and Waterdown homes',
      'Investment and multi-unit financing for Hamilton\'s rental market',
      'First-time buyer programs for the city\'s more accessible entry points',
      'Commercial mortgage options for Hamilton business owners',
    ],
    faq: [
      {
        question: 'Is Hamilton a good market for investment properties?',
        answer:
          'Hamilton has a strong multi-unit rental market, particularly near the downtown core and McMaster University. I\'ll walk you through how investment financing differs from an owner-occupied purchase before you commit.',
      },
      {
        question: 'Do older Hamilton homes qualify for standard financing?',
        answer:
          'Most do, though some century homes in areas like Westdale may need an appraisal or inspection condition. I\'ll flag anything a lender is likely to ask about before you waive conditions.',
      },
      {
        question: 'Can you help with commercial financing in Hamilton?',
        answer:
          'Yes — office, retail, mixed-use and multi-unit financing run on different rules than a residential purchase, and I work with lenders who specialize in exactly that.',
      },
    ],
  },
  {
    slug: 'vaughan',
    city: 'Vaughan',
    province: 'ON',
    tagline: 'From the VMC to Woodbridge, mortgage plans for every stage of Vaughan.',
    intro:
      "Vaughan ranges from high-rise living around the Vaughan Metropolitan Centre to established family homes in Woodbridge and Maple. I'll compare lenders across the city so your financing matches the property, not the other way around.",
    neighbourhoods: ['Vaughan Metropolitan Centre', 'Woodbridge', 'Maple', 'Thornhill', 'Kleinburg'],
    highlights: [
      'Condo financing for VMC and transit-connected purchases',
      'Move-up and multi-generational mortgages for Woodbridge and Maple',
      'Refinance and equity options for established Vaughan homeowners',
      'Pre-approvals held while you shop competing lenders',
    ],
    faq: [
      {
        question: 'Do you handle condo purchases near the VMC?',
        answer:
          'Yes — condo financing around the Vaughan Metropolitan Centre has its own considerations, including status certificate review and maintenance fee impact on affordability.',
      },
      {
        question: 'What about larger homes in Woodbridge or Kleinburg?',
        answer:
          'I\'ll run the full affordability picture for larger purchases, including how much flexibility you have across different lenders and rate structures.',
      },
      {
        question: 'Can you help with a mortgage renewal in Vaughan?',
        answer:
          'Yes — I\'ll compare your renewal offer against the market before your term is up, so you\'re making an informed decision rather than defaulting to whatever your current lender sends.',
      },
    ],
  },
  {
    slug: 'richmond-hill',
    city: 'Richmond Hill',
    province: 'ON',
    tagline: 'Mortgage plans for Yonge Street high-rises and Oak Ridges family homes alike.',
    intro:
      "Richmond Hill stretches from condo towers along Yonge Street to larger family homes near Oak Ridges and Bayview Hill. I compare mortgage options across all of it, with a particular focus on move-up buyers and multi-generational households.",
    neighbourhoods: ['Yonge Street Corridor', 'Oak Ridges', 'Bayview Hill', 'Mill Pond', 'Jefferson'],
    highlights: [
      'Condo and high-rise financing along the Yonge Street corridor',
      'Move-up and multi-generational mortgages for Oak Ridges and Bayview Hill',
      'Equity takeout and refinance options for established Richmond Hill homes',
      'Pre-approvals that keep pace with a fast-moving resale market',
    ],
    faq: [
      {
        question: 'Do you work with move-up buyers in Richmond Hill?',
        answer:
          'Yes — many Richmond Hill clients are selling one property to buy another, and I\'ll help structure the financing around that timing, including bridge financing where it\'s needed.',
      },
      {
        question: 'Can multiple generations go on one mortgage in Richmond Hill?',
        answer:
          'Yes, this is common here. I\'ll structure the application so every applicant\'s income and credit work in your favour.',
      },
      {
        question: 'How do you handle financing for larger Richmond Hill homes?',
        answer:
          'I\'ll run your full affordability picture across multiple lenders, since larger purchases often benefit the most from comparing more than one offer.',
      },
    ],
  },
  {
    slug: 'markham',
    city: 'Markham',
    province: 'ON',
    tagline: 'Serving Unionville, Cornell and Markham\'s tech-driven community.',
    intro:
      "Markham's mix of heritage Unionville homes, newer Cornell builds and a tech-driven workforce means affordability pictures vary widely across the city. I compare lenders to match your specific income structure, whether that's salaried, commission, or stock-compensation heavy.",
    neighbourhoods: ['Unionville', 'Cornell', 'Milliken', 'Markham Village', 'Berczy'],
    highlights: [
      'Income structuring for commission, bonus and stock-compensation earners',
      'Purchase financing for Unionville and Cornell family homes',
      'First-time buyer programs for Markham\'s tech and professional workforce',
      'Refinance and renewal reviews before your Markham mortgage term is up',
    ],
    faq: [
      {
        question: 'I earn a lot of my income through bonus or stock compensation. Does that matter in Markham?',
        answer:
          'It can — many Markham clients work in tech or finance with variable income. Lenders treat bonus, commission and stock compensation differently, and I\'ll structure your application to use it to your advantage.',
      },
      {
        question: 'Are heritage homes in Unionville harder to finance?',
        answer:
          'Not usually, though some older properties may need an appraisal condition. I\'ll flag anything a lender is likely to require before you remove conditions on an offer.',
      },
      {
        question: 'Do you help first-time buyers in Markham?',
        answer:
          'Yes — I\'ll walk you through FHSA and RRSP Home Buyers\' Plan strategy, land transfer rebates, and get you a verified pre-approval before you start viewing homes.',
      },
    ],
  },
];

export function getServiceAreaBySlug(slug: string) {
  return serviceAreas.find((a) => a.slug === slug);
}
