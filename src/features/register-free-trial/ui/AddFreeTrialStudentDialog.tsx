'use client';

import React from 'react';
import { FieldApi, FieldInfo, useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';

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
import { Em } from '@/shared/components/atomics/em';
import { Button } from '@/shared/components/atomics/button';
import { convertISOString, formatISOStringToKoreanTitle } from '@/shared/lib/date-fns/utls';
import CirclePlus from '@/shared/components/svgs/circle-plus/CirclePlus';
import SingleDatePicker from '@/shared/components/date-picker/SingleDatePicker';
import { ButtonInput } from '@/shared/components/ui/views/ButtonInput';
import { ClientCustomError, ServerCustomError } from '@/shared/lib/errors/errors';

// entities
import { DayOfWeek, FreeTrialUserGrade, Semester } from '@/entities/free-trial-user/models/enums';
import { PromotionTermCode } from '@/entities/promotion/models/enums';

// features
import {
  FreeTrialInOptional,
  freeTrialSchemaInOptional,
  FreeTrial,
} from '@/features/register-free-trial/config/schema';
import { SchemaSectionLayout } from '@/features/register-free-trial/ui/SchameSectionLayout';
import {
  dongascienceOptionIds,
  gradeOptions,
  inflowOptions,
  semesterOptions,
} from '@/features/register-free-trial/config/const';
import ScheduleSettingCard from './AddScheduleSettingCardButton';
import { SearchAddressModal } from '@/features/search-address/ui/SearchAddressModal';
import { DaumPostcodeResultDto } from '@/features/search-address/model/dtos';
import { freeTrialUsersModalFormConverter } from '@/features/register-free-trial/model/converter/freeTrialUsersModalFormConverter';
import { useManualPostFreeTrialUser } from '@/features/register-free-trial/services/query/useManualPostFreeTrialUser';
import { toast } from 'sonner';

const AddFreeTrialStudentDialog = () => {
  const [openAddressModal, setOpenAddressModal] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const queryClient = useQueryClient();
  const { submitFreeTrialUserForm, isPending } = useManualPostFreeTrialUser({
    onSuccessCallback: () => {
      toast.success('무료체험학생 생성이 완료되었습니다.');
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ['free_trial_users'],
        exact: false,
      });
      setOpenDialog(false);
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
  const defaultValue: FreeTrialInOptional = {
    user: {
      name: '',
      parentName: '',
      parentPhoneNumber: '',
      grade: null,
      phoneNumber: '',
    },
    freeTrial: {
      startDate: '',
      semester: null,
      schedules: [],
    },
    rental: {
      zonecode: '',
      address: '',
      addressType: 'R',
      detailAddress: '',
      terms: [],
    },
    promotions: [
      {
        terms: [],
        promotionCode: '',
        optionIds: [],
      },
    ],
    inflow: {
      code: '',
    },
  };

  const submitForm = (data: FreeTrialInOptional) => {
    // 추후에 무료체험 신청 로직 추가
    const requestBody = freeTrialUsersModalFormConverter(data);

    submitFreeTrialUserForm(requestBody);
  };

  const form = useForm({
    defaultValues: defaultValue,
    validators: {
      onMount: freeTrialSchemaInOptional,
      onChange: freeTrialSchemaInOptional,
    },
    onSubmit: async (data) => {
      submitForm(data.value);
    },
  });

  /**
   * @description 주소 검색 시 데이터 적용
   */
  const setSearchAddress = (data: DaumPostcodeResultDto) => {
    const { address, zonecode, addressType } = data;
    form.setFieldValue('rental.address', address);
    form.setFieldValue('rental.zonecode', zonecode);
    form.setFieldValue('rental.addressType', addressType);
  };

  const onChangeSchedule = (index: number, patch: Partial<FreeTrial['schedules'][0]>) => {
    form.setFieldValue('freeTrial.schedules', (input) => {
      const newList = [...input];
      newList[index] = { ...newList[index], ...patch };
      return newList;
    });
  };

  /**
   * @description 스케줄 삭제
   */
  const onDeleteSchedule = (index: number) => {
    form.setFieldValue(
      'freeTrial.schedules',
      form.getFieldValue('freeTrial.schedules').filter((_, i) => i !== index)
    );
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog} modal={true}>
      <DialogTrigger asChild>
        <Button className="bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100 hover:text-violet-800 hover:border-violet-300 font-medium rounded-lg shadow-sm flex items-center size-fit text-[1.3rem] px-[1rem] py-[0.7rem]">
          <CirclePlus className="size-[1.4rem]" />
          무료체험 학생추가
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
            <DialogTitle>무료체험 신청하기</DialogTitle>
            <DialogDescription>새로운 학생의 무료체험 신청 정보를 입력해주세요.</DialogDescription>
          </DialogHeader>

          <div className="overflow-y-auto max-h-[50rem] scrollbar-thin">
            <SchemaSectionLayout title="Personal Information">
              <React.Fragment>
                <form.Field name="user.name">
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
                <form.Field name="user.phoneNumber">
                  {(field) => {
                    return (
                      <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                        <Label htmlFor={field.name}>번호</Label>
                        <Input
                          type="tel"
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
                <form.Field name="user.parentName">
                  {(field) => {
                    return (
                      <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                        <Label htmlFor={field.name}>학부모님 성함</Label>
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
                <form.Field name="user.parentPhoneNumber">
                  {(field) => {
                    return (
                      <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                        <Label htmlFor={field.name}>학부모님 번호</Label>
                        <Input
                          type="tel"
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
                <form.Field name="user.grade">
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
            <SchemaSectionLayout title="Schedule">
              <React.Fragment>
                <form.Field name="freeTrial.startDate">
                  {(field) => {
                    return (
                      <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                        <Label htmlFor={field.name}>시작날짜</Label>
                        <SingleDatePicker
                          dateLabel={field.state.value ? formatISOStringToKoreanTitle(field.state.value) : '날짜 선택'}
                          selectedDate={field.state.value ? new Date(field.state.value) : undefined}
                          onSelect={(date) => field.handleChange(convertISOString(date ?? new Date()))}
                          disabled={(date) => date < new Date('1970-01-01')}
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
                <form.Field name="freeTrial.schedules">
                  {(field) => {
                    return (
                      <ScheduleSettingCard>
                        {field.state.value.map((schedule, index) => {
                          return (
                            <ScheduleSettingCard.Card
                              key={index}
                              name="일별스케줄"
                              dayOfWeek={schedule.dayOfWeek}
                              startAt={schedule.startAt}
                              todayLearningTime={schedule.todayLearningTime}
                              onChangeStartAt={(time) => onChangeSchedule(index, { startAt: time })}
                              onChangeTodayLearningTime={(time) => onChangeSchedule(index, { todayLearningTime: time })}
                              onDeleteSchedule={() => onDeleteSchedule(index)}
                              onChangeDayOfWeek={(dayOfWeek) => onChangeSchedule(index, { dayOfWeek })}
                            />
                          );
                        })}
                        <ScheduleSettingCard.Button
                          onClick={() => {
                            field.handleChange([
                              ...field.state.value,
                              {
                                dayOfWeek: DayOfWeek.MONDAY,
                                startAt: {
                                  hour: 16,
                                  minute: 0,
                                  timezone: 'Asia/Seoul',
                                },
                                todayLearningTime: 90,
                              },
                            ]);
                          }}
                          disabled={field.state.value.length >= 4}
                        />
                      </ScheduleSettingCard>
                    );
                  }}
                </form.Field>
                <form.Field name="freeTrial.semester">
                  {(field) => {
                    return (
                      <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                        <Label htmlFor={field.name}>학기</Label>
                        <Select
                          onValueChange={(value) => field.handleChange(value as Semester)}
                          defaultValue={field.state.value ?? undefined}
                        >
                          <SelectTrigger className="col-span-3 w-full">
                            <SelectValue placeholder="학기 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {semesterOptions.map((option) => {
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
            <SchemaSectionLayout title="Address">
              <React.Fragment>
                <form.Field name="rental.address">
                  {(field) => (
                    <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                      <Label htmlFor="address">주소</Label>
                      <div className="col-span-3 w-full">
                        <SearchAddressModal
                          name="rental.address"
                          setForm={setSearchAddress}
                          open={openAddressModal}
                          setOpen={setOpenAddressModal}
                        >
                          <ButtonInput
                            id="address"
                            value={
                              field.state.value ? `(${form.getFieldValue('rental.zonecode')}) ${field.state.value}` : ''
                            }
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            handleClick={() => setOpenAddressModal(true)}
                            placeholder="주소 검색"
                            className="text-[1.3rem] mobile:text-[1.3rem]"
                          />
                        </SearchAddressModal>
                      </div>
                    </div>
                  )}
                </form.Field>

                <form.Field name="rental.detailAddress">
                  {(field) => (
                    <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                      <Label htmlFor="detailAddress">상세주소</Label>
                      <Input
                        id="detailAddress"
                        type="text"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="상세주소를 기입해주세요"
                        className="w-full col-span-3"
                      />
                    </div>
                  )}
                </form.Field>
              </React.Fragment>
            </SchemaSectionLayout>
            <SchemaSectionLayout title="promotions">
              <React.Fragment>
                <form.Field name="promotions">
                  {(field) => {
                    return (
                      <div className="grid grid-cols-4 items-center gap-[0.4rem]">
                        <Label htmlFor={field.name}>동아사이언스</Label>
                        <Select
                          onValueChange={(value) =>
                            field.handleChange([
                              {
                                terms: [
                                  {
                                    termCode: PromotionTermCode.PROMOTION_001,
                                    agreed: true,
                                  },
                                ],
                                promotionCode: '',
                                optionIds: [Number(value)],
                              },
                            ])
                          }
                          defaultValue={field.state.value ? String(field.state.value[0].optionIds[0]) : undefined}
                        >
                          <SelectTrigger className="col-span-3 w-full">
                            <SelectValue placeholder="동아사이언스 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {dongascienceOptionIds.map((option) => {
                                return (
                                  <SelectItem key={option.value} value={String(option.value)}>
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

AddFreeTrialStudentDialog.displayName = 'AddFreeTrialStudentDialog';

export default AddFreeTrialStudentDialog;
