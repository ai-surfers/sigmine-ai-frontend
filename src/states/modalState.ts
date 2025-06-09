import { atom } from "recoil";

export interface ModalState {
  isOpen: boolean;
  backgroundImage?: string;
  title: string;
  content: string;
  subtitle: string;
  buttonText: string;
  onButtonClick?: () => void;
}

export const modalState = atom<ModalState>({
  key: "modalState",
  default: {
    isOpen: false,
    title: "",
    subtitle: "",
    content: "",
    buttonText: "",
  },
});
