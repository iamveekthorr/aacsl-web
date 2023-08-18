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
} from '@/styles/main.styles';

import MileageActive from '@/public/driving-active.svg';

const Mileage = () => {
  const [mileage, setMileage] = React.useState<Array<any> | undefined>([]);

  const { data } = useGetAllMileage();

  React.useEffect(() => {
    setMileage(data?.data?.documents);
  }, [setMileage, mileage, data]);

  return (
    <StyledMileageBg>
      <HeadingContainer>
        <HeadingIconContainer>
          <MileageActive />
        </HeadingIconContainer>
        <StyledHeadingText>mileage</StyledHeadingText>
      </HeadingContainer>
      <PaginationText>
        <p>
          displaying {mileage?.length} of {data?.data?.count} mileages
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
              <StyledTableData>{m.distance} miles</StyledTableData>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledMileageBg>
  );
};

export default Mileage;
