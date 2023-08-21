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
  StyledPaginationContainer,
  StyledControls,
  StyledControlButton,
  SearchInput,
} from '@/styles/main.styles';

import OrganizationActive from '@/public/business-active.svg';
import { useDebounce } from '@/hooks/useDebounce.hook';
import { formatDate } from '@/utils/format-date.util';

const Organizations = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState('');

  const debouncedSearchText = useDebounce(searchText, 200);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

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

  const { data } = useGetAllBusinesses(
    `page=${currentPage}${
      debouncedSearchText && `&companyName1=${debouncedSearchText}`
    }`
  );

  return (
    <StyledMileageBg>
      <HeadingContainer>
        <HeadingIconContainer>
          <OrganizationActive />
        </HeadingIconContainer>
        <StyledHeadingText>organizations</StyledHeadingText>
      </HeadingContainer>

      <StyledPaginationContainer>
        <PaginationText>
          <p>
            displaying {data?.data.documents?.length} of {data?.data?.count}{' '}
            organization(s)
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
                {formatDate(new Date(business.createdAt))}
              </StyledTableData>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledMileageBg>
  );
};

export default Organizations;

/**const getPageFromQuery = (page?: string | string[]) => {
  if (!page) return 1;

  if (Array.isArray(page)) {
    return Number(page[0]);
  }

  return Number(page);
};

export default getPageFromQuery; */
