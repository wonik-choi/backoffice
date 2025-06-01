// entities
import type { PostLoginRequestDto } from '@/entities/common/authentication/models/repository';
import type { AuthenticationRepository } from '@/entities/common/authentication/models/repository';

export interface ActionPostLoginProps {
  formData: PostLoginRequestDto;
  repository: AuthenticationRepository;
}

export interface PostAuthenticationMutationProps {
  onSuccessCallback?: () => void;
  onErrorCallback?: (error: Error) => void;
}

export interface ActionPostLogoutProps {
  repository: AuthenticationRepository;
}
