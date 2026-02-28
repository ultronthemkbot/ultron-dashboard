#!/bin/bash
# Syncs live OpenClaw workspace data into the dashboard's bundled data/ directory.
# Run this periodically (or via cron) to keep the Vercel deployment up to date.

set -e

WORKSPACE="/home/mktwopointzero/.openclaw/workspace"
DATA_DIR="$(dirname "$0")/../data"

mkdir -p "$DATA_DIR/memory"

# Sync top-level markdown files
for f in MEMORY.md AGENTS.md TOOLS.md SOUL.md USER.md; do
  if [ -f "$WORKSPACE/$f" ]; then
    cp "$WORKSPACE/$f" "$DATA_DIR/$f"
  fi
done

# Sync memory directory (daily logs + other files)
if [ -d "$WORKSPACE/memory" ]; then
  for f in "$WORKSPACE/memory/"*.md "$WORKSPACE/memory/"*.json; do
    [ -f "$f" ] && cp "$f" "$DATA_DIR/memory/"
  done
fi

echo "✅ Data synced to $DATA_DIR at $(date -Iseconds)"
