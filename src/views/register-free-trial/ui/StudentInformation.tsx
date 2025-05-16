'use client';

import type React from 'react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Button } from '@/shared/components/atomics/button';
import { Input } from '@/shared/components/atomics/input';
import { Label } from '@/shared/components/atomics/label';
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';
import { Em } from '@/shared/components/atomics/em';

// Zod 스키마 정의
const studentSchema = z.object({
  name: z.string().min(1, '학생 이름을 입력해주세요'),
  phoneNumber: z.string().min(1, '전화번호를 입력해주세요'),
});

type StudentFormValues = z.infer<typeof studentSchema>;

export function StudentInformation() {
  const { student, setStudent, nextStep } = useRegisterFreeTrialStore();

  const defaultValue: StudentFormValues = {
    name: student.name || '',
    phoneNumber: student.phoneNumber || '',
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
      setStudent({
        name: value.name,
        phoneNumber: value.phoneNumber,
      });
      nextStep();
    },
    validators: {
      onChange: studentSchema,
      onBlur: studentSchema,
    },
  });

  return (
    <RegisterFreeTrialLayout
      title="학생의 정보를 적어주세요"
      progressStep={0}
      totalSteps={5}
      actionButton={
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => {
            return (
              <Button
                type="button"
                onClick={() => form.handleSubmit()}
                disabled={!canSubmit}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                {isSubmitting ? '..' : '다음'}
              </Button>
            );
          }}
        </form.Subscribe>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4 w-full"
      >
        <form.Field
          name="name"
          validators={{
            onChange: studentSchema.shape.name,
            onBlur: studentSchema.shape.name,
          }}
        >
          {(field) => (
            <div className="space-y-2 w-full">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="이름을 입력하세요"
                className="w-full"
              />
              {field.state.value && field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <Em>{[...new Set(field.state.meta.errors)].map((error) => error?.message)}</Em>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="phoneNumber"
          validators={{
            onChange: studentSchema.shape.phoneNumber,
            onBlur: studentSchema.shape.phoneNumber,
          }}
        >
          {(field) => (
            <div className="space-y-2 w-full">
              <Label htmlFor="phoneNumber">전화번호</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={field.state.value}
                onChange={(e) => field.handleChange(formatPhoneNumber(e.target.value))}
                onBlur={field.handleBlur}
                placeholder="010-1234-5678"
                pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
                className="w-full"
              />
              {field.state.value && field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <Em>{[...new Set(field.state.meta.errors)].map((error) => error?.message)}</Em>
              )}
            </div>
          )}
        </form.Field>
      </form>
    </RegisterFreeTrialLayout>
  );
}
