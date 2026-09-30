import { projects } from "./projects";

export const CAREER_START_YEAR = 2022;

export function yearsOfExperience(now: Date = new Date()) {
  return now.getFullYear() - CAREER_START_YEAR;
}

export function getMetrics(now: Date = new Date()) {
  const freelanceCount = projects.filter((p) => !p.personal).length;
  return [
    { value: `${yearsOfExperience(now)}+`, label: "Years of experience", detail: `Freelancing since ${CAREER_START_YEAR}` },
    { value: `${freelanceCount}+`, label: "Client projects shipped", detail: "Freelance websites & apps" },
    { value: "1.6M+", label: "Concurrent users", detail: "Real-time code execution platform" },
    { value: "30+", label: "GraphQL APIs built", detail: "E-commerce auth, cart & checkout" },
  ];
}
