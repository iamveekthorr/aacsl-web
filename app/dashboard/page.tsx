'use client';
import React from 'react';

import {
  StyledMileageBg,
  StyledHeadingText,
  HeadingContainer,
  HeadingIconContainer,
} from '@/styles/main.styles';

import DashboardActive from '@/public/dashboard-active.svg';

const Home = () => {
  return (
    <StyledMileageBg>
      <HeadingContainer>
        <HeadingIconContainer>
          <DashboardActive />
        </HeadingIconContainer>
        <StyledHeadingText>dashboard</StyledHeadingText>
      </HeadingContainer>
    </StyledMileageBg>
  );
};

export default Home;
