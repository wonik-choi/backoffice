'use client';
import type React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

// shared
import { formatPhoneNumber, unformatPhoneNumber } from '@/shared/utils/format';

import { Button, Label, Input, Em } from '@/shared/components/ui';

// features
import { userSchemaInStore, validableParentSchema } from '@/features/register-free-trial/config/schema';
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';

// views
import { ConfirmIsCorrectPhoneNumber } from '@/views/register-free-trial/ui/ConfirmIsCorrectPhoneNumber';

// 입력 유효성 검사 스키마
const parentSchema = validableParentSchema.pick({
  parentName: true,
  parentPhoneNumber: true,
});

// 제출 유효성 검사 스키마
const submitParentSchema = userSchemaInStore.pick({
  parentName: true,
  parentPhoneNumber: true,
});

type ParentFormValues = z.infer<typeof parentSchema>;

export function ParentInformation() {
  const [isCorrectPhoneNumber, setIsCorrectPhoneNumber] = useState(false);
  const { user, setParentInformation, nextStep } = useRegisterFreeTrialStore();

  const defaultValue: ParentFormValues = {
    parentName: user.parentName || '',
    parentPhoneNumber: formatPhoneNumber(user.parentPhoneNumber) || '',
  };

  const form = useForm({
    defaultValues: defaultValue,
    onSubmit: async ({ value }) => {
      const unformatedParentPhoneNumber = unformatPhoneNumber(value.parentPhoneNumber);

      const validatedParent = submitParentSchema.safeParse({
        parentName: value.parentName,
        parentPhoneNumber: unformatedParentPhoneNumber,
      });

      if (!validatedParent.success) {
        toast.error('학부모님 정보가 올바르지 않습니다');
        return;
      }

      setParentInformation(validatedParent.data);
      nextStep();
    },
    validators: {
      onMount: parentSchema,
      onChange: parentSchema,
    },
  });

  /**
   * @description
   * 기입 휴대전화 한번 더 확인
   */
  const confirmPhoneNumber = () => {
    setIsCorrectPhoneNumber(true);
  };

  /**
   * @description
   * 학부모님 정보 제출
   */
  const handleSubmit = () => {
    setIsCorrectPhoneNumber(false);
    form.handleSubmit();
  };

  return (
    <RegisterFreeTrialLayout title={'학부모님 정보를\n입력해주세요'} progressStep={0} totalSteps={9}>
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
            className="w-full space-y-3 mobile:space-y-4 absolute top-0 left-0"
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              pointerEvents: 'auto',
            }}
            transition={{
              duration: 0.4,
              delay: 0.4,
              ease: 'easeIn',
            }}
            tabIndex={-1}
          >
            <form.Field name="parentName">
              {(field) => (
                <div className="space-y-2 w-full">
                  <Label htmlFor="parrentName">성함</Label>
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

            <form.Field name="parentPhoneNumber">
              {(field) => (
                <div className="space-y-2 w-full">
                  <Label htmlFor="parrentPhoneNumber">학부모님 휴대전화</Label>
                  <Input
                    id="parrentPhoneNumber"
                    type="tel"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(formatPhoneNumber(e.target.value))}
                    onBlur={field.handleBlur}
                    placeholder="010-0000-0000"
                    pattern="010-[0-9]{4}-[0-9]{4}"
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              pointerEvents: 'auto',
            }}
            transition={{ duration: 0.3, ease: 'easeIn', delay: 0.9 }}
            className="w-full mt-auto pt-6"
          >
            <form.Subscribe selector={(state) => [state.canSubmit]}>
              {([canSubmit]) => (
                <Button type="button" onClick={confirmPhoneNumber} disabled={!canSubmit}>
                  {'다음'}
                </Button>
              )}
            </form.Subscribe>
          </motion.div>
        </div>
      </form>
      <ConfirmIsCorrectPhoneNumber
        phoneNumber={form.getFieldValue('parentPhoneNumber')}
        openState={isCorrectPhoneNumber}
        setOpenState={setIsCorrectPhoneNumber}
        agreeTerms={handleSubmit}
      />
    </RegisterFreeTrialLayout>
  );
}
