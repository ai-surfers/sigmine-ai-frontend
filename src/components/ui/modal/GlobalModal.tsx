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
              <BackgroundImage
                src={modal.backgroundImage}
                alt="modal background"
              />
            )}
            <ContentWrapper>
              <TextContent vertical gap={8} align="start">
                <Text font="h2_20_semi" color="G_800">
                  {modal.title}
                </Text>
                <Flex>
                  <Text
                    font="b3_14_med"
                    color="sigmine_primary"
                    style={{ textAlign: "start" }}
                  >
                    {modal.content}
                  </Text>
                  <Text
                    font="b3_14_reg"
                    color="G_600"
                    style={{ textAlign: "start" }}
                  >
                    {modal.subtitle}
                  </Text>
                </Flex>
              </TextContent>
              <Flex gap={12} style={{ marginTop: "16px" }}>
                <Button
                  hierarchy="default"
                  size={52}
                  onClick={handleClose}
                  style={{ width: "120px", justifyContent: "center" }}
                >
                  <Text font="b2_16_semi" color="G_600">
                    취소
                  </Text>
                </Button>
                <Button
                  hierarchy="sigminePrimary"
                  size={52}
                  onClick={handleButtonClick}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <Text font="b2_16_semi" color="white">
                    {modal.buttonText}
                  </Text>
                </Button>
              </Flex>
            </ContentWrapper>
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

const BackgroundImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

const ContentWrapper = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  z-index: 1;
`;

const TextContent = styled(Flex)`
  position: relative;
  z-index: 1;
`;
