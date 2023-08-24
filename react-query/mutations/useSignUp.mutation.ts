import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Id, toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { interceptor } from '@/axios.config';

import QueryKeys from '@/utils/query-keys.util';

import User from '@/interfaces/user.interface';

const signup = async (data: { [key: string]: string }): Promise<User> => {
  console.log(data, 'signup data');
  const response = await interceptor.post('/auth/signup?role=ADMIN', {
    ...data,
  });

  return response.data.data;
};

const useSignUp = () => {
  const router = useRouter();

  return useMutation(signup, {
    mutationKey: [QueryKeys.SIGNUP],
    onSuccess: (data) => {
      setTimeout(() => {
        router.push('/verify-otp');
      }, 3000);
    },
    onError: async (err: any) => {
      let toastId: undefined | Id;

      if (err instanceof AxiosError) {
        toastId = toast.error(err.response?.data.message);
      } else {
        toastId = toast.error(err?.message);
      }

      setTimeout(() => {
        toast.dismiss(toastId);
      }, 3000);
    },
  });
};

export default useSignUp;
