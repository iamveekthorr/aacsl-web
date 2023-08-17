import styled from 'styled-components';

export const StyledNavItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  text-transform: capitalize;
  cursor: pointer;

  & > :first-child {
    margin-right: 1rem;
  }

  ${({ $active }) =>
    $active &&
    `
    border-radius: 0.25rem;
    background: rgba(47,128,237, .2);
    color: var(--blue-1, #2F80ED);
    font-weight: bolder;
    
    & > :first-child{
        fill: var(--blue-1, #2F80ED);
    }
  `}
`;
