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
const studentSchema = userSchema.pick({
  name: true,
  phoneNumber: true,
  parrentName: true,
  parrentPhoneNumber: true,
});

type StudentFormValues = z.infer<typeof studentSchema>;

export function StudentInformation() {
  const [innerStep, setInnerStep] = useState(0);
  const { user, setStudentInformation, nextStep } = useRegisterFreeTrialStore();

  // 1단계 유효성 검사
  const step1Validation = (name: string | undefined | boolean, phoneNumber: string | undefined | boolean) => {
    if (typeof name === 'boolean' || typeof phoneNumber === 'boolean') {
      return true;
    }
    const phoneRegex = /^01([016789])[-\s]?(\d{3,4})[-\s]?(\d{4})$/;
    return name && phoneNumber && phoneRegex.test(phoneNumber);
  };

  const defaultValue: StudentFormValues = {
    name: user.name || '',
    phoneNumber: user.phoneNumber || '',
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
        name: value.name,
        phoneNumber: value.phoneNumber,
        parrentName: value.parrentName,
        parrentPhoneNumber: value.parrentPhoneNumber,
      });
      setInnerStep(0);
      nextStep();
    },
    validators: {
      onChange: studentSchema,
    },
  });

  const handleSubmit = () => {
    if (innerStep === 0) {
      const { name, phoneNumber } = studentSchema
        .pick({
          name: true,
          phoneNumber: true,
        })
        .parse({
          name: form.getFieldValue('name'),
          phoneNumber: form.getFieldValue('phoneNumber'),
        });

      if (!name || !phoneNumber) {
        alert('이름 또는 전화번호를 입력해주세요');
        return;
      }
      setInnerStep(1);
    } else {
      form.handleSubmit();
    }
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
          {/* 학생 정보 섹션 */}
          <motion.div
            className="w-full space-y-4"
            initial={{ y: 0 }}
            animate={{
              y: innerStep === 1 ? 200 : 0, // 단순히 아래로 이동만
              pointerEvents: innerStep === 1 ? 'none' : 'auto',
            }}
            transition={{ duration: 0.4, ease: 'easeIn' }}
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
                  <Label htmlFor="phoneNumber">전화번호</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(formatPhoneNumber(e.target.value))}
                    onBlur={field.handleBlur}
                    placeholder="010-1234-5678"
                    pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
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

          {/* 학부모 정보 섹션 */}
          <motion.div
            className="w-full space-y-4 absolute top-0 left-0"
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: innerStep === 1 ? 0 : -20,
              opacity: innerStep === 1 ? 1 : 0,
              pointerEvents: innerStep === 1 ? 'auto' : 'none',
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
            <form.Subscribe selector={(state) => [state.canSubmit, state.values.name, state.values.phoneNumber]}>
              {([canSubmit, name, phoneNumber]) => (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={innerStep === 0 ? !step1Validation(name, phoneNumber) : !canSubmit}
                >
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
