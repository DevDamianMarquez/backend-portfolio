// How a request moves through Repuesthogar. Pure SVG, colors come from CSS tokens.

type NodeProps = { x: number; y: number; w: number; h: number; title: string; sub?: string; strong?: boolean };

function Node({ x, y, w, h, title, sub, strong }: NodeProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={6}
        fill={strong ? "var(--accent-soft)" : "var(--panel-2)"}
        stroke={strong ? "var(--accent)" : "var(--line)"}
        strokeWidth={strong ? 1.5 : 1}
      />
      <text x={x + 14} y={y + (sub ? 25 : h / 2 + 5)} fill="var(--ink)" fontSize="14" fontWeight="600">
        {title}
      </text>
      {sub && (
        <text x={x + 14} y={y + 44} fill="var(--muted)" fontSize="12">
          {sub}
        </text>
      )}
    </g>
  );
}

function Label({ x, y, children, anchor = "middle" }: { x: number; y: number; children: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} fill="var(--muted)" fontSize="11.5" textAnchor={anchor}>
      {children}
    </text>
  );
}

export function ArchitectureDiagram() {
  const line = { stroke: "var(--accent)", strokeWidth: 1.5, fill: "none" } as const;
  const quiet = { stroke: "var(--muted)", strokeWidth: 1.25, fill: "none" } as const;

  return (
    <figure className="m-0">
      <div className="overflow-x-auto rounded-lg border border-line bg-panel-2 p-4 sm:p-6">
        <svg
          viewBox="0 0 860 280"
          className="h-auto w-full min-w-[640px] font-sans"
          role="img"
          aria-labelledby="arch-title arch-desc"
        >
          <title id="arch-title">Repuesthogar architecture</title>
          <desc id="arch-desc">
            Customers and the store owner use a React app on Cloudflare Pages. It calls a FastAPI service on Render, which
            stores data in PostgreSQL on Neon and images on Cloudinary. Customers send product inquiries through WhatsApp.
          </desc>

          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--accent)" />
            </marker>
            <marker id="arrow-q" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--muted)" />
            </marker>
            <marker id="arrow-wa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--ok)" />
            </marker>
          </defs>

          {/* edges */}
          <path d="M170 92 C 210 92, 210 140, 248 140" {...line} className="path-draw" markerEnd="url(#arrow)" />
          <path d="M170 222 C 210 222, 210 160, 248 160" {...line} className="path-draw" markerEnd="url(#arrow)" />
          <path d="M420 150 L 478 150" {...line} className="path-draw" markerEnd="url(#arrow)" />
          <path d="M640 140 C 670 140, 670 82, 698 82" {...line} className="path-draw" markerEnd="url(#arrow)" />
          <path d="M640 160 C 670 160, 670 212, 698 212" {...quiet} markerEnd="url(#arrow-q)" />
          <path d="M100 64 C 100 30, 200 30, 248 30" stroke="var(--ok)" strokeWidth={1.5} fill="none" markerEnd="url(#arrow-wa)" />

          <Label x={449} y={140}>REST</Label>
          <Label x={200} y={250} anchor="middle">JWT login</Label>
          <Label x={676} y={110}>SQL</Label>
          <Label x={676} y={200}>uploads</Label>
          <Label x={176} y={22}>pre-filled message</Label>

          {/* nodes */}
          <Node x={30} y={64} w={140} h={56} title="Customer" sub="any device" />
          <Node x={30} y={194} w={140} h={56} title="Store owner" sub="admin panel" />
          <Node x={250} y={12} w={170} h={36} title="WhatsApp chat" />
          <Node x={250} y={118} w={170} h={64} title="React app" sub="Cloudflare Pages" />
          <Node x={480} y={118} w={160} h={64} title="FastAPI" sub="Render" strong />
          <Node x={700} y={54} w={140} h={56} title="PostgreSQL" sub="Neon + Alembic" />
          <Node x={700} y={184} w={140} h={56} title="Cloudinary" sub="product photos" />
        </svg>
      </div>
      <figcaption className="mt-3 text-sm text-muted">
        Highlighted lines carry API traffic. The WhatsApp link never touches the backend: it opens a chat with the product name
        already filled in.
      </figcaption>
    </figure>
  );
}
