import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { interceptor } from '@/axios.config';

import { useUserStore } from '@/states/user.states';
import QueryKeys from '@/utils/query-keys.util';

import User from '@/interfaces/user.interface';

import { saveItemToLocalStorage } from '@/utils/local-storage.util';

import STORAGE_KEYS from '@/utils/storage-keys.util';

const login = async ({
  email,
  password,
}: {
  [key: string]: string;
}): Promise<User> => {
  const response = await interceptor.post('/auth/login', {
    email,
    password,
  });

  return response.data.data;
};

const useLogin = () => {
  const router = useRouter();
  const user = useUserStore();

  return useMutation(login, {
    mutationKey: [QueryKeys.LOGIN],
    onSuccess: (data) => {
      user.updateUser({ ...data });

      //   const toastId = toast.success(
      //     'You have been logged in successfully. You would be redirected shortly.',
      //     { icon: '🚀' }
      //   );

      saveItemToLocalStorage(
        STORAGE_KEYS.TOKEN,
        !!data.tokens.accessToken && data.tokens.accessToken.length > 0
          ? data.tokens.accessToken
          : ''
      );

      setTimeout(async () => {
        // toast.dismiss(toastId);
        router.push('/dashboard');
      }, 3000);
    },
  });
};

export default useLogin;
