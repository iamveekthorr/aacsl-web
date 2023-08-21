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
  StyledControls,
  StyledControlButton,
  StyledPaginationContainer,
  SearchInput,
} from '@/styles/main.styles';

import PaymentsActive from '@/public/payment-active.svg';
import { useDebounce } from '@/hooks/useDebounce.hook';
import { formatDate } from '@/utils/format-date.util';

const Transactions = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const [searchText, setSearchText] = React.useState('');

  const debouncedSearchText = useDebounce(searchText, 200);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      if (data?.data?.totalPages && currentPage >= data.data.totalPages) {
        return prevPage;
      }

      return prevPage + 1;
    });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  const { data } = useGetAllTransactions(
    `page=${currentPage}${
      debouncedSearchText && `&transActionId=${debouncedSearchText}`
    }`
  );

  return (
    <StyledMileageBg>
      <HeadingContainer>
        <HeadingIconContainer>
          <PaymentsActive />
        </HeadingIconContainer>
        <StyledHeadingText>transactions</StyledHeadingText>
      </HeadingContainer>

      <StyledPaginationContainer>
        <PaginationText>
          <p>
            displaying {data?.data.documents?.length} of {data?.data?.count}{' '}
            payments
          </p>
        </PaginationText>
        <SearchInput
          type="text"
          placeholder="search by email..."
          value={searchText}
          onChange={handleSearchInputChange}
        />
        <StyledControls>
          <StyledControlButton onClick={handlePreviousPage}>
            &lt;
          </StyledControlButton>
          <p>
            page {currentPage} of {data?.data.totalPages}
          </p>
          <StyledControlButton onClick={handleNextPage}>
            &gt;
          </StyledControlButton>
        </StyledControls>
      </StyledPaginationContainer>

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
              <StyledTableData>{m.transactionId}</StyledTableData>
              <StyledTableData>{String(m.transActionStatus)}</StyledTableData>
              <StyledTableData>
                {truncateText(m.companyName, 20)}
              </StyledTableData>
              <StyledTableData>{m.description}</StyledTableData>
              <StyledTableData>{m.amount}</StyledTableData>
              <StyledTableData>
                {formatDate(new Date(m.createdAt))}
              </StyledTableData>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledMileageBg>
  );
};

export default Transactions;
