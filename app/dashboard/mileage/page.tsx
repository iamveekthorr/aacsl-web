'use client';
import React from 'react';

import useGetAllMileage from '@/react-query/query/useGetAllMileage.query';
import useGetMileageById from '@/react-query/query/useGetMileageById.query';

import { truncateText } from '@/utils/truncate-text.utils';
import { formatDate } from '@/utils/format-date.util';

import ShowView from '@/components/show-view/show-view.component';

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
  StyledBusinessTag,
  StyledBusinessName,
  StyledDetailsHeading,
  StyledDetailsItem,
  StyledDataDetails,
} from '@/styles/main.styles';

import { useDebounce } from '@/hooks/useDebounce.hook';
import Modal from '@/components/modal/modal.component';

import MileageActive from '@/public/driving-active.svg';
import OrganizationActive from '@/public/business-active.svg';
import { capitalizeFirstLetters } from '@/utils/capitalize-first-letter';

const Mileage = () => {
  const [locations, setLocations] = React.useState<Array<any> | undefined>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState('');
  const modalRef = React.useRef<any>(null);
  const [selectedRow, setSelectedRow] = React.useState<string | undefined>(
    undefined
  );

  const debouncedSearchText = useDebounce(searchText, 200);

  const url = `page=${currentPage}${
    debouncedSearchText && `&business=${debouncedSearchText}`
  }`;

  const { data } = useGetAllMileage(url);

  const { data: mileage } = useGetMileageById(selectedRow);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  const handleNextPage = React.useCallback(() => {
    setCurrentPage((prevPage) => {
      if (data?.data?.totalPages && currentPage >= data.data.totalPages) {
        return prevPage;
      }

      return prevPage + 1;
    });
  }, [currentPage, data?.data?.totalPages]);

  const handlePreviousPage = React.useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]);

  React.useEffect(() => {
    setLocations(data?.data?.documents);
  }, [setLocations, locations, data]);

  return (
    <>
      <StyledMileageBg>
        <HeadingContainer>
          <HeadingIconContainer>
            <MileageActive />
          </HeadingIconContainer>
          <StyledHeadingText>mileage</StyledHeadingText>
        </HeadingContainer>
        <StyledPaginationContainer>
          <PaginationText>
            <p>
              displaying {locations?.length} of {data?.data?.count} mileages
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
              <StyledTableHead scope="col">business ID</StyledTableHead>
              <StyledTableHead scope="col">round trip</StyledTableHead>
              <StyledTableHead scope="col">purpose of trip</StyledTableHead>
              <StyledTableHead scope="col">start post code</StyledTableHead>
              <StyledTableHead scope="col">end post code</StyledTableHead>
              <StyledTableHead scope="col">distance covered</StyledTableHead>
              <StyledTableHead scope="col">date</StyledTableHead>
            </tr>
          </thead>
          <tbody>
            {locations?.map((m) => (
              <tr
                key={m.id}
                onClick={() => {
                  setSelectedRow(m.id);
                  modalRef.current.open();
                }}
              >
                <StyledTableData>{truncateText(m.id, 15)}</StyledTableData>
                <StyledTableData>{String(m.roundTrip)}</StyledTableData>
                <StyledTableData>
                  {truncateText(m.purposeOfTrip, 20)}
                </StyledTableData>
                <StyledTableData>{m.startPostCode}</StyledTableData>
                <StyledTableData>{m.endPostCode}</StyledTableData>
                <StyledTableData>{m.distance} miles</StyledTableData>
                <StyledTableData>{formatDate(m.createdAt)}</StyledTableData>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledMileageBg>
      <Modal ref={modalRef} trigger={<></>}>
        <section>
          <ModalHeadingTextContainer>
            <HeadingIconContainer>
              <OrganizationActive />
            </HeadingIconContainer>
            <div>
              <StyledBusinessName>
                <ShowView when={!mileage?.data.business?.companyName1}>
                  N/A
                </ShowView>
                {capitalizeFirstLetters(mileage?.data.business?.companyName1)}
              </StyledBusinessName>
              <ShowView when={!!mileage?.data?.business?.businessType}>
                <StyledBusinessTag>
                  {mileage?.data?.business?.businessType}
                </StyledBusinessTag>
              </ShowView>
            </div>
          </ModalHeadingTextContainer>
          <section>
            <StyledDetailsHeading>mileage details</StyledDetailsHeading>
            <StyledDataDetails>
              <StyledDetailsItem>
                <span>round trip</span>:{' '}
                <span>{mileage?.data?.roundTrip === true ? 'yes' : 'no'}</span>
              </StyledDetailsItem>
              <StyledDetailsItem>
                <span>start position</span>:{' '}
                <span>{mileage?.data?.startPosition}</span>
              </StyledDetailsItem>
              <StyledDetailsItem>
                <span>end position</span>:{' '}
                <span>{mileage?.data?.endPosition}</span>
              </StyledDetailsItem>
              <StyledDetailsItem>
                <span>date of trip</span>:{' '}
                <span>{formatDate(mileage?.data.dateOfTrip)}</span>
              </StyledDetailsItem>
              <StyledDetailsItem>
                <span>last modified</span>:{' '}
                <span>{formatDate(mileage?.data.updatedAt)}</span>
              </StyledDetailsItem>
              <StyledDetailsItem>
                <span>distance traveled in miles</span>:{' '}
                <span>{mileage?.data?.distance} miles</span>
              </StyledDetailsItem>
              <StyledDetailsItem>
                <span>purposeOfTrip</span>:{' '}
                <span>{mileage?.data?.purposeOfTrip}</span>
              </StyledDetailsItem>
              <StyledDetailsItem>
                <span>start post code</span>:{' '}
                <span>{mileage?.data?.startPostCode}</span>
              </StyledDetailsItem>
              <StyledDetailsItem>
                <span>end post code</span>:{' '}
                <span>{mileage?.data?.endPostCode}</span>
              </StyledDetailsItem>
            </StyledDataDetails>
          </section>
        </section>
      </Modal>
    </>
  );
};

export default Mileage;
