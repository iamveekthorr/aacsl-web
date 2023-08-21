import styled from 'styled-components';

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
