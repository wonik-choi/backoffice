import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/atomics/dialog';

import { DaumPostcodeResultDto } from '../model/dtos';
import DaumSearchComponent from './DaumSearchComponent';

interface SearchAddressModalProps {
  setForm: (data: DaumPostcodeResultDto) => void;
  name: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const SearchAddressModal = ({ setForm, name, children, open, setOpen }: SearchAddressModalProps) => {
  const handleSelectAddress = (data: DaumPostcodeResultDto) => {
    setForm(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>무료체험 신청하기</DialogTitle>
          <DialogDescription>새로운 학생의 무료체험 신청 정보를 입력해주세요.</DialogDescription>
        </DialogHeader>
        <DaumSearchComponent complete={handleSelectAddress} />
      </DialogContent>
    </Dialog>
  );
};
