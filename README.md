# Molten Chocolate Lava Cake — make.fun food-picture-01

A single original food picture: a molten chocolate lava cake on a dark
plate, cut open with thick glossy chocolate sauce pouring out, a scoop
of vanilla ice cream melting beside it, fresh raspberries, a mint leaf
and a dusting of cocoa, in warm golden light. Made to make you hungry
at first glance, and to still read clearly at 300 px across: one big
hero dish, centred, with strong gloss, melt and colour contrast.

## How it works

`main.ts` (Node 22, standard library only) checks that `entry.png` is
a whole PNG or JPEG under the 1 MiB limit, then copies it byte-for-byte
to `$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output`). The copy is
deterministic: every run writes identical bytes.

The file is a JPEG payload in a file named `entry.png`, which the
competition rules allow (the format is told apart by its first bytes).
It is 1024×1024 px and 199,968 bytes, well under the 1 MiB limit.

## Run locally

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see `LICENSE`.
