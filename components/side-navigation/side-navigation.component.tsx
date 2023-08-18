import { usePathname, useRouter } from 'next/navigation';
import { SideNavItemComponent } from '../side-nav-item/side-nav-item.component';
import { StyledTopNavBackground } from './side-navigation.styles';

export const SideNavigationComponent = () => {
  const pathName = usePathname();
  const navigate = useRouter();
  return (
    <StyledTopNavBackground>
      <SideNavItemComponent
        active={pathName === '/dashboard'}
        changeRoute={() => navigate.push('/dashboard')}
      >
        <>
          <div>icon</div>
          <div>dashboard</div>
        </>
      </SideNavItemComponent>
      <SideNavItemComponent
        active={pathName === '/dashboard/users'}
        changeRoute={() => navigate.push('/dashboard/users')}
      >
        <>
          <div>icon</div>
          <div>users</div>
        </>
      </SideNavItemComponent>
      <SideNavItemComponent
        active={pathName === '/dashboard/organizations'}
        changeRoute={() => navigate.push('/dashboard/organizations')}
      >
        <>
          <div>icon</div>
          <div>organizations</div>
        </>
      </SideNavItemComponent>
      <SideNavItemComponent
        active={pathName === '/dashboard/mileage'}
        changeRoute={() => navigate.push('/dashboard/mileage')}
      >
        <>
          <div>icon</div>
          <div>mileage</div>
        </>
      </SideNavItemComponent>
      <SideNavItemComponent
        active={pathName === '/dashboard/transactions'}
        changeRoute={() => navigate.push('/dashboard/transactions')}
      >
        <>
          <div>icon</div>
          <div>transactions</div>
        </>
      </SideNavItemComponent>
    </StyledTopNavBackground>
  );
};
