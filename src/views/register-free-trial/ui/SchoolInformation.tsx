'use client';
import type React from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';

// features
import { userSchema } from '@/features/register-free-trial/config/schema';
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import { FreeTrialUserGrade } from '@/entities/free-trial-user/models/enums';
import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';

// view
import { gradeOptions } from '@/views/register-free-trial/config/const';

import { Button } from '@/views/register-free-trial/ui/components/Button';
import { Em } from '@/views/register-free-trial/ui/components/Em';
import { Input } from '@/views/register-free-trial/ui/components/Input';
import { Label } from '@/views/register-free-trial/ui/components/Label';
import { RadioChip } from '@/views/register-free-trial/ui/components/RadioChip';

// Zod 스키마 정의
const schoolSchema = userSchema.pick({
  school: true,
  grade: true,
});

type SchoolFormValues = z.infer<typeof schoolSchema>;

export function SchoolInformation() {
  const { user, setSchoolInformation, nextStep, prevStep } = useRegisterFreeTrialStore();

  const defaultValue: SchoolFormValues = {
    school: user.school || '',
    grade: user.grade || FreeTrialUserGrade.ELEMENTARY4,
  };

  const form = useForm({
    defaultValues: defaultValue,
    onSubmit: async ({ value }) => {
      setSchoolInformation({
        school: value.school,
        grade: value.grade,
      });
      nextStep();
    },
    validators: {
      onChange: schoolSchema,
    },
  });

  const handleSubmit = () => {
    form.handleSubmit();
  };

  return (
    <RegisterFreeTrialLayout title={'자녀의 학년을\n알려주세요'} progressStep={1} totalSteps={8}>
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
            {/* 학교 입력 필드 */}
            <form.Field name="school">
              {(field) => (
                <div className="space-y-2 w-full">
                  <Label htmlFor="school">다니는 학교 이름</Label>
                  <Input
                    id="school"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    onBlur={field.handleBlur}
                    placeholder="학교 이름을 입력하세요"
                    className="w-full"
                  />
                  <div className="w-full h-[1.2rem]">
                    {field.state.value && field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                      <Em>{[...new Set(field.state.meta.errors)].map((error) => error?.message)}</Em>
                    )}
                  </div>
                </div>
              )}
            </form.Field>

            {/* 학년 선택 버튼 */}
            <form.Field name="grade">
              {(field) => (
                <div className="space-y-2 w-full">
                  <Label>학년</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {gradeOptions.map((option) => (
                      <RadioChip
                        key={option.value}
                        label={option.label}
                        value={option.value}
                        checked={field.state.value === option.value}
                        onValueChange={() => {
                          field.handleChange(option.value);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </form.Field>
          </motion.div>

          <div className="w-full mt-auto pt-6">
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.values.school]}>
              {([isSubmitting, school, canSubmit]) => (
                <div className="flex justify-center gap-[0.8rem] w-full">
                  <Button variant="empty" type="button" onClick={prevStep} className="w-[7.8rem] ">
                    이전
                  </Button>
                  <Button type="button" onClick={handleSubmit} disabled={!canSubmit}>
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
