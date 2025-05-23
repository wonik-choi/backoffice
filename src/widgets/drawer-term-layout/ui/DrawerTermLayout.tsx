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
} from '@/shared/components/atomics/drawer';
import { Button } from '@/shared/components/atomics/button';
import { cn } from '@/shared/lib/utils';

// widgets
import type { DrawerTermLayoutProps } from '@/widgets/drawer-term-layout/model/interface';

export const DrawerTermLayout = ({
  openState,
  setOpenState,
  agreeTerms,
  children,
  title,
  buttonText,
  titleClassName,
}: DrawerTermLayoutProps) => {
  return (
    <Drawer open={openState} onOpenChange={setOpenState}>
      <DrawerContent className="mx-auto w-full">
        <div className="pt-[2.4rem] pb-[1.6rem] px-[2rem] w-full">
          <DrawerHeader className="mb-[1.8rem] mobile:mb-[2.4rem]">
            <DrawerTitle
              className={cn('text-[1.6rem] font-bold text-susimdal-text-basic whitespace-pre-wrap', titleClassName)}
            >
              {title}
            </DrawerTitle>
          </DrawerHeader>

          <div className="min-h-[13rem] max-h-[50vh] overflow-y-auto mb-[2rem] mobile:mb-[3rem]">{children}</div>

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
                  onClick={agreeTerms}
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
