'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/atomics/button';
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import { actionSubmitFreeTrialForm } from '@/features/register-free-trial/services/actions/actionSubmitFreeTrialForm';
import { CheckCircle } from 'lucide-react';

export function Completion() {
  const router = useRouter();
  const {
    student,
    parent,
    school,
    schedule,
    startDate,
    semester,
    device,
    formSessionToken,
    isSubmitting,
    isSubmitted,
    setIsSubmitting,
    setIsSubmitted,
    resetForm,
  } = useRegisterFreeTrialStore();

  useEffect(() => {
    const submit = async () => {
      if (!isSubmitted && !isSubmitting && formSessionToken) {
        setIsSubmitting(true);

        try {
          await actionSubmitFreeTrialForm({
            student,
            parent,
            school,
            schedule,
            startDate: startDate!,
            semester,
            device,
            formSessionToken,
          });

          setIsSubmitted(true);
        } catch (error) {
          console.error('Form submission error:', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    };

    submit();
  }, []);

  // Reset form on page load/refresh
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      resetForm();
    });

    return () => {
      window.removeEventListener('beforeunload', () => {
        resetForm();
      });
    };
  }, [resetForm]);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6 py-12">
      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>

      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">신청이 완료되었습니다!</h1>
        <p className="text-gray-500">
          입력하신 정보로 무료체험 신청이 완료되었습니다. 담당자가 확인 후 연락드리겠습니다.
        </p>
      </div>

      <Button
        onClick={() => {
          resetForm();
          router.push('/register-free-trial');
        }}
        className="bg-blue-500 hover:bg-blue-600"
      >
        홈으로 돌아가기
      </Button>
    </div>
  );
}
