'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import { FormStep } from '@/features/register-free-trial/model/store/interface';
import { FormLayout } from '@/views/register-free-trial/ui/FormLayout';
import { StudentInformation } from './StudentInformation';
import { SchoolInformation } from './SchoolInformation';
import { StartDateSelection } from './StartDateSelection';
import { ScheduleSelection } from './schedule-section/ScheduleSelection';
import { SemesterSelection } from './SemesterSelection';
import { DeviceSelection } from './DeviceSelection';
import { AddressInformation } from './AddressInformation';
import { Completion } from './RegisterComplete';
import { DongaSciencePromotion } from './promotion/DongaSciencePromotion';
const RegisterFreeTrial = () => {
  const { currentStep } = useRegisterFreeTrialStore();

  const renderStep = () => {
    switch (currentStep) {
      case FormStep.StudentInfo:
        return <StudentInformation />;
      case FormStep.SchoolInfo:
        return <SchoolInformation />;
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
        return <StudentInformation />;
    }
  };

  return <FormLayout>{renderStep()}</FormLayout>;
};

export default RegisterFreeTrial;
