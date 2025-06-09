"use client";

import { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  // 모달 외부 클릭으로 닫기
  const handleClickDim = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  return ReactDOM.createPortal(
    <Dimmed onClick={handleClickDim}>
      <Content onClick={(e) => e.stopPropagation()}>{children}</Content>
    </Dimmed>,
    document.body
  );
};

export default Modal;

const Dimmed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); // 어두운 배경
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  z-index: 1000;
`;
