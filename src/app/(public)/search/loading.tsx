import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <main className="max-body flex min-h-[50vh] items-center justify-center py-8">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
    </main>
  );
}
