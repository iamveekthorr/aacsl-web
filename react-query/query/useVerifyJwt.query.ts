import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useUserStore } from '@/states/user.states';
import QueryKeys from '@/utils/query-keys.util';

import { interceptor } from '@/axios.config';

import { clearItems, getItemFromStorage } from '@/utils/local-storage.util';
import STORAGE_KEYS from '@/utils/storage-keys.util';
import { toast } from '@/components/toast/notification.component';

export const verifyJwt = async () => {
  const response = await interceptor.get('/auth/verify-jwt', {
    headers: {
      Authorization: `Bearer ${getItemFromStorage(STORAGE_KEYS.TOKEN)}`,
    },
  });
  return response.data;
};

const useVerifyJwt = () => {
  const user = useUserStore();

  const router = useRouter();

  return useQuery([QueryKeys.VERIFY_JWT], verifyJwt, {
    enabled: !!getItemFromStorage(STORAGE_KEYS.TOKEN),
    keepPreviousData: true,
    onError: async (err: any) => {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.message);
        if (err.response?.status === 401 && user.currentUser) {
          user.resetState();
          router.push('/');
          clearItems();
        }
        if (err.response?.data?.data instanceof Array) {
          toast.error(err.response?.data?.data[0]?.constraints[0]);
        } else toast.error(err?.response?.data.message);
      } else toast.error(err?.message);
    },
  });
};

export default useVerifyJwt;
