"use client";

import { useState } from "react";

type WorkCategory = "professional" | "personal";

export function WorkCategoryToggle({ active, onChange }: { active?: WorkCategory; onChange?: (category: WorkCategory) => void }) {
  const [uncontrolledActive, setUncontrolledActive] = useState<WorkCategory>("professional");
  const selected = active ?? uncontrolledActive;
  const select = (category: WorkCategory) => {
    if (active === undefined) setUncontrolledActive(category);
    onChange?.(category);
  };
  return <div className="work-category-toggle" data-component="WorkCategoryToggle" role="tablist" aria-label="Work category">
    <button type="button" role="tab" aria-selected={selected === "professional"} className={selected === "professional" ? "active" : ""} onClick={() => select("professional")}>Professional Work</button>
    <button type="button" role="tab" aria-selected={selected === "personal"} className={selected === "personal" ? "active" : ""} onClick={() => select("personal")}>Personal AI Projects</button>
  </div>;
}
