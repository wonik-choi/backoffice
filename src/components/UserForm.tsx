'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';

const userSchema = z.object({
  name: z.string().min(2, '이름은 2글자 이상이어야 합니다.'),
  email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
  age: z.number().min(18, '나이는 18세 이상이어야 합니다.').max(100, '나이는 100세 이하여야 합니다.'),
});

type UserData = z.infer<typeof userSchema>;

export function UserForm() {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    email: '',
    age: 18,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof UserData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field: keyof UserData, value: unknown) => {
    try {
      const fieldSchema = z.object({ [field]: userSchema.shape[field] });
      fieldSchema.parse({ [field]: value });
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors[0]?.message || '유효하지 않은 값입니다.';
        setErrors((prev) => ({ ...prev, [field]: fieldError }));
      }
      return false;
    }
  };

  const handleChange = (field: keyof UserData, value: string | number) => {
    const newValue = field === 'age' && typeof value === 'string' ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [field]: newValue }));
    validateField(field, newValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 모든 필드 유효성 검사
    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isAgeValid = validateField('age', formData.age);

    if (isNameValid && isEmailValid && isAgeValid) {
      setIsSubmitting(true);
      try {
        // 서버에 데이터를 제출하는 로직 (ky 라이브러리 사용 예시)
        // const response = await ky.post('/api/users', { json: formData }).json();
        console.log('폼 제출:', formData);
        alert(`폼 제출 성공! 데이터: ${JSON.stringify(formData, null, 2)}`);
      } catch (error) {
        console.error('폼 제출 실패:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">사용자 정보</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            이름
          </label>
          <input
            id="name"
            name="name"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          {errors.name && <div className="mt-1 text-sm text-red-500">{errors.name}</div>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          {errors.email && <div className="mt-1 text-sm text-red-500">{errors.email}</div>}
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            나이
          </label>
          <input
            id="age"
            name="age"
            type="number"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            value={formData.age}
            onChange={(e) => handleChange('age', e.target.value)}
          />
          {errors.age && <div className="mt-1 text-sm text-red-500">{errors.age}</div>}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? '제출 중...' : '제출'}
        </Button>
      </form>
    </div>
  );
}
