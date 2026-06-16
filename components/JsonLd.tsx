import {
  buildWebSiteSchema,
  buildOrganizationSchema,
  buildFaqSchema,
  buildSoftwareApplicationSchema,
} from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';

export function JsonLd() {
  return (
    <StructuredData
      schemas={[
        buildWebSiteSchema(),
        buildOrganizationSchema(),
        buildFaqSchema(),
        buildSoftwareApplicationSchema(),
      ]}
    />
  );
}