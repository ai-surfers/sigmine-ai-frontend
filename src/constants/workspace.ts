import { IndustryKey, IndustryValue, SizeKey } from "@/types/workspaces";

export const INDUSTRY = new Map<IndustryKey, IndustryValue>([
  ["Consulting", { ko: "컨설팅", emoji: "Message2" }],
  ["Education", { ko: "교육", emoji: "BookSaved" }],
  ["Finance", { ko: "금융", emoji: "Bank" }],
  ["Healthcare", { ko: "헬스케어", emoji: "HealthCare" }],
  ["Media", { ko: "미디어", emoji: "VideoPlay" }],
  ["Technology", { ko: "기술", emoji: "MessageProgramming" }],
  ["Retail", { ko: "소매", emoji: "Shop" }],
  ["Other", { ko: "기타", emoji: "More" }],
]);

export const SIZE = new Map<SizeKey, string>([
  ["1", "1명"],
  ["2-5", "2 - 5명"],
  ["6-30", "6 - 30명"],
  ["31-100", "31 - 100명"],
  ["101-500", "101 - 500명"],
  ["501", "500명 이상"],
]);
