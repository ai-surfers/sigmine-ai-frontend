import { ThreadsStateType } from "@/types/threads";
import { atom } from "recoil";

export const initialThreads = {
  step: 1,
  first_sentence_candidates: [],
  selectedFirstSentence: "",
  reference: "",
  fullContent: "",
};

export const threadsState = atom<ThreadsStateType>({
  key: "threadsState",
  default: initialThreads,
});
