export { cn } from "cn";

export function countWords(markdown: string) {
  const text = markdown.replace(/[#*`>~\-\\[\]()/!]/g, " ");
  return text.split(/\s+/).filter(Boolean).length;
}

export function formatDate(value: string | Date) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Robust clipboard copy: modern API first, hidden-textarea fallback for
// non-secure contexts and older browsers. Returns true on success.
export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(el);
      return ok;
    } catch {
      return false;
    }
  }
}
