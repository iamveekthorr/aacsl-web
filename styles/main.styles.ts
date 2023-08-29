import styled from 'styled-components';
import { DatePickerComponent } from '../components/date-picker/date-picker.component';

export const StyledMileageBg = styled.section`
  padding: 1rem;
  width: 100%;
`;

export const StyledTableHead = styled.th`
  padding: 0.5rem;
`;

export const StyledTableData = styled.td`
  padding: 0.5rem;
  cursor: pointer;
`;

export const StyledHeadingText = styled.h1`
  text-transform: capitalize;
  font-size: 1.5rem;
`;

export const PaginationText = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;

export const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  & > :first-child {
    margin-right: 1rem;
  }
`;

export const HeadingIconContainer = styled.div`
  border-radius: 50%;
  background: rgba(47, 128, 237, 0.2);
  height: 3rem;
  width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledTableRow = styled.tr`
  padding: 1rem 0;
`;

export const StyledPaginationContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  & > :first-child {
    margin-right: auto;
  }
`;
export const StyledControlButton = styled.div`
  background-color: rgba(47, 128, 237, 1);
  padding: 0.5rem 0.7rem;
  font-size: 0.7rem;
  font-weight: bolder;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  user-select: none;
`;

export const StyledControls = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

export const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 300px;
  font-family: inherit;
  margin-right: 1rem;
  font-size: inherit;

  &:focus {
    outline: none;
  }
`;

export const ModalHeadingTextContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  & > :first-child {
    margin-right: 1rem;
  }

  & > div:last-of-type {
    display: flex;
    align-items: center;
    & > :first-child {
      margin-right: 0.5rem;
    }
  }
`;

export const StyledBusinessName = styled.p`
  text-transform: capitalize;
  font-weight: bolder;
  font-size: 1rem;
  width: 12rem;
`;

export const StyledBusinessTag = styled.p`
  padding: 5px;
  text-transform: uppercase;
  background-color: rgba(47, 128, 237, 0.2);
  color: rgba(47, 128, 237, 1);
  border-radius: 3px;
  font-weight: bolder;
`;

export const StyledDetailsHeading = styled.p`
  font-size: 0.7rem;
  font-weight: bolder;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
`;

export const StyledDetailsItem = styled.p`
  & > :not(span:last-of-type) {
    text-transform: capitalize;
  }
`;

export const StyledDataDetails = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export const StyledDashBoardGrid = styled.section`
  display: grid;
  /* grid-template-columns: repeat(2, minmax(10rem, 1fr)); */
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(10rem, auto);

  /* & > :nth-child(3) {
    grid-row: 2 / 4;
    grid-column: span 2;
  }

  & > :nth-child(4) {
    grid-row: 3;
    grid-column: 2;
  } */
`;

export const StyledGridItem = styled.div<{ $color: string }>`
  background: linear-gradient(${({ $color }) => $color});

  padding: 2rem;
  cursor: pointer;
  font-weight: bolder;
  color: white;

  & > :first-child {
    font-size: 2rem;
    text-transform: capitalize;
  }

  & > p:last-of-type {
    font-size: 1rem;
  }
`;

export const FormButtonContainer = styled.div`
  display: flex;
  align-items: center;
  & > :first-child {
    margin-right: auto;
    font-weight: bold;
    text-transform: capitalize;
    cursor: pointer;
  }

  & > button {
    width: auto;
  }
`;

export const StyledFilterIcon = styled.div`
  background: rgba(47, 128, 237, 0.2);
  border-radius: 3px;
  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  cursor: pointer;

  & > svg {
    height: 1rem;
    width: 1rem;
    fill: #2f80ed;
  }
`;

export const StyledDateFilteringContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const StyledLabel = styled.label`
  font-size: 0.7rem;
  font-family: inherit;
  text-transform: capitalize;
`;

export const StyledDatePickerInput = styled(DatePickerComponent)`
  height: 3rem;
  padding: 1rem;
  margin-top: 0.6rem;
  width: 100%;
  &:focus {
    outline: #2f80ed;
  }
`;

export const StyledTableRowNotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;
  text-transform: capitalize;
  flex-direction: column;
  font-size: 1rem;
  & > :last-child {
    margin-top: 1rem;
  }
`;
