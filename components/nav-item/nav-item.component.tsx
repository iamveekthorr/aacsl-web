'use client';

import { StyledNavItem } from './nav-item.styles';

export const SideNavItemComponent: React.FC<{
  children: React.ReactElement;
  active?: boolean;
  changeRoute: () => void;
}> = ({ children, active, changeRoute }) => {
  return (
    <StyledNavItem $active={active} onClick={changeRoute}>
      {children}
    </StyledNavItem>
  );
};
