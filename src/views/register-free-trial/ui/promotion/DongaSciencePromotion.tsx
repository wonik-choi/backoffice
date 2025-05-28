'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

// shared
import { RadioButton } from '@/shared/components/radio-button/RadioButton';
import { RadioGroup, RadioGroupItem } from '@/shared/components/atomics/radio-group';
import { Button, Label } from '@/shared/components/ui';
import { KyServerError } from '@/shared/lib/https/ky/interceptor';

// entities
import { PromotionTermCode } from '@/entities/free-trial-user/models/enums';

// features
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import { usePostFreeTrialUserForm } from '@/features/register-free-trial/services/query/usePostFreeTrialUserForm';
import { FormStep } from '@/features/register-free-trial/model/store/interface';

// views
import { PromotionLayout } from '@/views/register-free-trial/ui/promotion/PromotionLayout';

import { DongaScienceTerms } from '@/views/register-free-trial/ui/promotion/DongaScienceTerms';

import { DetailDongaScience } from './DetailDongaScience';

interface PromotionOptionCardProps {
  promotionOption: string;
  checked: boolean;
}

export const PromotionOptionLabel = ({ promotionOption, checked }: PromotionOptionCardProps) => {
  return (
    <div className="flex justify-start items-center gap-[0.8rem]">
      <RadioButton checked={checked} size="lg" />
      <p className="text-[1.2rem] mobile:text-[1.5rem] font-normal text-susimdal-text-basic"> {promotionOption}</p>
    </div>
  );
};

export const DongaSciencePromotion = () => {
  const [selectedPromotionOption, setSelectedPromotionOption] = useState<'1' | '2' | '3'>('1');
  const [isTermsDrawerOpen, setIsTermsDrawerOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const { setPromotion, rental: beforeAgreeRentalDevice, prevStep, nextStep, backToStep } = useRegisterFreeTrialStore();

  /** mutation */
  const freeTrialUserState = useRegisterFreeTrialStore((state) => state);
  const { submitFreeTrialUserForm, isPending, error } = usePostFreeTrialUserForm({
    store: freeTrialUserState,
    onSuccessCallback: () => {
      nextStep();
    },
    onErrorCallback: (error: Error) => {
      if (error instanceof KyServerError) {
        toast.error(`[${error ? error.status : 'ERROR'}]이런! 폼 제출에 실패했어요`, {
          description: error ? error.message : '관리자에게 문의해주세요 (1899-3884)',
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

  const decisionPromotionOption = (value: '1' | '2' | '3') => {
    // yse 이면 대여를 한다.
    setSelectedPromotionOption(value);
  };

  /**
   * @description 뒤로가기 시 조건 분리
   */
  const moveConditionalPrevStep = () => {
    if (beforeAgreeRentalDevice) {
      prevStep();
    } else {
      backToStep(FormStep.DeviceSelection);
    }
  };

  /**
   * @description
   * 최종 폼 제출 함수
   */
  const submitUserDetailForm = async () => {
    if (isPending) return;
    submitFreeTrialUserForm();
  };

  /**
   * @description
   * 이벤트 동의 시 약관 저장 함수
   *  */
  const earnPromotionTermsAgreement = async () => {
    setPromotion([
      {
        promotionCode: 'DONGASCIENCE_001', // 지정값을 받을 예정,
        optionIds: [Number(selectedPromotionOption)],
        terms: [
          {
            termCode: PromotionTermCode.DONGASCIENCE_001,
            agreed: true,
          },
        ],
      },
    ]);
    await submitUserDetailForm();
  };

  /**
   * @description
   * 이벤트 미 동의시 약관 저장 함수
   */
  const omitPromotionTermsAgreement = async () => {
    await submitUserDetailForm();
  };

  /**
   * @description
   * 약관 동의창 열기
   */
  const openTermsDrawer = () => {
    setIsTermsDrawerOpen(true);
  };

  /**
   * @description
   * 자세히 보기 열기
   */
  const openDetailDrawer = () => {
    setIsDetailDrawerOpen(true);
  };

  return (
    <PromotionLayout progressStep={7} totalSteps={9}>
      <section className="flex flex-1 flex-col w-full h-full justify-start relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          tabIndex={-1}
          className="flex flex-col flex-1 w-full overflow-y-auto scrollbar-hide pb-[18rem] overflow-hidden"
        >
          <div className="w-full flex flex-col justify-start items-start gap-[0.8rem] mb-[0.9rem] mobile:mb-[1.2rem]">
            <motion.p
              initial={{ opacity: 0, y: -10, scale: 1.02 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', duration: 0.3, ease: 'easeIn', bounce: 0.3, delay: 0.6 }}
              tabIndex={-1}
              className="text-[1.2rem] font-bold text-susimdal-text-primary"
            >
              (~6/15) 가정의달 EVENT!
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeIn', delay: 0.7 }}
              tabIndex={-1}
              className="text-[1.7rem] mobile:text-[2rem] font-bold text-susimdal-text-basic leading-[2.5rem] mobile:leading-[3rem] whitespace-pre-wrap"
            >{`과학·수학동아 구독권을\n무료로 드려요`}</motion.h1>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', duration: 0.1, bounce: 5, delay: 0.7 }}
              className="flex justify-start items-center gap-[0.2rem] cursor-pointer [&>p]:text-susimdal-text-subtle [&>svg]:text-susimdal-text-subtle active:[&>p]:text-susimdal-text-primary active:[&>svg]:text-susimdal-text-primary "
            >
              <p className="text-[1.2rem] mobile:text-[1.4rem] font-normal" onClick={openDetailDrawer}>
                자세히 보기
              </p>
              <ChevronRight className="size-[1.5rem] mobile:size-[1.6rem] " />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 1.05 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeIn', delay: 0.1 }}
            tabIndex={-1}
            className="w-full flex justify-center items-center mb-[0.9rem] mobile:mb-[1.2rem]"
          >
            <div className="relative  w-[20rem] h-[16rem] mobile:w-[25rem] mobile:h-[20rem]">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                className="
                absolute inset-0
                bg-gradient-to-tr from-pink-300 via-transparent to-purple-300
                filter blur-xl opacity-30
                "
              />
              <Image
                src="/images/donga-promotion.png"
                alt="donga-promotion"
                fill={true}
                sizes="(max-width: 640px) 25rem, 20rem"
                quality={100}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeIn', delay: 0.8 }}
            tabIndex={-1}
            className="w-full flex justify-start items-center mb-[1.2rem]"
          >
            <p className="text-[1.2rem] mobile:text-[1.5rem] font-noraml text-susimdal-text-basic">
              아래 구독권 중 원하시는 1개를 선택해주세요
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeIn', delay: 0.9 }}
            tabIndex={-1}
            className="w-full flex flex-col gap-[0.8rem]"
          >
            <RadioGroup
              value={selectedPromotionOption}
              onValueChange={decisionPromotionOption}
              className="w-full flex flex-col gap-[0.8rem] mobile:gap-[1.3rem]"
            >
              <RadioGroupItem value="1" id="1" className="peer sr-only opacity-0" />
              <Label htmlFor="1" className="block w-full cursor-pointer">
                <PromotionOptionLabel
                  promotionOption="어린이과학동아 2개월 (4권)"
                  checked={selectedPromotionOption === '1'}
                />
              </Label>
              <RadioGroupItem value="2" id="2" className="peer sr-only opacity-0" />
              <Label htmlFor="2" className="block w-full cursor-pointer">
                <PromotionOptionLabel
                  promotionOption="어린이수학동아 2개월 (4권)"
                  checked={selectedPromotionOption === '2'}
                />
              </Label>
              <RadioGroupItem value="3" id="3" className="peer sr-only opacity-0" />
              <Label htmlFor="3" className="block w-full cursor-pointer">
                <PromotionOptionLabel
                  promotionOption="과학동아 3개월 (3권)"
                  checked={selectedPromotionOption === '3'}
                />
              </Label>
            </RadioGroup>
          </motion.div>
        </motion.div>

        <div className="fixed inset-x-0 mx-auto bottom-0 max-w-[41rem] left-0 flex flex-shrink-0 flex-col px-[2rem] form:px-0 w-full items-center h-fit ">
          <div className="h-[3rem] w-full bg-gradient-to-t from-white via-white/95 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeIn', delay: 2 }}
            tabIndex={-1}
            className="flex flex-col justify-center items-center gap-[0,4rem] w-full h-[1.4rem] mobile:h-[1.8rem] bg-white pb-[1.2rem]"
          >
            <motion.p
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', duration: 0.1, bounce: 5 }}
              className="text-[1.2rem] text-center mobile:text-[1.5rem] text-susimdal-text-subtle font-normal active:text-susimdal-text-disabled-on w-full"
              onClick={omitPromotionTermsAgreement}
            >
              다음에 참여할께요
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeIn', delay: 1 }}
            tabIndex={-1}
            className="flex justify-center gap-[0.8rem] w-full bg-white pb-[4rem]"
          >
            <Button variant="empty" type="button" onClick={moveConditionalPrevStep} className="w-[7.8rem] ">
              이전
            </Button>
            <Button type="button" onClick={openTermsDrawer} loading={isPending}>
              {'다음'}
            </Button>
          </motion.div>
        </div>
      </section>
      <DongaScienceTerms
        openState={isTermsDrawerOpen}
        setOpenState={setIsTermsDrawerOpen}
        agreeTerms={earnPromotionTermsAgreement}
      />
      <DetailDongaScience
        openState={isDetailDrawerOpen}
        setOpenState={setIsDetailDrawerOpen}
        agreeTerms={() => {
          setIsDetailDrawerOpen(false);
        }}
      />
    </PromotionLayout>
  );
};
