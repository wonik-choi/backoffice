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
  DrawerTrigger,
} from '@/shared/components/atomics/drawer';
import { Button } from '@/shared/components/atomics/button';
import { cn } from '@/shared/lib/utils';

// interface
import type { DrawerLayoutProps } from '@/shared/components/drawer-layout/interface';

export const DrawerLayout = ({
  openState,
  setOpenState,
  callbackConfirm,
  children,
  trrigerChildren,
  title,
  buttonText,
  titleClassName,
}: DrawerLayoutProps) => {
  return (
    <Drawer open={openState} onOpenChange={setOpenState}>
      <DrawerTrigger asChild>
        <button className="w-full h-fit">{trrigerChildren}</button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto w-full max-w-[45rem]">
        <div className="pt-[2.4rem] pb-[1.6rem] px-[2rem] w-full">
          <DrawerHeader className="mb-[2.4rem]">
            <DrawerTitle
              className={cn('text-[1.6rem] font-bold text-susimdal-text-basic whitespace-pre-wrap', titleClassName)}
            >
              {title}
            </DrawerTitle>
          </DrawerHeader>

          <div className="min-h-[13rem] max-h-[45vh] overflow-y-auto mb-[3rem]">{children}</div>

          <DrawerFooter className="w-full">
            <DrawerClose asChild>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className={cn('w-full')}
                tabIndex={-1}
              >
                <Button
                  type="button"
                  className={cn(
                    'w-full h-[4.8rem] px-[1.6rem] text-[1.6rem] rounded-[0.6rem] bg-susimdal-button-primary-fill hover:bg-susimdal-button-primary-fill/70'
                  )}
                  onClick={callbackConfirm}
                >
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
