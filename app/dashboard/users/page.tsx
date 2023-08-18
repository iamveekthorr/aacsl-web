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
} from '@/styles/main.styles';

const Users = () => {
  const [users, setUsers] = React.useState<Array<UserDetails> | undefined>([]);

  const { data } = useGetAllUsers();

  React.useEffect(() => {
    setUsers(data?.data?.documents);
  }, [setUsers, users, data]);

  return (
    <StyledMileageBg>
      <StyledHeadingText>users</StyledHeadingText>
      <PaginationText>
        <p>
          displaying {users?.length} of {data?.data?.count} users
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
          {users?.map((user) => (
            <tr key={user.id}>
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
            </tr>
          ))}
        </tbody>
      </table>
    </StyledMileageBg>
  );
};

export default Users;
