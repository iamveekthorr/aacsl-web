import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useUserStore } from '@/states/user.states';
import QueryKeys from '@/utils/query-keys.util';

import { interceptor } from '../../../axios.config';

import { clearItems, getItemFromStorage } from '@/utils/local-storage.util';
import STORAGE_KEYS from '@/utils/storage-keys.util';

export const verifyJwt = async () => {
  console.log('verifying jwt...');
  const response = await interceptor.get('/auth/verify-jwt', {
    headers: {
      Authorization: `Bearer ${getItemFromStorage(STORAGE_KEYS.TOKEN)}`,
    },
  });
  return response.data;
};

const useVerifyJwt = () => {
  console.log('using verify jwt function');
  const user = useUserStore();

  const router = useRouter();

  return useQuery([QueryKeys.VERIFY_JWT], verifyJwt, {
    enabled: !!getItemFromStorage(STORAGE_KEYS.TOKEN),
    keepPreviousData: true,
    onError: async () => {
      if (user.currentUser) {
        user.resetState();
        router.push('/login');
        clearItems();
      }
    },
  });
};

export default useVerifyJwt;
