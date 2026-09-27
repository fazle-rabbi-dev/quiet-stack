"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "../ui/toast";

export function NewsletterForm() {
  const [email, setEmail] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setEmail("");
    toast.add({ title: "Thanks for joining!", type: "success" });
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 flex gap-2">
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@mail.com"
        aria-label="Email address"
        className="h-11 rounded-2xl dark:border-white/10 dark:bg-black/40 dark:placeholder:text-white/40"
      />
      <Button
        type="submit"
        className="btn-primary h-11 shrink-0 rounded-2xl px-5"
      >
        Join
      </Button>
    </form>
  );
}
