"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => router.back()}
      className="rounded-xl"
    >
      <ArrowLeft className="size-4" />
      Back
    </Button>
  );
}
