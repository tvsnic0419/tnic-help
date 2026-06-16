import { SubPageLayout } from '@/components/layouts/SubPageLayout';
import { QuizPageContent } from '@/components/quiz/QuizPageContent';
import { seoRoutes } from '@/lib/seo-routes';

export const metadata = seoRoutes.quiz();

export default function QuizPage() {
  return (
    <SubPageLayout>
      <QuizPageContent />
    </SubPageLayout>
  );
}