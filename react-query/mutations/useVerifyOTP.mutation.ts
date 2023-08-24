import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

import { interceptor } from '@/axios.config';

import QueryKeys from '@/utils/query-keys.util';

import { useToast } from '@/app/toast.provider';

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

  return response.data.data;
};

const useVerifyOTP = () => {
  const router = useRouter();
  const { showToast } = useToast();

  return useMutation(verifyOTP, {
    mutationKey: [QueryKeys.LOGIN],
    onSuccess: () => {
      showToast('OTP verification complete!. Please proceed to login!');
      setTimeout(() => {
        router.push('/');
      }, 3000);
    },
    onError: async (err: any) => {
      if (err instanceof AxiosError) {
        showToast(err.response?.data.message);
      } else {
        showToast(err?.message);
      }
    },
  });
};

export default useVerifyOTP;
