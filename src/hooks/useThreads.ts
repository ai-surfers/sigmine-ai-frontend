import { initialThreads, threadsState } from "@/states/threadState";
import { useRecoilState } from "recoil";

export const useThreads = () => {
  const [threadsData, setThreadsData] = useRecoilState(threadsState);

  const setThreadStep = (newStep: number) => {
    setThreadsData((prev) => ({
      ...prev,
      step: newStep,
    }));
  };

  const setFirstCandidates = (newCandidates: string[]) => {
    setThreadsData((prev) => ({
      ...prev,
      first_sentence_candidates: newCandidates,
    }));
  };

  const setSelectedFirstSentence = (newSentence: string) => {
    setThreadsData((prev) => ({
      ...prev,
      selectedFirstSentence: newSentence,
    }));
  };

  const setReference = (newReference: string) => {
    setThreadsData((prev) => ({
      ...prev,
      reference: newReference,
    }));
  };

  const setFullContent = (newFullContnet: string) => {
    setThreadsData((prev) => ({
      ...prev,
      fullContent: newFullContnet,
    }));
  };

  const resetThreadsState = () => {
    setThreadsData(initialThreads);
  };
  return {
    threadsData,
    setThreadStep,
    setFirstCandidates,
    setSelectedFirstSentence,
    setReference,
    setFullContent,
    resetThreadsState,
  };
};
