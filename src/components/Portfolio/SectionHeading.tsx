import type { ReactNode } from "react";
export function SectionHeading({
  number,
  label,
  title,
  children,
}: {
  number: string;
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="section-heading">
      <p className="eyebrow">
        <span>{number}</span> / {label}
      </p>
      <div>
        <h2>{title}</h2>
        {children && <p className="section-intro">{children}</p>}
      </div>
    </header>
  );
}
