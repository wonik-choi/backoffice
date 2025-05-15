'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Button } from '@/shared/components/atomics/button';
import { Input } from '@/shared/components/atomics/input';
import { Label } from '@/shared/components/atomics/label';
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';

export function SchoolInformation() {
  const { school, setSchool, nextStep, prevStep } = useRegisterFreeTrialStore();
  const [formData, setFormData] = useState({
    name: school.name || '',
    grade: school.grade || '',
  });
  const [errors, setErrors] = useState<{
    name?: string;
    grade?: string;
  }>({});
  const [touched, setTouched] = useState({
    name: false,
    grade: false,
  });

  // Real-time validation
  useEffect(() => {
    const newErrors: {
      name?: string;
      grade?: string;
    } = {};

    if (!formData.name && touched.name) {
      newErrors.name = '학교 이름을 입력해주세요';
    }

    if (!formData.grade && touched.grade) {
      newErrors.grade = '학년을 입력해주세요';
    }

    setErrors(newErrors);
  }, [formData, touched]);

  const isFormValid = () => {
    // Check if all fields are valid regardless of touched state
    const validationErrors: {
      name?: string;
      grade?: string;
    } = {};

    if (!formData.name) {
      validationErrors.name = '학교 이름을 입력해주세요';
    }

    if (!formData.grade) {
      validationErrors.grade = '학년을 입력해주세요';
    }

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      grade: true,
    });

    if (isFormValid()) {
      setSchool({
        name: formData.name,
        grade: formData.grade,
      });
      nextStep();
    }
  };

  return (
    <RegisterFreeTrialLayout
      title="학생을 알려주세요"
      onBack={prevStep}
      progressStep={1}
      totalSteps={5}
      actionButton={
        <Button type="button" onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600">
          다음
        </Button>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div className="space-y-2 w-full">
          <Label htmlFor="name">다니는 학교와 이름</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setTouched((prev) => ({ ...prev, name: true }));
            }}
            onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
            placeholder="학교 이름을 입력하세요"
            className="w-full"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2 w-full">
          <Label htmlFor="grade">학년</Label>
          <Input
            id="grade"
            value={formData.grade}
            onChange={(e) => {
              setFormData({ ...formData, grade: e.target.value });
              setTouched((prev) => ({ ...prev, grade: true }));
            }}
            onBlur={() => setTouched((prev) => ({ ...prev, grade: true }))}
            placeholder="학년을 입력하세요"
            className="w-full"
          />
          {errors.grade && <p className="text-sm text-red-500">{errors.grade}</p>}
        </div>
      </form>
    </RegisterFreeTrialLayout>
  );
}
