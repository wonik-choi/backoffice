'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import { FormStep } from '@/features/register-free-trial/model/store/interface';
import { FormLayout } from '@/views/register-free-trial/ui/FormLayout';
import { StudentInformation } from './student-information/StudentInformation';
import { StartDateSelection } from './StartDateSelection';
import { ScheduleSelection } from './schedule-section/ScheduleSelection';
import { SemesterSelection } from './SemesterSelection';
import { DeviceSelection } from './DeviceSelection';
import { AddressInformation } from './AddressInformation';
import { Completion } from './RegisterComplete';
import { DongaSciencePromotion } from './promotion/DongaSciencePromotion';
import { ParentInformation } from './ParentInformation';

const RegisterFreeTrial = () => {
  const searchParams = useSearchParams();

  const { currentStep, setInflowCode } = useRegisterFreeTrialStore();

  useEffect(() => {
    const inflowCode = searchParams.get('code');

    if (inflowCode) {
      setInflowCode(String(inflowCode));
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
