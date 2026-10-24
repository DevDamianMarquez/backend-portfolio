import * as icons from "simple-icons";

type SimpleIcon = { title: string; path: string; hex: string };

const byTitle = new Map<string, SimpleIcon>();
for (const v of Object.values(icons) as unknown[]) {
  const i = v as SimpleIcon;
  if (i && typeof i === "object" && "path" in i && "title" in i) byTitle.set(i.title.toLowerCase(), i);
}

// Some names in the CV differ from simple-icons titles.
const aliases: Record<string, string> = {
  "jwt": "json web tokens",
  "json web tokens": "json web tokens",
  "node": "node.js",
  "tailwind": "tailwind css",
};

// Dark brand colors get lifted so they stay visible on the navy background.
const darkBrands = new Set(["000000", "181717", "222222", "1E1E1E", "092E20", "3A3A3A"]);

export function TechIcon({ name, size = 18 }: { name: string; size?: number }) {
  const key = name.toLowerCase();
  const icon = byTitle.get(aliases[key] ?? key);

  if (!icon) {
    const mono = name
      .replace(/[^A-Za-z0-9 ]/g, "")
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return (
      <span
        aria-hidden
        className="grid shrink-0 place-items-center rounded-[5px] bg-accent-soft font-mono text-[10px] font-bold text-accent"
        style={{ width: size, height: size }}
      >
        {mono}
      </span>
    );
  }

  const fill = darkBrands.has(icon.hex.toUpperCase()) ? "#e9edf5" : `#${icon.hex}`;
  return (
    <svg aria-hidden viewBox="0 0 24 24" width={size} height={size} className="shrink-0" fill={fill}>
      <path d={icon.path} />
    </svg>
  );
}

export function TechChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-line bg-panel px-2.5 py-1.5 text-sm text-ink">
      <TechIcon name={name} size={16} />
      {name}
    </span>
  );
}
