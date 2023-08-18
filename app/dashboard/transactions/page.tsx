'use client';
import React from 'react';

import useGetAllTransactions from '@/react-query/query/useGetAllTransactions.query';

import { truncateText } from '@/utils/truncate-text.utils';

import {
  StyledMileageBg,
  StyledTableData,
  StyledTableHead,
  StyledHeadingText,
  PaginationText,
  HeadingContainer,
  HeadingIconContainer,
} from '@/styles/main.styles';

import PaymentsActive from '@/public/payment-active.svg';

const Transactions = () => {
  const { data } = useGetAllTransactions();

  return (
    <StyledMileageBg>
      <HeadingContainer>
        <HeadingIconContainer>
          <PaymentsActive />
        </HeadingIconContainer>
        <StyledHeadingText>transactions</StyledHeadingText>
      </HeadingContainer>
      <PaginationText>
        <p>
          displaying {data?.data.documents?.length} of {data?.data?.count}{' '}
          payments
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
            <StyledTableHead scope="col">transaction ID</StyledTableHead>
            <StyledTableHead scope="col">transaction status</StyledTableHead>
            <StyledTableHead scope="col">business name</StyledTableHead>
            <StyledTableHead scope="col">description</StyledTableHead>
            <StyledTableHead scope="col">amount</StyledTableHead>
            <StyledTableHead scope="col">date</StyledTableHead>
          </tr>
        </thead>
        <tbody>
          {data?.data.documents?.map((m) => (
            <tr key={m.id}>
              <StyledTableData>{truncateText(m.id, 15)}</StyledTableData>
              <StyledTableData>{String(m.transActionStatus)}</StyledTableData>
              <StyledTableData>
                {truncateText(m.companyName, 20)}
              </StyledTableData>
              <StyledTableData>{m.description}</StyledTableData>
              <StyledTableData>{m.amount}</StyledTableData>
              <StyledTableData>
                {new Date(m.createdAt).toString()}
              </StyledTableData>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledMileageBg>
  );
};

export default Transactions;
