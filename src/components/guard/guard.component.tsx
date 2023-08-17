'use client';
import { usePathname, useRouter } from 'next/navigation';
import { FC, ReactElement } from 'react';
import { useUserStore } from '@/states/user.states';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect.hook';

const Guard: FC<{ children: ReactElement }> = ({ children }) => {
  const router = useRouter();
  const pathName = usePathname();

  const user = useUserStore();

  useIsomorphicLayoutEffect(() => {
    // on initial load - run auth check
    authCheck(pathName);
  }, [pathName, user.currentUser]);

  const authCheck = (url: string | null) => {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ['/'];
    const path = url?.split('?')[0];
    if (
      path &&
      !user.currentUser?.tokens.accessToken &&
      !publicPaths.includes(path)
    ) {
      router.push(`/`);
    }
  };

  return children;
};

export default Guard;
