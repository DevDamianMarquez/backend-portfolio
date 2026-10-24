import type { Endpoint, Project } from "@/data/projects";

const methodColor: Record<Endpoint["method"], string> = {
  GET: "text-blue border-blue/40",
  POST: "text-ok border-ok/40",
  DELETE: "text-[#ff8a8a] border-[#ff8a8a]/40",
};

export function EndpointTable({ endpoints, compact = false }: { endpoints: Endpoint[]; compact?: boolean }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        <caption className="sr-only">REST endpoints</caption>
        <thead className="bg-panel-2 text-xs text-muted">
          <tr>
            <th scope="col" className="px-4 py-2.5 font-medium">Method</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Path</th>
            {!compact && <th scope="col" className="px-4 py-2.5 font-medium">Purpose</th>}
            <th scope="col" className="px-4 py-2.5 font-medium">Auth</th>
          </tr>
        </thead>
        <tbody>
          {endpoints.map((e) => (
            <tr key={e.method + e.path} className="border-t border-line">
              <td className="px-4 py-2.5">
                <span className={`rounded border px-1.5 py-0.5 font-mono text-[11px] font-semibold ${methodColor[e.method]}`}>
                  {e.method}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 font-mono text-[13px] text-ink">{e.path}</td>
              {!compact && <td className="px-4 py-2.5 text-muted">{e.purpose}</td>}
              <td className="whitespace-nowrap px-4 py-2.5 text-xs text-muted">{e.auth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// An ordered request flow. Numbered because the order is the information.
export function Pipeline({ steps }: { steps: NonNullable<Project["pipeline"]> }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.step} className="bg-panel p-5">
          <p className="flex items-center gap-3">
            <span className="grid size-7 place-items-center rounded-full border border-accent/50 font-mono text-xs text-accent">
              {i + 1}
            </span>
            <span className="font-display font-semibold">{s.step}</span>
          </p>
          <p className="mt-2 text-sm text-muted">{s.detail}</p>
        </li>
      ))}
    </ol>
  );
}

export function Layers({ layers }: { layers: Project["layers"] }) {
  return (
    <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
      {layers.map((l) => (
        <div key={l.layer} className="border-t border-line pt-3">
          <dt className="font-medium">{l.layer}</dt>
          <dd className="mt-1 text-muted">{l.items.join(", ")}</dd>
        </div>
      ))}
    </dl>
  );
}
