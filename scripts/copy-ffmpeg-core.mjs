import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dest = join(root, "public", "ffmpeg");
mkdirSync(dest, { recursive: true });

// ESM first: @ffmpeg/ffmpeg's module worker does `import(coreURL).default`.
// UMD has no default export, so load() throws "failed to import ffmpeg-core.js".
const candidates = [
  [
    "node_modules/@ffmpeg/core/dist/esm/ffmpeg-core.js",
    "node_modules/@ffmpeg/core/dist/esm/ffmpeg-core.wasm",
  ],
  [
    "node_modules/@ffmpeg/core/dist/umd/ffmpeg-core.js",
    "node_modules/@ffmpeg/core/dist/umd/ffmpeg-core.wasm",
  ],
];

const pair = candidates.find(
  ([js, wasm]) => existsSync(join(root, js)) && existsSync(join(root, wasm)),
);

if (!pair) {
  console.error(
    "[clip] ffmpeg-core.js / ffmpeg-core.wasm not found under node_modules/@ffmpeg/core",
  );
  process.exit(1);
}

copyFileSync(join(root, pair[0]), join(dest, "ffmpeg-core.js"));
copyFileSync(join(root, pair[1]), join(dest, "ffmpeg-core.wasm"));
console.log("[clip] copied ST ffmpeg core from", pair[0]);
