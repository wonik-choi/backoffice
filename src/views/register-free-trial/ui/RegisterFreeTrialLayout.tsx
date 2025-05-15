import { Button } from '@/shared/components/atomics/button';
import { cn } from '@/shared/lib/utils';
import { ChevronLeft } from 'lucide-react';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actionButton: React.ReactNode;
  onBack?: () => void;
  progressStep: number;
  totalSteps?: number;
}

const RegisterFreeTrialLayout = ({
  title,
  subtitle,
  children,
  actionButton,
  onBack,
  progressStep,
  totalSteps = 5,
}: PageLayoutProps) => {
  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <nav className="mb-6 w-full">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="mb-2 -ml-3" aria-label="뒤로 가기">
            <ChevronLeft className="h-7 w-7" />
          </Button>
        )}
        <div className="space-y-1">
          <h1 className="text-xl font-bold">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </nav>

      {/* Content - make it scrollable if needed */}
      <div className="flex-1 overflow-y-auto w-full">{children}</div>

      {/* Footer - fixed at the bottom */}
      <div className="mt-4 pt-4 sticky bottom-0 bg-white w-full">
        {actionButton}

        <div className="flex justify-center space-x-2 pt-4">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={cn('h-2 w-8 rounded-full', i === progressStep ? 'bg-blue-500' : 'bg-gray-200')} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisterFreeTrialLayout;
