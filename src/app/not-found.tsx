import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center pb-24 pt-36">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">This page doesn&apos;t exist.</h1>
      <p className="mt-4 max-w-md text-muted-foreground">The link may be old or mistyped. Let&apos;s get you back to something useful.</p>
      <Button className="mt-8" asChild>
        <Link href="/">
          <ArrowLeft />
          Back to home
        </Link>
      </Button>
    </Container>
  );
}
