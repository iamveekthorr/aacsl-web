import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

import { useUserStore } from '@/states/user.states';
import QueryKeys from '@/utils/query-keys.util';

import { interceptor } from '@/axios.config';

import { clearItems, getItemFromStorage } from '@/utils/local-storage.util';
import STORAGE_KEYS from '@/utils/storage-keys.util';
import { ApiResponse } from '@/interfaces/api-response.interface';

import { toast } from '@/components/toast/notification.component';

const getOrganization = async (id?: string) => {
  if (!id) return null;

  const response = await interceptor.get(`/business/${id}/admin`, {
    headers: {
      Authorization: `Bearer ${getItemFromStorage(STORAGE_KEYS.TOKEN)}`,
    },
  });
  return response.data as ApiResponse;
};

const useGetOrganization = (id: string | undefined) => {
  const user = useUserStore();

  const router = useRouter();

  return useQuery([QueryKeys.GET_USER_BY_ID, id], () => getOrganization(id), {
    enabled: !!getItemFromStorage(STORAGE_KEYS.TOKEN),
    keepPreviousData: true,
    onError: async (err: any) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401 && user.currentUser) {
          console.log(err?.message);
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

export default useGetOrganization;
