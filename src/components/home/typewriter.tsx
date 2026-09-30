"use client";

import * as React from "react";
import { useMotionPreference } from "@/components/providers";

export function Typewriter({ words, className }: { words: readonly string[]; className?: string }) {
  const { motionOn } = useMotionPreference();
  const [index, setIndex] = React.useState(0);
  const [text, setText] = React.useState(words[0]);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    if (!motionOn) return;
    const word = words[index];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 250);
    } else {
      timeout = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? 45 : 85,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, motionOn]);

  const shown = motionOn ? text : words[index];

  return (
    <span className={className} aria-label={words.join(", ")}>
      <span aria-hidden>{shown}</span>
      <span aria-hidden className="ml-0.5 inline-block w-[3px] translate-y-[0.1em] animate-pulse bg-primary align-baseline">
        &nbsp;
      </span>
    </span>
  );
}
