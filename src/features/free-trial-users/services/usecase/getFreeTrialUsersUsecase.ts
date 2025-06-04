import type { GetFreeTrialUsersRequestDto } from '@/entities/free-trial-user/models/repository';
import type { FreeTrialUserRepository } from '@/entities/free-trial-user/models/repository';

interface GetFreeTrialUsersUsecaseProps {
  repository: FreeTrialUserRepository;
  request: GetFreeTrialUsersRequestDto;
}

export const getFreeTrialUsersUsecase = async ({ repository, request }: GetFreeTrialUsersUsecaseProps) => {
  try {
    const response = await repository.getFreeTrialUsers(request);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
