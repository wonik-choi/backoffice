'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

// shared
import { RadioGroup, RadioGroupItem } from '@/shared/components/atomics/radio-group';
import { formatPhoneNumber, unformatPhoneNumber } from '@/shared/utils/format';

import { Button, Label, Input, Em, RadioItem } from '@/shared/components/ui';

// entities
import { FreeTrialUserGrade } from '@/entities/free-trial-user/models/enums';

// features
import { userSchemaInStore, validableStudentSchema } from '@/features/register-free-trial/config/schema';
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';

// views
import { gradeOptions } from '@/views/register-free-trial/config/const';
import { StepProps } from '@/views/register-free-trial/model/interface';
// 제출 검증 스키마
const studentSchema = userSchemaInStore.pick({
  name: true,
  phoneNumber: true,
  grade: true,
});

// 입력 검증 스키마
const checkStudentSchema = validableStudentSchema.pick({
  name: true,
  phoneNumber: true,
  grade: true,
});

type StudentFormValues = z.infer<typeof studentSchema>;

export function StudentInformation({ currentStep, totalSteps }: StepProps) {
  const { user, setStudentInformation, nextStep, prevStep } = useRegisterFreeTrialStore();

  const defaultValue: StudentFormValues = {
    name: user.name || '',
    phoneNumber: user.phoneNumber ? formatPhoneNumber(user.phoneNumber) : '',
    grade: user.grade,
  };

  const form = useForm({
    defaultValues: defaultValue,
    onSubmit: async ({ value }) => {
      const existsStudentInformation: StudentFormValues = {
        name: value.name,
        grade: value.grade,
      };

      if (value.phoneNumber) {
        existsStudentInformation.phoneNumber = unformatPhoneNumber(value.phoneNumber);
      }

      const validatedStudent = studentSchema.safeParse(existsStudentInformation);

      if (!validatedStudent.success) {
        toast.error('자녀 정보가 올바르지 않습니다');
        return;
      }

      setStudentInformation(validatedStudent.data);
      nextStep();
    },
    validators: {
      onMount: checkStudentSchema,
      onChange: checkStudentSchema,
    },
  });

  const handleSubmit = () => {
    form.handleSubmit();
  };

  return (
    <RegisterFreeTrialLayout
      title={'자녀 정보를\n입력해주세요'}
      eventName={'상세폼진입-학생정보'}
      progressStep={currentStep}
      totalSteps={totalSteps}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4 w-full h-full"
      >
        <div className="flex flex-1 flex-col justify-start items-start h-full relative overflow-hidden">
          {/* 학생 정보 섹션 */}
          <motion.div
            className="w-full space-y-3 mobile:space-y-4 mb-[1rem] mobile:mb-[2rem]"
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: 0, // 단순히 아래로 이동만
              opacity: 1,
              pointerEvents: 'auto',
            }}
            transition={{ duration: 0.4, ease: 'easeIn', delay: 0.4 }}
            tabIndex={-1}
          >
            <form.Field name="name">
              {(field) => (
                <div className="space-y-2 w-full">
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="이름을 입력하세요"
                    className="w-full m-0"
                  />
                  <div className="w-full h-[1.2rem]">
                    {field.state.value && field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                      <Em>{[...new Set(field.state.meta.errors)].map((error) => error?.message)}</Em>
                    )}
                  </div>
                </div>
              )}
            </form.Field>

            <form.Field name="phoneNumber">
              {(field) => (
                <div className="space-y-2 w-full">
                  <Label htmlFor="phoneNumber">학생 휴대전화 (선택)</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(formatPhoneNumber(e.target.value))}
                    onBlur={field.handleBlur}
                    placeholder="010-0000-0000"
                    pattern="010-[0-9]{4}-[0-9]{4}"
                    className="w-full m-0"
                  />
                  <div className="w-full h-[1.2rem]">
                    {field.state.value && field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                      <Em>{[...new Set(field.state.meta.errors)].map((error) => error?.message)}</Em>
                    )}
                  </div>
                </div>
              )}
            </form.Field>
          </motion.div>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: 0, // 단순히 아래로 이동만
              opacity: 1,
              pointerEvents: 'auto',
            }}
            transition={{ duration: 0.4, ease: 'easeIn', delay: 0.7 }}
            tabIndex={-1}
            className="w-full"
          >
            <form.Field name="grade">
              {(field) => {
                return (
                  <div className="space-y-2 w-full">
                    <Label>학년</Label>

                    <RadioGroup
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value as FreeTrialUserGrade)}
                      className="w-full mt-[1.8rem]"
                    >
                      <div className="grid grid-cols-3 w-full gap-x-[2rem] gap-y-[2rem] mobile:gap-y-[3rem]">
                        {gradeOptions.map((option) => (
                          <React.Fragment key={option.value}>
                            <RadioGroupItem value={option.value} id={option.value} className="peer sr-only" />
                            <Label htmlFor={option.value} className="block w-full cursor-pointer">
                              <RadioItem label={option.label} checked={field.state.value === option.value} />
                            </Label>
                          </React.Fragment>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                );
              }}
            </form.Field>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              pointerEvents: 'auto',
            }}
            transition={{ duration: 0.3, ease: 'easeIn', delay: 0.9 }}
            tabIndex={-1}
            className="w-full mt-auto pt-6 bg-whtie z-1"
          >
            <form.Subscribe selector={(state) => [state.canSubmit]}>
              {([canSubmit]) => (
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
          </motion.div>
        </div>
      </form>
    </RegisterFreeTrialLayout>
  );
}
