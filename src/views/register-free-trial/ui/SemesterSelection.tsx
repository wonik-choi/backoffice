'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';

// shared
import { RadioGroup, RadioGroupItem } from '@/shared/components/atomics/radio-group';
import { Label } from '@/shared/components/atomics/label';

// entities
import { Semester } from '@/entities/free-trial-user/models/enums';

// features
import { freeTrialSchemaInStore } from '@/features/register-free-trial/config/schema';
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';

// view
import { SEMESTER_OPTIONS } from '@/views/register-free-trial/config/const';

import { Button } from '@/views/register-free-trial/ui/components/Button';
import { RadioItem } from '@/views/register-free-trial/ui/components/RadioItem';

// Zod 스키마 정의
const semesterSchema = freeTrialSchemaInStore.pick({
  semester: true,
});

type SemesterFormValues = z.infer<typeof semesterSchema>;

export function SemesterSelection() {
  const { freeTrial, setSemester, nextStep, prevStep } = useRegisterFreeTrialStore();

  const defaultValue: SemesterFormValues = {
    semester: freeTrial.semester,
  };

  const form = useForm({
    defaultValues: defaultValue,
    onSubmit: async ({ value }) => {
      if (!value.semester) return;
      setSemester(value.semester);
      nextStep();
    },
    validators: {
      onChange: z.object({
        semester: z.nativeEnum(Semester, { message: '학기를 선택해주세요' }),
      }),
    },
  });

  const handleSubmit = () => {
    form.handleSubmit();
  };

  return (
    <RegisterFreeTrialLayout title={'어떤 학기를\n공부할까요?'} progressStep={4} totalSteps={9}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-8 w-full h-full"
      >
        <div className="flex flex-1 flex-col justify-start items-start h-full relative">
          <motion.div
            className="w-full space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            tabIndex={-1}
          >
            <form.Field name="semester">
              {(field) => (
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
                  <RadioGroup
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value as unknown as Semester)}
                    className="w-full mt-[1.8rem]"
                  >
                    <div className="grid grid-cols-2 w-full gap-x-[2rem] gap-y-[3rem] mobile:gap-y-[4rem]">
                      {SEMESTER_OPTIONS.map((option) => (
                        <React.Fragment key={option.value}>
                          <RadioGroupItem
                            value={String(option.value)}
                            id={String(option.value)}
                            className="peer sr-only"
                          />
                          <Label htmlFor={String(option.value)} className="block w-full cursor-pointer">
                            <RadioItem
                              label={option.label}
                              checked={String(field.state.value) === String(option.value)}
                            />
                          </Label>
                        </React.Fragment>
                      ))}
                    </div>
                  </RadioGroup>
                </motion.div>
              )}
            </form.Field>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              pointerEvents: 'auto',
            }}
            transition={{ duration: 0.3, ease: 'easeIn', delay: 0.7 }}
            className="w-full mt-auto pt-6"
          >
            <form.Subscribe selector={(state) => [state.canSubmit, state.values.semester]}>
              {([canSubmit, semester]) => (
                <div className="flex justify-center gap-[0.8rem] w-full">
                  <Button variant="empty" type="button" onClick={prevStep} className="w-[7.8rem]">
                    이전
                  </Button>
                  <Button type="button" onClick={handleSubmit} disabled={!semester}>
                    {'다음'}
                  </Button>
                </div>
              )}
            </form.Subscribe>
          </motion.div>
        </div>
      </form>
    </RegisterFreeTrialLayout>
  );
}
