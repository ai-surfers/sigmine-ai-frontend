"use client";

import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modalState } from "@/states/modalState";
import { Button, Text } from "ai-surfers-design-system";
import { Flex } from "antd";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const GlobalModal = () => {
  const modal = useRecoilValue(modalState);
  const setModal = useSetRecoilState(modalState);

  const handleClose = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleButtonClick = () => {
    if (modal.onButtonClick) {
      modal.onButtonClick();
    }
    handleClose();
  };

  return (
    <AnimatePresence>
      {modal.isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {modal.backgroundImage && (
              <BackgroundImageWrapper>
                <BackgroundImage
                  src={modal.backgroundImage}
                  alt="modal background"
                />
                <TextOverlay>
                  <Flex vertical gap={8} align="start">
                    <Text font="h2_20_semi" color="G_800">
                      {modal.title}
                    </Text>
                    <Text
                      font="b3_14_reg"
                      color="G_600"
                      style={{ textAlign: "start" }}
                    >
                      {modal.subtitle}
                    </Text>
                  </Flex>
                </TextOverlay>
              </BackgroundImageWrapper>
            )}
            {!modal.backgroundImage && (
              <ContentWrapper>
                <Flex vertical gap={8} align="start">
                  <Text font="h2_20_semi" color="G_800">
                    {modal.title}
                  </Text>
                  <Text
                    font="b3_14_reg"
                    color="G_600"
                    style={{ textAlign: "start" }}
                  >
                    {modal.subtitle}
                  </Text>
                </Flex>
              </ContentWrapper>
            )}
            <ButtonWrapper>
              <Flex gap={12} align="center" style={{ width: "100%" }}>
                <Button
                  hierarchy="default"
                  size={52}
                  onClick={handleClose}
                  style={{ width: "120px" }}
                >
                  <Text font="b2_16_semi" color="G_600">
                    취소
                  </Text>
                </Button>
                <Button
                  hierarchy="sigminePrimary"
                  size={52}
                  onClick={handleButtonClick}
                  style={{ width: "100%" }}
                >
                  <Text font="b2_16_semi" color="white">
                    {modal.buttonText}
                  </Text>
                </Button>
              </Flex>
            </ButtonWrapper>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default GlobalModal;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  position: relative;
  overflow: hidden;
`;

const BackgroundImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ContentWrapper = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ButtonWrapper = styled.div`
  height: 92px;
  padding: 24px;
  padding-top: 0;
  display: flex;
  align-items: flex-end;
  width: 100%;
`;
