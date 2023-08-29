'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { UserDetails } from '@/interfaces/user.interface';

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
  ModalHeadingTextContainer,
  StyledBusinessName,
  StyledBusinessTag,
  StyledDetailsHeading,
  StyledDetailsItem,
  StyledDataDetails,
  StyledFilterIcon,
  StyledLabel,
  StyledDatePickerInput,
  StyledDateFilteringContainer,
  StyledTableRowNotFound,
} from '@/styles/main.styles';
import styles from '@/styles/date-picker.module.css';

import { truncateText } from '@/utils/truncate-text.utils';
import { formatDate } from '@/utils/format-date.util';
import { capitalizeFirstLetters } from '@/utils/capitalize-first-letter';

import useGetAllUsers from '@/react-query/query/useGetAllUsers.query';
import useGetUserById from '@/react-query/query/useGetUserById.query';

import { useDebounce } from '@/hooks/useDebounce.hook';

import ShowView from '@/components/show-view/show-view.component';
import Modal from '@/components/modal/modal.component';
import { StyledForm } from '@/components/form/form.styles';
import Button from '@/components/button/button.component';

import PeopleActive from '@/public/people-active.svg';
import FilterIcon from '@/public/filter.svg';
import Loading from '@/public/loading.gif';
import NotFound from '@/public/smartphone.png';

const Users = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState('');
  const [selectedRow, setSelectedRow] = React.useState<string | undefined>(
    undefined
  );

  const [startDate, setStartDate] = React.useState<Date | null>();
  const [endDate, setEndDate] = React.useState<Date | null>();

  const modalRef = React.useRef<any>(null);
  const datePickerRef = React.useRef<any>(null);

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

  const { data, isLoading } = useGetAllUsers(
    `page=${currentPage}${
      debouncedSearchText && `&email=~${debouncedSearchText}`
    }${
      endDate && startDate
        ? `&endDate=${endDate.toISOString()}&startDate=${startDate.toISOString()}`
        : ''
    }`
  );

  const { data: user } = useGetUserById(selectedRow);

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  return (
    <StyledMileageBg>
      <>
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
          <Modal
            ref={datePickerRef}
            trigger={
              <StyledFilterIcon>
                <FilterIcon />
              </StyledFilterIcon>
            }
          >
            <>
              <ModalHeadingTextContainer>
                <StyledBusinessName>
                  Please select dates for filtering
                </StyledBusinessName>
              </ModalHeadingTextContainer>
              <StyledDateFilteringContainer>
                <>
                  <StyledForm>
                    <div>
                      <StyledLabel htmlFor="startDate">
                        select start date
                      </StyledLabel>
                      <StyledDatePickerInput
                        selected={startDate}
                        onChange={(date, e) => {
                          e?.persist();
                          e?.stopPropagation();
                          setStartDate(date);
                        }}
                        startDate={startDate}
                        selectsStart
                        name="startDate"
                        wrapperClassName={styles.date_picker}
                      />
                    </div>
                    <div>
                      <StyledLabel htmlFor="startDate">
                        select end date
                      </StyledLabel>
                      <StyledDatePickerInput
                        selected={endDate}
                        onChange={(date, e) => {
                          e?.persist();
                          e?.stopPropagation();
                          setEndDate(date);
                        }}
                        name="endDate"
                        endDate={endDate}
                        selectsEnd
                        wrapperClassName={styles.date_picker}
                      />
                    </div>
                    <Button
                      handleClick={(e) => {
                        e?.preventDefault();
                        datePickerRef.current?.close();
                      }}
                    >
                      search by date
                    </Button>
                    <Button
                      primary
                      handleClick={(e) => {
                        e?.preventDefault();
                        setEndDate(undefined);
                        setStartDate(undefined);
                        datePickerRef.current?.close();
                      }}
                    >
                      reset
                    </Button>
                  </StyledForm>
                </>
              </StyledDateFilteringContainer>
            </>
          </Modal>
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

        {data?.data?.count && data?.data?.count > 0 && !isLoading ? (
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
                <StyledTableHead scope="col">
                  date of registration
                </StyledTableHead>
              </tr>
            </thead>
            <tbody>
              {(data?.data.documents as UserDetails[])?.map((user) => (
                <StyledTableRow
                  key={user.id}
                  onClick={() => {
                    setSelectedRow(user.id);
                    modalRef.current.open();
                  }}
                >
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
        ) : isLoading ? (
          <StyledTableRowNotFound>
            <Image height="100" width="100" src={Loading} alt="loading gif" />
            <p>fetching data...</p>
          </StyledTableRowNotFound>
        ) : (
          <StyledTableRowNotFound>
            <Image height="100" width="100" src={NotFound} alt="loading gif" />
            <p>no data found</p>
          </StyledTableRowNotFound>
        )}
        <Modal ref={modalRef} trigger={<></>}>
          <section>
            <ModalHeadingTextContainer>
              <HeadingIconContainer>
                <PeopleActive />
              </HeadingIconContainer>
              <div>
                <StyledBusinessName>
                  <ShowView
                    when={!user?.data.firstName && !user?.data?.lastName}
                  >
                    N/A
                  </ShowView>
                  {user?.data.firstName} {user?.data?.lastName}
                </StyledBusinessName>
                <ShowView when={!!user?.data?.role}>
                  <StyledBusinessTag>{user?.data?.role}</StyledBusinessTag>
                </ShowView>
              </div>
            </ModalHeadingTextContainer>
            <section>
              <StyledDetailsHeading>user details</StyledDetailsHeading>
              <StyledDataDetails>
                <StyledDetailsItem>
                  <span>email address:</span>{' '}
                  <span>
                    <Link href={`mailto:${user?.data?.email}`}>
                      {user?.data?.email}
                    </Link>
                  </span>
                </StyledDetailsItem>
                <StyledDetailsItem>
                  <span>phone number</span>:{' '}
                  <Link href={`tel:${user?.data?.phoneNumber}`}>
                    <span>{user?.data?.phoneNumber || 'N/A'}</span>
                  </Link>
                </StyledDetailsItem>
                <StyledDetailsItem>
                  <span>date of registration</span>:{' '}
                  <span>{formatDate(user?.data.createdAt)}</span>
                </StyledDetailsItem>
                <StyledDetailsItem>
                  <span>last modified</span>:{' '}
                  <span>{formatDate(user?.data?.updatedAt)}</span>
                </StyledDetailsItem>
              </StyledDataDetails>
            </section>

            <ShowView when={user?.data?.business.length > 0}>
              <section style={{ marginTop: '2rem' }}>
                <StyledDetailsHeading>
                  associated business accounts
                </StyledDetailsHeading>
                {user?.data?.business?.map(
                  (business: { [x: string]: string }) => (
                    <StyledDetailsItem key={business?.id}>
                      {capitalizeFirstLetters(business.companyName1)}
                    </StyledDetailsItem>
                  )
                )}
              </section>
            </ShowView>
          </section>
        </Modal>
      </>
    </StyledMileageBg>
  );
};

export default Users;
