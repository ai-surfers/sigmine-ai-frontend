import { IconNameType } from "ai-surfers-design-system";

export type IndustryKey =
  | "consulting"
  | "education"
  | "finance"
  | "healthcare"
  | "media"
  | "tech"
  | "retail"
  | "etc";

export type IndustryValue = {
  ko: string;
  emoji: IconNameType;
};

export const INDUSTRY: Record<IndustryKey, IndustryValue> = {
  consulting: { ko: "컨설팅", emoji: "Message2" },
  education: { ko: "교육", emoji: "BookSaved" },
  finance: { ko: "금융", emoji: "Bank" },
  healthcare: { ko: "헬스케어", emoji: "HealthCare" },
  media: { ko: "미디어", emoji: "VideoPlay" },
  tech: { ko: "기술", emoji: "MessageProgramming" },
  retail: { ko: "소매", emoji: "Shop" },
  etc: { ko: "기타", emoji: "More" },
};
