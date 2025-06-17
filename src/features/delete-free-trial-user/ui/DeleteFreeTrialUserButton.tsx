'use client';
import { toast } from 'sonner';
import { Database, OctagonAlert } from 'lucide-react';

// shared
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from '@/shared/components/atomics/alert-dialog';
import { Button, buttonVariants } from '@/shared/components/atomics/button';
import { ServerCustomError } from '@/shared/lib/errors/errors';
import { ClientCustomError } from '@/shared/lib/errors/errors';

// features
import { useDeleteFreeTrialUser } from '@/features/delete-free-trial-user/services/query/useDeleteFreeTrialUser';

export const DeleteFreeTrialUserButton = ({ freeTrialUserId }: { freeTrialUserId: string }) => {
  const { deleteFreeTrialUser, isPending, error } = useDeleteFreeTrialUser({
    onSuccessCallback: () => {
      toast.success('무료체험 신청이 취소되었습니다.');
    },
    onErrorCallback: (error: unknown) => {
      if (error instanceof ServerCustomError) {
        toast.error(`[${error ? error.status : 'ERROR'}]이런! 폼 제출에 실패했어요`, {
          description: error
            ? error.debug
              ? error.debug.message
              : error.message
            : '관리자에게 문의해주세요 (1899-3884)',
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
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-susimdal-element-primary-light text-susimdal-icon-danger border border-susimdal-border-primary hover:bg-susimdal-border-primary/50 font-medium rounded-lg shadow-sm flex items-center size-fit text-[1.3rem] px-[1rem] py-[0.7rem]">
          <Database className="size-[1.4rem]" />
          {isPending ? '삭제중...' : '완전 삭제'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[40rem]">
        <AlertDialogHeader className="items-center">
          <AlertDialogTitle>
            <div className="mb-2 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
              <OctagonAlert className="h-7 w-7 text-destructive" />
            </div>
            정말 삭제하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[15px] text-center">
            이 작업은 상태변경이 아닌 데이터베이스에서 완전히 삭제하는 작업이고, 되돌릴 수 없습니다. <br />
            그럼에도 삭제하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-2 sm:justify-center">
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            onClick={() => deleteFreeTrialUser(freeTrialUserId)}
          >
            삭제할께요
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
