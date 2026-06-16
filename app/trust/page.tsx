import type { Metadata } from 'next';
import { TrustHub } from '@/components/trust/TrustHub';

export const metadata: Metadata = {
  title: 'Trust & Transparency Hub — Evidence Standards | TNiC',
  description:
    'TNiC evidence tagging system (Tier A/B/C), source citations framework, methodology, disclaimers, personal journey timeline, and public update history.',
  keywords: ['evidence grading', 'longevity transparency', 'supplement safety', 'PubMed citations', 'methodology'],
};

export default function TrustPage() {
  return <TrustHub />;
}