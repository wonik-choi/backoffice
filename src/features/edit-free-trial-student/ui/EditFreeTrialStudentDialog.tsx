'use client';

import { Input } from '@/shared/components/atomics/input';
import { Label } from '@/shared/components/atomics/label';
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
import SingleDatePicker from '@/shared/components/date-picker/SingleDatePicker';

import { useForm } from '@tanstack/react-form';

// features
import { EditFreeTrialStudentSchema, EditFreeTrialStudentForm } from '@/features/edit-free-trial-student/config/schema';
import NoteAndPen from '@/shared/components/svgs/note-and-pen/NoteAndPen';

/**
 * 무료체험 학생 정보 수정 모달
 * 주의할 점은, 학생 정보 수정이기에 수정할 학생에 대한 데이터를 props 로 정돈하여 내려주어야 한다.
 * @param student 수정할 대상의 학생 정보
 * @returns
 */
const EditFreeTrialStudentDialog = ({ student }: { student: EditFreeTrialStudentForm }) => {
  const defaultValue: EditFreeTrialStudentForm = {
    name: student.name,
    phone: student.phone,
    registrationDate: student.registrationDate,
    enterancePath: student.enterancePath,
    testPeriod: {
      startDate: student.testPeriod.startDate,
      endDate: student.testPeriod.endDate,
    },
    deviceRental: {
      deviceRentalAddress: student.deviceRental.deviceRentalAddress,
      rentalDate: student.deviceRental.rentalDate,
      returnDate: student.deviceRental.returnDate,
    },
  };

  const submitForm = (data: EditFreeTrialStudentForm) => {
    // 추후에 무료체험 신청 로직 추가 (service 내 query)
    console.log('submitForm', data);
  };

  const form = useForm({
    defaultValues: defaultValue,
    validators: {
      onChange: EditFreeTrialStudentSchema,
    },

    onSubmit: async (data) => {
      submitForm(data.value);
    },
  });

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button className="bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100 hover:text-violet-800 hover:border-violet-300 font-medium rounded-lg shadow-sm flex items-center size-fit text-[1.3rem] px-[1rem] py-[0.7rem]">
          <NoteAndPen className="size-[1.4rem]" />
          정보 수정
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle>유저 정보 수정</DialogTitle>
            <DialogDescription>수정할 정보가 존재한다면 수정해주세요.</DialogDescription>
          </DialogHeader>

          <div className="space-y-[2.4rem] py-[1.6rem] max-h-[60vh] overflow-y-auto">
            <div className="space-y-[1.6rem]">
              <h3 className="font-medium text-susimdal-text-basic flex items-center gap-[0.8rem] text-[1.6rem]">
                기본 정보
              </h3>
              <div className="grid gap-[1.6rem] py-[1.6rem]">
                <form.Field name="name">
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
                <form.Field name="registrationDate">
                  {(field) => {
                    return (
                      <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                        <Label htmlFor={field.name}>등록일자</Label>
                        <SingleDatePicker
                          dateLabel={field.state.value ? field.state.value.toLocaleDateString() : '날짜 선택'}
                          selectedDate={field.state.value}
                          onSelect={(date) => field.handleChange(date)}
                          disabled={(date) => date > new Date() || date < new Date('1970-01-01')}
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
              </div>
            </div>
            <div className="space-y-[1.6rem]">
              <h3 className="font-medium text-susimdal-text-basic flex items-center gap-[0.8rem] text-[1.6rem]">
                체험 기간
              </h3>
              <div className="grid gap-[1.6rem] py-[1.6rem]">
                <form.Field name="testPeriod.startDate">
                  {(field) => {
                    return (
                      <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                        <Label htmlFor={field.name}>체험 시작일</Label>
                        <SingleDatePicker
                          dateLabel={field.state.value ? field.state.value.toLocaleDateString() : '날짜 선택'}
                          selectedDate={field.state.value}
                          onSelect={(date) => field.handleChange(date)}
                          disabled={(date) => date > new Date() || date < new Date('1970-01-01')}
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
                <form.Field name="testPeriod.endDate">
                  {(field) => {
                    return (
                      <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                        <Label htmlFor={field.name}>체험 종료일</Label>
                        <SingleDatePicker
                          dateLabel={field.state.value ? field.state.value.toLocaleDateString() : '날짜 선택'}
                          selectedDate={field.state.value}
                          onSelect={(date) => field.handleChange(date)}
                          disabled={(date) => date > new Date() || date < new Date('1970-01-01')}
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
              </div>
            </div>
            <div className="space-y-[1.6rem]">
              <h3 className="font-medium text-susimdal-text-basic flex items-center gap-[0.8rem] text-[1.6rem]">
                아이패드 대여
              </h3>
              <div className="grid gap-[1.6rem] py-[1.6rem]">
                <form.Field name="deviceRental.deviceRentalAddress">
                  {(field) => {
                    return (
                      <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                        <Label htmlFor={field.name}>수령지주소</Label>
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
                <form.Field name="deviceRental.rentalDate">
                  {(field) => {
                    return (
                      <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                        <Label htmlFor={field.name}>대여일</Label>
                        <SingleDatePicker
                          dateLabel={field.state.value ? field.state.value.toLocaleDateString() : '날짜 선택'}
                          selectedDate={field.state.value}
                          onSelect={(date) => field.handleChange(date)}
                          disabled={(date) => date > new Date() || date < new Date('1970-01-01')}
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
                <form.Field name="deviceRental.returnDate">
                  {(field) => {
                    return (
                      <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                        <Label htmlFor={field.name}>반납일</Label>
                        <SingleDatePicker
                          dateLabel={field.state.value ? field.state.value.toLocaleDateString() : '날짜 선택'}
                          selectedDate={field.state.value}
                          onSelect={(date) => field.handleChange(date)}
                          disabled={(date) => date > new Date() || date < new Date('1970-01-01')}
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
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => {
                return (
                  <Button type="submit" disabled={!canSubmit}>
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

EditFreeTrialStudentDialog.displayName = 'EditFreeTrialStudentForm';

export default EditFreeTrialStudentDialog;
