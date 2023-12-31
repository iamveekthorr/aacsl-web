'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { truncateText } from '@/utils/truncate-text.utils';
import { formatDate } from '@/utils/format-date.util';
import { capitalizeFirstLetters } from '@/utils/capitalize-first-letter';

import useGetAllBusinesses from '@/react-query/query/useGetAllBusinesses.query';
import useGetOrganization from '@/react-query/query/useGetBusinessById.query';

import styles from '@/styles/date-picker.module.css';
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
  ModalHeadingTextContainer,
  StyledBusinessName,
  StyledBusinessTag,
  StyledDetailsHeading,
  StyledDataDetails,
  StyledDetailsItem,
  StyledFilterIcon,
  StyledDateFilteringContainer,
  StyledLabel,
  StyledDatePickerInput,
  StyledTableRowNotFound,
} from '@/styles/main.styles';

import OrganizationActive from '@/public/business-active.svg';
import FilterIcon from '@/public/filter.svg';

import { useDebounce } from '@/hooks/useDebounce.hook';

import Modal from '@/components/modal/modal.component';
import ShowView from '@/components/show-view/show-view.component';

import { StyledForm } from '@/components/form/form.styles';
import Button from '@/components/button/button.component';
import Loading from '@/public/loading.gif';
import NotFound from '@/public/smartphone.png';

const Organizations = () => {
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

  const { data, isLoading } = useGetAllBusinesses(
    `page=${currentPage}${
      debouncedSearchText && `&companyName1=~${debouncedSearchText}`
    }${
      endDate && startDate
        ? `&endDate=${endDate.toISOString()}&startDate=${startDate.toISOString()}`
        : ''
    }`
  );

  const { data: organization } = useGetOrganization(selectedRow);

  return (
    <StyledMileageBg>
      <>
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
            placeholder="search by organization name..."
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
                <StyledTableHead scope="col">organization name</StyledTableHead>
                <StyledTableHead scope="col">business type</StyledTableHead>
                <StyledTableHead scope="col">business email</StyledTableHead>
                <StyledTableHead scope="col">active</StyledTableHead>
                <StyledTableHead scope="col">
                  date of registration
                </StyledTableHead>
              </tr>
            </thead>
            <tbody>
              {data?.data.documents?.map((business) => (
                <tr
                  key={business.id}
                  onClick={() => {
                    setSelectedRow(business.id);
                    modalRef.current.open();
                  }}
                >
                  <StyledTableData>
                    {truncateText(business.id, 15)}
                  </StyledTableData>
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
                <OrganizationActive />
              </HeadingIconContainer>
              <div>
                <StyledBusinessName>
                  <ShowView when={!organization?.data.organizationName}>
                    N/A
                  </ShowView>
                  {organization?.data.organizationName}
                </StyledBusinessName>
                <ShowView when={!!organization?.data?.businessType}>
                  <StyledBusinessTag>
                    {organization?.data?.businessType}
                  </StyledBusinessTag>
                </ShowView>
              </div>
            </ModalHeadingTextContainer>
            <section>
              <StyledDetailsHeading>organization details</StyledDetailsHeading>
              <StyledDataDetails>
                <StyledDetailsItem>
                  <span>email address:</span>{' '}
                  <span>
                    <Link href={`mailto:${organization?.data?.primaryEmail}`}>
                      {organization?.data?.primaryEmail}
                    </Link>
                  </span>
                </StyledDetailsItem>
                <StyledDetailsItem>
                  <span>email address (secondary):</span>{' '}
                  <ShowView when={!organization?.data?.secondaryEmail}>
                    N/A
                  </ShowView>
                  <span>
                    <Link href={`mailto:${organization?.data?.secondaryEmail}`}>
                      {organization?.data?.secondaryEmail}
                    </Link>
                  </span>
                </StyledDetailsItem>
                <StyledDetailsItem>
                  <span>phone number</span>:{' '}
                  <Link href={`tel:${organization?.data?.primaryPhone}`}>
                    <span>{organization?.data?.primaryPhone || 'N/A'}</span>
                  </Link>
                </StyledDetailsItem>
                <StyledDetailsItem>
                  <span>companies house registration number</span>:{' '}
                  <span>{organization?.data?.companyHouseRegNo || 'N/A'}</span>
                </StyledDetailsItem>
                <StyledDetailsItem>
                  <span>companies account year end</span>:{' '}
                  <span>
                    {organization?.data?.companyAccountsYearEnd || 'N/A'}
                  </span>
                </StyledDetailsItem>
                <StyledDetailsItem>
                  <span>next confirmation statement deadline</span>:{' '}
                  <span>
                    {organization?.data?.nextConfirmationStatementDeadline ||
                      'N/A'}
                  </span>
                </StyledDetailsItem>
                <StyledDetailsItem>
                  <span>next company account filing deadline</span>:{' '}
                  <span>
                    {organization?.data?.nextCompanyAccountFilingDeadline ||
                      'N/A'}
                  </span>
                </StyledDetailsItem>
                <StyledDetailsItem>
                  <span>latest self assessment status</span>:{' '}
                  <span>
                    {organization?.data?.latestSelfAssessmentStatus || 'N/A'}
                  </span>
                </StyledDetailsItem>
                <StyledDetailsItem>
                  <span>business address</span>:{' '}
                  <span>{organization?.data?.businessAddress || 'N/A'}</span>
                </StyledDetailsItem>
                <StyledDetailsItem>
                  <span>date of registration</span>:{' '}
                  <span>{formatDate(organization?.data.dateCreated)}</span>
                </StyledDetailsItem>
                <StyledDetailsItem>
                  <span>last modified</span>:{' '}
                  <span>{formatDate(organization?.data?.lastModified)}</span>
                </StyledDetailsItem>
                <StyledDetailsItem>
                  <span>account reviewing officer</span>:{' '}
                  <span>
                    {organization?.data?.accountOfficer?.firstName}{' '}
                    {organization?.data?.accountOfficer?.lastName || 'N/A'}
                  </span>
                </StyledDetailsItem>
              </StyledDataDetails>
            </section>

            <ShowView when={organization?.data?.user?.length > 0}>
              <section style={{ marginTop: '2rem' }}>
                <StyledDetailsHeading>
                  associated business accounts
                </StyledDetailsHeading>
                {organization?.data?.business?.map(
                  (business: { [x: string]: string }) => (
                    <StyledDetailsItem key={business?.id}>
                      {capitalizeFirstLetters(business.companyName1)}
                    </StyledDetailsItem>
                  )
                )}
              </section>
            </ShowView>

            <ShowView when={organization?.data?.directors?.length > 0}>
              <section style={{ marginTop: '2rem' }}>
                <StyledDetailsHeading>
                  associated business accounts
                </StyledDetailsHeading>
                {organization?.data?.directors.map(
                  (director: { [x: string]: string }) => (
                    <StyledDetailsItem key={director?.id}>
                      {capitalizeFirstLetters(director.firstName)}
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

export default Organizations;
