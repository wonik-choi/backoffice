'use client';

import React from 'react';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// shared
import { Input } from '@/shared/components/atomics/input';
import { Label } from '@/shared/components/atomics/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atomics/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from '@/shared/components/atomics/dialog';
import { CirclePlus } from 'lucide-react';
import { Em } from '@/shared/components/atomics/em';
import { Button } from '@/shared/components/atomics/button';
import { alertError } from '@/shared/lib/errors/queryOnErrorCallback';

// entities
import { FreeTrialUserGrade } from '@/entities/free-trial-user/models/enums';

// features
import { usePostTempFreeTrialUser } from '@/features/temp-free-trial-user/services/query/usePostTempFreeTrialUser';
import { TempFreeTrialForm, tempFreeTrialFormSchema } from '@/features/temp-free-trial-user/config/schema';
import { SchemaSectionLayout } from '@/features/temp-free-trial-user/ui/SchemaSectionLayout';
import { inflowOptions, gradeOptions } from '@/features/temp-free-trial-user/config/const';

const PostTempFreeTrialUserDialog = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const queryClient = useQueryClient();
  const { postTempFreeTrialUser, isPending } = usePostTempFreeTrialUser({
    onSuccessCallback: () => {
      toast.success('1차 무료체험학생 등록이 완료되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['temp_free_trial_users'],
        exact: false,
      });
      setOpenDialog(false);
    },
    onErrorCallback: (error: unknown) => {
      alertError(error);
    },
  });

  const defaultValue: TempFreeTrialForm = {
    studentName: '',
    callablePhoneNumber: '',
    grade: null,
    inflow: {
      code: '',
    },
  };

  const form = useForm({
    defaultValues: defaultValue,
    validators: {
      onMount: tempFreeTrialFormSchema,
      onChange: tempFreeTrialFormSchema,
    },
    onSubmit: (data) => {
      submitForm(data.value);
    },
  });

  const submitForm = (data: TempFreeTrialForm) => {
    postTempFreeTrialUser({ tempFormData: data });
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog} modal={true}>
      <DialogTrigger asChild>
        <Button className="bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100 hover:text-violet-800 hover:border-violet-300 font-medium rounded-lg shadow-sm flex items-center size-fit text-[1.3rem] px-[1rem] py-[0.7rem]">
          <CirclePlus className="size-[1.4rem]" />
          1차 무료체험 신청자 등록
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-h-[70rem]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="w-full"
        >
          <DialogHeader>
            <DialogTitle>1차 무료체험신청자 등록하기</DialogTitle>
            <DialogDescription>1차 무료체험신청자의 정보를 등록해주세요.</DialogDescription>
          </DialogHeader>

          <div className="overflow-y-auto max-h-[50rem] scrollbar-thin">
            <SchemaSectionLayout title="Personal Information">
              <React.Fragment>
                <form.Field name="studentName">
                  {(field) => {
                    return (
                      <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                        <Label htmlFor={field.name}>학생 이름</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="col-span-3"
                        />
                        {field.state.value && field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                          <Em className="col-span-4 grid-cols-subgrid col-start-2 text-[1rem]">
                            {[...new Set(field.state.meta.errors)].map((error) => error?.message)}
                          </Em>
                        )}
                      </div>
                    );
                  }}
                </form.Field>
                <form.Field name="callablePhoneNumber">
                  {(field) => {
                    return (
                      <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                        <Label htmlFor={field.name}>연락가능번호</Label>
                        <Input
                          type="tel"
                          id={field.name}
                          name={field.name}
                          value={field.state.value ?? ''}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="col-span-3"
                        />
                        {field.state.value && field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                          <Em className="col-span-4 grid-cols-subgrid col-start-2 text-[1rem]">
                            {[...new Set(field.state.meta.errors)].map((error) => error?.message)}
                          </Em>
                        )}
                      </div>
                    );
                  }}
                </form.Field>
                <form.Field name="grade">
                  {(field) => {
                    return (
                      <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                        <Label htmlFor={field.name}>학년</Label>
                        <Select
                          onValueChange={(value) => {
                            field.handleChange(value as FreeTrialUserGrade);
                          }}
                          defaultValue={field.state.value ?? undefined}
                        >
                          <SelectTrigger className="col-span-3 w-full">
                            <SelectValue placeholder="학년 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {gradeOptions.map((option) => {
                                return (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  }}
                </form.Field>
              </React.Fragment>
            </SchemaSectionLayout>
            <SchemaSectionLayout title="Inflow">
              <form.Field name="inflow.code">
                {(field) => {
                  return (
                    <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                      <Label htmlFor={field.name}>유입경로</Label>
                      <Select
                        onValueChange={(value) => {
                          field.handleChange(value);
                        }}
                        defaultValue={field.state.value ?? undefined}
                      >
                        <SelectTrigger className="col-span-3 w-full">
                          <SelectValue placeholder="유입경로 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {inflowOptions.map((option) => {
                              return (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  );
                }}
              </form.Field>
            </SchemaSectionLayout>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" size="lg" className="text-[1.4rem]">
                취소
              </Button>
            </DialogClose>
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit]) => {
                return (
                  <Button size="lg" type="submit" disabled={!canSubmit} className="text-[1.4rem]">
                    {isPending ? '저장중...' : '저장'}
                  </Button>
                );
              }}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

PostTempFreeTrialUserDialog.displayName = 'PostTempFreeTrialUserDialog';

export default PostTempFreeTrialUserDialog;
