import { RadioButton } from '@/shared/components/radion-button/RadioButton';

interface RadioItemProps {
  label: string;
  checked: boolean;
}

export const RadioItem = ({ label, checked }: RadioItemProps) => {
  return (
    <div className="flex justify-start items-center gap-[0.8rem]">
      <RadioButton checked={checked} size="lg" />
      <p className="text-[1.6rem] font-normal text-susimdal-text-basic leading-[2rem]"> {label}</p>
    </div>
  );
};
