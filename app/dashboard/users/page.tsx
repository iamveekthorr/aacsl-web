'use client';
import React from 'react';

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
} from '@/styles/main.styles';

import PeopleActive from '@/public/people-active.svg';

const Users = () => {
  const { data } = useGetAllUsers();

  return (
    <StyledMileageBg>
      <HeadingContainer>
        <HeadingIconContainer>
          <PeopleActive />
        </HeadingIconContainer>
        <StyledHeadingText>users</StyledHeadingText>
      </HeadingContainer>
      <PaginationText>
        <p>
          displaying {data?.data.documents?.length} of {data?.data?.count}
          users
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
                {new Date(user.createdAt).toISOString()}
              </StyledTableData>
            </StyledTableRow>
          ))}
        </tbody>
      </table>
    </StyledMileageBg>
  );
};

export default Users;
