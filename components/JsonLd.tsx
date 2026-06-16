export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TNiC — Longevity Intelligence Platform',
    description:
      'Evidence-based longevity education platform with biomarker tools, supplement stack architect, biological age calculator, and PubMed-cited research.',
    url: 'https://tnic.help',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://tnic.help/#learn',
      'query-input': 'required name=search_term_string',
    },
    about: {
      '@type': 'Thing',
      name: 'Longevity Science and Healthspan Optimization',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TNiC',
      description: 'Independent educational longevity platform',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do I need blood tests before starting a longevity stack?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Not required to begin learning on TNiC, but baseline labs within 90 days are strongly recommended for safe monitoring.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is TNiC different from buying supplements on Amazon?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TNiC provides evidence-graded, PubMed-cited compounds with synergy scoring, safety data, and hallmark mapping — not just product listings.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}