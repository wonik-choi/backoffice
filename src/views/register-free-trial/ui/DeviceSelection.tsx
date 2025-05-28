'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// shared

import { Card, CardContent } from '@/shared/components/atomics/card';
import { RadioGroup, RadioGroupItem } from '@/shared/components/atomics/radio-group';
import { cn } from '@/shared/lib/utils';

// features
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import { FormStep } from '@/features/register-free-trial/model/store/interface';

// views
import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';
import { Button } from '@/views/register-free-trial/ui/components/Button';
import { Label } from '@/views/register-free-trial/ui/components/Label';

export function DeviceSelection() {
  const { nextStep, prevStep, goToStep, resetRental } = useRegisterFreeTrialStore();
  const [answer, setAnswer] = useState<'yes' | 'no' | ''>('');

  const decisionRenting = (value: 'yes' | 'no') => {
    // yse 이면 대여를 한다.
    setAnswer(value);
  };

  /**
   * @description 대여 여부에 따라 위치 이동
   */
  const submitRentalAnswer = () => {
    // 1. 대여를 진행한다.
    if (answer === 'yes') {
      nextStep();
    } else {
      // 2. 대여를 진행하지 않는다.
      resetRental();
      goToStep(FormStep.Promotion);
    }
  };

  return (
    <RegisterFreeTrialLayout title={'학습 기기를\n가지고 있으신가요?'} progressStep={5} totalSteps={9}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        tabIndex={-1}
        className="flex flex-1 flex-col w-full h-full justify-between  relative overflow-hidden"
      >
        <RadioGroup value={answer} onValueChange={decisionRenting} className="w-full">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              pointerEvents: 'auto',
            }}
            transition={{ duration: 0.3, ease: 'easeIn', delay: 0.4 }}
            className="space-y-2 w-full"
          >
            <RadioGroupItem value="no" id="no" className="peer sr-only" />
            <Label htmlFor="no" className="block w-full cursor-pointer">
              <motion.div whileTap={{ scale: 0.95 }} transition={{ duration: 0.2, ease: 'easeIn' }}>
                <Card
                  className={cn(
                    'border-1 transition-all w-full shadow-sm rounded-[1.2rem]',
                    answer === 'no'
                      ? 'border-susimdal-button-primary-fill bg-susimdal-element-primary-light/20'
                      : 'border-gray-200'
                  )}
                >
                  <CardContent className="flex flex-col items-start justify-center gap-[0.8rem] px-[1.6rem] py-[1rem] mobile:py-[1.6rem] ">
                    <h3 className="text-[1.4rem] mobile:text-[1.6rem] font-bold text-susimdal-text-basic">
                      아이패드나 갤럭시탭이 있어요
                    </h3>
                    <p className="text-[1.1rem] mobile:text-[1.2rem] font-normal text-susimdal-text-basic">
                      최상의 학습 환경을 위해 아이패드를 권장합니다.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </Label>
          </motion.div>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              pointerEvents: 'auto',
            }}
            transition={{ duration: 0.3, ease: 'easeIn', delay: 0.5 }}
            className="space-y-2 w-full"
          >
            <RadioGroupItem value="yes" id="yes" className="peer sr-only" />
            <Label htmlFor="yes" className="block w-full cursor-pointer">
              <motion.div whileTap={{ scale: 0.95 }} transition={{ duration: 0.2, ease: 'easeIn' }}>
                <Card
                  className={cn(
                    'border-1 transition-all w-full shadow-sm rounded-[1.2rem]',
                    answer === 'yes'
                      ? 'border-susimdal-button-primary-fill bg-susimdal-element-primary-light/20'
                      : 'border-gray-200'
                  )}
                >
                  <CardContent className="flex flex-col items-start justify-center gap-[0.8rem] px-[1.6rem] py-[1rem] mobile:py-[1.6rem]">
                    <h3 className="text-[1.4rem] mobile:text-[1.6rem] font-bold text-susimdal-text-basic">
                      기기를 무료 대여할게요
                    </h3>
                    <p className="text-[1.1rem] mobile:text-[1.2rem] font-normal text-susimdal-text-basic">
                      아이패드를 대여해드려요.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </Label>
          </motion.div>
        </RadioGroup>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            pointerEvents: 'auto',
          }}
          transition={{ duration: 0.3, ease: 'easeIn', delay: 0.7 }}
          className="flex justify-center gap-[0.8rem] w-full"
        >
          <Button variant="empty" type="button" onClick={prevStep} className="w-[7.8rem] ">
            이전
          </Button>
          <Button type="button" onClick={submitRentalAnswer} disabled={answer === ''}>
            다음
          </Button>
        </motion.div>
      </motion.div>
    </RegisterFreeTrialLayout>
  );
}
