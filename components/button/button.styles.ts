import styled from 'styled-components';

export const StyledButton = styled.button<{ $primary?: boolean }>`
  --accent-color: white;

  /* This renders the buttons above... Edit me! */
  background: #2f80ed;
  border-radius: 3px;
  border: none;
  color: var(--accent-color);
  /* display: inline-block; */
  padding: 1rem 2rem;
  /* transition: all 200ms ease-in-out; */
  width: 100%;
  text-transform: capitalize;
  display: block;
  cursor: pointer;
  font-family: inherit;

  /* &:hover {
    filter: brightness(0.85);
  } */
`;
