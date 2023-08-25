import { usePathname, useRouter } from 'next/navigation';
import { StyledTopNavBackground } from './navigation.styles';
import { SideNavItemComponent } from '@/components/nav-item/nav-item.component';

import Driving from '@/public/driving.svg';
import DrivingActive from '@/public/driving-active.svg';
import Dashboard from '@/public/dashboard.svg';
import DashboardActive from '@/public/dashboard-active.svg';
import People from '@/public/people.svg';
import PeopleActive from '@/public/people-active.svg';

import Organizations from '@/public/business.svg';
import OrganizationsActive from '@/public/business-active.svg';
import Payments from '@/public/payment.svg';
import PaymentsActive from '@/public/payment-active.svg';
import ShowView from '../show-view/show-view.component';
import { useUserStore } from '@/states/user.states';

const checkPathName = (path: string, currentPath: string): boolean =>
  path === currentPath;

export const NavigationComponent = () => {
  const pathName = usePathname();
  const navigate = useRouter();
  const { resetState } = useUserStore();

  return (
    <StyledTopNavBackground>
      <SideNavItemComponent
        active={checkPathName(pathName, '/dashboard')}
        changeRoute={() => navigate.push('/dashboard')}
      >
        <>
          <ShowView when={!checkPathName(pathName, '/dashboard')}>
            <Dashboard />
          </ShowView>

          <ShowView when={checkPathName(pathName, '/dashboard')}>
            <DashboardActive />
          </ShowView>

          <div>dashboard</div>
        </>
      </SideNavItemComponent>
      <SideNavItemComponent
        active={checkPathName(pathName, '/dashboard/users')}
        changeRoute={() => navigate.push('/dashboard/users')}
      >
        <>
          <ShowView when={!checkPathName(pathName, '/dashboard/users')}>
            <People />
          </ShowView>

          <ShowView when={checkPathName(pathName, '/dashboard/users')}>
            <PeopleActive />
          </ShowView>
          <div>users</div>
        </>
      </SideNavItemComponent>
      <SideNavItemComponent
        active={checkPathName(pathName, '/dashboard/organizations')}
        changeRoute={() => navigate.push('/dashboard/organizations')}
      >
        <>
          <ShowView when={!checkPathName(pathName, '/dashboard/organizations')}>
            <Organizations />
          </ShowView>

          <ShowView when={checkPathName(pathName, '/dashboard/organizations')}>
            <OrganizationsActive />
          </ShowView>
          <div>organizations</div>
        </>
      </SideNavItemComponent>

      <SideNavItemComponent
        active={checkPathName(pathName, '/dashboard/mileage')}
        changeRoute={() => navigate.push('/dashboard/mileage')}
      >
        <>
          <ShowView when={!checkPathName(pathName, '/dashboard/mileage')}>
            <Driving />
          </ShowView>

          <ShowView when={checkPathName(pathName, '/dashboard/mileage')}>
            <DrivingActive />
          </ShowView>
          <div>mileage</div>
        </>
      </SideNavItemComponent>
      <SideNavItemComponent
        active={checkPathName(pathName, '/dashboard/transactions')}
        changeRoute={() => navigate.push('/dashboard/transactions')}
      >
        <>
          <ShowView when={!checkPathName(pathName, '/dashboard/transactions')}>
            <Payments />
          </ShowView>

          <ShowView when={checkPathName(pathName, '/dashboard/transactions')}>
            <PaymentsActive />
          </ShowView>
          <div>transactions</div>
        </>
      </SideNavItemComponent>
      <SideNavItemComponent
        changeRoute={() => {
          navigate.push('/');
          resetState();
        }}
      >
        <div>log out</div>
      </SideNavItemComponent>
    </StyledTopNavBackground>
  );
};
