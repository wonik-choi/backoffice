import { toast } from 'sonner';
import { ServerCustomError, ClientCustomError } from './errors';

export const alertError = (error: unknown) => {
  console.log('error', error);
  if (error instanceof ServerCustomError) {
    console.log('server');
    toast.error(`[${error ? error.status : 'ERROR'}]이런! 폼 제출에 실패했어요`, {
      description: error ? (error.debug ? error.debug.message : error.message) : '관리자에게 문의해주세요 (1899-3884)',
      duration: 6000,
    });
  } else if (error instanceof ClientCustomError) {
    toast.error(`['ERROR'}]이런! 폼 제출에 실패했어요`, {
      description: error.message ? error.message : '관리자에게 문의해주세요 (1899-3884)',
      duration: 6000,
    });
  } else {
    toast.error(`[ERROR]이런! 폼 제출에 실패했어요`, {
      description: '관리자에게 문의해주세요 (1899-3884)',
      duration: 6000,
    });
  }
};
