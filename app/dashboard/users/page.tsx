'use client';
import React, { useEffect } from 'react';

import useGetAllUsers from '@/react-query/query/useGetAllUsers.query';
import { UserDetails } from '@/interfaces/user.interface';

import { truncateText } from '@/utils/truncate-text.utils';

import {
  StyledMileageBg,
  StyledTableData,
  StyledTableHead,
  StyledHeadingText,
  PaginationText,
  HeadingIconContainer,
  HeadingContainer,
  StyledTableRow,
  StyledPaginationContainer,
  StyledControlButton,
  StyledControls,
  SearchInput,
} from '@/styles/main.styles';

import PeopleActive from '@/public/people-active.svg';
import { useDebounce } from '@/hooks/useDebounce.hook';
import { formatDate } from '@/utils/format-date.util';

const Users = () => {
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
      console.log(currentPage);
    }
  };

  const { data } = useGetAllUsers(
    `page=${currentPage}${
      debouncedSearchText && `&email=${debouncedSearchText}`
    }`
  );

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  return (
    <StyledMileageBg>
      <HeadingContainer>
        <HeadingIconContainer>
          <PeopleActive />
        </HeadingIconContainer>
        <StyledHeadingText>users</StyledHeadingText>
      </HeadingContainer>
      <StyledPaginationContainer>
        <PaginationText>
          <p>
            displaying {data?.data.documents?.length} of {data?.data?.count}{' '}
            users
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
            <StyledTableHead scope="col">name</StyledTableHead>
            <StyledTableHead scope="col">email</StyledTableHead>
            <StyledTableHead scope="col">phone number</StyledTableHead>
            <StyledTableHead scope="col">active</StyledTableHead>
            <StyledTableHead scope="col">date of registration</StyledTableHead>
          </tr>
        </thead>
        <tbody>
          {(data?.data.documents as UserDetails[])?.map((user) => (
            <StyledTableRow key={user.id}>
              <StyledTableData>{truncateText(user.id, 15)}</StyledTableData>
              <StyledTableData>
                {user.firstName} {user.lastName}
              </StyledTableData>
              <StyledTableData>{user.email}</StyledTableData>
              <StyledTableData>{user.phoneNumber}</StyledTableData>
              <StyledTableData>{String(user?.isActive)}</StyledTableData>
              <StyledTableData>
                {formatDate(new Date(user.createdAt))}
              </StyledTableData>
            </StyledTableRow>
          ))}
        </tbody>
      </table>
    </StyledMileageBg>
  );
};

export default Users;
