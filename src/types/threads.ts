import { BaseResponse } from "@/apis/client";
import { AxiosError } from "axios";
import { RefObject } from "react";

export type StepType = 1 | 2;

export interface RefType {
  scrollRef: RefObject<HTMLDivElement | null>;
}

export interface SettingType {
  persona: string;
  examples: { content: string }[];
}

export interface SettingParmsType {
  settings: SettingType;
}

export interface ContentsType {
  contents: string;
}

export interface ReferenceType {
  reference: string;
}

export interface FirstSenteceParamsType extends ReferenceType {}

export interface FirstSentenceResponseType {
  first_sentence_candidates: string[];
}

export interface PostThreadsAsyncs<T> {
  onSuccess: (res: BaseResponse<T>) => void;
  onError: (e: AxiosError) => void;
}

export interface FullContentBodyType {
  first_sentence: string;
  reference: string;
}

export interface FullContentParamsType extends FullContentBodyType {}

export interface FullContentResponseType {
  full_contents: string;
}

export interface ThreadsStateType extends FirstSentenceResponseType {
  selectedFirstSentence: string;
  step: number;
  fullContent: string;
  reference: string;
}
