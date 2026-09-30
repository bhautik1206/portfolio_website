"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useContact } from "./contact-provider";
import type { ContactIntent } from "@/lib/contact";

type Props = React.ComponentProps<typeof Button> & { intent?: ContactIntent };

export function ContactButton({ intent, onClick, ...props }: Props) {
  const { openContact } = useContact();
  return (
    <Button
      {...props}
      onClick={(e) => {
        onClick?.(e);
        openContact(intent);
      }}
    />
  );
}
