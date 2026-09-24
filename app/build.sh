#!/usr/bin/env bash
# Builds the single-page app into public/index.html (run from the repo root: bash app/build.sh)
set -euo pipefail
cd "$(dirname "$0")"
FILES="i18n.js data.js elements_all.js zoom.js data2.js data3.js mols2.js curriculum_pre.js lessons/a.js lessons/b.js lessons/c.js lessons/d.js lessons/e.js course_data.js engine.js render.js render2.js atoms.js prof.js course.js course_vis2.js labtools.js intro.js voice.js ui.js"
TMP=$(mktemp --suffix .js)
for f in $FILES; do cat "$f"; echo; done > "$TMP"
node --check "$TMP"; echo "JS syntax OK"
{ cat page-top.html; cat head.html; cat body.html; echo "<script>"; cat "$TMP"; echo "</script>"; echo "</body></html>"; } > ../public/index.html
rm -f "$TMP"
echo "Built public/index.html ($(wc -c < ../public/index.html) bytes)"
