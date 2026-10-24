import fs from "node:fs";
import path from "node:path";

// True when a file exists in /public at build time. Used to hide links to files that aren't there yet (CV, photo).
export function publicFileExists(urlPath: string): boolean {
  if (!urlPath) return false;
  return fs.existsSync(path.join(process.cwd(), "public", urlPath.replace(/^\//, "")));
}
