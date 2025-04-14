import {
  FirstSentenceResponseType,
  ReferenceType,
  StepType,
} from "@/types/threads";
import { atom } from "recoil";

export const initialFirstSentenceState = {
  //사용자가 고른 첫 문장 저장
  first_sentence_candidates: [],
};

export const firstSentenceState = atom<FirstSentenceResponseType>({
  key: "firstSentenceState",
  default: initialFirstSentenceState,
});

export const initialReferenceState = {
  //첫 문장을 위해 입력한 내용 저장
  reference: "",
};

export const referenceState = atom<ReferenceType>({
  key: "referenceState",
  default: initialReferenceState,
});

export const initialStepState = {
  step: 1 as StepType,
};

export const stepState = atom<{ step: StepType }>({
  key: "stepState",
  default: initialStepState,
});
