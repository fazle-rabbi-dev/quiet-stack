export function DashboardHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="heading-2">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Manage stories - publish, edit, delete.
        </p>
      </div>
    </div>
  );
}
