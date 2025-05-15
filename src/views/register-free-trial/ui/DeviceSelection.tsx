'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/atomics/button';
import { Card, CardContent } from '@/shared/components/atomics/card';
import { Label } from '@/shared/components/atomics/label';
import { RadioGroup, RadioGroupItem } from '@/shared/components/atomics/radio-group';
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';
import { cn } from '@/shared/lib/utils';
import { FormStep } from '@/features/register-free-trial/model/store/interface';

export function DeviceSelection() {
  const { device, setDevice, nextStep, prevStep, goToStep } = useRegisterFreeTrialStore();
  const [selectedDevice, setSelectedDevice] = useState<string | null>(device.deviceType || null);
  const [isRenting, setIsRenting] = useState(device.isRenting);

  const handleSelect = (value: string) => {
    if (value === 'none') {
      setIsRenting(false);
      setSelectedDevice(null);
    } else {
      setIsRenting(true);
      setSelectedDevice(value);
    }
  };

  const handleNext = () => {
    if (isRenting && selectedDevice) {
      setDevice({
        ...device,
        isRenting: true,
        deviceType: selectedDevice,
      });
      nextStep(); // Go to address entry
    } else {
      setDevice({
        ...device,
        isRenting: false,
        deviceType: undefined,
        agreedToTerms: true, // Auto-agree to terms since no rental
      });
      goToStep(FormStep.Completion); // Skip directly to completion
    }
  };

  return (
    <RegisterFreeTrialLayout
      title="아이패드 기기를 선호하시나요?"
      onBack={prevStep}
      progressStep={3}
      totalSteps={5}
      actionButton={
        <Button onClick={handleNext} className="w-full bg-blue-500 hover:bg-blue-600">
          다음
        </Button>
      }
    >
      <RadioGroup value={selectedDevice || 'none'} onValueChange={handleSelect} className="space-y-4 w-full">
        <div className="space-y-2 w-full">
          <RadioGroupItem value="iPad" id="iPad" className="peer sr-only" />
          <Label htmlFor="iPad" className="block w-full cursor-pointer">
            <Card
              className={cn(
                'border-2 transition-all w-full',
                selectedDevice === 'iPad' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              )}
            >
              <CardContent className="flex items-center p-4">
                <div className="flex-1">
                  <h3 className="font-medium">iPad 10th</h3>
                  <p className="text-sm text-gray-500">64GB / 10.9인치 / 2022년형</p>
                </div>
                <div className="h-24 w-24 relative">
                  <div className="h-24 w-24 bg-gray-100 rounded-md flex items-center justify-center">iPad</div>
                </div>
              </CardContent>
            </Card>
          </Label>
        </div>

        <div className="space-y-2 w-full">
          <RadioGroupItem value="Galaxy" id="Galaxy" className="peer sr-only" />
          <Label htmlFor="Galaxy" className="block w-full cursor-pointer">
            <Card
              className={cn(
                'border-2 transition-all w-full',
                selectedDevice === 'Galaxy' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              )}
            >
              <CardContent className="flex items-center p-4">
                <div className="flex-1">
                  <h3 className="font-medium">Galaxy Tab 2</h3>
                  <p className="text-sm text-gray-500">128GB / 11인치 / 2023년형</p>
                </div>
                <div className="h-24 w-24 relative">
                  <div className="h-24 w-24 bg-gray-100 rounded-md flex items-center justify-center">Galaxy</div>
                </div>
              </CardContent>
            </Card>
          </Label>
        </div>

        <div className="space-y-2 w-full">
          <RadioGroupItem value="none" id="none" className="peer sr-only" />
          <Label htmlFor="none" className="block w-full cursor-pointer">
            <Card
              className={cn(
                'border-2 transition-all w-full',
                selectedDevice === null && !isRenting ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              )}
            >
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="font-medium">기기 대여 안함</h3>
                </div>
              </CardContent>
            </Card>
          </Label>
        </div>
      </RadioGroup>
    </RegisterFreeTrialLayout>
  );
}
