'use client';

import { Input } from '@/shared/components/atomics/input';
import { Textarea } from '@/shared/components/atomics/textarea';
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
import { Em } from '@/shared/components/atomics/em';
import { Button } from '@/shared/components/atomics/button';

import { useForm } from '@tanstack/react-form';

// features
import { FreeTrialStudentForm, freeTrialStudentSchema } from '@/features/add-new-free-trial-student/config/schema';
import { statusOptions, deviceRentalOptions } from '@/features/add-new-free-trial-student/models/const';
import CirclePlus from '@/shared/components/svgs/circle-plus/CirclePlus';

const AddFreeTrialStudentDialog = () => {
  const defaultValue: FreeTrialStudentForm = {
    studentName: '',
    phone: '',
    enterancePath: '',
    status: '1차 해피콜 대기',
    parentName: '',
    parentPhone: '',
    deviceRental: '대여중',
    memo: '',
  };

  const submitForm = (data: FreeTrialStudentForm) => {
    // 추후에 무료체험 신청 로직 추가
    console.log('submitForm', data);
  };

  const form = useForm({
    defaultValues: defaultValue,
    validators: {
      onChange: freeTrialStudentSchema,
    },
    onSubmit: async (data) => {
      submitForm(data.value);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100 hover:text-violet-800 hover:border-violet-300 font-medium rounded-lg shadow-sm flex items-center size-fit text-[1.3rem] px-[1rem] py-[0.7rem]">
          <CirclePlus className="size-[1.4rem]" />
          무료체험 학생추가
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="w-full"
        >
          <DialogHeader>
            <DialogTitle>무료체험 신청하기</DialogTitle>
            <DialogDescription>새로운 학생의 무료체험 신청 정보를 입력해주세요.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-[1.6rem] py-[1.6rem] w-full overflow-y-auto max-h-[50rem] scrollbar-thin">
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
                      <Em>{field.state.meta.errors.join(', ')}</Em>
                    )}
                  </div>
                );
              }}
            </form.Field>
            <form.Field name="phone">
              {(field) => {
                return (
                  <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                    <Label htmlFor={field.name}>연락가능번호</Label>
                    <Input
                      type="tel"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="col-span-3"
                    />
                    {field.state.value && field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                      <Em className="col-span-4 grid-cols-subgrid col-start-2">
                        {[...new Set(field.state.meta.errors)].map((error) => error?.message)}
                      </Em>
                    )}
                  </div>
                );
              }}
            </form.Field>
            <form.Field name="enterancePath">
              {(field) => {
                return (
                  <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                    <Label htmlFor={field.name}>방문경로</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="col-span-3"
                    />
                    {field.state.value && field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                      <Em>{[...new Set(field.state.meta.errors)].map((error) => error?.message)}</Em>
                    )}
                  </div>
                );
              }}
            </form.Field>
            <form.Field name="status">
              {(field) => {
                return (
                  <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                    <Label htmlFor={field.name}>처리상태</Label>
                    <Select defaultValue={field.state.value}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="처리상태 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {statusOptions.map((option) => {
                            return (
                              <SelectItem key={option} value={option}>
                                {option}
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
            <form.Field name="parentName">
              {(field) => {
                return (
                  <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                    <Label htmlFor={field.name}>부모님 성함</Label>
                    <Input
                      type="tel"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="col-span-3"
                    />
                    {field.state.value && field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                      <Em>{[...new Set(field.state.meta.errors)].map((error) => error?.message)}</Em>
                    )}
                  </div>
                );
              }}
            </form.Field>
            <form.Field name="parentPhone">
              {(field) => {
                return (
                  <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                    <Label htmlFor={field.name}>부모님 연락가능번호</Label>
                    <Input
                      type="tel"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="col-span-3"
                    />
                    {field.state.value && field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                      <Em>{[...new Set(field.state.meta.errors)].map((error) => error?.message)}</Em>
                    )}
                  </div>
                );
              }}
            </form.Field>
            <form.Field name="deviceRental">
              {(field) => {
                return (
                  <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                    <Label htmlFor={field.name}>대여상태</Label>
                    <Select defaultValue={field.state.value}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="대여상태 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {deviceRentalOptions.map((option) => {
                            return (
                              <SelectItem key={option} value={option}>
                                {option}
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
            <form.Field name="memo">
              {(field) => {
                return (
                  <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                    <Label htmlFor={field.name}>추가 메모 사항</Label>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="col-span-3"
                    />
                    {field.state.value && field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                      <Em>{[...new Set(field.state.meta.errors)].map((error) => error?.message)}</Em>
                    )}
                  </div>
                );
              }}
            </form.Field>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" size="lg" className="text-[1.4rem]">
                취소
              </Button>
            </DialogClose>
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => {
                return (
                  <Button size="lg" type="submit" disabled={!canSubmit} className="text-[1.4rem]">
                    {isSubmitting ? '저장중...' : '저장'}
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

AddFreeTrialStudentDialog.displayName = 'AddFreeTrialStudentForm';

export default AddFreeTrialStudentDialog;
