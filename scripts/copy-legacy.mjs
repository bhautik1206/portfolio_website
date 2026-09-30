import { cpSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const src = join(root, "legacy", "build");
const dest = join(root, "public", "ov");

if (!existsSync(join(src, "index.html"))) {
  console.error("legacy/build/index.html not found. Run the legacy build first.");
  process.exit(1);
}

rmSync(dest, { recursive: true, force: true });
// _redirects is the old CRA SPA catch-all; Next.js rewrites handle /ov/* deep links instead.
cpSync(src, dest, { recursive: true, filter: (path) => !path.endsWith("_redirects") });
console.log("Copied legacy build to public/ov");
