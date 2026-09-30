#!/usr/bin/env bash
# Vercel's Ignored Build Step (vercel.json "ignoreCommand"): exit 0 skips
# the build, exit 1 runs it. Production always builds. A preview builds
# only when the pushed commit's message carries [preview], so pushing work
# in progress doesn't spend build credits. Only the head commit counts.

if [ "$VERCEL_ENV" = "production" ] || [ "$VERCEL_GIT_COMMIT_REF" = "main" ]; then
  echo "Production: building."
  exit 1
fi

case "$VERCEL_GIT_COMMIT_MESSAGE" in
  *"[preview]"*)
    echo "[preview] in the commit message: building the preview."
    exit 1
    ;;
esac

echo "No [preview] in the commit message: skipping this preview build."
exit 0
