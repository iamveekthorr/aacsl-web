'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import {
  StyledMileageBg,
  StyledHeadingText,
  HeadingContainer,
  HeadingIconContainer,
  StyledDashBoardGrid,
  StyledGridItem,
} from '@/styles/main.styles';

import DashboardActive from '@/public/dashboard-active.svg';
import useGetAllTransactions from '@/react-query/query/useGetAllTransactions.query';
import useGetAllBusinesses from '@/react-query/query/useGetAllBusinesses.query';
import useGetAllUsers from '@/react-query/query/useGetAllUsers.query';
import useGetAllMileage from '@/react-query/query/useGetAllMileage.query';

const Home = () => {
  const { data: transactions } = useGetAllTransactions();

  const { data: organizations } = useGetAllBusinesses();

  const { data: users } = useGetAllUsers();

  const { data: mileage } = useGetAllMileage();

  const router = useRouter();

  return (
    <StyledMileageBg>
      <>
        <HeadingContainer>
          <HeadingIconContainer>
            <DashboardActive />
          </HeadingIconContainer>
          <StyledHeadingText>dashboard</StyledHeadingText>
        </HeadingContainer>

        <StyledDashBoardGrid>
          <StyledGridItem
            $color="to right, #4A00E0, #8E2DE2"
            onClick={() => router.push('/dashboard/organizations')}
          >
            <p>organizations</p>
            <p>{organizations?.data?.count}</p>
          </StyledGridItem>
          <StyledGridItem
            $color={'to left, #6FB1FC, #4364F7, #0052D4'}
            onClick={() => router.push('/dashboard/transactions')}
          >
            <p>transactions</p>
            <p>{transactions?.data.count}</p>
          </StyledGridItem>
          <StyledGridItem
            $color={'to left, #96c93d, #00b09b'}
            onClick={() => router.push('/dashboard/mileage')}
          >
            <p>mileage</p>
            <p>{mileage?.data.count}</p>
          </StyledGridItem>
          <StyledGridItem
            $color={'to right, #93291E, #ED213A'}
            onClick={() => router.push('/dashboard/users')}
          >
            <p>users</p>
            <p>{users?.data.count}</p>
          </StyledGridItem>
        </StyledDashBoardGrid>
      </>
    </StyledMileageBg>
  );
};

export default Home;
