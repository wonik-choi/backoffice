'use client';

import type React from 'react';
import { useEffect } from 'react';

import { useState } from 'react';
import { Button } from '@/shared/components/atomics/button';
import { Input } from '@/shared/components/atomics/input';
import { Label } from '@/shared/components/atomics/label';
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import RegisterFreeTrialLayout from '@/views/register-free-trial/ui/RegisterFreeTrialLayout';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from '@/shared/components/atomics/drawer';
import { Search } from 'lucide-react';

import BottomDrawer from '@/features/search-address/ui/BottmDrawer';
import RentalDeviceTerms from '@/views/register-free-trial/ui/RentalDeviceTerms';
interface Address {
  zipCode: string;
  address1: string;
}

// Mock address data for demonstration
const mockAddresses: Address[] = [
  { zipCode: '06164', address1: '서울특별시 강남구 테헤란로 427' },
  { zipCode: '06159', address1: '서울특별시 강남구 테헤란로 521' },
  { zipCode: '06168', address1: '서울특별시 강남구 테헤란로 311' },
  { zipCode: '06194', address1: '서울특별시 강남구 테헤란로 142' },
  { zipCode: '06035', address1: '서울특별시 강남구 가로수길 5' },
  { zipCode: '06123', address1: '서울특별시 강남구 논현로 508' },
  { zipCode: '06082', address1: '서울특별시 강남구 선릉로 428' },
  { zipCode: '06178', address1: '서울특별시 강남구 삼성로 212' },
];

export function AddressInformation() {
  const { device, setDevice, nextStep, prevStep } = useRegisterFreeTrialStore();
  const [isTermsDrawerOpen, setIsTermsDrawerOpen] = useState(false);
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Address[]>([]);
  const [formData, setFormData] = useState({
    zipCode: device.address?.zipCode || '',
    address1: device.address?.address1 || '',
    address2: device.address?.address2 || '',
  });
  const [errors, setErrors] = useState<{
    zipCode?: string;
    address1?: string;
    address2?: string;
  }>({});
  const [touched, setTouched] = useState({
    zipCode: false,
    address1: false,
    address2: false,
  });

  // Update form data when device address changes (after address search)
  useEffect(() => {
    if (device.address) {
      setFormData({
        zipCode: device.address.zipCode || '',
        address1: device.address.address1 || '',
        address2: device.address.address2 || '',
      });
    }
  }, [device.address]);

  // Real-time validation
  useEffect(() => {
    const newErrors: {
      zipCode?: string;
      address1?: string;
      address2?: string;
    } = {};

    if (!formData.zipCode && touched.zipCode) {
      newErrors.zipCode = '우편번호를 입력해주세요';
    }

    if (!formData.address1 && touched.address1) {
      newErrors.address1 = '주소를 입력해주세요';
    }

    if (!formData.address2 && touched.address2) {
      newErrors.address2 = '상세주소를 입력해주세요';
    }

    setErrors(newErrors);
  }, [formData, touched]);

  const isFormValid = () => {
    // Check if all fields are valid regardless of touched state
    return formData.zipCode && formData.address1 && formData.address2;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      zipCode: true,
      address1: true,
      address2: true,
    });

    if (isFormValid()) {
      setDevice({
        ...device,
        address: {
          zipCode: formData.zipCode,
          address1: formData.address1,
          address2: formData.address2,
        },
      });
      setIsTermsDrawerOpen(true);
    }
  };

  const handleAgreeTerms = () => {
    setDevice({
      ...device,
      agreedToTerms: true,
    });
    setIsTermsDrawerOpen(false);
    nextStep();
  };

  return (
    <>
      <RegisterFreeTrialLayout
        title="수령하실 주소를 알려주세요"
        onBack={prevStep}
        progressStep={4}
        totalSteps={5}
        actionButton={
          <Button type="button" onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600">
            다음
          </Button>
        }
      >
        <div className="space-y-4 w-full">
          <div className="flex gap-2 w-full">
            <div className="flex-1 space-y-2">
              <Label htmlFor="zipCode">우편번호</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => {
                  setFormData({ ...formData, zipCode: e.target.value });
                  setTouched((prev) => ({ ...prev, zipCode: true }));
                }}
                onBlur={() => setTouched((prev) => ({ ...prev, zipCode: true }))}
                placeholder="우편번호"
                readOnly
                className="h-10 w-full"
              />
              {errors.zipCode && <p className="text-sm text-red-500">{errors.zipCode}</p>}
            </div>
            <div className="flex items-end">
              <BottomDrawer setForm={setFormData} />
            </div>
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="address1">주소</Label>
            <Input
              id="address1"
              value={formData.address1}
              onChange={(e) => {
                setFormData({ ...formData, address1: e.target.value });
                setTouched((prev) => ({ ...prev, address1: true }));
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, address1: true }))}
              placeholder="주소"
              readOnly
              className="w-full"
            />
            {errors.address1 && <p className="text-sm text-red-500">{errors.address1}</p>}
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="address2">상세주소</Label>
            <Input
              id="address2"
              value={formData.address2}
              onChange={(e) => {
                setFormData({ ...formData, address2: e.target.value });
                setTouched((prev) => ({ ...prev, address2: true }));
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, address2: true }))}
              placeholder="상세주소를 입력하세요"
              className="w-full"
            />
            {errors.address2 && <p className="text-sm text-red-500">{errors.address2}</p>}
          </div>
        </div>
      </RegisterFreeTrialLayout>

      {/* Terms Drawer */}
      <RentalDeviceTerms
        openState={isTermsDrawerOpen}
        setOpenState={setIsTermsDrawerOpen}
        agreeTerms={handleAgreeTerms}
      />
    </>
  );
}
