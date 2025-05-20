'use client';
import { useState } from 'react';
import type React from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';

// features
import { userSchema } from '@/features/register-free-trial/config/schema';
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';

// views
import { Label } from '@/views/register-free-trial/ui/components/Label';
import { Input } from '@/views/register-free-trial/ui/components/Input';
import { Em } from '@/views/register-free-trial/ui/components/Em';
import { Button } from '@/views/register-free-trial/ui/components/Button';

// Zod 스키마 정의
const parentSchema = userSchema.pick({
  parrentName: true,
  parrentPhoneNumber: true,
});

type ParentFormValues = z.infer<typeof parentSchema>;

export function ParentInformation() {
  const { user, setStudentInformation, nextStep } = useRegisterFreeTrialStore();

  const defaultValue: ParentFormValues = {
    parrentName: user.parrentName || '',
    parrentPhoneNumber: user.parrentPhoneNumber || '',
  };

  // 전화번호 포맷팅 함수
  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');

    if (digits.length <= 7) {
      return digits.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    } else {
      return digits.replace(/(\d{3})(\d{3,4})(\d{1,4})/, '$1-$2-$3');
    }
  };

  const form = useForm({
    defaultValues: defaultValue,
    onSubmit: async ({ value }) => {
      setStudentInformation({
        parrentName: value.parrentName,
        parrentPhoneNumber: value.parrentPhoneNumber,
      });
      nextStep();
    },
    validators: {
      onChange: parentSchema,
    },
  });

  const handleSubmit = () => {
    form.handleSubmit();
  };

  return (
    <RegisterFreeTrialLayout title={'자녀의 정보를\n입력해주세요'} progressStep={0} totalSteps={8}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4 w-full h-full"
      >
        <div className="flex flex-1 flex-col justify-start items-start h-full relative overflow-hidden">
          {/* 학부모 정보 섹션 */}
          <motion.div
            className="w-full space-y-4 absolute top-0 left-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              pointerEvents: 'auto',
            }}
            transition={{
              duration: 0.4,
              delay: 0.1, // 약간의 지연
              ease: 'easeIn',
            }}
            tabIndex={-1}
          >
            <form.Field name="parrentName">
              {(field) => (
                <div className="space-y-2 w-full">
                  <Label htmlFor="parrentName">부모님 성함</Label>
                  <Input
                    id="parrentName"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="이름을 입력하세요"
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

            <form.Field name="parrentPhoneNumber">
              {(field) => (
                <div className="space-y-2 w-full">
                  <Label htmlFor="parrentPhoneNumber">부모님 전화번호</Label>
                  <Input
                    id="parrentPhoneNumber"
                    type="tel"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(formatPhoneNumber(e.target.value))}
                    onBlur={field.handleBlur}
                    placeholder="010-1234-5678"
                    pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
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
          </motion.div>

          <div className="w-full mt-auto pt-6">
            <form.Subscribe selector={(state) => [state.canSubmit]}>
              {([canSubmit]) => (
                <Button type="button" onClick={handleSubmit} disabled={!canSubmit}>
                  {'다음'}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </div>
      </form>
    </RegisterFreeTrialLayout>
  );
}
