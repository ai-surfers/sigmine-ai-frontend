"use client";

import { useSetRecoilState } from "recoil";
import { modalState, ModalState } from "@/states/modalState";

type OpenModalParams = Omit<ModalState, "isOpen">;

export const useModal = () => {
  const setModal = useSetRecoilState(modalState);

  const openModal = ({
    backgroundImage,
    title,
    subtitle,
    content,
    buttonText,
    onButtonClick,
  }: OpenModalParams) => {
    setModal({
      isOpen: true,
      backgroundImage,
      title,
      subtitle,
      content,
      buttonText,
      onButtonClick,
    });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  return { openModal, closeModal };
};
