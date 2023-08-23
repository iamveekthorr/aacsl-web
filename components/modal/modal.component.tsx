import {
  cloneElement,
  FC,
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { createPortal } from 'react-dom';

import { ModalBG, ModalContentContainer, ModalOverlay } from './modal.styles';

import useClickOutside from '../../hooks/useClickOutside.hook';

type ModalProps = {
  children: ReactNode;
  ref?: ForwardedRef<{ close: () => void }>;
  trigger: ReactElement;
};

const Modal: FC<ModalProps> = forwardRef(
  ({ children, trigger }, ref): JSX.Element => {
    // cont trigger: Element;
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleCloseModal = () => {
      setIsOpen(false);
    };

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: handleCloseModal,
    }));

    useEffect(() => setIsMounted(true), []);

    useClickOutside(modalRef, handleCloseModal);

    return (
      <>
        {cloneElement(trigger, {
          onClick: () => setIsOpen(true),
        })}
        {isMounted && isOpen
          ? createPortal(
              <>
                <ModalOverlay />
                <ModalBG ref={modalRef}>
                  <ModalContentContainer>{children}</ModalContentContainer>
                </ModalBG>
              </>,
              document.body
            )
          : null}
      </>
    );
  }
);

export default Modal;
