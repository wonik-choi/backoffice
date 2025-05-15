'use client';

import { Button } from '@/shared/components/atomics/button';
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';
import { cn } from '@/shared/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/shared/components/atomics/radio-group';
import { Label } from '@/shared/components/atomics/label';

export function SemesterSelection() {
  const { semester, setSemester, nextStep, prevStep } = useRegisterFreeTrialStore();

  const handleSelect = (value: string) => {
    const [year, sem] = value.split('-').map(Number);
    setSemester({ year, semester: sem });
  };

  const selectedValue = `${semester.year}-${semester.semester}`;

  return (
    <RegisterFreeTrialLayout
      title="진행하실 학기를 선택해주세요"
      onBack={prevStep}
      progressStep={2}
      totalSteps={5}
      actionButton={
        <Button onClick={nextStep} disabled={!selectedValue} className="w-full bg-blue-500 hover:bg-blue-600">
          다음
        </Button>
      }
    >
      <RadioGroup value={selectedValue} onValueChange={handleSelect} className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <RadioGroupItem value="1-1" id="1-1" className="peer sr-only" />
          <Label
            htmlFor="1-1"
            className={cn(
              'flex h-16 items-center justify-center rounded-md border-2 border-gray-200 bg-white p-4 text-lg hover:bg-gray-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 [&:has([data-state=checked])]:border-blue-500 [&:has([data-state=checked])]:bg-blue-50 cursor-pointer'
            )}
          >
            1학년 1학기
          </Label>
        </div>

        <div className="space-y-2">
          <RadioGroupItem value="1-2" id="1-2" className="peer sr-only" />
          <Label
            htmlFor="1-2"
            className={cn(
              'flex h-16 items-center justify-center rounded-md border-2 border-gray-200 bg-white p-4 text-lg hover:bg-gray-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 [&:has([data-state=checked])]:border-blue-500 [&:has([data-state=checked])]:bg-blue-50 cursor-pointer'
            )}
          >
            1학년 2학기
          </Label>
        </div>

        <div className="space-y-2">
          <RadioGroupItem value="2-1" id="2-1" className="peer sr-only" />
          <Label
            htmlFor="2-1"
            className={cn(
              'flex h-16 items-center justify-center rounded-md border-2 border-gray-200 bg-white p-4 text-lg hover:bg-gray-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 [&:has([data-state=checked])]:border-blue-500 [&:has([data-state=checked])]:bg-blue-50 cursor-pointer'
            )}
          >
            2학년 1학기
          </Label>
        </div>

        <div className="space-y-2">
          <RadioGroupItem value="2-2" id="2-2" className="peer sr-only" />
          <Label
            htmlFor="2-2"
            className={cn(
              'flex h-16 items-center justify-center rounded-md border-2 border-gray-200 bg-white p-4 text-lg hover:bg-gray-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 [&:has([data-state=checked])]:border-blue-500 [&:has([data-state=checked])]:bg-blue-50 cursor-pointer'
            )}
          >
            2학년 2학기
          </Label>
        </div>

        <div className="space-y-2">
          <RadioGroupItem value="3-1" id="3-1" className="peer sr-only" />
          <Label
            htmlFor="3-1"
            className={cn(
              'flex h-16 items-center justify-center rounded-md border-2 border-gray-200 bg-white p-4 text-lg hover:bg-gray-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 [&:has([data-state=checked])]:border-blue-500 [&:has([data-state=checked])]:bg-blue-50 cursor-pointer'
            )}
          >
            3학년 1학기
          </Label>
        </div>

        <div className="space-y-2">
          <RadioGroupItem value="3-2" id="3-2" className="peer sr-only" />
          <Label
            htmlFor="3-2"
            className={cn(
              'flex h-16 items-center justify-center rounded-md border-2 border-gray-200 bg-white p-4 text-lg hover:bg-gray-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 [&:has([data-state=checked])]:border-blue-500 [&:has([data-state=checked])]:bg-blue-50 cursor-pointer'
            )}
          >
            3학년 2학기
          </Label>
        </div>
      </RadioGroup>
    </RegisterFreeTrialLayout>
  );
}
