import type { ReactNode } from "react";

/** Brass highlighter stroke for the key term. It draws in when its section reveals. */
export function Mark({ children, tone = "paper" }: { children: ReactNode; tone?: "paper" | "field" }) {
  return <mark className={tone === "field" ? "wb-mark wb-mark--field" : "wb-mark"}>{children}</mark>;
}
