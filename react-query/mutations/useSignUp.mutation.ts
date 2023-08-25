import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

import { interceptor } from '@/axios.config';

import QueryKeys from '@/utils/query-keys.util';
import { toast } from '@/components/toast/notification.component';

const signup = async (data: { [key: string]: string }) => {
  const response = await interceptor.post('/auth/signup?role=ADMIN', {
    ...data,
  });

  return response.data;
};

const useSignUp = () => {
  const router = useRouter();

  return useMutation(signup, {
    mutationKey: [QueryKeys.SIGNUP],
    onSuccess: (data) => {
      toast.success(data.data, { delay: 3000 });
      setTimeout(() => {
        router.push('/verify-otp');
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

export default useSignUp;
