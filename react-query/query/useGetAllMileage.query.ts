import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

import { useUserStore } from '@/states/user.states';
import QueryKeys from '@/utils/query-keys.util';

import { interceptor } from '@/axios.config';

import { clearItems, getItemFromStorage } from '@/utils/local-storage.util';
import STORAGE_KEYS from '@/utils/storage-keys.util';
import { ApiBaseResponse } from '@/interfaces/api-response.interface';
import { useToast } from '@/app/toast.provider';

const getAllMileage = async (query?: string) => {
  const response = await interceptor.get(`/mileage?${query}`, {
    headers: {
      Authorization: `Bearer ${getItemFromStorage(STORAGE_KEYS.TOKEN)}`,
    },
  });
  return response.data as ApiBaseResponse;
};

const useGetAllMileage = (query?: string) => {
  const user = useUserStore();

  const router = useRouter();

  const { showToast } = useToast();

  return useQuery(
    [QueryKeys.GET_ALL_MILEAGE, query],
    () => getAllMileage(query),
    {
      enabled: !!getItemFromStorage(STORAGE_KEYS.TOKEN),
      keepPreviousData: true,
      onError: async (err: any) => {
        if (err instanceof AxiosError) {
          showToast(err.message);

          if (err.response?.status === 401 && user.currentUser) {
            showToast(err.response.data?.message);
            user.resetState();
            router.push('/login');
            clearItems();
          }
        } else {
          showToast(err.message);
        }
      },
    }
  );
};

export default useGetAllMileage;
