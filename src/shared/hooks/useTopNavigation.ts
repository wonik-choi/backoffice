import { useRouter } from 'next/navigation';

export function useTopNavigation() {
  const router = useRouter();

  function navigate(url: string) {
    // iframe 안에 있으면 최상위 창 이동
    if (typeof window !== 'undefined' && window.top && window.top !== window.self) {
      window.top.location.href = url;
    } else {
      router.push(url);
    }
  }

  return { navigate };
}
