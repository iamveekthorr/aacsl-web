import styled from 'styled-components';

export const StyledTopNavBackground = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
  height: 5rem;

  & > :first-child {
    margin-right: auto;
  }
`;

export const StyledUserActiveContainer = styled.div`
  display: flex;
  align-items: center;

  & > p {
    text-transform: capitalize;
    font-weight: bolder;
    font-size: 0.7rem;
  }

  & > :first-child {
    margin-right: 1rem;
  }

  & > span {
    display: inline-flex;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    background-color: var(--blue-1, #2f80ed);
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bolder;
    font-size: 1rem;
  }
`;
