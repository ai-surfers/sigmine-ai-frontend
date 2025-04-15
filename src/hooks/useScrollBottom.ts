import { RefObject } from "react";

export const useScrollBottom = (ref: RefObject<HTMLElement | null>) => {
  return () => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };
};
