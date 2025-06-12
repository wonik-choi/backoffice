'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// shared
import * as fbq from '@/shared/lib/meta-pixel/fpixel';

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/components/atomics/select';
import { formatPhoneNumber, unformatPhoneNumber } from '@/shared/utils/format';
import { ClientCustomError, ServerCustomError } from '@/shared/lib/errors/errors';
import { Checkbox } from '@/shared/components/ui/views/Checkbox';
import { useTopNavigation } from '@/shared/hooks/useTopNavigation';

import { Input, Em, Button } from '@/shared/components/ui';

// entities
import { FreeTrialUserGrade } from '@/entities/free-trial-user/models/enums';
import { ApplyFreeTrialTermCode } from '@/entities/temp-user/models/enums';

// features
import { applyFreeTrialGradeOptions } from '@/features/apply-free-trial/config/const';

import {
  applyFreeTrialFormSchema,
  type ApplyFreeTrialForm,
  validableApplyFreeTrialSchema,
} from '@/features/apply-free-trial/config/schema';
import { useApplyFreeTrialStore } from '@/features/apply-free-trial/model/store';
import { useApplyFreeTrial } from '@/features/apply-free-trial/services/query/useApplyFreeTrial';

// views

export function ApplyFreeTrialTempUser() {
  const { inflowCode, setTempUser } = useApplyFreeTrialStore();
  const { navigate } = useTopNavigation();
  const { applyTempUser, isPending, error } = useApplyFreeTrial({
    onSuccessCallback: () => {
      // 완료 페이지로 이동
      if (typeof window !== undefined) {
        fbq.customEvent('랜딩 무료체험 신청 완료', {
          formName: 'apply-free-trial',
          promotionCode: inflowCode,
        });
      }

      navigate('https://class.susimdal.com/consult_ending');
    },
    onErrorCallback: (error: Error) => {
      if (error instanceof ServerCustomError) {
        toast.error(`[${error ? error.status : 'ERROR'}]이런! 폼 제출에 실패했어요`, {
          description: error
            ? error.debug
              ? error.debug.message
              : error.message
            : '관리자에게 문의해주세요 (1899-3884)',
          duration: 6000,
        });
      } else {
        toast.error(`[ERROR]이런! 폼 제출에 실패했어요`, {
          description: error ? error.message : `관리자에게 문의해주세요 (1899-3884)`,
          duration: 6000,
        });
      }
    },
  });

  const defaultValue: ApplyFreeTrialForm = {
    studentName: '',
    callablePhoneNumber: '',
    grade: null,
    terms: [],
  };

  const form = useForm({
    defaultValues: defaultValue,
    onSubmit: async ({ value }) => {
      const existsTempUserInformation: ApplyFreeTrialForm = {
        studentName: value.studentName,
        callablePhoneNumber: unformatPhoneNumber(value.callablePhoneNumber),
        grade: value.grade,
        terms: value.terms,
      };

      const validatedTempUser = applyFreeTrialFormSchema.safeParse(existsTempUserInformation);

      if (!validatedTempUser.success) {
        toast.error('입력 정보가 적합하지 않습니다.');
        throw new ClientCustomError('입력 정보가 적합하지 않습니다.');
      }

      setTempUser(validatedTempUser.data);

      applyTempUser({ tempFormData: validatedTempUser.data, inflowCode: inflowCode });
    },
    validators: {
      onMount: validableApplyFreeTrialSchema,
      onChange: validableApplyFreeTrialSchema,
    },
  });

  const handleSubmit = () => {
    if (isPending) return;
    form.handleSubmit();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="w-full h-full"
    >
      <div className="flex flex-col justify-start items-start h-full relative">
        {/* 학생 정보 섹션 */}
        <motion.div
          className="w-full space-y-3 mb-[1rem]"
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
          tabIndex={-1}
        >
          <form.Field name="studentName">
            {(field) => (
              <div className="space-y-2 w-full">
                <Input
                  id="studentName"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="이름을 입력하세요"
                  className="w-full bg-white py-[2.4rem] px-[1.5rem] text-[1.6rem] rounded-[0.6rem] focus:outline-none focus-visible:border-none focus-visible:ring-[0.2rem] focus-visible:ring-susimdal-button-primary-fill"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="callablePhoneNumber">
            {(field) => (
              <div className="space-y-2 w-full">
                <Input
                  id="callablePhoneNumber"
                  type="tel"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(formatPhoneNumber(e.target.value))}
                  onBlur={field.handleBlur}
                  placeholder="연락 가능한 번호를 입력해주세요"
                  pattern="010-[0-9]{4}-[0-9]{4}"
                  className="w-full bg-white py-[2.4rem] px-[1.5rem] text-[1.6rem] rounded-[0.6rem] focus:outline-none focus-visible:border-none focus-visible:ring-[0.2rem] focus-visible:ring-susimdal-button-primary-fill"
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

        <motion.div transition={{ duration: 0.4, ease: 'easeIn' }} tabIndex={-1} className="w-full mb-[1.8rem]">
          <form.Field name="grade">
            {(field) => {
              return (
                <div className="space-y-2 w-full">
                  <Select onValueChange={(value) => field.handleChange(value as FreeTrialUserGrade)}>
                    <SelectTrigger
                      className="w-full bg-white py-[2.4rem] px-[1.5rem] text-[1.6rem] rounded-[0.6rem]"
                      iconClassName="size-[1.8rem]"
                    >
                      <SelectValue placeholder="학년을 선택해주세요" className="w-full" />
                    </SelectTrigger>
                    <SelectContent className="w-full bg-white">
                      {applyFreeTrialGradeOptions.map((option) => {
                        return (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="w-full bg-white py-[1.4rem] px-[1.4rem] text-[1.4rem] rounded-[0.6rem]"
                            iconClassName="size-[1.7rem]"
                          >
                            {option.label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              );
            }}
          </form.Field>
        </motion.div>

        <form.Field name="terms">
          {(field) => {
            return (
              <div className="w-full flex flex-col justify-center items-start gap-[1.7rem] px-[0.3rem] mb-[3rem]">
                <div className="w-full flex justify-start items-center gap-[1rem]">
                  <Checkbox
                    checked={field.state.value.some((term) => term.termCode === ApplyFreeTrialTermCode.TEMP_USER_001)}
                    onCheckedChange={() =>
                      field.handleChange(
                        field.state.value.some((term) => term.termCode === ApplyFreeTrialTermCode.TEMP_USER_001)
                          ? field.state.value.filter((term) => term.termCode !== ApplyFreeTrialTermCode.TEMP_USER_001)
                          : [...field.state.value, { termCode: ApplyFreeTrialTermCode.TEMP_USER_001, agreed: true }]
                      )
                    }
                  />
                  <label className="text-[1.5rem] font-bold text-susimdal-text-basic">필수</label>
                  <p className="text-[1.5rem] font-medium text-susimdal-text-subtle">
                    개인정보 수집 및 이용에 동의합니다.
                  </p>
                </div>
                <div className="w-full flex justify-start items-center gap-[1rem]">
                  <Checkbox
                    checked={field.state.value.some((term) => term.termCode === ApplyFreeTrialTermCode.TEMP_USER_002)}
                    onCheckedChange={() =>
                      field.handleChange(
                        field.state.value.some((term) => term.termCode === ApplyFreeTrialTermCode.TEMP_USER_002)
                          ? field.state.value.filter((term) => term.termCode !== ApplyFreeTrialTermCode.TEMP_USER_002)
                          : [...field.state.value, { termCode: ApplyFreeTrialTermCode.TEMP_USER_002, agreed: true }]
                      )
                    }
                  />
                  <label className="text-[1.5rem] font-bold text-susimdal-text-basic">선택</label>
                  <p className="text-[1.5rem] font-medium text-susimdal-text-subtle">마케팅 정보 수신에 동의합니다.</p>
                </div>
              </div>
            );
          }}
        </form.Field>

        <div className="w-full mt-auto pt-6">
          <form.Subscribe selector={(state) => [state.canSubmit]}>
            {([canSubmit]) => (
              <div className="flex justify-center gap-[0.8rem] w-full">
                <Button type="button" onClick={handleSubmit} disabled={!canSubmit} loading={isPending}>
                  {'동의하고 접수하기'}
                </Button>
              </div>
            )}
          </form.Subscribe>
        </div>
      </div>
    </form>
  );
}
