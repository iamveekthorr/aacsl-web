import styled, { css } from 'styled-components';

const openModal = css`
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  height: 30rem;
  width: 30rem;
  z-index: 10;
  display: flex;
  background-color: white;
  border-radius: 5px;
  color: rgb(67 67 67);
  overflow: hidden;
`;

export const ModalBG = styled.div`
  ${openModal};
  & {
    scrollbar-width: thin;
    scrollbar-color: blue gray;
  }
`;

export const ModalContentContainer = styled.div`
  padding: 2rem 3rem;
  overflow-y: auto;
  width: 100%;
`;

export const ModalOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  right: 0;
  cursor: pointer;
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(6px);
`;
