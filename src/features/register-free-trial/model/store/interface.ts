// Define the steps based on the requirements
export enum FormStep {
  // 1. Student information entry → Parent information entry
  StudentInfo = 0,
  ParentInfo = 1,
  // 2. Student school information entry
  SchoolInfo = 2,
  // 3. Free trial start date entry → Free trial schedule creation → Free trial semester selection
  StartDate = 3,
  Schedule = 4,
  Semester = 5,
  // 4. iPad rental option selection → If renting, address entry
  DeviceSelection = 6,
  AddressEntry = 7,
  // Completion
  Completion = 8,
}

// Define our types
export type Student = {
  name: string;
  phoneNumber: string;
};

export type Parent = {
  name: string;
  phoneNumber: string;
};

export type School = {
  name: string;
  grade: string;
};

export type TimeSlot = {
  day: number;
  time: number;
};

export type Schedule = {
  selectedSlots: TimeSlot[];
};

export type Semester = {
  year: number;
  semester: number;
};

export type Address = {
  zipCode: string;
  address1: string;
  address2: string;
};

export type Device = {
  isRenting: boolean;
  deviceType?: string;
  address?: Address;
  agreedToTerms: boolean;
};

export type RegisterFreeTrialState = {
  student: Student;
  parent: Parent;
  school: School;
  schedule: Schedule;
  startDate: Date | null;
  semester: Semester;
  device: Device;
  currentStep: FormStep;
  formSessionToken: string | null;
  isSubmitting: boolean;
  isSubmitted: boolean;

  // Actions
  setStudent: (student: Student) => void;
  setParent: (parent: Parent) => void;
  setSchool: (school: School) => void;
  setSchedule: (schedule: Schedule) => void;
  setStartDate: (date: Date) => void;
  setSemester: (semester: Semester) => void;
  setDevice: (device: Device) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: FormStep) => void;
  setFormSessionToken: (token: string) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
  resetForm: () => void;
};
