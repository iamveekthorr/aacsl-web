import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

import { interceptor } from '@/axios.config';

import { useUserStore } from '@/states/user.states';
import QueryKeys from '@/utils/query-keys.util';

import User from '@/interfaces/user.interface';

import { clearItems, saveItemToLocalStorage } from '@/utils/local-storage.util';

import STORAGE_KEYS from '@/utils/storage-keys.util';

import { useToast } from '@/app/toast.provider';

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
  const { showToast } = useToast();

  return useMutation(login, {
    mutationKey: [QueryKeys.LOGIN],
    onSuccess: (data) => {
      user.updateUser({ ...data });

      showToast(
        'You have been logged in successfully. You would be redirected shortly. 🚀'
      );

      saveItemToLocalStorage(
        STORAGE_KEYS.TOKEN,
        !!data.tokens.accessToken && data.tokens.accessToken.length > 0
          ? data.tokens.accessToken
          : ''
      );

      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
    },
    onError: async (err: any) => {
      if (err instanceof AxiosError) {
        showToast(err.response?.data.message);
        if (err.response?.status === 401 && user.currentUser) {
          user.resetState();
          router.push('/login');
          clearItems();
        }
      } else {
        showToast(err?.message);
      }
    },
  });
};

export default useLogin;
