import { TempUserRepository } from '@/entities/temp-user/models/repository';

import { ApplyFreeTrialForm } from '@/features/apply-free-trial/config/schema';

export interface PostTempUserFormProps {
  onSuccessCallback?: () => void;
  onErrorCallback?: (error: Error) => void;
}

export interface ApplyFreeTrialFormData extends ApplyFreeTrialForm {}

export interface ActionApplyFreeTrialForm {
  formData: ApplyFreeTrialFormData;
  repository: TempUserRepository;
  inflowCode?: string;
}
