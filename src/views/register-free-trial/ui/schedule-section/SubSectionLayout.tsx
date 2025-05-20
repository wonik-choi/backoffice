import { ScheduleSectionLayoutProps } from '@/views/register-free-trial/model/interface';

export const SubSectionLayout = ({ title, subTitle, children }: ScheduleSectionLayoutProps) => {
  return (
    <div className="flex flex-col gap-[1.5rem] justify-start items-start">
      <h3 className="text-[1.8rem] font-bold text-black">{title}</h3>
      {subTitle && <p className="text-[1.4rem] text-black font-normal">{subTitle}</p>}
      {children}
    </div>
  );
};
