import { Button } from '@/shared/components/atomics/button';
import {
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/shared/components/atomics/drawer';

import { Drawer } from '@/shared/components/atomics/drawer';
import type { DeviceRentalTermsProps } from '@/views/register-free-trial/model/interface';

const RentalDeviceTerms = ({ openState, setOpenState, agreeTerms }: DeviceRentalTermsProps) => {
  return (
    <Drawer open={openState} onOpenChange={setOpenState}>
      <DrawerContent className="max-w-3xl mx-auto w-full">
        <div className="p-4 w-full">
          <DrawerHeader>
            <DrawerTitle>주의사항</DrawerTitle>
            <DrawerDescription>아래의 유의사항에 동의해주셔야 기기 대여가 가능합니다</DrawerDescription>
          </DrawerHeader>

          <div className="h-[50vh] overflow-y-auto p-4 text-sm">
            <h3 className="font-medium">아이패드 대여 및 반납 안내</h3>
            <p className="mt-2 text-gray-600 text-[13px]">
              대여 기간이 종료되면, 해피콜을 통해 기기 반납 안내를 드리며, 이후 배송 기사가 댁으로 방문하여 기기 반납
              절차를 진행합니다.
            </p>
            <p className="mt-2 text-gray-600 text-[13px]">
              고의적으로 아이패드를 반납하지 않으실 경우 민형사상 책임을 질 수 있으며, 법적 처벌을 받을 수 있습니다.
            </p>
            <p className="mt-2 text-gray-600 text-[13px]">
              대여 기간 중 아이패드를 훼손한 경우, 훼손 비용이 청구될 수 있습니다. 아이패드 사용에 유의하시기 바랍니다.
            </p>
          </div>

          <DrawerFooter>
            <Button onClick={agreeTerms} size="lg" className="w-full bg-blue-500 hover:bg-blue-600">
              위 유의사항에 동의합니다
            </Button>
            <DrawerClose asChild>
              <Button className="w-full" variant="ghost" size="lg">
                동의하지 않아요
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default RentalDeviceTerms;
