'use client';

import { motion } from 'framer-motion';

// shared
import {
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  Drawer,
  DrawerDescription,
} from '@/shared/components/atomics/drawer';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

// widgets
import type { DrawerTermLayoutProps } from '@/widgets/drawer-term-layout/model/interface';

export const DrawerTermLayout = ({
  openState,
  setOpenState,
  agreeTerms,
  disagreeTerms,
  children,
  title,
  buttonText,
  leftButtonText,
  titleClassName,
}: DrawerTermLayoutProps) => {
  return (
    <Drawer open={openState} onOpenChange={setOpenState}>
      <DrawerContent className="mx-auto w-full max-w-[45rem]">
        <div className="pt-[2.4rem] pb-[1.6rem] px-[2rem] w-full">
          <DrawerHeader className="mb-[1.8rem] mobile:mb-[2.4rem]">
            <DrawerTitle
              className={cn('text-[1.6rem] font-bold text-susimdal-text-basic whitespace-pre-wrap', titleClassName)}
            >
              {title}
            </DrawerTitle>
            <DrawerDescription>{''}</DrawerDescription>
          </DrawerHeader>

          <div className="min-h-[10rem] max-h-[40vh] overflow-y-auto scrollbar-hide mb-[2rem] mobile:mb-[3rem]">
            {children}
          </div>

          <DrawerFooter className="w-full">
            <DrawerClose asChild>
              <motion.div
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className={cn('w-full flex gap-[0.8rem] justify-center items-center')}
                tabIndex={-1}
              >
                {leftButtonText && (
                  <Button type="button" variant="border" className={cn('w-full')} onClick={disagreeTerms}>
                    {leftButtonText}
                  </Button>
                )}
                <Button type="button" className={cn('w-full')} onClick={agreeTerms}>
                  {buttonText}
                </Button>
              </motion.div>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
