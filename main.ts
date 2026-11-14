// make.fun food-picture-01 entry.
//
// The entry is one original food picture, entry.png beside this file: a
// molten chocolate lava cake, cut open with glossy chocolate pouring
// out, a scoop of vanilla ice cream, raspberries and mint on a dark
// plate. The program copies it byte-for-byte to the output directory,
// so every run of the entry produces identical bytes.
//
// The file is a JPEG payload in a file named entry.png; the competition
// rules tell PNG and JPEG apart by their first bytes, and the name
// stays entry.png either way.
//
// Run locally:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SRC = new URL('./entry.png', import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate takes a whole PNG or JPEG of at most 1 MiB (1048576 bytes).
// Check the magic bytes and the size before copying anything.
const bytes = readFileSync(SRC);
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const isPng = bytes.subarray(0, 8).equals(PNG_MAGIC);
const isJpeg =
  bytes[0] === 0xff &&
  bytes[1] === 0xd8 &&
  bytes[bytes.length - 2] === 0xff &&
  bytes[bytes.length - 1] === 0xd9;
if (!isPng && !isJpeg) {
  throw new Error('entry.png is neither a whole PNG nor a whole JPEG');
}
if (bytes.length > 1048576) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB limit`);
}

mkdirSync(outDir, { recursive: true });
const dest = join(outDir, 'entry.png');
copyFileSync(SRC, dest);

// Confirm the copy is whole: same size as the source, byte for byte.
if (statSync(dest).size !== bytes.length) {
  throw new Error('copied entry.png does not match the source size');
}
console.log(`wrote ${dest} (${bytes.length} bytes)`);
