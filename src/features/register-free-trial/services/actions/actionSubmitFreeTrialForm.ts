'use server';

import type {
  Student,
  Parent,
  School,
  Schedule,
  Semester,
  Device,
} from '@/features/register-free-trial/model/store/interface';

type FormData = {
  student: Student;
  parent: Parent;
  school: School;
  schedule: Schedule;
  startDate: Date;
  semester: Semester;
  device: Device;
  formSessionToken: string;
};

export async function actionSubmitFreeTrialForm(formData: FormData) {
  try {
    // Simulate a delay for the API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Here you would typically send the data to your backend
    // const response = await fetch('/api/submit-form', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // })

    // if (!response.ok) {
    //   throw new Error('Failed to submit form')
    // }

    // const data = await response.json()

    return { success: true, message: '성공적으로 제출되었습니다.' };
  } catch (error) {
    console.error('Form submission error:', error);
    return { success: false, message: '제출 중 오류가 발생했습니다. 다시 시도해주세요.' };
  }
}
