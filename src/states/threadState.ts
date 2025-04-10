import { FirstSentenceResponseType } from "@/types/threads";
import { atom } from "recoil";

export const initialFirstSentenceState = {
  first_sentence_candidates: [],
};

export const firstSentenceState = atom<FirstSentenceResponseType>({
  key: "firstSentenceState",
  default: initialFirstSentenceState,
});
