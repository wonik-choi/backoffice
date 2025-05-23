// entities
import { FreeTrialUserRepository } from '@/entities/free-trial-user/models/repository';

// store
import { FreeTrialUserState } from '@/features/register-free-trial/model/store/interface';
import { FreeTrialInStore, Promotion, Rental, UserInStore } from '@/features/register-free-trial/config/schema';

export interface PostFreeTrialUserFormProps {
  store: FreeTrialUserState;
  onSuccessCallback?: () => void;
  onErrorCallback?: (error: Error) => void;
}

// actions
export interface FreeTrialFormData {
  user: UserInStore;
  freeTrial: FreeTrialInStore;
  rental?: Rental;
  promotion?: Promotion;
}

export interface ActionSubmitFreeTrialFormProps {
  formData: FreeTrialFormData;
  repository: FreeTrialUserRepository;
}
