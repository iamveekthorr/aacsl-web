import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useUserStore } from '@/states/user.states';
import QueryKeys from '@/utils/query-keys.util';

import { interceptor } from '../../../axios.config';

import { clearItems, getItemFromStorage } from '@/utils/local-storage.util';
import STORAGE_KEYS from '@/utils/storage-keys.util';
import { ApiResponse } from '../../interfaces/api-response.interface';

const getAllUsers = async (query?: string) => {
  const response = await interceptor.get(query ? `/users?${query}` : '/users', {
    headers: {
      Authorization: `Bearer ${getItemFromStorage(STORAGE_KEYS.TOKEN)}`,
    },
  });
  return response.data as ApiResponse;
};

const useGetAllUsers = (query?: string) => {
  const user = useUserStore();

  const router = useRouter();

  return useQuery([QueryKeys.GET_ALL_USERS], () => getAllUsers(query), {
    enabled: !!getItemFromStorage(STORAGE_KEYS.TOKEN),
    keepPreviousData: true,
    onError: async (err) => {
      console.log(err);
      if (user.currentUser) {
        user.resetState();
        router.push('/login');
        clearItems();
      }
    },
  });
};

export default useGetAllUsers;
