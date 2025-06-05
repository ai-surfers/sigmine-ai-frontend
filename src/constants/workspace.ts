import { IndustryKey, IndustryValue } from "@/types/workspaces";

export const INDUSTRY: Record<IndustryKey, IndustryValue> = {
  Consulting: { ko: "컨설팅", emoji: "Message2" },
  Education: { ko: "교육", emoji: "BookSaved" },
  Finance: { ko: "금융", emoji: "Bank" },
  Healthcare: { ko: "헬스케어", emoji: "HealthCare" },
  Media: { ko: "미디어", emoji: "VideoPlay" },
  Technology: { ko: "기술", emoji: "MessageProgramming" },
  Retail: { ko: "소매", emoji: "Shop" },
  Other: { ko: "기타", emoji: "More" },
};

export const SIZE = [
  ["1-10", "10명 이하"],
  ["11-50", "11 - 50명"],
  ["51-100", "51 - 100명"],
  ["101-200", "101 - 200명"],
  ["201-1000", "201 - 1000명"],
  ["1001", "1000명 +"],
] as const;
