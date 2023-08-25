import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { interceptor } from '@/axios.config';
import { toast } from '@/components/toast/notification.component';
import QueryKeys from '@/utils/query-keys.util';

const requestOTP = async ({ email, purpose }: { [key: string]: string }) => {
  const response = await interceptor.post('/auth/request-otp', {
    email,
    purpose,
  });
  return response.data;
};

const useRequestOTP = () => {
  return useMutation(requestOTP, {
    mutationKey: [QueryKeys.GET_OTP],
    onSuccess: (data) => {
      toast.success(data?.data, { delay: 3000 });
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

export default useRequestOTP;
