import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// shared
import { KyServerError } from '@/shared/lib/https/ky/interceptor';

// features
import { usePostLogout } from '@/features/authentication/services/query/usePostLogout';

export const useNavigationContext = () => {
  const router = useRouter();
  const { postLogout, isPending: isPostLogoutPending } = usePostLogout({
    onSuccessCallback: () => {
      router.push('/login');
    },
    onErrorCallback: (error) => {
      if (error instanceof KyServerError) {
        toast.error(`[${error ? error.status : 'ERROR'}]이런! 로그아웃에 실패했어요`, {
          description: error ? error.debug.message : '개발자 문의 필요',
          duration: 6000,
        });
      } else {
        toast.error(`[ERROR]이런! 로그아웃에 실패했어요`, {
          description: error ? error.message : '개발자 문의 필요',
          duration: 6000,
        });
      }
    },
  });

  return {
    postLogout,
    isPostLogoutPending,
  };
};
