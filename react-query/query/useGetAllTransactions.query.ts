import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

import { useUserStore } from '@/states/user.states';
import QueryKeys from '@/utils/query-keys.util';

import { interceptor } from '@/axios.config';

import { clearItems, getItemFromStorage } from '@/utils/local-storage.util';
import STORAGE_KEYS from '@/utils/storage-keys.util';
import { ApiBaseResponse } from '@/interfaces/api-response.interface';

import { toast } from '@/components/toast/notification.component';

const getAllTransactions = async (query?: string) => {
  const response = await interceptor.get(
    `/payments${query ? `?${query}` : ''}`,
    {
      headers: {
        Authorization: `Bearer ${getItemFromStorage(STORAGE_KEYS.TOKEN)}`,
      },
    }
  );
  return response.data as ApiBaseResponse;
};

const useGetAllTransactions = (query?: string) => {
  const user = useUserStore();

  const router = useRouter();

  return useQuery(
    [QueryKeys.GET_TRANSACTIONS, query],
    () => getAllTransactions(query),
    {
      enabled: !!getItemFromStorage(STORAGE_KEYS.TOKEN),
      keepPreviousData: true,
      onError: async (err: any) => {
        if (err instanceof AxiosError) {
          if (err.response?.status === 401 && user.currentUser) {
            user.resetState();
            router.push('/');
            clearItems();
          } else toast.error(err?.response?.data.message);
        } else toast.error(err?.message);
      },
    }
  );
};

export default useGetAllTransactions;
