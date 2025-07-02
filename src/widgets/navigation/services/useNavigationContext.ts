import { useRouter } from 'next/navigation';

// shared
import { alertError } from '@/shared/lib/errors/queryOnErrorCallback';

// features
import { usePostLogout } from '@/features/authentication/services/query/usePostLogout';

export const useNavigationContext = () => {
  const router = useRouter();
  const { postLogout, isPending: isPostLogoutPending } = usePostLogout({
    onSuccessCallback: () => {
      router.replace('/login');
    },
    onErrorCallback: (error: unknown) => {
      alertError(error);
      unhandledFunction();
    },
  });

  return {
    postLogout,
    isPostLogoutPending,
  };
};
