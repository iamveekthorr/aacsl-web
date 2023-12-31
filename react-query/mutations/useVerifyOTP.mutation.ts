import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

import { interceptor } from '@/axios.config';
import { toast } from '@/components/toast/notification.component';
import QueryKeys from '@/utils/query-keys.util';

const verifyOTP = async ({
  otp,
  email,
  purpose,
}: {
  [key: string]: string;
}) => {
  const response = await interceptor.post('/auth/validate-otp', {
    otp,
    email,
    purpose,
  });

  return response.data;
};

const useVerifyOTP = () => {
  const router = useRouter();

  return useMutation(verifyOTP, {
    mutationKey: [QueryKeys.VERIFY_OTP],
    onSuccess: (data) => {
      toast.success(data?.status, { delay: 3000 });
      setTimeout(() => {
        router.push('/');
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

export default useVerifyOTP;
