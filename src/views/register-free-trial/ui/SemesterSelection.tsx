'use client';
import type React from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';

// entities
import { Semester } from '@/entities/free-trial-user/models/enums';

// features
import { freeTrialSchema } from '@/features/register-free-trial/config/schema';
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';

// view
import { SEMESTER_OPTIONS } from '@/views/register-free-trial/config/const';

import { Button } from '@/views/register-free-trial/ui/components/Button';
import { RadioChip } from '@/views/register-free-trial/ui/components/RadioChip';

// Zod 스키마 정의
const semesterSchema = freeTrialSchema.pick({
  semester: true,
});

type SemesterFormValues = z.infer<typeof semesterSchema>;

export function SemesterSelection() {
  const { freeTrial, setSemester, nextStep, prevStep } = useRegisterFreeTrialStore();

  const defaultValue: SemesterFormValues = {
    semester: freeTrial.semester || Semester.M1S1,
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
    <RegisterFreeTrialLayout title={'어떤 학기를\n공부할까요?'} progressStep={4} totalSteps={8}>
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
                <div className="space-y-2 w-full">
                  <div className="grid grid-cols-2 gap-[0.8rem]">
                    {SEMESTER_OPTIONS.map((option) => (
                      <RadioChip
                        key={option.value}
                        label={option.label}
                        value={option.value}
                        checked={field.state.value === option.value}
                        onValueChange={() => {
                          field.handleChange(option.value);
                          console.log('semester', form.getFieldValue('semester'));
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </form.Field>
          </motion.div>

          <div className="w-full mt-auto pt-6">
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
          </div>
        </div>
      </form>
    </RegisterFreeTrialLayout>
  );
}
