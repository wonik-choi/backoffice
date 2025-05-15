'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Button } from '@/shared/components/atomics/button';
import { Input } from '@/shared/components/atomics/input';
import { Label } from '@/shared/components/atomics/label';
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';

export function ParentInformation() {
  const { parent, setParent, nextStep, prevStep } = useRegisterFreeTrialStore();
  const [formData, setFormData] = useState({
    name: parent.name || '',
    phoneNumber: parent.phoneNumber || '',
  });
  const [errors, setErrors] = useState<{
    name?: string;
    phoneNumber?: string;
  }>({});
  const [touched, setTouched] = useState({
    name: false,
    phoneNumber: false,
  });

  // Real-time validation
  useEffect(() => {
    const newErrors: {
      name?: string;
      phoneNumber?: string;
    } = {};

    if (!formData.name && touched.name) {
      newErrors.name = '부모님 이름을 입력해주세요';
    }

    if (touched.phoneNumber) {
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = '전화번호를 입력해주세요';
      } else if (!/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = '올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)';
      }
    }

    setErrors(newErrors);
  }, [formData, touched]);

  const isFormValid = () => {
    // Check if all fields are valid regardless of touched state
    const validationErrors: {
      name?: string;
      phoneNumber?: string;
    } = {};

    if (!formData.name) {
      validationErrors.name = '부모님 이름을 입력해주세요';
    }

    if (!formData.phoneNumber) {
      validationErrors.phoneNumber = '전화번호를 입력해주세요';
    } else if (!/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/.test(formData.phoneNumber)) {
      validationErrors.phoneNumber = '올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)';
    }

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      phoneNumber: true,
    });

    if (isFormValid()) {
      setParent({
        name: formData.name,
        phoneNumber: formData.phoneNumber,
      });
      nextStep();
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    // Format the phone number as XXX-XXXX-XXXX or XXX-XXX-XXXX
    if (digits.length <= 7) {
      return digits.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    } else {
      return digits.replace(/(\d{3})(\d{3,4})(\d{1,4})/, '$1-$2-$3');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phoneNumber: formatted });
    setTouched((prev) => ({ ...prev, phoneNumber: true }));
  };

  return (
    <RegisterFreeTrialLayout
      title="부모님의 정보를 적어주세요"
      onBack={prevStep}
      progressStep={0}
      totalSteps={5}
      actionButton={
        <Button type="button" onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600">
          다음
        </Button>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div className="space-y-2 w-full">
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setTouched((prev) => ({ ...prev, name: true }));
            }}
            onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
            placeholder="이름을 입력하세요"
            className="w-full"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2 w-full">
          <Label htmlFor="phoneNumber">전화번호</Label>
          <Input
            id="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            onBlur={() => setTouched((prev) => ({ ...prev, phoneNumber: true }))}
            placeholder="010-1234-5678"
            pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
            className="w-full"
          />
          {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
        </div>
      </form>
    </RegisterFreeTrialLayout>
  );
}
