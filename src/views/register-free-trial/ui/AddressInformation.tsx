'use client';

import type React from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';

import { useState } from 'react';

// shared
import { Button, Label, Input } from '@/shared/components/ui';
import { ButtonInput } from '@/shared/components/ui/views/ButtonInput';

// entities
import { RentalTermCode } from '@/entities/free-trial-user/models/enums';

// features
import { rentalSchema } from '@/features/register-free-trial/config/schema';
import { SearchAddressDrawer } from '@/features/search-address/ui/SearchAddressDrawer';
import type { DaumPostcodeResultDto } from '@/features/search-address/model/dtos';
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';

// view
import { RentalDeviceTerms } from '@/views/register-free-trial/ui/RentalDeviceTerms';
import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';

type AddressFormValues = z.infer<typeof rentalSchema>;

export function AddressInformation() {
  const { nextStep, prevStep, setRental, rental } = useRegisterFreeTrialStore();
  const [isTermsDrawerOpen, setIsTermsDrawerOpen] = useState(false);

  const defaultValue: AddressFormValues = {
    zonecode: rental?.zonecode || '',
    address: rental?.address || '',
    addressType: rental?.addressType || 'R',
    detailAddress: rental?.detailAddress || '',
    terms: rental?.terms || [],
  };

  const form = useForm({
    defaultValues: defaultValue,
    onSubmit: async ({ value }) => {
      setRental({
        address: value.address,
        addressType: value.addressType,
        zonecode: value.zonecode,
        detailAddress: value.detailAddress,
        terms: [
          {
            termCode: RentalTermCode.RENTAL_001,
            agreed: true,
          },
        ],
      });
      nextStep();
    },
  });

  /**
   * @description 주소 검색 시 데이터 적용
   */
  const setSearchAddress = (data: DaumPostcodeResultDto) => {
    const { address, zonecode, addressType } = data;
    form.setFieldValue('address', address);
    form.setFieldValue('zonecode', zonecode);
    form.setFieldValue('addressType', addressType);
  };

  /**
   * @description 다음 버튼 클릭 시
   */
  const handleSubmit = () => {
    setIsTermsDrawerOpen(true);
  };

  return (
    <RegisterFreeTrialLayout title={'아이패드를 받을\n주소지를 입력해주세요'} progressStep={6} totalSteps={9}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4 w-full h-full"
      >
        <div className="flex flex-1 flex-col justify-start items-start h-full relative overflow-hidden">
          <motion.div
            className="w-full space-y-4"
            initial={{ y: -30, opacity: 0 }}
            animate={{
              y: 0, // 단순히 아래로 이동만
              opacity: 1,
              pointerEvents: 'auto',
            }}
            transition={{ duration: 0.3, ease: 'easeIn', delay: 0.4 }}
            tabIndex={-1}
          >
            <form.Field name="address">
              {(field) => (
                <div className="space-y-2 w-full">
                  <Label htmlFor="address">주소</Label>
                  <SearchAddressDrawer setForm={setSearchAddress}>
                    <ButtonInput
                      id="address"
                      value={field.state.value ? `(${form.getFieldValue('zonecode')}) ${field.state.value}` : ''}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      handleClick={() => {}}
                      placeholder="주소 검색"
                      className="w-full m-0"
                    />
                  </SearchAddressDrawer>
                </div>
              )}
            </form.Field>

            <form.Field name="detailAddress">
              {(field) => (
                <div className="space-y-2 w-full">
                  <Input
                    id="detailAddress"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="상세주소를 기입해주세요"
                    className="w-full m-0"
                  />
                </div>
              )}
            </form.Field>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              pointerEvents: 'auto',
            }}
            transition={{ duration: 0.3, ease: 'easeIn', delay: 0.7 }}
            className="w-full mt-auto pt-6"
          >
            <form.Subscribe selector={(state) => [state.values.address, state.values.detailAddress]}>
              {([address, detailAddress]) => (
                <div className="flex justify-center gap-[0.8rem] w-full">
                  <Button variant="empty" type="button" onClick={prevStep} className="w-[7.8rem] ">
                    이전
                  </Button>
                  <Button type="button" onClick={handleSubmit} disabled={!address || !detailAddress}>
                    {'다음'}
                  </Button>
                </div>
              )}
            </form.Subscribe>
          </motion.div>
        </div>
      </form>

      <RentalDeviceTerms
        openState={isTermsDrawerOpen}
        setOpenState={setIsTermsDrawerOpen}
        agreeTerms={form.handleSubmit}
      />
    </RegisterFreeTrialLayout>
  );
}
