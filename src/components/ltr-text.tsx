import { Fragment, type ReactNode } from "react";

export function Ltr({ children }: { children: ReactNode }) {
  return <bdi dir="ltr">{children}</bdi>;
}

export function TextWithLtrNumbers({ text }: { text: string }) {
  const parts = text.split(/(\d+(?:[.\s]\d+)*)/g);
  return (
    <>
      {parts.map((part, index) =>
        /^\d/.test(part) ? (
          <bdi key={`${part}-${index}`} dir="ltr">
            {part}
          </bdi>
        ) : (
          <Fragment key={`${part}-${index}`}>{part}</Fragment>
        ),
      )}
    </>
  );
}
