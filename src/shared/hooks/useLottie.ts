import { useLottie, LottieOptions } from 'lottie-react';

export const useCustomLottie = (lottieOption: LottieOptions<'svg'>) => {
  const { View } = useLottie(lottieOption);

  return {
    View,
  };
};
