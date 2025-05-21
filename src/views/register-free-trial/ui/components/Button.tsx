import { Button as ButtonBasic, buttonVariants } from '@/shared/components/atomics/button';
import { cva, VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';

const expendedButtonVariants = cva(buttonVariants, {
  variants: {
    variant: {
      empty:
        'bg-white text-susimdal-text-disabled-on border-white shadow-none active:shadow-sm active:bg-susimdal-border-gray',
      primary: 'bg-susimdal-button-primary-fill border border-susimdal-button-primary-fill ',
      border: 'bg-white text-susimdal-text-primary border border-susimdal-button-primary-fill',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export const Button = ({
  children,
  className,
  disabled,
  variant,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof expendedButtonVariants>) => {
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={cn('w-full', className)}
      tabIndex={-1}
    >
      <ButtonBasic
        type="button"
        className={cn(
          'w-full h-[4.8rem] px-[1.6rem] text-[1.6rem] rounded-[0.6rem] disabled:bg-susimdal-button-gray-fill disabled:text-susimdal-text-disabled-on disabled:border-susimdal-button-gray-fill focus:ring-0',
          expendedButtonVariants({ variant, className })
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </ButtonBasic>
    </motion.div>
  );
};
