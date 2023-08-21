'use client';
import React from 'react';

import useGetAllMileage from '@/react-query/query/useGetAllMileage.query';

import { truncateText } from '@/utils/truncate-text.utils';

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

import MileageActive from '@/public/driving-active.svg';
import { useDebounce } from '@/hooks/useDebounce.hook';

const Mileage = () => {
  const [mileage, setMileage] = React.useState<Array<any> | undefined>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState('');

  const debouncedSearchText = useDebounce(searchText, 200);

  const url = `page=${currentPage}${
    debouncedSearchText && `&business=${debouncedSearchText}`
  }`;

  const { data } = useGetAllMileage(url);

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
    setMileage(data?.data?.documents);
  }, [setMileage, mileage, data, currentPage]);

  return (
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
            displaying {mileage?.length} of {data?.data?.count} mileages
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
          </tr>
        </thead>
        <tbody>
          {mileage?.map((m) => (
            <tr key={m.id}>
              <StyledTableData>{truncateText(m.id, 15)}</StyledTableData>
              <StyledTableData>{String(m.roundTrip)}</StyledTableData>
              <StyledTableData>
                {truncateText(m.purposeOfTrip, 20)}
              </StyledTableData>
              <StyledTableData>{m.startPostCode}</StyledTableData>
              <StyledTableData>{m.endPostCode}</StyledTableData>
              <StyledTableData>{m.distance}</StyledTableData>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledMileageBg>
  );
};

export default Mileage;
