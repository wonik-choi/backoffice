'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// lib
import * as fbq from '@/shared/lib/meta-pixel/fpixel';

// features
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import { FormStep } from '@/features/register-free-trial/model/store/interface';

// views
import { FormLayout } from '@/views/register-free-trial/ui/FormLayout';
import { StudentInformation } from '@/views/register-free-trial/ui/student-information/StudentInformation';
import { StartDateSelection } from '@/views/register-free-trial/ui/StartDateSelection';
import { ScheduleSelection } from '@/views/register-free-trial/ui/schedule-section/ScheduleSelection';
import { SemesterSelection } from '@/views/register-free-trial/ui/SemesterSelection';
import { DeviceSelection } from '@/views/register-free-trial/ui/DeviceSelection';
import { AddressInformation } from '@/views/register-free-trial/ui/AddressInformation';
import { Completion } from '@/views/register-free-trial/ui/RegisterComplete';
import { DongaSciencePromotion } from '@/views/register-free-trial/ui/promotion/DongaSciencePromotion';
import { ParentInformation } from '@/views/register-free-trial/ui/ParentInformation';

const RegisterFreeTrial = () => {
  const searchParams = useSearchParams();
  const { currentStep, setInflowCode } = useRegisterFreeTrialStore();

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
        return <ParentInformation />;
      case FormStep.StudentInfo:
        return <StudentInformation />;
      case FormStep.StartDate:
        return <StartDateSelection />;
      case FormStep.Schedule:
        return <ScheduleSelection />;
      case FormStep.Semester:
        return <SemesterSelection />;
      case FormStep.DeviceSelection:
        return <DeviceSelection />;
      case FormStep.AddressEntry:
        return <AddressInformation />;
      case FormStep.Promotion:
        return <DongaSciencePromotion />;
      case FormStep.Completion:
        return <Completion />;
      default:
        return <ParentInformation />;
    }
  };

  return <FormLayout>{renderStep()}</FormLayout>;
};

export default RegisterFreeTrial;
