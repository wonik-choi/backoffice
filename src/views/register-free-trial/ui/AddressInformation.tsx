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

  const handleSearchAddress = () => {
    setIsSearchDrawerOpen(true);
    // Pre-populate search results with all mock addresses
    setSearchResults(mockAddresses);
  };

  const handleSearch = async () => {
    // In a real implementation, this would call the Korean address search API
    const searchAddress = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${searchTerm}`, {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_CLIENT_KEY}`,
      },
    });

    const data = await searchAddress.json();

    console.log(data);
    // For now, we'll filter our mock data
    if (searchTerm.length > 0) {
      const results = mockAddresses.filter(
        (address) => address.address1.includes(searchTerm) || address.zipCode.includes(searchTerm)
      );
      setSearchResults(results);
    } else {
      setSearchResults(mockAddresses); // Show all results when search term is empty
    }
  };

  const handleSelectAddress = (address: Address) => {
    // Update the form data with the selected address
    setFormData({
      ...formData,
      zipCode: address.zipCode,
      address1: address.address1,
    });
    setTouched((prev) => ({
      ...prev,
      zipCode: true,
      address1: true,
    }));
    setIsSearchDrawerOpen(false);
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
      <Drawer open={isTermsDrawerOpen} onOpenChange={setIsTermsDrawerOpen}>
        <DrawerContent className="max-w-3xl mx-auto w-full">
          <div className="p-4 w-full">
            <DrawerHeader>
              <DrawerTitle>기기 대여 약관</DrawerTitle>
              <DrawerDescription>아래 약관에 동의하시면 기기 대여가 가능합니다.</DrawerDescription>
            </DrawerHeader>

            <div className="h-[50vh] overflow-y-auto p-4 text-sm">
              <h3 className="font-medium">기기 대여 약관</h3>
              <p className="mt-2">1. 대여 기간은 학기 시작일부터 종료일까지입니다.</p>
              <p className="mt-2">2. 대여 기기는 반드시 수업에만 사용해야 합니다.</p>
              <p className="mt-2">3. 기기 파손 시 수리비용은 본인 부담입니다.</p>
              <p className="mt-2">4. 기기 분실 시 전액 배상해야 합니다.</p>
              <p className="mt-2">5. 학기 종료 후 7일 이내에 반납해야 합니다.</p>
              <p className="mt-2">6. 반납 시 초기화를 진행해야 합니다.</p>
              <p className="mt-2">7. 대여 기간 연장은 별도 신청이 필요합니다.</p>
              <p className="mt-2">8. 타인에게 대여 기기를 양도할 수 없습니다.</p>
              <p className="mt-2">9. 기기 상태 확인을 위해 정기 점검이 있을 수 있습니다.</p>
              <p className="mt-2">10. 약관 위반 시 대여가 중단될 수 있습니다.</p>
            </div>

            <DrawerFooter>
              <Button onClick={handleAgreeTerms} className="w-full bg-blue-500 hover:bg-blue-600">
                약관에 동의합니다
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Address Search Drawer */}
      <Drawer open={isSearchDrawerOpen} onOpenChange={setIsSearchDrawerOpen}>
        <DrawerContent className="max-w-3xl mx-auto w-full">
          <div className="p-4 w-full">
            <DrawerHeader>
              <DrawerTitle>주소 검색</DrawerTitle>
              <DrawerDescription>도로명, 건물명 또는 지번으로 검색하세요</DrawerDescription>
            </DrawerHeader>

            <div className="space-y-4 p-4 w-full">
              <div className="flex gap-2 w-full">
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="검색어를 입력하세요"
                  className="flex-1"
                />
                <Button type="button" onClick={handleSearch} variant="outline" className="whitespace-nowrap">
                  <Search className="h-4 w-4 mr-2" />
                  검색
                </Button>
              </div>

              <div className="h-[40vh] overflow-y-auto w-full">
                {searchResults.length > 0 ? (
                  <div className="space-y-2 w-full">
                    {searchResults.map((address, index) => (
                      <div
                        key={index}
                        className="p-3 border rounded-md cursor-pointer hover:bg-gray-50 w-full"
                        onClick={() => handleSelectAddress(address)}
                      >
                        <p className="font-medium">{address.address1}</p>
                        <p className="text-sm text-gray-500">우편번호: {address.zipCode}</p>
                      </div>
                    ))}
                  </div>
                ) : searchTerm.length > 0 ? (
                  <p className="text-center text-gray-500 py-4">검색 결과가 없습니다</p>
                ) : (
                  <p className="text-center text-gray-500 py-4">검색어를 입력하세요</p>
                )}
              </div>
            </div>

            <DrawerFooter>
              <Button onClick={() => setIsSearchDrawerOpen(false)} className="w-full">
                취소
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
