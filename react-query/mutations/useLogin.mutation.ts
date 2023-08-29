import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

import { interceptor } from '@/axios.config';

import { useUserStore } from '@/states/user.states';
import QueryKeys from '@/utils/query-keys.util';

import { saveItemToLocalStorage } from '@/utils/local-storage.util';

import STORAGE_KEYS from '@/utils/storage-keys.util';
import { toast } from '@/components/toast/notification.component';

const login = async ({ email, password }: { [key: string]: string }) => {
  const response = await interceptor.post('/auth/login', {
    email,
    password,
  });

  return response.data;
};

const useLogin = () => {
  const router = useRouter();
  const user = useUserStore();

  return useMutation(login, {
    mutationKey: [QueryKeys.LOGIN],
    onSuccess: (data) => {
      toast.success(data?.status);
      user.updateUser({ ...data.data });

      saveItemToLocalStorage(
        STORAGE_KEYS.TOKEN,
        !!data.data.tokens.accessToken &&
          data.data.tokens.accessToken.length > 0
          ? data.data.tokens.accessToken
          : ''
      );

      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
    },
    onError: async (err: any) => {
      if (err instanceof AxiosError) {
        if (err.response?.data?.data instanceof Array) {
          toast.error(err.response?.data?.data[0]?.constraints[0]);
        } else toast.error(err?.response?.data.message);
      } else toast.error(err?.message);
    },
  });
};

export default useLogin;
