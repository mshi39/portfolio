import type { ReactNode } from "react";
import { CaseStudyQuote } from "./CaseStudyQuote";

export function WorkflowQuestion({ children, attribution }: { children: ReactNode; attribution?: ReactNode }) {
  return <div data-component="WorkflowQuestion">
    <CaseStudyQuote className="feedback-workflow-question" attribution={attribution}>{children}</CaseStudyQuote>
  </div>;
}
