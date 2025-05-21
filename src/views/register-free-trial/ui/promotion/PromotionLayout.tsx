// shared
import { SusimdalLogo } from '@/shared/components/svgs/susimdal-logo/SusimdalLogo';
import { Progress } from '@/shared/components/atomics/progress';

interface PageLayoutProps {
  children: React.ReactNode;
  progressStep: number;
  totalSteps?: number;
}

export const PromotionLayout = ({ children, progressStep, totalSteps = 5 }: PageLayoutProps) => {
  return (
    <div className="flex flex-col h-full w-full">
      <nav className="mb-[8px] w-full bg-susimdal-element-primary-light">
        <div className="flex h-[32px] p-[8px] justify-center items-center self-stretch">
          <div className="flex justify-center items-center gap-[4px]">
            <div className="w-[16px] h-[16px]">
              <SusimdalLogo />
            </div>
            <p className="text-[12px] font-normal text-black">수심달 무료체험을 환영합니다!</p>
          </div>
        </div>
      </nav>

      <div className="flex flex-col w-full h-full px-[2rem] bg-white">
        <div className="flex items-center gap-[1.6rem] self-stretch mb-[1.6rem]">
          <Progress value={((progressStep + 1) / totalSteps) * 100} />
          <p className="text-[1.2rem] font-normal text-susimdal-text-subtle whitespace-nowrap">{`${
            progressStep + 1
          } / ${totalSteps}`}</p>
        </div>

        <div className="flex-1 overflow-y-auto w-full">{children}</div>
      </div>
    </div>
  );
};
