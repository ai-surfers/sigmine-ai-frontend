import { BaseResponse } from "@/apis/client";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

export type StepType = 1 | 2 | 3;

export interface BaseSteps {
  step: StepType;
  setStep: Dispatch<SetStateAction<StepType>>;
}

export interface SettingType {
  persona: string;
  examples: { content: string }[];
}

interface WithTeamCode {
  teamCode: string;
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
