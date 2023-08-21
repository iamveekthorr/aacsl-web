import React from 'react';
import Image from 'next/image';
import {
  StyledTopNavBackground,
  StyledUserActiveContainer,
} from './header.styles';

import Logo from '@/public/logo-AACSL.png';
import { useUserStore } from '@/states/user.states';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect.hook';

export const HeaderComponent = () => {
  const state = useUserStore((state) => state.currentUser);

  const [name, setName] = React.useState<string | undefined>();

  const [initials, setInitials] = React.useState<string | undefined>('');

  useIsomorphicLayoutEffect(() => {
    setName(`${state?.user.firstName} ${state?.user.lastName}`);
    setInitials(
      `${state?.user.firstName[0].toLocaleUpperCase()}${state?.user.lastName[0].toLocaleUpperCase()}`
    );
  }, [state?.user.firstName, state?.user.lastName, setInitials, setName]);

  return (
    <StyledTopNavBackground>
      <div style={{ height: '2rem' }}>
        <Image
          src={Logo}
          alt="AACSL company logo"
          priority={true}
          placeholder="empty"
        />
      </div>
      <StyledUserActiveContainer>
        <span>{initials}</span>
        <p>{name}</p>
      </StyledUserActiveContainer>
    </StyledTopNavBackground>
  );
};
