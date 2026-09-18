#!/usr/bin/env bash
# Builds the ZonesConnect APS package: regenerates APP-LIST.xml (file manifest
# with size + sha256 for every packaged file) and zips it into dist/.
#
# Usage: ./build.sh
# Reads <version> and <release> straight out of APP-META.xml, so bump those
# there before building a new release - no separate version to maintain.

set -euo pipefail
cd "$(dirname "$0")"

FILES=(
    "APP-META.xml"
    "schemas/tile_settings.json"
    "ui/bootstrapApp.html"
    "ui/zonesconnect.js"
    "ui/pcp/globals.html"
    "ui/pcp/globals-edit.html"
    "ui/plugins/ux1_dashboard_tile.js"
    "mediators/dashboard.json"
    "img/desktop.png"
)

VERSION=$(grep -oP '(?<=<version>)[^<]+' APP-META.xml | head -1)
RELEASE=$(grep -oP '(?<=<release>)[^<]+' APP-META.xml | head -1)

echo "Building ZonesConnect ${VERSION}-${RELEASE}..."

python3 - "${FILES[@]}" <<'EOF'
import hashlib
import sys

files = sys.argv[1:]

def entry(path):
    data = open(path, 'rb').read()
    return f'    <file name="{path}" size="{len(data)}" sha256="{hashlib.sha256(data).hexdigest()}"/>'

content = (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
    '<files xmlns="http://apstandard.com/ns/1" xmlns:ns2="http://www.w3.org/2000/09/xmldsig#">\n'
    + '\n'.join(entry(f) for f in files) + '\n'
    '</files>\n'
)

with open('APP-LIST.xml', 'w', encoding='utf-8') as f:
    f.write(content)
EOF

mkdir -p dist
OUT="dist/zonesconnect-${VERSION}-${RELEASE}.app.zip"
rm -f "$OUT"
zip -r "$OUT" APP-META.xml APP-LIST.xml README.md schemas ui mediators img -x '.*' > /dev/null

echo "Built: $OUT"
