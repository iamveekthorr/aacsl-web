import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useUserStore } from '@/states/user.states';
import QueryKeys from '@/utils/query-keys.util';

import { interceptor } from '../../../axios.config';

import { clearItems, getItemFromStorage } from '@/utils/local-storage.util';
import STORAGE_KEYS from '@/utils/storage-keys.util';
import { ApiResponse } from '../../interfaces/api-response.interface';

const getAllBusinesses = async (query?: string) => {
  const response = await interceptor.get(
    query ? `/business/list?${query}` : '/business/list',
    {
      headers: {
        Authorization: `Bearer ${getItemFromStorage(STORAGE_KEYS.TOKEN)}`,
      },
    }
  );
  return response.data as ApiResponse;
};

const useGetAllBusinesses = (query?: string) => {
  const user = useUserStore();

  const router = useRouter();

  return useQuery([QueryKeys.GET_ALL_USERS], () => getAllBusinesses(query), {
    enabled: !!getItemFromStorage(STORAGE_KEYS.TOKEN),
    keepPreviousData: true,
    onError: async (err) => {
      console.log(err, 'error');
      if (user.currentUser) {
        user.resetState();
        router.push('/login');
        clearItems();
      }
    },
  });
};

export default useGetAllBusinesses;
