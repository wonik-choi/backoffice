'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// lib
import { alertError } from '@/shared/lib/errors/queryOnErrorCallback';
import * as fbq from '@/shared/lib/meta-pixel/fpixel';

// features
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import { FormStep } from '@/features/register-free-trial/model/store/interface';
import { usePostFreeTrialUserForm } from '@/features/register-free-trial/services/query/usePostFreeTrialUserForm';

// views
import { FormLayout } from '@/views/register-free-trial/ui/FormLayout';
import { StudentInformation } from '@/views/register-free-trial/ui/student-information/StudentInformation';
import { StartDateSelection } from '@/views/register-free-trial/ui/StartDateSelection';
import { ScheduleSelection } from '@/views/register-free-trial/ui/schedule-section/ScheduleSelection';
import { SemesterSelection } from '@/views/register-free-trial/ui/SemesterSelection';
import { DeviceSelection } from '@/views/register-free-trial/ui/non-promotion/DeviceSelection';
import { AddressInformation } from '@/views/register-free-trial/ui/non-promotion/AddressInformation';
import { Completion } from '@/views/register-free-trial/ui/RegisterComplete';
import { ParentInformation } from '@/views/register-free-trial/ui/ParentInformation';

const RegisterFreeTrial = () => {
  const searchParams = useSearchParams();
  const { currentStep, setInflowCode, goToStep } = useRegisterFreeTrialStore();

  /** mutation */
  const freeTrialUserState = useRegisterFreeTrialStore((state) => state);
  const { submitFreeTrialUserForm, isPending } = usePostFreeTrialUserForm({
    store: freeTrialUserState,
    onSuccessCallback: () => {
      if (typeof window !== undefined) {
        fbq.customEvent('상세폼 제출 완료(비프로모션)', {
          formName: 'register-free-trial-not-promotion',
        });
      }
      goToStep(FormStep.Completion);
    },
    onErrorCallback: (error: Error) => {
      alertError(error);
    },
  });

  useEffect(() => {
    const inflowCode = searchParams.get('code');

    if (inflowCode) {
      setInflowCode(String(inflowCode));
    }

    if (typeof window !== undefined) {
      fbq.customEvent('상세폼 접속', { formName: 'register-free-trial', promotionCode: inflowCode });
    }
  }, [searchParams]);

  const renderStep = () => {
    switch (currentStep) {
      case FormStep.ParentInfo:
        return <ParentInformation currentStep={FormStep.ParentInfo} totalSteps={8} />;
      case FormStep.StudentInfo:
        return <StudentInformation currentStep={FormStep.StudentInfo} totalSteps={8} />;
      case FormStep.StartDate:
        return <StartDateSelection currentStep={FormStep.StartDate} totalSteps={8} />;
      case FormStep.Schedule:
        return <ScheduleSelection currentStep={FormStep.Schedule} totalSteps={8} />;
      case FormStep.Semester:
        return <SemesterSelection currentStep={FormStep.Semester} totalSteps={8} />;
      case FormStep.DeviceSelection:
        return (
          <DeviceSelection
            currentStep={FormStep.DeviceSelection}
            totalSteps={8}
            onCompleteSubmitForm={submitFreeTrialUserForm}
            onPendingSubmitForm={isPending}
          />
        );
      case FormStep.AddressEntry:
        return (
          <AddressInformation
            currentStep={FormStep.AddressEntry}
            totalSteps={8}
            onCompleteSubmitForm={submitFreeTrialUserForm}
            onPendingSubmitForm={isPending}
          />
        );
      case FormStep.Completion:
        return <Completion currentStep={FormStep.Completion} totalSteps={8} />;
      default:
        return <ParentInformation currentStep={FormStep.ParentInfo} totalSteps={8} />;
    }
  };

  return <FormLayout>{renderStep()}</FormLayout>;
};

export default RegisterFreeTrial;
