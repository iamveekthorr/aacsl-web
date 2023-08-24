import { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { ToastContainer, Slide } from 'react-toastify';
import styled from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect.hook';

const StyledToastContainer = styled(ToastContainer).attrs({
  className: 'toast-container',
  toastClassName: 'toast',
})`
  @media only screen and (max-width: 31.25em) {
    width: 90vw;
    right: 0;
    margin: calc(10rem / 16) auto calc(20rem / 16);
    .toast {
      border-radius: 5px;
      margin-bottom: calc(16rem / 16);
      font-family: inherit;
      font-size: calc(16rem / 16);
    }
  }
`;

const Notifications: FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useIsomorphicLayoutEffect(() => setIsMounted(true), []);

  return isMounted
    ? createPortal(
        <StyledToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={5}
          transition={Slide}
          theme="light"
        />,
        document.getElementById('notifications-root') as Element
      )
    : null;
};

export default Notifications;
