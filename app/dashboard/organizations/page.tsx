'use client';
import React from 'react';

import { truncateText } from '@/utils/truncate-text.utils';

import useGetAllBusinesses from '@/react-query/query/useGetAllBusinesses.query';

import {
  StyledMileageBg,
  StyledTableData,
  StyledTableHead,
  StyledHeadingText,
  PaginationText,
  HeadingContainer,
  HeadingIconContainer,
} from '@/styles/main.styles';

import OrganizationActive from '@/public/business-active.svg';

const Organizations = () => {
  const { data } = useGetAllBusinesses();

  return (
    <StyledMileageBg>
      <HeadingContainer>
        <HeadingIconContainer>
          <OrganizationActive />
        </HeadingIconContainer>
        <StyledHeadingText>organizations</StyledHeadingText>
      </HeadingContainer>
      <PaginationText>
        <p>
          displaying {data?.data.documents?.length} of {data?.data?.count}{' '}
          organization(s)
        </p>
      </PaginationText>

      <table
        role="presentation"
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        style={{
          minWidth: '100%',
          height: 'auto',
          backgroundColor: '#ffffff !important',
          textAlign: 'left',
        }}
      >
        <thead
          style={{
            backgroundColor: ' #ffffff !important',
            textTransform: 'capitalize',
          }}
        >
          <tr>
            <StyledTableHead scope="col">id</StyledTableHead>
            <StyledTableHead scope="col">organization name</StyledTableHead>
            <StyledTableHead scope="col">business type</StyledTableHead>
            <StyledTableHead scope="col">business email</StyledTableHead>
            <StyledTableHead scope="col">active</StyledTableHead>
            <StyledTableHead scope="col">date of registration</StyledTableHead>
          </tr>
        </thead>
        <tbody>
          {data?.data.documents?.map((business) => (
            <tr key={business.id}>
              <StyledTableData>{truncateText(business.id, 15)}</StyledTableData>
              <StyledTableData>
                {truncateText(business.companyName1, 17)}
              </StyledTableData>
              <StyledTableData>{business.businessType}</StyledTableData>
              <StyledTableData>{business.email}</StyledTableData>
              <StyledTableData>
                {String(business?.isBusinessActive)}
              </StyledTableData>
              <StyledTableData>
                {new Date(business.createdAt).toISOString()}
              </StyledTableData>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledMileageBg>
  );
};

export default Organizations;
