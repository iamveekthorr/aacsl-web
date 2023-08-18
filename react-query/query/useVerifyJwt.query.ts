import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useUserStore } from '@/states/user.states';
import QueryKeys from '@/utils/query-keys.util';

import { interceptor } from '@/axios.config';

import { clearItems, getItemFromStorage } from '@/utils/local-storage.util';
import STORAGE_KEYS from '@/utils/storage-keys.util';

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
    onError: async (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401 && user.currentUser) {
          user.resetState();
          router.push('/login');
          clearItems();
        }
      }
    },
  });
};

export default useVerifyJwt;
