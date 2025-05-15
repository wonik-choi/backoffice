'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import { FormStep } from '@/features/register-free-trial/model/store/interface';
import { FormLayout } from '@/views/register-free-trial/ui/FormLayout';
import { StudentInformation } from './StudentInformation';
import { ParentInformation } from './ParentInformation';
import { SchoolInformation } from './SchoolInformation';
import { StartDateSelection } from './StartDateSelection';
import { ScheduleSelection } from './ScheduleSelection';
import { SemesterSelection } from './SemesterSelection';
import { DeviceSelection } from './DeviceSelection';
import { AddressInformation } from './AddressInformation';
import { Completion } from './RegisterComplete';

const RegisterFreeTrial = () => {
  const searchParams = useSearchParams();
  const { currentStep, setFormSessionToken } = useRegisterFreeTrialStore();

  useEffect(() => {
    const token = searchParams.get('formSessionToken');
    if (token) {
      setFormSessionToken(token);
    }
  }, [searchParams, setFormSessionToken]);

  const renderStep = () => {
    console.log('currentStep', currentStep);
    switch (currentStep) {
      case FormStep.StudentInfo:
        return <StudentInformation />;
      case FormStep.ParentInfo:
        return <ParentInformation />;
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
      case FormStep.Completion:
        return <Completion />;
      default:
        return <StudentInformation />;
    }
  };

  return <FormLayout>{renderStep()}</FormLayout>;
};

export default RegisterFreeTrial;
